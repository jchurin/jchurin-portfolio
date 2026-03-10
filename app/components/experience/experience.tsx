import { useState } from "react";
import experienceData from "./experience.data.json";
import { cn } from "../../utils/cn";
import { ExperienceCard } from "./ExperienceCard";
import { TimelineItem } from "./TimelineItem";

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

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          {/* <div className="from-primary via-primary to-primary/30 absolute top-0 bottom-0 left-42 w-px bg-linear-to-b" /> */}

          {/* Timeline Items */}
          <div className="justifty-start relative flex flex-col gap-6">
            {jobs.map((job, i) => (
              <TimelineItem
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                datePeriod={job.period}
                primaryTitle={job.company}
                secondaryTitle={job.client}
                subtitle={job.role}
                isHovered={hoveredIndex === i}
                index={i}
                totalItems={jobs.length}
                renderOnHover={() => (
                  <div className="animate-in fade-in slide-in-from-left-2 absolute top-1/2 left-36 z-50 w-96 -translate-y-1/2 duration-200">
                    <div className="border-border/60 from-muted/98 to-background/98 shadow-primary/10 relative rounded-xl border bg-linear-to-br p-4 shadow-2xl backdrop-blur-xl">
                      {/* Tooltip Arrow */}
                      <div className="bg-muted border-border/60 absolute top-1/2 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l" />

                      {/* Accent bar */}
                      <div className="from-primary to-secondary absolute top-3 bottom-3 left-0 w-0.5 rounded-r-full bg-linear-to-b" />

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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
