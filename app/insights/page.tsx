import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogPosts } from "@/lib/blog-posts";
import Image from "next/image";

export default function Insights() {
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                NEURO-INSIGHTS
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-3xl">
                Aktuellste Neurowissenschaftliche Erkenntnisse aus der Forschung.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/brain.png"
                alt="Gehirn Illustration"
                width={768}
                height={768}
                priority
                loading="eager"
                quality={90}
                className="relative mx-auto h-auto w-72 md:w-[28rem] lg:w-[32rem] drop-shadow-lg"
              />
            </div>
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
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="KONTAKT" title="Haben Sie Fragen?" />
          <div className="mt-12"><CTABlock primary={{ text: "Mit uns sprechen", href: "/kontakt" }} /></div>
        </div>
      </section>
    </div>
  );
}
