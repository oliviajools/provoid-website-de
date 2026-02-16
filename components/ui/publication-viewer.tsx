"use client";

import { Maximize2, Download } from "lucide-react";

interface PublicationViewerProps {
  pdfUrl: string;
  title: string;
  subtitle?: string;
  issueInfo?: string;
}

export function PublicationViewer({ pdfUrl, title, subtitle, issueInfo }: PublicationViewerProps) {
  // Hide PDF toolbar with URL parameters
  const pdfEmbedUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  
  return (
    <section className="py-8 md:py-12">
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Header - minimal */}
        <div className="text-center mb-4">
          {issueInfo && <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{issueInfo}</p>}
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
        </div>

        {/* Clean PDF Viewer - LinkedIn Style */}
        <div className="relative max-w-3xl mx-auto">
          {/* PDF Container - no border, clean */}
          <div className="relative aspect-[3/4] md:aspect-[4/5] bg-white rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src={pdfEmbedUrl}
              className="w-full h-full border-0"
              title={title}
            />
          </div>

          {/* Minimal Bottom Actions */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Maximize2 className="w-4 h-4" />
              Vollbild
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
