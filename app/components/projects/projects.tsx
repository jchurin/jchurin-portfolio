import { ExternalLink, Github } from "lucide-react";
import projectsData from "./projects.data.json";

export function Projects() {
  const { title, subtitle, projects } = projectsData;

  return (
    <section id="projects" className="py-section min-h-screen snap-start flex flex-col justify-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <h2 className="font-heading text-foreground mb-2 text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left">
          {title}
        </h2>
        <p className="text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base text-center sm:text-left">{subtitle}</p>

        <ul className="space-y-4 sm:space-y-6">
          {projects.map((project, i) => (
            <li
              key={i}
              className="group border-border from-primary/10 to-muted/10 relative rounded-xl sm:rounded-2xl border bg-linear-to-br p-4 sm:p-6 md:p-8"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="from-primary/0 to-secondary/0 absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-br" />

              <div className="relative">
                <h3 className="text-foreground mb-2 text-lg sm:text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base">{project.description}</p>

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
                      <Github className="size-4" />
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
