"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GeminiCta() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[200vh] bg-background w-full rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        title={`Starten Sie mit einem \nunverbindlichen Gespräch`}
        description="Klären Sie Ziele und nächste Schritte – in 20 Minuten."
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
