"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, ArrowRight, Lightbulb, Target, Zap } from "lucide-react";
import { Brain3DRealistic } from "@/components/ui/brain-3d-realistic";
import { NeuroChatbot } from "@/components/ui/neuro-chatbot";

export default function KnowledgeV2Page() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Interaktives Neuromarketing-Tool
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Der{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Neuro-Atlas
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto"
            >
              Entdecken Sie, wie verschiedene Hirnareale Kaufentscheidungen beeinflussen – 
              und wie wir dieses Wissen für Ihren Erfolg nutzen.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25">
                Atlas erkunden
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                Mehr erfahren
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Brain Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl"
          >
            <Brain3DRealistic />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Warum Neuromarketing?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              95% aller Kaufentscheidungen werden unbewusst getroffen. 
              Wir helfen Ihnen, diese Entscheidungen zu verstehen und zu beeinflussen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Wissenschaftlich fundiert",
                description: "Basierend auf aktuellen neurowissenschaftlichen Erkenntnissen und Studien."
              },
              {
                icon: Target,
                title: "Zielgerichtet",
                description: "Sprechen Sie genau die Hirnareale an, die für Ihre Zielgruppe relevant sind."
              },
              {
                icon: Zap,
                title: "Messbare Ergebnisse",
                description: "Optimieren Sie Ihre Kampagnen basierend auf echten neurologischen Daten."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-12 md:p-16">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10 max-w-2xl">
              <Lightbulb className="w-12 h-12 text-cyan-200 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Bereit, das Gehirn Ihrer Kunden zu verstehen?
              </h2>
              <p className="text-cyan-100 text-lg mb-8">
                Lassen Sie uns gemeinsam herausfinden, wie Neuromarketing Ihr Business transformieren kann.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cyan-700 font-semibold rounded-xl hover:bg-cyan-50 transition-all duration-300">
                Kostenlose Beratung
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Neuro Chatbot */}
      <NeuroChatbot />
    </div>
  );
}
