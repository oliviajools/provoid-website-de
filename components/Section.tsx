import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20", className)}>
      <h2 className="mb-4 text-3xl font-bold tracking-tight">{title}</h2>
      <div className="text-muted-foreground">{children}</div>
    </section>
  );
}
