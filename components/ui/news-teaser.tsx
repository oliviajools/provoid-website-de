import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newsItems = [
  {
    date: "August 2025",
    dateTime: "2025-08",
    title: "Erste erfolgreiche EEG-Messungen",
    excerpt: "PROVOID konnte erste EEG-Testungen an Proband:innen durchführen, um die neurologischen Reaktionen des Gehirns auf PROVOID-Tools zu untersuchen.",
  },
  {
    date: "Juli 2025",
    dateTime: "2025-07",
    title: "EEG-Evaluation in Arztpraxis Hamburg",
    excerpt: "PROVOID darf in einer Hamburger Arztpraxis EEG-Messungen zur Evaluation unserer Tools durchführen. Proband:innen gesucht!",
  },
  {
    date: "Juni 2025",
    dateTime: "2025-06",
    title: "Kooperation mit SC Victoria Hamburg",
    excerpt: "PROVOID-Sports geht eine partnerschaftliche Kooperation mit dem SC Victoria Hamburg ein – Neuroathletik trifft Mädchenfußball.",
  },
];

export function NewsTeaser() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">Aktuelles</h3>
            <p className="text-slate-400">
              Die neuesten Entwicklungen bei PROVOID
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.map((item, index) => (
              <Card key={index} className="border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={item.dateTime}>{item.date}</time>
                  </div>
                  <CardTitle className="text-lg leading-tight text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 line-clamp-3">
                    {item.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/news" 
              className="inline-flex items-center font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Alle News anzeigen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
