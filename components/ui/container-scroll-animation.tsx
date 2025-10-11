"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
  contentRef,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  // Card translate (content panel)
  const translate = useTransform(scrollYProgress, [0, 1], [0, -20]);
  // Header translate (section title) — smaller so it remains visible under sticky header
  const headerTranslate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <div
      className="h-auto md:h-[60rem] flex items-center justify-center relative p-2 md:p-16"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={headerTranslate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} contentRef={contentRef}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: string | React.ReactNode }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center mt-16 md:mt-24"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  contentRef,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <motion.div
      style={{
        rotateX: isMobile ? 0 : rotate,
        scale: isMobile ? 1 : scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-primary p-2 md:p-6 bg-primary rounded-[30px] shadow-2xl"
    >
      <div 
        ref={contentRef}
        className={`h-full w-full rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl p-4 md:p-4 overflow-y-auto`}
      >
        {children}
      </div>
    </motion.div>
  );
};
