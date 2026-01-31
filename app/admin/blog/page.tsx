"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Eye, Save, X, Loader2, CheckCircle } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "PROVOID Research",
    category: "Forschung",
    tags: "",
  });

  // Load posts on mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
    setIsLoading(false);
  };

  const categories = ["Forschung", "Wissenschaft", "Sport", "Gesundheit", "Praxis"];

  const handleNewPost = () => {
    setIsEditing(true);
    setCurrentPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      author: "PROVOID Research",
      category: "Forschung",
      tags: "",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    const postData = {
      id: currentPost?.id,
      slug: formData.slug,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      author: formData.author,
      category: formData.category,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const result = await res.json();

      if (result.success) {
        setMessage({ type: "success", text: "Blog-Post erfolgreich gespeichert!" });
        await loadPosts();
        setIsEditing(false);
      } else {
        setMessage({ type: "error", text: "Fehler beim Speichern: " + (result.error || "Unbekannter Fehler") });
      }
    } catch {
      setMessage({ type: "error", text: "Fehler beim Speichern. Bitte versuchen Sie es erneut." });
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diesen Beitrag wirklich löschen?")) return;

    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (result.success) {
        setMessage({ type: "success", text: "Beitrag gelöscht." });
        await loadPosts();
      }
    } catch {
      setMessage({ type: "error", text: "Fehler beim Löschen." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Blog-Verwaltung</h1>
              <p className="text-muted-foreground mt-1">
                Neuroverse Blog-Beiträge erstellen und verwalten
              </p>
            </div>
            {!isEditing && (
              <Button onClick={handleNewPost}>
                <Plus className="h-4 w-4 mr-2" />
                Neuer Beitrag
              </Button>
            )}
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
            }`}>
              {message.type === "success" && <CheckCircle className="h-5 w-5" />}
              {message.text}
            </div>
          )}

          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentPost ? "Beitrag bearbeiten" : "Neuer Beitrag"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Titel *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="z.B. Neuroplastizität: Neue Erkenntnisse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL-Slug (optional)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="wird automatisch generiert"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Kategorie *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Kurzbeschreibung *</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background h-20"
                    placeholder="Kurze Zusammenfassung für die Vorschau (max. 200 Zeichen)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Inhalt *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background h-64 font-mono text-sm"
                    placeholder="Markdown-formatierter Inhalt..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Unterstützt Markdown: ## Überschrift, **fett**, - Aufzählung
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bild-URL (optional)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="/blog/mein-bild.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Autor</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tags (kommagetrennt)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="Neuroplastizität, Forschung, Studien"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} disabled={!formData.title || !formData.excerpt || !formData.content || isSaving}>
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {isSaving ? "Wird gespeichert..." : "Speichern"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                    <X className="h-4 w-4 mr-2" />
                    Abbrechen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {isLoading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Lade Beiträge...</p>
                  </CardContent>
                </Card>
              ) : posts.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Noch keine Beiträge</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Erstellen Sie Ihren ersten Neuroverse Blog-Beitrag.
                    </p>
                    <Button onClick={handleNewPost}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ersten Beitrag erstellen
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                {post.category}
                              </span>
                              <span className="text-xs text-muted-foreground">{post.date}</span>
                            </div>
                            <h3 className="font-semibold truncate">{post.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.excerpt}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/blog/${post.slug}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
