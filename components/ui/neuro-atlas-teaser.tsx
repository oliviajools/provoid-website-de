"use client";

import { motion } from "framer-motion";
import { Brain, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Brain3DRealistic } from "@/components/ui/brain-3d-realistic";

export function NeuroAtlasTeaser() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Interaktives Tool
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Der{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Neuro-Atlas
              </span>
            </h2>
            
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Entdecken Sie interaktiv, wie verschiedene Hirnareale Kaufentscheidungen, 
              Emotionen und Verhalten beeinflussen – und wie wir dieses Wissen für 
              Ihren Erfolg einsetzen.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Verstehen Sie, wo Entscheidungen wirklich entstehen",
                "Lernen Sie die Marketing-Relevanz jedes Hirnareals",
                "Nutzen Sie unseren KI-Assistenten für individuelle Fragen"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link 
              href="/knowledge"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              <Brain className="w-5 h-5" />
              Neuro-Atlas erkunden
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* 3D Brain Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-[100px] rounded-full" />
            <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden h-[350px] md:h-[450px] lg:h-[500px]">
              <Brain3DRealistic />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
