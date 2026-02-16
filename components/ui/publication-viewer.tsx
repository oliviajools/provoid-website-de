"use client";

import { Maximize2, Download } from "lucide-react";

interface PublicationViewerProps {
  pdfUrl: string;
  title: string;
  subtitle?: string;
  issueInfo?: string;
}

export function PublicationViewer({ pdfUrl, title, subtitle, issueInfo }: PublicationViewerProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{issueInfo}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto text-sm">{subtitle}</p>}
        </div>

        {/* Embedded PDF Viewer */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
            {/* PDF Embed */}
            <div className="relative h-[500px] md:h-[650px] bg-gray-100">
              <object
                data={pdfUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <embed
                  src={pdfUrl}
                  type="application/pdf"
                  className="w-full h-full"
                />
              </object>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-t border-gray-200">
              <span className="text-sm text-gray-600">Scrolle durch das Dokument</span>
              
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-sm font-medium text-gray-700"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Maximize2 className="w-4 h-4" />
                  Vollbild
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
