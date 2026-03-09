import skillsData from "./skills.data.json";

export function Skills() {
  const { title, skills, languages } = skillsData;

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center py-section snap-start"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mb-12">
          {title}
        </h2>

        <ul className="flex flex-wrap gap-3 mb-12">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="inline-flex items-center px-5 py-3 rounded-lg border border-border bg-muted/30 text-foreground text-base font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Languages
          </h3>
          <ul className="flex flex-wrap gap-3">
            {languages.map((lang, i) => (
              <li
                key={i}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-muted/30 text-foreground text-base"
              >
                <span className="font-medium">{lang.name}</span>
                <span className="text-muted-foreground">—</span>
                <span className="text-muted-foreground">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
