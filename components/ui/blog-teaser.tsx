import Link from "next/link";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import blogData from "@/content/blog-posts.json";
import { BlogData } from "@/lib/blog-types";

const typedBlogData = blogData as BlogData;

export function BlogTeaser() {
  const latestPosts = typedBlogData.posts.slice(0, 3);

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              Neuroverse
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3">
              Aktuelles aus der Neurowissenschaft
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wöchentlich neue Studienergebnisse, Erkenntnisse und Trends – verständlich aufbereitet
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Card key={post.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary w-fit mb-2">
                    {post.category}
                  </span>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center font-medium text-primary hover:underline"
            >
              Alle Beiträge anzeigen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
