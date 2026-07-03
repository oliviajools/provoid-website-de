import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { CTABlock } from "@/components/ui/CTABlock";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Convert markdown-like content to JSX
  const content = post.content
    .split('\n')
    .map((line, index) => {
      const trimmedLine = line.trim();
      
      // H2 headings
      if (trimmedLine.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold text-text-primary mt-8 mb-4 ml-0 md:ml-8 lg:ml-16">{trimmedLine.replace('## ', '')}</h2>;
      }
      
      // H3 headings (if any)
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-text-primary mt-6 mb-3 ml-0 md:ml-8 lg:ml-16">{trimmedLine.replace('### ', '')}</h3>;
      }
      
      // Bullet points with 🧠
      if (trimmedLine.startsWith('🧠 ')) {
        return <li key={index} className="flex items-start gap-3 text-text-secondary mb-3 ml-0 md:ml-8 lg:ml-16 list-none"><span className="text-primary-accent mt-1">•</span><span>{trimmedLine.replace('🧠 ', '')}</span></li>;
      }
      
      // Special sections
      if (trimmedLine.startsWith('Das Gehirn:')) {
        return <p key={index} className="text-text-secondary italic mt-8 mb-4 border-l-2 border-primary-accent pl-4 ml-0 md:ml-8 lg:ml-16">{trimmedLine}</p>;
      }
      
      if (trimmedLine.startsWith('Sie zeigen vor allem eines:')) {
        return <p key={index} className="text-text-primary font-semibold mt-8 mb-4 text-lg ml-0 md:ml-8 lg:ml-16">{trimmedLine}</p>;
      }
      
      // Section headers like "Die wichtigsten Erkenntnisse:"
      if (trimmedLine.includes(':') && trimmedLine.length < 100) {
        const [label] = trimmedLine.split(':');
        if (label.includes('wichtig') || label.includes('Erkenntnis') || label.includes('Ergebnis') || label.includes('Faktor')) {
          return <h3 key={index} className="text-lg font-semibold text-text-primary mt-6 mb-4 ml-0 md:ml-8 lg:ml-16">{trimmedLine}</h3>;
        }
      }
      
      // Label: Value pairs
      if (trimmedLine.includes(':') && trimmedLine.length < 200) {
        const [label, ...rest] = trimmedLine.split(':');
        if (rest.length > 0 && rest.join(':').trim()) {
          return <p key={index} className="text-text-secondary mb-3 ml-0 md:ml-8 lg:ml-16"><span className="font-semibold text-text-primary">{label}:</span> {rest.join(':')}</p>;
        }
      }
      
      // Empty lines
      if (!trimmedLine) {
        return <div key={index} className="h-4" />;
      }
      
      // Regular paragraphs (longer lines)
      if (trimmedLine.length > 50) {
        return <p key={index} className="text-text-secondary mb-4 leading-relaxed ml-0 md:ml-8 lg:ml-16">{trimmedLine}</p>;
      }
      
      // Short lines (likely labels or headers)
      return <p key={index} className="text-text-secondary mb-2 ml-0 md:ml-8 lg:ml-16">{trimmedLine}</p>;
    });

  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="frequency-line top-1/3" />
        <div className="container relative z-10">
          <div className="max-w-4xl ml-0 md:ml-8 lg:ml-16 flex items-start justify-between gap-8">
            <div>
              <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-accent transition-colors mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück zu Neuro-Insights
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary mb-6">
                {post.title}
              </h1>
              <p className="text-lg text-text-muted mb-4">{post.date}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-sm font-medium text-primary-accent bg-surface2 px-3 py-1 rounded-editorial">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-lg md:text-xl text-text-secondary max-w-3xl">
                {post.excerpt}
              </p>
            </div>
            <div className="flex-shrink-0">
              <img src="/Logo-provoid.png" alt="PROVOID" className="h-24 md:h-32" />
            </div>
          </div>
        </div>
      </section>

      <article className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            {post.shortVersion && (
              <div className="mb-8 border border-border bg-surface p-6 rounded-card">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Kurzfassung</h3>
                <div className="text-text-secondary leading-relaxed">
                  {post.shortVersion.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>
            )}
            <div className="prose prose-lg max-w-none">
              {content}
            </div>
          </div>
        </div>
      </article>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <div className="max-w-3xl border border-border bg-surface p-8 rounded-card">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Mehr Insights entdecken</h3>
            <p className="text-text-secondary mb-6">
              Erfahren Sie mehr über neurowissenschaftliche Erkenntnisse und deren praktische Anwendung.
            </p>
            <div className="flex gap-4">
              <Link href="/insights" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-editorial">
                Alle Artikel
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-semibold text-text-primary mb-6">Haben Sie Fragen?</h3>
            <CTABlock primary={{ text: "Mit uns sprechen", href: "/kontakt" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
