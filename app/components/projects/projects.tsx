import { ExternalLink, Github } from "lucide-react";
import projectsData from "./projects.data.json";

export function Projects() {
  const { title, subtitle, projects } = projectsData;

  return (
    <section id="projects" className="py-section min-h-screen snap-start">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="font-heading text-foreground mb-2 text-3xl font-normal sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12">{subtitle}</p>

        <ul className="space-y-6">
          {projects.map((project, i) => (
            <li
              key={i}
              className="group border-border from-primary/10 to-muted/10 relative rounded-2xl border bg-linear-to-br p-6 sm:p-8"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="from-primary/0 to-secondary/0 absolute inset-0 rounded-2xl bg-linear-to-br" />

              <div className="relative">
                <h3 className="text-foreground mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">{project.description}</p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="bg-background/80 border-border/40 text-muted-foreground rounded-lg border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm"
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
                      className="text-primary hover:text-secondary group/link inline-flex items-center gap-2 text-sm font-medium transition-colors"
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
                      className="text-primary hover:text-secondary inline-flex items-center gap-2 text-sm font-medium transition-colors"
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
