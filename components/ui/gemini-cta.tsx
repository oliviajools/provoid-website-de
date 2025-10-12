"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GeminiCta() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Use static values for mobile to prevent performance issues
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1.2, 1.2] : [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1.2, 1.2] : [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1.2, 1.2] : [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1.2, 1.2] : [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1.2, 1.2] : [0, 1.2]);

  return (
    <div
      className={`${isMobile ? 'h-screen' : 'h-[200vh]'} bg-background w-full rounded-md relative pt-40`}
      ref={ref}
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
