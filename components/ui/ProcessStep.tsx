interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="flex gap-4 p-4 rounded-card hover:bg-primary-accent/5 transition-all duration-300 hover:-translate-x-1">
      <div className="flex-shrink-0">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary-accent">{number}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-text-primary mb-2 hover:text-primary-accent transition-colors">{title}</h4>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
