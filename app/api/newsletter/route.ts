import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID || "3";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Newsletter-Service nicht konfiguriert" },
        { status: 500 }
      );
    }

    // Add contact to Brevo list
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });

    if (response.ok || response.status === 201) {
      return NextResponse.json({ success: true });
    }

    const errorData = await response.json();
    
    // Contact already exists
    if (errorData.code === "duplicate_parameter") {
      return NextResponse.json({ success: true, message: "already_subscribed" });
    }

    console.error("Brevo API error:", errorData);
    return NextResponse.json(
      { success: false, error: errorData.message || "Anmeldung fehlgeschlagen", details: errorData },
      { status: 500 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Ein Fehler ist aufgetreten" },
      { status: 500 }
    );
  }
}
