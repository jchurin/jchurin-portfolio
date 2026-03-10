import { useState, useEffect } from "react";
import { ExternalLink, Github as GitHub } from "lucide-react";
import projectsData from "./projects.data.json";
import { PaginatedSlider } from "../common/PaginatedSlider";

const ITEMS_PER_PAGE_DESKTOP = 2;
const ITEMS_PER_PAGE_MOBILE = 1;

export function Projects() {
  const { title, subtitle, projects } = projectsData;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    /**
     * Checks if viewport width is below mobile breakpoint (640px)
     */
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;

  return (
    <section id="projects" className="py-section min-h-screen snap-start flex flex-col justify-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <h2 className="font-heading text-foreground mb-2 text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left">
          {title}
        </h2>
        <p className="text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base text-center sm:text-left">{subtitle}</p>

        <PaginatedSlider
          items={projects}
          itemsPerPage={itemsPerPage}
          renderPage={(pageProjects) => (
            <ul className="space-y-4 sm:space-y-6">
              {pageProjects.map((project, i) => (
            <li
              key={i}
              className="group border-border from-primary/10 to-muted/10 relative overflow-hidden rounded-xl sm:rounded-2xl border bg-linear-to-br"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="from-primary/0 to-secondary/0 absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-br" />

              <div className="relative flex flex-col md:flex-row gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
                {/* Project Image */}
                {project.image && (
                  <div className="md:w-2/5 lg:w-1/3 shrink-0">
                    <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg sm:rounded-xl border border-border/40 bg-muted/20">
                      <img
                        src={import.meta.env.BASE_URL + project.image.slice(1)}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}

                {/* Project Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-foreground mb-2 text-lg sm:text-xl font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base flex-1">{project.description}</p>

                  <div className="mb-4 sm:mb-5 flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        className="bg-background/80 border-border/40 text-muted-foreground rounded-md sm:rounded-lg border px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:text-secondary group/link inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="size-4" />
                        View live
                      </a>
                    )}
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:text-secondary inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium transition-colors"
                      >
                        <GitHub className="size-4" />
                        Source code
                      </a>
                    )}
                  </div>
                </div>
              </div>
              </li>
              ))}
            </ul>
          )}
        />
      </div>
    </section>
  );
}
