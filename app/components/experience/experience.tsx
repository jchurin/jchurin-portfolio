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
              className="rounded-xl border border-border bg-muted/20 p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {job.role}
                  </h3>
                  <p className="text-primary font-medium">{job.company}</p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tech?.map((t, k) => (
                  <span
                    key={k}
                    className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 text-muted-foreground leading-relaxed text-sm">
                {job.highlights.map((highlight, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
