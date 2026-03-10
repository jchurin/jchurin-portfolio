import { ExternalLink, Github } from "lucide-react";
import projectsData from "./projects.data.json";

export function Projects() {
  const { title, subtitle, projects } = projectsData;

  return (
    <section id="projects" className="min-h-screen py-section snap-start">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12">{subtitle}</p>

        <ul className="space-y-6">
          {projects.map((project, i) => (
            <li
              key={i}
              className="group relative rounded-2xl border border-border/60 bg-linear-to-br from-muted/30 to-muted/10 p-6 sm:p-8"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/0 to-secondary/0" />

              <div className="relative">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 text-muted-foreground text-xs font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group/link"
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
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
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
