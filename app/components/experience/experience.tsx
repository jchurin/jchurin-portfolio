import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import experienceData from "./experience.data.json";
import { cn } from "../../utils/cn";
import { TimelineItem } from "./TimelineItem";

const ITEMS_PER_PAGE = 6;

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
                    : "hover:bg-primary/10 hover:border-primary/40"
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
                    : "hover:bg-primary/10 hover:border-primary/40"
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
                        isHovered={hoveredIndex === globalIndex}
                        index={globalIndex}
                        totalItems={jobs.length}
                        renderOnHover={() => (
                          <div className="animate-in fade-in slide-in-from-left-2 absolute left-36 top-1/2 z-50 w-96 -translate-y-1/2 duration-200">
                            <div className="border-border/60 from-muted/98 to-background/98 shadow-primary/10 relative rounded-xl border bg-linear-to-br p-4 shadow-2xl backdrop-blur-xl">
                              {/* Tooltip Arrow */}
                              <div className="bg-muted border-border/60 absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l" />

                              {/* Accent bar */}
                              <div className="from-primary to-secondary absolute bottom-3 left-0 top-3 w-0.5 rounded-r-full bg-linear-to-b" />

                              <div className="space-y-3 pl-3">
                                {/* Tech Stack */}
                                {job.tech && job.tech.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5">
                                    {job.tech.map((t, k) => (
                                      <span
                                        key={k}
                                        className="bg-background/60 border-border/30 text-muted-foreground rounded-md border px-2 py-0.5 text-xs font-medium"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* Highlights */}
                                <ul className="text-muted-foreground space-y-1.5 text-xs leading-relaxed">
                                  {job.highlights.map((highlight, j) => (
                                    <li key={j} className="flex gap-2">
                                      <span className="text-primary mt-0.5 shrink-0">•</span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
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
