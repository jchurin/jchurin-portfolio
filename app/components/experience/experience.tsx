import experienceData from "./experience.data.json";

export function Experience() {
  const { title, subtitle, jobs } = experienceData;

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center py-section snap-start"
    >
      <div className="max-w-3xl mx-auto px-4 w-full">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12">{subtitle}</p>

        <div className="space-y-6">
          {jobs.map((job, i) => (
            <article
              key={i}
              className="group relative rounded-2xl border border-border/60 bg-gradient-to-br from-muted/30 to-muted/10 p-6 sm:p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="pl-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {job.role}
                    </h3>
                    <p className="text-primary font-medium">{job.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap px-3 py-1 rounded-full bg-background/60 border border-border/40">
                    {job.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tech?.map((t, k) => (
                    <span
                      key={k}
                      className="px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 text-muted-foreground text-xs font-medium shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed text-sm">
                  {job.highlights.map((highlight, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-primary mt-1 shrink-0 font-bold">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
