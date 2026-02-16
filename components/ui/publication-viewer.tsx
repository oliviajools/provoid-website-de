"use client";

import { useState, useRef, TouchEvent, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface PublicationViewerProps {
  pdfUrl: string;
  title: string;
  subtitle?: string;
  issueInfo?: string;
  pageCount?: number;
}

export function PublicationViewer({ pdfUrl, title, subtitle, issueInfo, pageCount = 17 }: PublicationViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = pageCount;
  const minSwipeDistance = 50;

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

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
    if (distance > minSwipeDistance) goToPage(currentPage + 1);
    if (distance < -minSwipeDistance) goToPage(currentPage - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToPage(currentPage + 1);
      if (e.key === "ArrowLeft") goToPage(currentPage - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, goToPage]);

  // Generate page image URLs (pages exported as /neuroinsight/page-01.jpg, etc.)
  const getPageUrl = (page: number) => `/neuroinsight/page-${String(page + 1).padStart(2, '0')}.jpg`;

  return (
    <section className="py-6 md:py-10">
      <div className="container px-4 md:px-6">
        {/* Compact Header */}
        <div className="text-center mb-3">
          {issueInfo && <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{issueInfo}</p>}
          <h2 className="text-lg md:text-xl font-bold">{title}</h2>
        </div>

        {/* Horizontal Swipe Viewer - Compact */}
        <div className="relative max-w-2xl mx-auto">
          <div 
            ref={containerRef}
            className="relative bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Swipeable Content */}
            <div
              className="relative h-[380px] md:h-[480px] overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-full h-full flex items-center justify-center bg-gray-50 p-2"
                  >
                    <img
                      src={getPageUrl(i)}
                      alt={`Seite ${i + 1}`}
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-md transition-all disabled:opacity-0"
              aria-label="Vorherige Seite"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-md transition-all disabled:opacity-0"
              aria-label="Nächste Seite"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Bottom Bar - LinkedIn Style */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-100/80 backdrop-blur">
              <span className="text-xs font-medium text-gray-600">
                {currentPage + 1} / {totalPages}
              </span>
              
              {/* Progress dots for mobile */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  const dotPage = Math.floor(i * (totalPages / Math.min(totalPages, 10)));
                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(dotPage)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentPage >= dotPage && currentPage < dotPage + Math.ceil(totalPages / 10)
                          ? "bg-primary w-3"
                          : "bg-gray-300"
                      }`}
                    />
                  );
                })}
              </div>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                title="Vollbild"
              >
                <Maximize2 className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Swipe hint */}
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            ← Wischen zum Blättern →
          </p>
        </div>
      </div>
    </section>
  );
}
