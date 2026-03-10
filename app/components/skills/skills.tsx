import skillsData from "./skills.data.json";

export function Skills() {
  const { title, skills, languages } = skillsData;

  return (
    <section
      id="skills"
      className="py-section flex min-h-screen snap-start flex-col justify-center"
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-foreground mb-3 text-3xl font-normal sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">Technologies and tools I work with</p>

        <ul className="mb-14 flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center rounded-xl border bg-gradient-to-br px-5 py-3 text-base font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div>
          <h3 className="text-foreground mb-6 flex items-center gap-2 text-xl font-semibold">
            <span className="from-primary to-secondary h-6 w-1 rounded-full bg-gradient-to-b" />
            Languages
          </h3>
          <ul className="flex flex-wrap gap-3">
            {languages.map((lang, i) => (
              <li
                key={i}
                className="group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center gap-3 rounded-xl border bg-gradient-to-br px-6 py-3.5 text-base backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="bg-border h-4 w-px" />
                <span className="text-muted-foreground">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
