"use client";

import { useState, useRef, useEffect, TouchEvent, ChangeEvent, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface PublicationViewerProps {
  pdfUrl: string;
  title: string;
  subtitle?: string;
  issueInfo?: string;
  pageImages?: string[];
}

export function PublicationViewer({ pdfUrl, title, subtitle, issueInfo, pageImages: providedImages = [] }: PublicationViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pageImages = providedImages;
  const totalPages = pageImages.length;
  const minSwipeDistance = 50;

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(page);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [totalPages, isAnimating]);

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
  }, [currentPage, goToPage]);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    goToPage(parseInt(e.target.value));
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{issueInfo}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto text-sm">{subtitle}</p>}
        </div>

        {/* LinkedIn-Style Document Viewer */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden"
          >
            {/* Document Area with Navigation */}
            <div className="relative">
              {/* Swipeable Content */}
              <div
                className="relative h-[400px] md:h-[520px] overflow-hidden bg-gray-50"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {pageImages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
                    >
                      PDF öffnen
                    </a>
                  </div>
                ) : (
                  <div 
                    className="flex transition-transform duration-300 ease-out h-full"
                    style={{ transform: `translateX(-${currentPage * 100}%)` }}
                  >
                    {pageImages.map((imgSrc, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full h-full flex items-center justify-center p-6 md:p-8"
                      >
                        <img
                          src={imgSrc}
                          alt={`Seite ${index + 1}`}
                          className="max-h-full max-w-full object-contain shadow-sm"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Large Navigation Arrows - LinkedIn Style */}
              {pageImages.length > 0 && (
                <>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white border border-gray-200 rounded-full shadow-md ml-3 transition-all disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Vorherige Seite"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white border border-gray-200 rounded-full shadow-md mr-3 transition-all disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Nächste Seite"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Bar - LinkedIn Style */}
            {pageImages.length > 0 && (
              <div className="flex items-center gap-4 px-4 py-3 bg-gray-100 border-t border-gray-200">
                {/* Page Counter */}
                <span className="text-sm font-medium text-gray-700 min-w-[60px]">
                  {currentPage + 1} / {totalPages}
                </span>
                
                {/* Slider */}
                <div className="flex-1 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={totalPages - 1}
                    value={currentPage}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer accent-primary
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-600 [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:bg-gray-700"
                  />
                </div>
                
                {/* Fullscreen Button */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded hover:bg-gray-200 transition-colors"
                  title="Vollbild öffnen"
                >
                  <Maximize2 className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
