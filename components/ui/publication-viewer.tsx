"use client";

import { useState, useRef, useEffect, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2, BookOpen } from "lucide-react";

interface PublicationViewerProps {
  pdfUrl: string;
  title: string;
  subtitle?: string;
  issueInfo?: string;
  pageImages?: string[];
}

export function PublicationViewer({ pdfUrl, title, subtitle, issueInfo, pageImages: providedImages }: PublicationViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pageImages, setPageImages] = useState<string[]>(providedImages || []);
  const [isLoading, setIsLoading] = useState(!providedImages?.length);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = pageImages.length;
  const minSwipeDistance = 50;

  // Load PDF pages as images
  useEffect(() => {
    if (providedImages?.length) return;
    
    const loadPdf = async () => {
      try {
        // @ts-ignore
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const images: string[] = [];
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 2;
          const viewport = page.getViewport({ scale });
          
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          // @ts-ignore - pdfjs types issue
          await page.render({ canvasContext: context!, viewport }).promise;
          images.push(canvas.toDataURL("image/jpeg", 0.85));
        }
        
        setPageImages(images);
        setIsLoading(false);
      } catch (error) {
        console.error("PDF load error:", error);
        setIsLoading(false);
      }
    };
    
    loadPdf();
  }, [pdfUrl, providedImages]);

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(page);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) goToPage(currentPage + 1);
    if (isRightSwipe) goToPage(currentPage - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToPage(currentPage + 1);
      if (e.key === "ArrowLeft") goToPage(currentPage - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Wissenschaftliche Publikation</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto text-sm">{subtitle}</p>}
          {issueInfo && <p className="text-xs text-muted-foreground/70 mt-1">{issueInfo}</p>}
        </div>

        {/* Compact Swipeable Viewer */}
        <div className="relative max-w-3xl mx-auto">
          <div 
            ref={containerRef}
            className="relative bg-card rounded-xl border border-border shadow-xl overflow-hidden"
          >
            {/* Swipeable Area */}
            <div
              className="relative h-[350px] md:h-[450px] overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Laden...</p>
                  </div>
                </div>
              ) : pageImages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Maximize2 className="w-5 h-5" />
                    PDF öffnen
                  </a>
                </div>
              ) : (
                <>
                  <div 
                    className="flex transition-transform duration-300 ease-out h-full"
                    style={{ transform: `translateX(-${currentPage * 100}%)` }}
                  >
                    {pageImages.map((imgSrc, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full h-full flex items-center justify-center p-4 bg-muted/10"
                      >
                        <img
                          src={imgSrc}
                          alt={`Seite ${index + 1}`}
                          className="max-h-full max-w-full object-contain rounded shadow-md"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg hover:bg-background transition-all disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg hover:bg-background transition-all disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-t border-border">
              <div className="flex items-center gap-2">
                {/* Page dots for few pages, otherwise text */}
                {totalPages <= 10 ? (
                  <div className="flex gap-1.5">
                    {pageImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentPage === i
                            ? "bg-primary w-4"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {currentPage + 1} / {totalPages}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title="PDF herunterladen"
                >
                  <Download className="w-4 h-4 text-muted-foreground" />
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title="Vollbild öffnen"
                >
                  <Maximize2 className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
            </div>
          </div>

          {/* Hint */}
          <p className="text-center text-xs text-muted-foreground mt-3">
            ← Wischen oder Pfeiltasten zum Blättern →
          </p>
        </div>
      </div>
    </section>
  );
}
