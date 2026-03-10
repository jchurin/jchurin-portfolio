import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import experienceData from "./experience.data.json";
import { cn } from "../../utils/cn";
import { TimelineItem } from "./TimelineItem";

const ITEMS_PER_PAGE = 4;

export function Experience() {
  const { title, subtitle, jobs } = experienceData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

  // Group jobs into pages
  const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
    const start = pageIndex * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return jobs.slice(start, end);
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
    <section
      id="experience"
      className="py-section flex min-h-screen snap-start flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-4xl px-4">
        <h2 className="font-heading text-foreground mb-2 text-center text-3xl font-normal sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12 text-center">{subtitle}</p>

        {/* Paginated Timeline Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={() => scrollToPage(Math.max(0, activePage - 1))}
                disabled={activePage === 0}
                className={cn(
                  "absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-200",
                  activePage === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-primary/10 hover:border-primary/40 cursor-pointer"
                )}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={() => scrollToPage(Math.min(totalPages - 1, activePage + 1))}
                disabled={activePage === totalPages - 1}
                className={cn(
                  "absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-200",
                  activePage === totalPages - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-primary/10 hover:border-primary/40 cursor-pointer"
                )}
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Horizontal Scroll Container with Pages */}
          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          >
            {pages.map((pageJobs, pageIndex) => (
              <div
                key={pageIndex}
                className="relative min-w-full snap-center"
              >
                {/* Vertical Timeline Items for this Page */}
                <div className="relative flex flex-col gap-6">
                  {pageJobs.map((job, itemIndex) => {
                    const globalIndex = pageIndex * ITEMS_PER_PAGE + itemIndex;
                    return (
                      <TimelineItem
                        key={globalIndex}
                        onMouseEnter={() => setHoveredIndex(globalIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        datePeriod={job.period}
                        primaryTitle={job.company}
                        secondaryTitle={job.client}
                        subtitle={job.role}
                        tech={job.tech}
                        highlights={job.highlights}
                        isHovered={hoveredIndex === globalIndex}
                        index={globalIndex}
                        totalItems={jobs.length}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {pages.map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => scrollToPage(pageIndex)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activePage === pageIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-primary/50"
                  )}
                  aria-label={`Go to page ${pageIndex + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
