import { useState, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface PaginatedSliderProps<T> {
  items: T[];
  itemsPerPage: number;
  renderPage: (items: T[], pageIndex: number, startIndex: number) => ReactNode;
  className?: string;
  showNavigation?: boolean;
  showDots?: boolean;
}

export function PaginatedSlider<T>({
  items,
  itemsPerPage,
  renderPage,
  className,
  showNavigation = true,
  showDots = true,
}: PaginatedSliderProps<T>) {
  const [scrolledPage, setScrolledPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);
  // itemsPerPage can shrink the page count (e.g. on resize), so never point past the last page
  const activePage = Math.min(scrolledPage, totalPages - 1);

  // Group items into pages
  const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
    const start = pageIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  });

  /**
   * Smoothly scrolls the container to the specified page
   * @param pageIndex - Zero-based index of the page to scroll to
   */
  const scrollToPage = (pageIndex: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      left: container.clientWidth * pageIndex,
      behavior: "smooth",
    });
  };

  /**
   * Updates the active page index based on current scroll position.
   * Every page is exactly one container width wide (min-w-full), so the
   * container's own width is the page width, whatever the current page count.
   */
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || container.clientWidth === 0) return;

    setScrolledPage(Math.round(container.scrollLeft / container.clientWidth));
  };

  return (
    <div className={cn("relative", className)}>
      {/* Navigation Arrows - Hidden on mobile, shown on tablet+ */}
      {showNavigation && totalPages > 1 && (
        <>
          <button
            onClick={() => scrollToPage(Math.max(0, activePage - 1))}
            disabled={activePage === 0}
            className={cn(
              "border-border/60 bg-background/90 absolute top-1/2 -left-2 z-10 hidden -translate-y-1/2 rounded-full border p-1.5 shadow-lg backdrop-blur-sm transition-all duration-200 sm:block md:-left-4 md:p-2",
              activePage === 0
                ? "cursor-not-allowed opacity-30"
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
              "border-border/60 bg-background/90 absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 rounded-full border p-1.5 shadow-lg backdrop-blur-sm transition-all duration-200 sm:block md:-right-4 md:p-2",
              activePage === totalPages - 1
                ? "cursor-not-allowed opacity-30"
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
        onScroll={handleScroll}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
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
        <div className="mt-6 flex justify-center gap-2 sm:mt-8">
          {pages.map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => scrollToPage(pageIndex)}
              className={cn(
                "h-2 touch-manipulation rounded-full transition-all duration-300 sm:h-2",
                activePage === pageIndex
                  ? "bg-primary w-8 sm:w-8"
                  : "bg-border hover:bg-primary/50 w-2 sm:w-2"
              )}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
