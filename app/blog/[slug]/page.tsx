import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import fs from "fs";
import path from "path";
import { BlogPost, BlogData } from "@/lib/blog-types";

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blogData = getBlogData();
  const post = blogData.posts.find((p: BlogPost) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Beitrag nicht gefunden | PROVOID",
    };
  }

  return {
    title: `${post.title} | Neuroverse Blog | PROVOID`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogData = getBlogData();
  const post = blogData.posts.find((p: BlogPost) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return (
            <li key={index} className="ml-4 mb-2">
              <strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}
            </li>
          );
        }
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 mb-2">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.match(/^\d+\. /)) {
        return (
          <li key={index} className="ml-4 mb-2 list-decimal">
            {line.replace(/^\d+\. /, "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[38px] md:py-[58px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Übersicht
            </Link>
            
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
              {post.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <hr className="my-8" />
            
            <div className="text-foreground">
              {renderContent(post.content)}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t">
            <Link 
              href="/blog" 
              className="inline-flex items-center font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Alle Beiträge anzeigen
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
