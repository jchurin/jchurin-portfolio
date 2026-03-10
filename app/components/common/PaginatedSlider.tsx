import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface PaginatedSliderProps<T> {
  items: T[];
  itemsPerPage: number;
  renderPage: (items: T[], pageIndex: number, startIndex: number) => ReactNode;
  className?: string;
  showNavigation?: boolean;
  showDots?: boolean;
  gap?: string;
}

export function PaginatedSlider<T>({
  items,
  itemsPerPage,
  renderPage,
  className,
  showNavigation = true,
  showDots = true,
  gap = "gap-6",
}: PaginatedSliderProps<T>) {
  const [activePage, setActivePage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Group items into pages
  const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
    const start = pageIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  });

  const scrollToPage = (pageIndex: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const pageWidth = container.scrollWidth / totalPages;
    container.scrollTo({
      left: pageWidth * pageIndex,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const pageWidth = container.scrollWidth / totalPages;
    const currentPage = Math.round(container.scrollLeft / pageWidth);
    setActivePage(currentPage);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Navigation Arrows - Hidden on mobile, shown on tablet+ */}
      {showNavigation && totalPages > 1 && (
        <>
          <button
            onClick={() => scrollToPage(Math.max(0, activePage - 1))}
            disabled={activePage === 0}
            className={cn(
              "hidden sm:block absolute -left-2 md:-left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/90 p-1.5 md:p-2 shadow-lg backdrop-blur-sm transition-all duration-200",
              activePage === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-primary/10 hover:border-primary/40 cursor-pointer"
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          <button
            onClick={() => scrollToPage(Math.min(totalPages - 1, activePage + 1))}
            disabled={activePage === totalPages - 1}
            className={cn(
              "hidden sm:block absolute -right-2 md:-right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/90 p-1.5 md:p-2 shadow-lg backdrop-blur-sm transition-all duration-200",
              activePage === totalPages - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-primary/10 hover:border-primary/40 cursor-pointer"
            )}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </>
      )}

      {/* Horizontal Scroll Container with Pages */}
      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      >
        {pages.map((pageItems, pageIndex) => {
          const startIndex = pageIndex * itemsPerPage;
          return (
            <div key={pageIndex} className="relative min-w-full snap-center">
              {renderPage(pageItems, pageIndex, startIndex)}
            </div>
          );
        })}
      </div>

      {/* Navigation Dots - More prominent on mobile */}
      {showDots && totalPages > 1 && (
        <div className="mt-6 sm:mt-8 flex justify-center gap-2">
          {pages.map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => scrollToPage(pageIndex)}
              className={cn(
                "h-2 sm:h-2 rounded-full transition-all duration-300 touch-manipulation",
                activePage === pageIndex
                  ? "w-8 sm:w-8 bg-primary"
                  : "w-2 sm:w-2 bg-border hover:bg-primary/50"
              )}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
