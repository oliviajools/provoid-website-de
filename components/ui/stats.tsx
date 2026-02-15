"use client";
import { motion } from "motion/react";
import { Award, Rocket, Trophy } from "lucide-react";

export function Stats() {
  return (
    <section className="py-20 md:py-28">
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
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">
              Unsere Erfolge
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ausgezeichnet & Anerkannt
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Stat 1: 2023 */}
            <StatCard delay={0.1} icon={<Rocket className="w-6 h-6" />}>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                2023
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Gründung als Jugend forscht-Projekt
              </p>
            </StatCard>

            {/* Stat 2: 2. Platz */}
            <StatCard delay={0.2} icon={<Trophy className="w-6 h-6" />}>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                2. Platz
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                JugendUnternimmt Summerschool 2025
              </p>
            </StatCard>

            {/* Stat 3: Nominiert */}
            <StatCard delay={0.3} icon={<Award className="w-6 h-6" />}>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Nominiert
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
      
      {/* Card */}
      <div className="relative flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
        {/* Icon */}
        <div className="mb-6 p-3 rounded-xl bg-primary/10 text-primary">
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
