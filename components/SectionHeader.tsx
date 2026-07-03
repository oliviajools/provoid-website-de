import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: string | ReactNode;
  description?: string | ReactNode;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary-accent mb-4">{label}</p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary mb-4">{title}</h2>
      {description && <p className="text-lg text-text-secondary max-w-3xl">{description}</p>}
      <div className="w-16 h-px bg-primary-accent mt-8" />
    </div>
  );
}
