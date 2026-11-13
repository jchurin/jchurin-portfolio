import { useState, useEffect } from "react";
import { ExternalLink, Github as GitHub } from "lucide-react";
import projectsData from "./projects.data.json";
import { PaginatedSlider } from "../common/PaginatedSlider";

const ITEMS_PER_PAGE_LARGE = 2;
const ITEMS_PER_PAGE_DEFAULT = 1;

/**
 * Two stacked project cards need roughly 1000px of height, so only show two
 * per page on screens that are both wide and tall enough. Anything smaller
 * (phones, tablets, most laptops) gets one card per page.
 */
function getItemsPerPage(): number {
  return window.innerWidth >= 1024 && window.innerHeight >= 1000
    ? ITEMS_PER_PAGE_LARGE
    : ITEMS_PER_PAGE_DEFAULT;
}

export function Projects() {
  const { title, subtitle, projects } = projectsData;
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DEFAULT);

  useEffect(() => {
    const updateItemsPerPage = () => setItemsPerPage(getItemsPerPage());

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return (
    <section
      id="projects"
      className="py-section min-h-below-header flex snap-start flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <h2 className="font-heading text-foreground short:mb-4 mb-2 text-center text-2xl font-normal sm:text-left sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground short:hidden mb-6 text-center text-sm sm:mb-12 sm:text-left sm:text-base">
          {subtitle}
        </p>

        <PaginatedSlider
          items={projects}
          itemsPerPage={itemsPerPage}
          renderPage={(pageProjects) => (
            <ul className="space-y-4 sm:space-y-6">
              {pageProjects.map((project, i) => (
                <li
                  key={i}
                  className="group border-border from-primary/10 to-muted/10 relative overflow-hidden rounded-xl border bg-linear-to-br sm:rounded-2xl"
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="from-primary/0 to-secondary/0 absolute inset-0 rounded-xl bg-linear-to-br sm:rounded-2xl" />

                  <div className="relative flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:flex-row md:p-8">
                    {/* Project Image */}
                    {project.image && (
                      <div className="shrink-0 md:w-2/5 lg:w-1/3">
                        <div className="short:aspect-[21/9] border-border/40 bg-muted/20 relative aspect-video overflow-hidden rounded-lg border sm:rounded-xl md:aspect-square">
                          <img
                            src={import.meta.env.BASE_URL + project.image.slice(1)}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Image overlay gradient */}
                          <div className="from-background/20 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                      </div>
                    )}

                    {/* Project Content */}
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-foreground mb-2 text-lg font-semibold sm:text-xl">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed sm:mb-5 sm:text-base">
                        {project.description}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-1.5 sm:mb-5 sm:gap-2">
                        {project.tech.map((tech, j) => (
                          <span
                            key={j}
                            className="bg-background/80 border-border/40 text-muted-foreground rounded-md border px-2 py-1 text-xs font-medium shadow-sm backdrop-blur-sm sm:rounded-lg sm:px-3 sm:py-1.5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
                        {project.links?.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:text-secondary group/link inline-flex items-center gap-2 py-1 text-sm font-medium transition-colors"
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
                            className="text-primary hover:text-secondary inline-flex items-center gap-2 py-1 text-sm font-medium transition-colors"
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
