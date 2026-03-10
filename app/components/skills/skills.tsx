import skillsData from "./skills.data.json";

export function Skills() {
  const { title, skills, languages } = skillsData;

  return (
    <section
      id="skills"
      className="py-section flex min-h-screen snap-start flex-col justify-center"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-foreground mb-3 text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left">
          {title}
        </h2>
        <p className="text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg text-center sm:text-left">Technologies and tools I work with</p>

        <ul className="mb-10 sm:mb-14 flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center rounded-lg sm:rounded-xl border bg-gradient-to-br px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div>
          <h3 className="text-foreground mb-4 sm:mb-6 flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl font-semibold">
            <span className="from-primary to-secondary h-5 sm:h-6 w-1 rounded-full bg-gradient-to-b" />
            Languages
          </h3>
          <ul className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
            {languages.map((lang, i) => (
              <li
                key={i}
                className="group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border bg-gradient-to-br px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="bg-border h-3 sm:h-4 w-px" />
                <span className="text-muted-foreground">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
