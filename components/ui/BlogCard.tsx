import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date?: string;
  tags?: string[];
}

export function BlogCard({ title, excerpt, slug, date, tags = [] }: BlogCardProps) {
  return (
    <Link href={`/insights/${slug}`} className="block group">
      <article className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary-accent transition-colors">
          {title}
        </h3>
        {date && <p className="text-sm text-primary-accent mb-3 font-medium">{date}</p>}
        <p className="text-text-secondary line-clamp-3 mb-4 flex-grow">{excerpt}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-sm font-medium text-primary-accent bg-primary-accent/10 px-2 py-1 rounded-editorial">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-sm text-text-muted">+{tags.length - 3}</span>
            )}
          </div>
        )}
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-accent group-hover:gap-3 transition-all">
          Weiterlesen
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </article>
    </Link>
  );
}
