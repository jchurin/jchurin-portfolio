import { useState } from "react";
import experienceData from "./experience.data.json";
import { TimelineItem } from "./TimelineItem";
import { PaginatedSlider } from "../common/PaginatedSlider";

const ITEMS_PER_PAGE = 4;

export function Experience() {
  const { title, subtitle, jobs } = experienceData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

        {/* Paginated Timeline */}
        <PaginatedSlider
          items={jobs}
          itemsPerPage={ITEMS_PER_PAGE}
          renderPage={(pageJobs, _pageIndex, startIndex) => (
            <div className="relative flex flex-col gap-6">
              {pageJobs.map((job, itemIndex) => {
                const globalIndex = startIndex + itemIndex;
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
          )}
        />
      </div>
    </section>
  );
}
