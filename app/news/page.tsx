import { Metadata } from "next";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "PROVOID-News | Aktuelle Entwicklungen",
  description: "Die aktuellen Entwicklungen bei PROVOID auf einen Blick – Neuigkeiten, Updates und Meilensteine.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "PROVOID-News | Aktuelle Entwicklungen",
    description: "Die aktuellen Entwicklungen bei PROVOID auf einen Blick – Neuigkeiten, Updates und Meilensteine.",
    type: "website",
    url: "/news",
    images: [
      {
        url: "/logo-provoid-svg.svg",
        width: 512,
        height: 512,
        alt: "PROVOID Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROVOID-News | Aktuelle Entwicklungen",
    description: "Die aktuellen Entwicklungen bei PROVOID auf einen Blick – Neuigkeiten, Updates und Meilensteine.",
    images: ["/logo-provoid-svg.svg"],
  },
};

export default function NewsPage() {
  return (
    <div className="flex flex-col">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        // News list (ItemList) with NewsArticle entries and Breadcrumbs
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'PROVOID-News | Aktuelle Entwicklungen',
            url: '/news',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: '/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'News',
                  item: '/news',
                },
              ],
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'NewsArticle',
                  headline: 'Erste erfolgreiche EEG-Messungen',
                  datePublished: '2025-08-01',
                  author: { '@type': 'Organization', name: 'PROVOID' },
                  image: ['/EEG-user1.jpg', '/EEG-user2.jpg'],
                  video: {
                    '@type': 'VideoObject',
                    name: 'EEG-Messungen',
                    thumbnailUrl: ['/EEG-user1.jpg'],
                    uploadDate: '2025-08-01',
                    contentUrl: '/EEG-Messungen.mp4',
                  },
                },
                {
                  '@type': 'NewsArticle',
                  headline: 'EEG-Evaluation in Arztpraxis Hamburg – Proband:innen gesucht!',
                  datePublished: '2025-07-01',
                  author: { '@type': 'Organization', name: 'PROVOID' },
                },
                {
                  '@type': 'NewsArticle',
                  headline: 'Kooperation mit SC Victoria Hamburg',
                  datePublished: '2025-06-30',
                  author: { '@type': 'Organization', name: 'PROVOID' },
                  image: ['/Kooperation1.jpg'],
                },
                {
                  '@type': 'NewsArticle',
                  headline: 'Landesfinale bei Airbus – 2. Platz und Sonderpreis für Jugend-Unternimmt-Summerschool',
                  datePublished: '2025-04-01',
                  author: { '@type': 'Organization', name: 'PROVOID' },
                  image: ['/Landesfinale-airbus.png'],
                },
                {
                  '@type': 'NewsArticle',
                  headline: 'Regionalwettbewerb Jugend forscht am UKE – PROVOID erreicht Platz 1',
                  datePublished: '2025-02-01',
                  author: { '@type': 'Organization', name: 'PROVOID' },
                },
              ],
            },
          }),
        }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[48px] md:py-[77px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">PROVOID</span>-News
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              no brain no gain
            </p>
            <div className="relative mt-2 flex justify-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex justify-center items-center">
                <div className="h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full bg-primary/40 blur-[56px] animate-pulse" />
              </div>
              <Image
                src="/brain.png"
                alt="Gehirn Illustration"
                width={768}
                height={768}
                priority
                className="relative mx-auto h-auto w-72 md:w-[28rem] lg:w-[32rem] drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-center md:text-4xl">
            Die aktuellen Entwicklungen auf einen Blick
          </h2>

          {/* News Article */}
          <article className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime="2025-08">August 2025</time>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  Erste erfolgreiche EEG-Messungen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Es ist soweit: PROVOID konnte erste EEG-Testungen an Proband:innen durchführen, 
                    um die neurologischen Reaktionen des Gehirns auf PROVOID-Tools zu untersuchen. 
                    Die Proband:innen haben im Vorhinein einen detaillierten Fragebogen ausgefüllt und 
                    wurden umfangreich über das Verfahren der EEG-Messung aufgeklärt.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Eine Messung dauert im Durchschnitt inklusive des Anlegens der Elektroden auf der 
                    Kopfhaut etwa 45-60 Minuten. Für Verpflegung ist selbstverständlich gesorgt.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Die getesteten Tools reichen von Flickerlichtern über auditive Reize bis hin zu 
                    Gamification-Tools, die bestimmte Hirnareale gezielt ansteuern. Jedes Gehirn ist 
                    individuell und so hatte jede:r Teilnehmer:in ein eigenes Lieblingstool. Ganz nebenbei 
                    wurden bereits Highscores für noch nicht veröffentlichte Tools aufgestellt.
                  </p>
                </div>

                {/* Video Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Einige Eindrücke</h3>
                  <div className="rounded-xl overflow-hidden bg-muted/30 border-2 mx-auto max-w-2xl">
                    <video
                      controls
                      className="w-full h-auto max-h-[500px] object-contain"
                    >
                      <source src="/EEG-Messungen.mp4" type="video/mp4" />
                      Ihr Browser unterstützt das Video-Tag nicht.
                    </video>
                  </div>
                </div>

                {/* Images Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Impressionen aus den Messungen</h3>
                  <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
                    <div className="rounded-xl overflow-hidden border-2">
                      <Image
                        src="/EEG-user1.jpg"
                        alt="EEG-Messung Proband 1"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border-2">
                      <Image
                        src="/EEG-user2.jpg"
                        alt="EEG-Messung Proband 2"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second News Article */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime="2025-07">Juli 2025</time>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  EEG-Evaluation in Arztpraxis Hamburg – Proband:innen gesucht!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    PROVOID darf in einer Hamburger Arztpraxis EEG-Messungen zur Evaluation unserer 
                    Tools durchführen. Ziel: die Validierung neurokognitiver Wirkfaktoren von 
                    PROVOID-Stimulationen im realen Setting.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Es werden gesunde Proband:innen im Alter von 18–60 Jahren gesucht – ideal für 
                    sportlich interessierte Erwachsene und Leistungsträger:innen. EEG-Messungen sind 
                    sinnvoll, weil sie hochaufgelöst neuronale Reaktionen auf unsere Reizmuster direkt 
                    abbilden und so die wissenschaftliche Effektivität belegen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Interessiert?</strong> Bitte melde dich bei{" "}
                    <a 
                      href="mailto:oliviabahr@avoid-procrastination-provoid.com" 
                      className="text-primary hover:underline"
                    >
                      oliviabahr@avoid-procrastination-provoid.com
                    </a>
                    {" "}für Terminvereinbarung und Details.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third News Article */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime="2025-06">Juni 2025</time>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  Kooperation mit SC Victoria Hamburg
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    PROVOID-Sports geht eine partnerschaftliche Kooperation mit dem SC Victoria Hamburg 
                    ein – eine innovative Verbindung von Neuroathletik und Mädchenfußball.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Weitere Details zur Zusammenarbeit findest Du hier:{" "}
                    <a 
                      href="https://www.victorianerinnen.de/2025/06/30/neue-wege-im-m%C3%A4dchenfu%C3%9Fball/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      Neue Wege im Mädchenfußball
                    </a>
                  </p>
                </div>

                {/* Image Section */}
                <div className="rounded-xl overflow-hidden border-2 max-w-2xl mx-auto">
                  <Image
                    src="/Kooperation1.jpg"
                    alt="Kooperation PROVOID-Sports mit SC Victoria Hamburg"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Fourth News Article */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime="2025-04">April 2025</time>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  Landesfinale bei Airbus – 2. Platz und Sonderpreis für Jugend-Unternimmt-Summerschool
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Im Hamburger Landesfinale auf dem Airbus-Campus erzielte PROVOID einen zweiten Platz. 
                    Damit verbunden: die Qualifikation zum Sonderpreis &ldquo;Jugend Unternimmt – Summer School&rdquo; 
                    in Erfurt. Der Wettbewerb war unglaublich vielseitig, abwechslungsreich und inspirierend - 
                    neben fachlichen Gesprächen, Ideenreichtum und vielen spannenden Projekten gab es ebenso 
                    einige Pitch-Vortr&auml;ge - darunter PROVOID!
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Die Summer School findet nun vom 21.–25. Juli im Augustinerkloster statt und bietet 
                    Workshops, Seminare und Coachings zu Geschäftsmodellentwicklung, Unternehmertum und 
                    Elevator Pitches. Nun geht es mit der Entwicklung weiter, um so zeitnah wie möglich 
                    erste Projekte und Zusammenarbeiten in Angriff zu nehmen!
                  </p>
                </div>

                {/* Image Section */}
                <div className="rounded-xl overflow-hidden border-2 max-w-2xl mx-auto">
                  <Image
                    src="/Landesfinale-airbus.png"
                    alt="Landesfinale bei Airbus - PROVOID 2. Platz"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Fifth News Article */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime="2025-02">Februar 2025</time>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  Regionalwettbewerb Jugend forscht am UKE – PROVOID erreicht Platz 1
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    PROVOID wurde beim Regionalwettbewerb Jugend forscht am UKE mit dem ersten Platz 
                    ausgezeichnet und ist damit für das Landesfinale auf dem Airbus-Gelände qualifiziert! 
                    Das Jurygespräch war intensiv und inspirierend: Es gab zahlreiche fachliche Impulse, 
                    wertvolles Feedback und anerkennende Rückmeldungen zur modularen PROVOID-Tool-Architektur.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Auch die Rückmeldungen der anderen Teilnehmer:innen war wertvoll für die weitere 
                    Entwicklung von PROVOID. Nun geht es in die Vorbereitung für den Landeswettbewerb!
                  </p>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </section>
    </div>
  );
}
