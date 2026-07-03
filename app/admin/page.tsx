"use client";

import { useState } from "react";

export default function Admin() {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    date: new Date().getFullYear().toString(),
    tags: "",
    shortVersion: "",
  });

  const [generatedCode, setGeneratedCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateId = () => {
    return formData.title
      .toLowerCase()
      .replace(/[^a-z0-9äöüß]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = formData.id || generateId();
    const tags = formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);

    const blogPost = {
      id,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      date: formData.date,
      tags,
      ...(formData.shortVersion && { shortVersion: formData.shortVersion }),
    };

    setGeneratedCode(
      `  {
    id: "${blogPost.id}",
    title: "${blogPost.title}",
    excerpt: "${blogPost.excerpt}",
    date: "${blogPost.date}",
    tags: [${blogPost.tags.map((tag) => `"${tag}"`).join(", ")}],
    ${blogPost.shortVersion ? `shortVersion: "${blogPost.shortVersion}",` : ""}
    content: \`${blogPost.content}\`
  },`
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Code in die Zwischenablage kopiert!");
  };

  const clearForm = () => {
    setFormData({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      date: new Date().getFullYear().toString(),
      tags: "",
      shortVersion: "",
    });
    setGeneratedCode("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="border-b border-border bg-white">
        <div className="container py-6">
          <h1 className="text-3xl font-semibold text-text-primary">Blog Admin</h1>
          <p className="text-text-secondary mt-2">Neue Blog-Einträge erstellen</p>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-card border border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Neuen Eintrag erstellen</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Titel *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-editorial text-text-primary focus:outline-none focus:border-primary-accent"
                  placeholder="Blog-Post Titel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">ID (optional)</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-editorial text-text-primary focus:outline-none focus:border-primary-accent"
                  placeholder="Wird automatisch aus Titel generiert"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-editorial text-text-primary focus:outline-none focus:border-primary-accent resize-none"
                  placeholder="Kurzbeschreibung für die Übersicht"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Content (Markdown) *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={12}
                  className="w-full px-4 py-2 border border-border rounded-editorial text-text-primary focus:outline-none focus:border-primary-accent resize-none font-mono text-sm"
                  placeholder="# Überschrift\n\nDein Content hier..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Datum *</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-editorial text-text-primary focus:outline-none focus:border-primary-accent"
                  placeholder="2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Tags (kommagetrennt)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-editorial text-text-primary focus:outline-none focus:border-primary-accent"
                  placeholder="Tag 1, Tag 2, Tag 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Short Version (optional)</label>
                <textarea
                  name="shortVersion"
                  value={formData.shortVersion}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-editorial text-text-primary focus:outline-none focus:border-primary-accent resize-none"
                  placeholder="Kurzversion für die Vorschau"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-editorial"
                >
                  Code generieren
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-6 py-3 text-sm font-medium text-text-primary border border-border hover:bg-surface transition-colors rounded-editorial"
                >
                  Zurücksetzen
                </button>
              </div>
            </form>
          </div>

          {/* Generated Code */}
          <div className="bg-white p-6 rounded-card border border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Generierter Code</h2>
            {generatedCode ? (
              <div>
                <div className="bg-surface p-4 rounded-editorial mb-4 overflow-x-auto">
                  <pre className="text-sm text-text-secondary font-mono whitespace-pre-wrap">{generatedCode}</pre>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={copyToClipboard}
                    className="w-full px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-editorial"
                  >
                    In die Zwischenablage kopieren
                  </button>
                  <div className="bg-primary-accent/10 border border-primary-accent/30 p-4 rounded-editorial">
                    <h3 className="text-sm font-semibold text-primary-accent mb-2">Nächste Schritte:</h3>
                    <ol className="text-sm text-text-secondary space-y-1 list-decimal list-inside">
                      <li>Kopiere den generierten Code</li>
                      <li>Öffne <code className="bg-surface px-1 py-0.5 rounded">lib/blog-posts.ts</code></li>
                      <li>Füge den Code zum <code className="bg-surface px-1 py-0.5 rounded">blogPosts</code> Array hinzu</li>
                      <li>Speichere die Datei</li>
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface p-8 rounded-editorial text-center">
                <p className="text-text-secondary">Fülle das Formular aus und klicke auf "Code generieren"</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
