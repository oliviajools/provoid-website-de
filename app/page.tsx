"use client";

import { AboutTeaser } from "@/components/ui/about-teaser";
import { Success } from "@/components/ui/success";
import { Stats } from "@/components/ui/stats";
import { CtaCards } from "@/components/ui/cta-cards";
import { FinalCta } from "@/components/ui/final-cta";
import { GeminiCta } from "@/components/ui/gemini-cta";
import { Proof } from "@/components/ui/proof";
import { FlipWords } from "@/components/ui/flip-words";
import { NewsTeaser } from "@/components/ui/news-teaser";
import { BlogTeaser } from "@/components/ui/blog-teaser";
import { NeuroAtlasTeaser } from "@/components/ui/neuro-atlas-teaser";
import { NeuroChatbot } from "@/components/ui/neuro-chatbot";
import Image from "next/image";

export default function Home() {
  const words = ["Performance", "Gesundheit", "Zufriedenheit"];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background pt-[40px] pb-[60px] md:pt-[80px] md:pb-[80px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <div>Neurowissenschaft für</div>
              <FlipWords words={words} className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary" />
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Wir übersetzen neurowissenschaftliche Forschung in praktische Lösungen
            </p>
            <div className="relative flex justify-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex justify-center items-center">
                <div className="h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full bg-primary/40 blur-[56px] animate-pulse" />
              </div>
              <Image
                src="/brain.png"
                alt="Gehirn Illustration"
                width={768}
                height={768}
                priority
                loading="eager"
                quality={90}
                className="relative mx-auto h-auto w-72 md:w-[28rem] lg:w-[32rem] drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section (SB7: The Guide) */}
      <Proof />

      {/* Primary CTA with Gemini Effect */}
      <GeminiCta />

      {/* Stakes Section (SB7: Help them avoid failure) */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white">Die Lücke schließen</h3>
              <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
                Zwischen dem, was Kunden sagen, und dem, was sie wirklich bewegt, liegt eine Lücke.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative p-8 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                <div className="absolute top-4 right-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Ohne Neuromarketing</div>
                <h4 className="text-lg font-semibold mb-4 mt-2 text-white">Status Quo</h4>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-start gap-3">
                    <span className="text-slate-600 mt-1">—</span>
                    <span>Marketing basiert auf Annahmen, nicht auf Daten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-600 mt-1">—</span>
                    <span>Kaufentscheidungen bleiben undurchsichtig</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-600 mt-1">—</span>
                    <span>Teamdynamiken werden nicht verstanden</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-600 mt-1">—</span>
                    <span>Conversion bleibt unter dem Potenzial</span>
                  </li>
                </ul>
              </div>
              <div className="relative p-8 rounded-2xl border border-cyan-500/30 bg-slate-800/50 backdrop-blur-sm">
                <div className="absolute top-4 right-4 text-xs font-medium text-cyan-400 uppercase tracking-wider">Mit PROVOID</div>
                <h4 className="text-lg font-semibold mb-4 mt-2 text-white">Der Unterschied</h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">+</span>
                    <span>Entscheidungen verstehen, wo sie entstehen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">+</span>
                    <span>Käufer- und Mitarbeiteridentität klarifizieren</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">+</span>
                    <span>Wissenschaftlich fundierte Strategien</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">+</span>
                    <span>Messbare Ergebnisse durch Neuromarketing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Section */}
      <Success />

      {/* Blog Teaser - Neuroverse */}
      <BlogTeaser />

      {/* Neuro-Atlas Interactive Section */}
      <NeuroAtlasTeaser />

      {/* About teaser (concise) */}
      <AboutTeaser />

      {/* Stats Section with Lamp Effect */}
      <Stats />

      {/* CTA Cards Section (final) */}
      <CtaCards />

      {/* News Teaser Section */}
      <NewsTeaser />

      {/* Final CTA (SB7: Clear next step) */}
      <FinalCta />

      {/* Neuro Chatbot */}
      <NeuroChatbot />
    </div>
  );
}
