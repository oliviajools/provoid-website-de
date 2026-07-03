interface EditorialQuoteProps {
  quote: string;
  author?: string;
}

export function EditorialQuote({ quote, author }: EditorialQuoteProps) {
  return (
    <div className="border-l-2 border-primary-accent pl-6 py-4">
      <p className="text-xl md:text-2xl font-medium text-text-primary italic">"{quote}"</p>
      {author && <p className="text-sm text-text-muted mt-4">— {author}</p>}
    </div>
  );
}
