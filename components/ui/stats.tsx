"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 border border-border rounded-xl p-8 bg-card">
            {/* Stat 1: 2023 */}
            <StatCard delay={0.3}>
              <div className="text-5xl md:text-6xl font-bold text-black mb-4">2023</div>
              <p className="text-sm text-black/70">
                Gründung als Jugend forscht-Projekt
              </p>
            </StatCard>

            {/* Stat 2: 2. Platz */}
            <StatCard delay={0.4}>
              <div className="text-5xl md:text-6xl font-bold text-black mb-4">2. Platz</div>
              <p className="text-sm text-black/70">
                JugendUnternimmt Summerschool 2025
              </p>
            </StatCard>

            {/* Stat 3: Nominiert */}
            <StatCard delay={0.5}>
              <div className="text-5xl md:text-6xl font-bold text-black mb-4">Nominiert</div>
              <p className="text-sm text-black/70">
                STARTERiN Award Hamburg 2025
              </p>
            </StatCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden bg-card rounded-xl">
      {/* Lamp effect background */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-primary via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-card h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-card bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-primary text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-card bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-card h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-card blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-primary opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-primary blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-primary"
        ></motion.div>
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-card"></div>
      </div>

      {/* Content */}
      <div className="relative z-50 flex -translate-y-32 flex-col items-center px-5">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
