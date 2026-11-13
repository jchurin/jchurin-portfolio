import { useState, useEffect } from "react";
import experienceData from "./experience.data.json";
import { TimelineItem } from "./TimelineItem";
import { PaginatedSlider } from "../common/PaginatedSlider";

const ITEMS_PER_PAGE_DESKTOP = 4;
const ITEMS_PER_PAGE_SHORT_DESKTOP = 3;
const ITEMS_PER_PAGE_MOBILE = 2;

/**
 * Picks how many jobs fit on one page: two on phones, and on desktop four
 * only when the screen is tall enough (short laptops like 1280x720 get three).
 */
function getItemsPerPage(): number {
  if (window.innerWidth < 640) return ITEMS_PER_PAGE_MOBILE;
  return window.innerHeight >= 750 ? ITEMS_PER_PAGE_DESKTOP : ITEMS_PER_PAGE_SHORT_DESKTOP;
}

export function Experience() {
  const { title, subtitle, jobs } = experienceData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DESKTOP);

  useEffect(() => {
    const updateItemsPerPage = () => setItemsPerPage(getItemsPerPage());

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  /**
   * Toggles the expanded/collapsed state of an experience card
   * @param index - Index of the experience item to toggle
   */
  const handleToggle = (index: number) => {
    setHoveredIndex(hoveredIndex === index ? null : index);
  };

  return (
    <section
      id="experience"
      className="py-section min-h-below-header flex snap-start flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <h2 className="font-heading text-foreground mb-2 text-center text-2xl font-normal sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mb-8 text-center text-sm sm:mb-12 sm:text-base">
          {subtitle}
        </p>

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
