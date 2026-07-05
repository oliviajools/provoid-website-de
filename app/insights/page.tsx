import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogPosts } from "@/lib/blog-posts";
import Image from "next/image";

export default function Insights() {
  return (
    <div className="flex flex-col">
      <section className="relative py-8 md:py-12 bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary mb-6">
              NEURO-INSIGHTS
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
              Aktuellste Neurowissenschaftliche Erkenntnisse aus der Forschung.
            </p>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader 
            label="BLOG" 
            title="Aktuelle Artikel" 
            description="Wöchentlich neuer Input zu Neurowissenschaftliche Studien, Erkenntnissen und Trends." 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[...blogPosts].reverse().map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.id}
                date={post.date}
                tags={post.tags}
                author={post.author}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="NEWSLETTER" title="Bleiben Sie informiert" description="Abonnieren Sie unseren Newsletter für regelmäßige Neurowissenschaftliche Einblicke." />
          
          <div className="mt-12 max-w-md">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 px-4 py-3 border border-border rounded-editorial text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-accent transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-editorial shadow-lg shadow-primary-accent/20 hover:shadow-primary-accent/30"
              >
                Abonnieren
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
