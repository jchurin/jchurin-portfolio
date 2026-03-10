import skillsData from "./skills.data.json";

export function Skills() {
  const { title, skills, languages } = skillsData;

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center py-section snap-start"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">
          Technologies and tools I work with
        </p>

        <ul className="flex flex-wrap gap-3 mb-14">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="group inline-flex items-center px-5 py-3 rounded-xl border border-border/60 bg-gradient-to-br from-muted/40 to-muted/20 text-foreground text-base font-medium hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:scale-105 transition-all duration-200 backdrop-blur-sm cursor-default"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
            Languages
          </h3>
          <ul className="flex flex-wrap gap-3">
            {languages.map((lang, i) => (
              <li
                key={i}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border/60 bg-gradient-to-br from-muted/40 to-muted/20 text-foreground text-base hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:scale-105 transition-all duration-200 backdrop-blur-sm cursor-default"
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="w-px h-4 bg-border" />
                <span className="text-muted-foreground">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
