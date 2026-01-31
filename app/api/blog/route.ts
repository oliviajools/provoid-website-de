import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BlogPost, BlogData } from "@/lib/blog-types";

const BLOG_FILE_PATH = path.join(process.cwd(), "content", "blog-posts.json");

export async function GET() {
  try {
    const fileContent = fs.readFileSync(BLOG_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ posts: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newPost = await request.json();
    
    // Read existing posts
    let data: BlogData = { posts: [] };
    try {
      const fileContent = fs.readFileSync(BLOG_FILE_PATH, "utf-8");
      data = JSON.parse(fileContent);
    } catch {
      // File doesn't exist or is empty
    }
    
    // Generate ID and slug if not provided
    const id = newPost.id || String(Date.now());
    const slug = newPost.slug || newPost.title
      .toLowerCase()
      .replace(/[äöüß]/g, (c: string) => ({ 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' }[c] || c))
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const post = {
      id,
      slug,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      image: newPost.image || "",
      author: newPost.author,
      date: newPost.date || new Date().toISOString().split("T")[0],
      category: newPost.category,
      tags: newPost.tags || [],
    };
    
    // Add to beginning of array (newest first)
    data.posts.unshift(post);
    
    // Write back to file
    fs.writeFileSync(BLOG_FILE_PATH, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error saving blog post:", error);
    return NextResponse.json({ success: false, error: "Failed to save post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    const fileContent = fs.readFileSync(BLOG_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    
    data.posts = data.posts.filter((post: BlogPost) => post.id !== id);
    
    fs.writeFileSync(BLOG_FILE_PATH, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 });
  }
}
