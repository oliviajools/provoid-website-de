"use client";
import { motion } from "motion/react";
import { Award, Rocket, Trophy } from "lucide-react";

export function Stats() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-3">
              Unsere Erfolge
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ausgezeichnet & Anerkannt
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Stat 1: 2023 */}
            <StatCard delay={0.1} icon={<Rocket className="w-6 h-6" />}>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                2023
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gründung als Jugend forscht-Projekt
              </p>
            </StatCard>

            {/* Stat 2: 2. Platz */}
            <StatCard delay={0.2} icon={<Trophy className="w-6 h-6" />}>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                2. Platz
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                JugendUnternimmt Summerschool 2025
              </p>
            </StatCard>

            {/* Stat 3: Nominiert */}
            <StatCard delay={0.3} icon={<Award className="w-6 h-6" />}>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                Nominiert
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                STARTERiN Award Hamburg 2025
              </p>
            </StatCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ children, delay, icon }: { children: React.ReactNode; delay: number; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />
      
      {/* Card */}
      <div className="relative flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 h-full">
        {/* Icon */}
        <div className="mb-6 p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 ring-1 ring-cyan-500/20">
          {icon}
        </div>
        
        {/* Content */}
        <div className="text-center">
          {children}
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}
