"use client";

import { Download, Maximize2, BookOpen } from "lucide-react";

interface PublicationViewerProps {
  pdfUrl: string;
  title: string;
  subtitle?: string;
  issueInfo?: string;
}

export function PublicationViewer({ pdfUrl, title, subtitle, issueInfo }: PublicationViewerProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Wissenschaftliche Publikation</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
          {issueInfo && (
            <p className="text-sm text-muted-foreground/70 mt-2">{issueInfo}</p>
          )}
        </div>

        {/* Publication Viewer */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Viewer Container */}
          <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">NeuroInsight</span>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
                  title="PDF herunterladen"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
                  title="Im neuen Tab öffnen"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Vollbild</span>
                </a>
              </div>
            </div>

            {/* PDF Embed with horizontal scroll */}
            <div className="relative bg-muted/20">
              <iframe
                src={`${pdfUrl}#view=FitH&scrollbar=1&toolbar=0&navpanes=0`}
                className="w-full h-[600px] md:h-[750px]"
                title={title}
              />
            </div>
          </div>

          {/* Hint Text */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Scrolle durch die Publikation oder öffne sie im Vollbild für die beste Leseerfahrung
          </p>
        </div>
      </div>
    </section>
  );
}
