import { useState } from "react";
import experienceData from "./experience.data.json";
import { cn } from "../../utils/cn";

export function Experience() {
  const { title, subtitle, jobs } = experienceData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center py-section snap-start"
    >
      <div className="max-w-4xl mx-auto px-4 w-full">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mb-2 text-center">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12 text-center">{subtitle}</p>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-42 top-0 bottom-0 w-px bg-linear-to-b from-primary via-primary to-primary/30" />

          {/* Timeline Items */}
          <div className="relative flex flex-col justifty-start gap-6">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="relative flex flex-row items-center gap-12"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Date - Left Side */}
                <div className="min-w-36 text-right">
                  <span className="text-xs text-muted-foreground font-medium">
                    {job.period}
                  </span>
                </div>



                {/* Company & Role - Always Visible */}
                <div className="flex-1 min-w-0 border border-border p-4 rounded-lg bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all duration-300">
                  <div className="flex flex-col gap-3">
                    <span className="flex flex-row items-center gap-2">

                      <h3
                        className={cn(
                          "font-semibold text-base transition-colors duration-300",
                          hoveredIndex === i ? "text-primary" : "text-foreground"
                        )}
                      >
                        {job.company}
                      </h3>
                      <p className="text-sm text-muted-foreground">{job.client}</p>
                    </span>
                    {/* <span className="text-muted-foreground">•</span> */}
                    <p className="text-sm text-muted-foreground">{job.role}</p>
                  </div>
                </div>

                {/* Tooltip - Appears on Hover */}
                {hoveredIndex === i && (
                  <div className="absolute left-36 top-1/2 -translate-y-1/2 w-96 z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                    <div className="relative rounded-xl border border-border/60 bg-linear-to-br from-muted/98 to-background/98 backdrop-blur-xl p-4 shadow-2xl shadow-primary/10">
                      {/* Tooltip Arrow */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-muted border-l border-b border-border/60 rotate-45" />

                      {/* Accent bar */}
                      <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-linear-to-b from-primary to-secondary rounded-r-full" />

                      <div className="pl-3 space-y-3">
                        {/* Tech Stack */}
                        {job.tech && job.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {job.tech.map((t, k) => (
                              <span
                                key={k}
                                className="px-2 py-0.5 rounded-md bg-background/60 border border-border/30 text-muted-foreground text-xs font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Highlights */}
                        <ul className="space-y-1.5 text-muted-foreground text-xs leading-relaxed">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
