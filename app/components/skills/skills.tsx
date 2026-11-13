import skillsData from "./skills.data.json";
import { SkillGroup } from "./SkillGroup";

export function Skills() {
  const { title, skills, aiTools, languages } = skillsData;

  return (
    <section
      id="skills"
      className="py-section min-h-below-header flex snap-start flex-col justify-center"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-foreground mb-3 text-center text-2xl font-normal sm:text-left sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground short:hidden mb-6 text-center text-base sm:mb-8 sm:text-left sm:text-lg">
          Technologies and tools I work with
        </p>

        <ul className="short:mb-4 mb-8 flex flex-wrap justify-center gap-2 sm:mb-8 sm:justify-start sm:gap-3">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center rounded-lg border bg-gradient-to-br px-2.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg sm:rounded-xl sm:px-4 sm:py-2 sm:text-base"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="short:gap-y-4 grid gap-y-8 md:grid-cols-[1fr_auto] md:gap-x-10">
          {/* AI-Assisted Development */}
          <SkillGroup title={aiTools.title}>
            {aiTools.items.map((tool) => (
              <li
                key={tool}
                className="border-primary/30 from-primary/15 to-secondary/10 text-foreground hover:border-primary/60 hover:shadow-primary/10 inline-flex cursor-default items-center rounded-lg border bg-gradient-to-br px-2.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg sm:rounded-xl sm:px-4 sm:py-2 sm:text-base"
              >
                {tool}
              </li>
            ))}
          </SkillGroup>

          {/* Languages */}
          <SkillGroup title="Languages" listClassName="md:flex-col md:items-start">
            {languages.map((lang, i) => (
              <li
                key={i}
                className="group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center gap-2 rounded-lg border bg-gradient-to-br px-3 py-1.5 text-xs backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg sm:gap-3 sm:rounded-xl sm:px-4 sm:py-2 sm:text-base"
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="bg-border h-3 w-px sm:h-4" />
                <span className="text-muted-foreground">{lang.level}</span>
              </li>
            ))}
          </SkillGroup>
        </div>
      </div>
    </section>
  );
}
