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

        <ul className="space-y-8">
          {projects.map((project, i) => (
            <li
              key={i}
              className="group rounded-xl border border-border bg-muted/20 p-6 sm:p-8 hover:border-primary/30 hover:bg-muted/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
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
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View live →
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Source code →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
