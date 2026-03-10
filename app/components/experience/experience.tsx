import { useState, useEffect } from "react";
import experienceData from "./experience.data.json";
import { TimelineItem } from "./TimelineItem";
import { PaginatedSlider } from "../common/PaginatedSlider";

const ITEMS_PER_PAGE_DESKTOP = 4;
const ITEMS_PER_PAGE_MOBILE = 2;

export function Experience() {
  const { title, subtitle, jobs } = experienceData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;

  const handleToggle = (index: number) => {
    setHoveredIndex(hoveredIndex === index ? null : index);
  };

  return (
    <section
      id="experience"
      className="py-section flex min-h-screen snap-start flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <h2 className="font-heading text-foreground mb-2 text-center text-2xl sm:text-3xl md:text-4xl font-normal">
          {title}
        </h2>
        <p className="text-muted-foreground mb-8 sm:mb-12 text-center text-sm sm:text-base">{subtitle}</p>

        {/* Paginated Timeline */}
        <PaginatedSlider
          items={jobs}
          itemsPerPage={itemsPerPage}
          renderPage={(pageJobs, _pageIndex, startIndex) => (
            <div className="relative flex flex-col gap-4 sm:gap-6">
              {pageJobs.map((job, itemIndex) => {
                const globalIndex = startIndex + itemIndex;
                return (
                  <TimelineItem
                    key={globalIndex}
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleToggle(globalIndex)}
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
          )}
        />
      </div>
    </section>
  );
}
