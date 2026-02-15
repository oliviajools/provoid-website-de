"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Eye, Heart, Zap, Target, ChevronDown, ChevronUp } from "lucide-react";

const journeySteps = [
  {
    id: 1,
    icon: Eye,
    title: "Wahrnehmung",
    time: "50ms",
    description: "Der visuelle Kortex filtert in Millisekunden, was relevant ist. Farben, Formen, Bewegung – alles wird blitzschnell bewertet.",
    insight: "Bilder werden 60.000× schneller verarbeitet als Text.",
  },
  {
    id: 2,
    icon: Heart,
    title: "Emotion",
    time: "150ms",
    description: "Das limbische System bewertet emotional – noch bevor Sie bewusst denken. Gefühle leiten den Weg.",
    insight: "95% aller Entscheidungen sind emotional geprägt.",
  },
  {
    id: 3,
    icon: Brain,
    title: "Rationalisierung",
    time: "300ms",
    description: "Ihr Bewusstsein schaltet sich ein und liefert logische Gründe für die bereits emotional getroffene Entscheidung.",
    insight: "Wir begründen, was längst entschieden ist.",
  },
  {
    id: 4,
    icon: Zap,
    title: "Aktivierung",
    time: "500ms",
    description: "Dopamin wird ausgeschüttet und motiviert zur Handlung. Die Vorfreude auf das Ergebnis treibt uns an.",
    insight: "Erwartung wirkt stärker als die Belohnung selbst.",
  },
  {
    id: 5,
    icon: Target,
    title: "Entscheidung",
    time: "~1s",
    description: "Der bewusste Moment der Entscheidung ist nur die sichtbare Spitze eines Eisbergs unbewusster Prozesse.",
    insight: "Nur 5% der Entscheidung findet bewusst statt.",
  },
];

export function PurchaseJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    setActiveStep(0);
    
    journeySteps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index);
        if (index === journeySteps.length - 1) {
          setTimeout(() => setIsAutoPlaying(false), 4000);
        }
      }, index * 3500);
    });
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Die Reise einer Entscheidung
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Was geschieht in Ihrem Gehirn, bevor Sie eine Entscheidung treffen?
            </p>
          </motion.div>

          {/* 3D Depth Stage */}
          <div className="relative" style={{ perspective: "1200px" }}>
            {/* Background Steps (fading into distance) */}
            <div className="relative h-[440px] md:h-[400px]">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                const distance = index - activeStep;
                const isActive = index === activeStep;
                const isFuture = index > activeStep;
                const isPast = index < activeStep;
                
                // Smoother 3D calculations
                const zOffset = distance * 100;
                const scale = Math.max(0.6, 1 - Math.abs(distance) * 0.12);
                const opacity = isActive ? 1 : Math.max(0.15, 1 - Math.abs(distance) * 0.3);
                const blur = isActive ? 0 : Math.min(Math.abs(distance) * 1.5, 4);
                const yOffset = isPast ? -40 : isFuture ? 40 : 0;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={false}
                    animate={{
                      z: zOffset,
                      scale,
                      opacity,
                      y: yOffset,
                    }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      transformStyle: "preserve-3d",
                      zIndex: 10 - Math.abs(distance),
                      filter: `blur(${blur}px)`,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    className="origin-center"
                  >
                    <div className={`relative p-10 md:p-12 rounded-3xl border backdrop-blur-sm transition-all duration-700 ${
                      isActive 
                        ? "bg-gradient-to-b from-card to-card/95 border-primary/10 shadow-2xl shadow-primary/5" 
                        : "bg-card/60 border-border/50"
                    }`}>
                      {/* Subtle glow effect */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                      )}
                      
                      {/* Step Indicator */}
                      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                      
                      <div className="relative flex flex-col items-center text-center">
                        {/* Icon */}
                        <motion.div 
                          animate={{ scale: isActive ? 1 : 0.85 }}
                          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center mb-8"
                        >
                          <Icon className="w-8 h-8 text-primary" />
                        </motion.div>
                        
                        {/* Time Badge */}
                        <span className="px-4 py-1.5 rounded-full bg-muted/50 text-xs font-mono text-muted-foreground mb-4 tracking-wider">
                          {step.time}
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                          {step.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                          {step.description}
                        </p>
                        
                        {/* Insight */}
                        <div className="px-5 py-3 rounded-xl bg-primary/5 border border-primary/10">
                          <span className="text-sm text-primary">
                            {step.insight}
                          </span>
                        </div>
                        
                        {/* Step Counter */}
                        <div className="mt-8 text-xs text-muted-foreground/60 tracking-widest uppercase">
                          {step.id} / {journeySteps.length}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0 || isAutoPlaying}
                className="w-12 h-12 rounded-full bg-white dark:bg-card border-2 border-border shadow-md flex items-center justify-center text-foreground hover:border-primary hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              
              <button
                onClick={startAutoPlay}
                disabled={isAutoPlaying}
                className="px-8 py-3.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isAutoPlaying ? "Läuft..." : "Reise starten"}
              </button>
              
              <button
                onClick={() => setActiveStep(Math.min(journeySteps.length - 1, activeStep + 1))}
                disabled={activeStep === journeySteps.length - 1 || isAutoPlaying}
                className="w-12 h-12 rounded-full bg-white dark:bg-card border-2 border-border shadow-md flex items-center justify-center text-foreground hover:border-primary hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {journeySteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isAutoPlaying && setActiveStep(index)}
                  disabled={isAutoPlaying}
                  className={`h-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer hover:scale-110 ${
                    index === activeStep 
                      ? "bg-primary w-10" 
                      : index < activeStep 
                        ? "bg-primary/40 w-2.5" 
                        : "bg-border w-2.5 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-muted-foreground"
          >
            Neuromarketing macht diese unsichtbaren Prozesse{" "}
            <span className="text-foreground">sichtbar</span>.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
