"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScroll, useTransform, useMotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
import type { MotionValue } from "motion/react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GeminiCta() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      const isHandheld =
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isHandheld);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Nur Desktop: target-basierte Scroll-Progress-Beobachtung
  const { scrollYProgress } = useScroll(
    isMobile
      ? {} // keine Beobachtung -> verhindert Scroll-Trap
      : { target: ref, offset: ["start start", "end start"] }
  );

  // Helper: 0..1 clamp
  const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
  const mk = (a: number, b: number) =>
    useTransform(scrollYProgress, [0, 0.8], [clamp01(a), clamp01(b)], {
      clamp: true,
    });

  // Mobile: konstante Werte, keine Subscription
  const ONE: MotionValue<number> = useMotionValue(1);

  const pathLengthFirst  = isMobile ? ONE : mk(0.2, 1);
  const pathLengthSecond = isMobile ? ONE : mk(0.15, 1);
  const pathLengthThird  = isMobile ? ONE : mk(0.1, 1);
  const pathLengthFourth = isMobile ? ONE : mk(0.05, 1);
  const pathLengthFifth  = isMobile ? ONE : mk(0, 1);

  return (
    <div
      ref={ref}
      className={`${
        isMobile ? "min-h-screen" : "h-[200vh]"
      } bg-background w-full rounded-md relative pt-40 overscroll-auto`}
    >
      <GoogleGeminiEffect
        title={`Starten Sie mit einem \nunverbindlichen Gespräch`}
        description="Klären Sie Ihre Ziele in 30 Minuten."
        isMobile={isMobile}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
