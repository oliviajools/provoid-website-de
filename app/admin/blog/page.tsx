"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Save, X } from "lucide-react";

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

  const handleSave = () => {
    const slug = formData.slug || formData.title.toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPost: BlogPost = {
      id: currentPost?.id || Date.now().toString(),
      slug,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image || `/blog/${slug}.jpg`,
      author: formData.author,
      date: new Date().toISOString().split("T")[0],
      category: formData.category,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    console.log("Neuer Blog-Post (kopieren Sie dies in blog-posts.json):");
    console.log(JSON.stringify(newPost, null, 2));

    alert(
      "Blog-Post erstellt! Die JSON-Daten wurden in der Konsole ausgegeben.\n\n" +
      "Fügen Sie den Post manuell zu /content/blog-posts.json hinzu und deployen Sie erneut.\n\n" +
      "Für eine automatische Lösung kontaktieren Sie uns für die Integration eines Headless CMS."
    );

    setIsEditing(false);
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
                  <Button onClick={handleSave} disabled={!formData.title || !formData.excerpt || !formData.content}>
                    <Save className="h-4 w-4 mr-2" />
                    Speichern
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Abbrechen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Blog-Verwaltung</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Erstellen Sie neue Neuroverse Beiträge. Die generierten Daten müssen 
                  manuell in die blog-posts.json eingefügt werden.
                </p>
                <Button onClick={handleNewPost}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neuen Beitrag erstellen
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 p-4 rounded-lg border bg-muted/30">
            <h4 className="font-semibold mb-2">Hinweis zur Blog-Verwaltung</h4>
            <p className="text-sm text-muted-foreground">
              Für eine vollautomatische Blog-Verwaltung mit Bildupload empfehlen wir die 
              Integration eines Headless CMS wie Sanity, Contentful oder Strapi. 
              Kontaktieren Sie uns für eine maßgeschneiderte Lösung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
