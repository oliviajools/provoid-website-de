"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Mail } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message === "already_subscribed" 
          ? "Sie sind bereits angemeldet!" 
          : "Erfolgreich angemeldet! Bitte bestätigen Sie Ihre E-Mail.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Ein Fehler ist aufgetreten");
      }
    } catch {
      setStatus("error");
      setMessage("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ihre@email.de"
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={status === "loading" || status === "success"}
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={status === "loading" || status === "success" || !email}
          className="px-6 py-3"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            "Anmelden"
          )}
        </Button>
      </div>
      
      {message && (
        <p className={`mt-3 text-sm text-center ${
          status === "success" ? "text-green-600" : "text-red-600"
        }`}>
          {message}
        </p>
      )}
      
      <p className="mt-3 text-xs text-muted-foreground text-center">
        Mit der Anmeldung stimmen Sie unserer{" "}
        <a href="/datenschutz" className="underline hover:text-primary">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
