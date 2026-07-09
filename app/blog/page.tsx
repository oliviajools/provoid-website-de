import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import fs from "fs";
import path from "path";
import { BlogData } from "@/lib/blog-types";

// Force dynamic rendering
export const dynamic = "force-dynamic";

function getBlogData(): BlogData {
  try {
    const filePath = path.join(process.cwd(), "content", "blog-posts.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as BlogData;
  } catch {
    return { posts: [] };
  }
}

export const metadata: Metadata = {
  title: "Neuroverse Blog | PROVOID",
  description: "Aktuelle Entwicklungen aus der Neurowissenschaft – wöchentlich neue Studienergebnisse, Erkenntnisse und Trends.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Neuroverse Blog | PROVOID",
    description: "Aktuelle Entwicklungen aus der Neurowissenschaft – wöchentlich neue Studienergebnisse, Erkenntnisse und Trends.",
    type: "website",
    url: "/blog",
  },
};

export default function BlogPage() {
  const blogData = getBlogData();
  const posts = blogData.posts;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[48px] md:py-[77px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">PROVOID</span>-<span className="text-foreground">Neuroverse</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Aktuelle Entwicklungen aus der Neurowissenschaft
            </p>
            <p className="mt-2 text-muted-foreground">
              Wöchentlich neue Studienergebnisse, Erkenntnisse und Trends
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="border-2 hover:border-primary/50 transition-colors overflow-hidden flex flex-col">
                <div className="relative h-48 w-full bg-muted">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl">🧠</span>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary w-fit mb-2">
                    {post.category}
                  </span>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Weiterlesen
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container px-4 md:px-6 lg:px-8 pb-[58px]">
        <div className="mx-auto max-w-2xl text-center p-8 rounded-2xl border bg-card">
          <h3 className="text-xl font-semibold mb-3">Bleiben Sie informiert</h3>
          <p className="text-muted-foreground mb-6">
            Wir veröffentlichen wöchentlich neue Erkenntnisse aus der Neurowissenschaft.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
