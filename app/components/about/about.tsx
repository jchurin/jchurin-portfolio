import aboutData from "./about.data.json";
import { getYearsOfExperience } from "../../utils/experience";

export function About() {
  const { title, bio, highlights } = aboutData;
  const yearsOfExperience = getYearsOfExperience();

  return (
    <section
      id="about"
      className="py-section min-h-below-header relative flex snap-start flex-col justify-center overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--theme-secondary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-foreground mb-4 text-center text-2xl font-normal sm:mb-8 sm:text-left sm:text-3xl md:text-4xl">
          {title}
        </h2>

        <div className="text-muted-foreground mb-6 space-y-3 leading-relaxed sm:mb-10 sm:space-y-6">
          {bio.map((paragraph, i) => (
            <p key={i} className="short:text-sm text-[0.9375rem] sm:text-lg">
              {paragraph.replace("{years}", yearsOfExperience.toString())}
            </p>
          ))}
        </div>

        {/* Highlights: one swipeable row on short screens so the section still fits */}
        <ul className="scrollbar-hide short:flex-nowrap short:overflow-x-auto short:justify-start short:-mx-4 short:px-4 flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="border-border/60 from-primary/10 to-secondary/10 text-foreground hover:border-primary/40 hover:shadow-primary/10 inline-flex shrink-0 cursor-default items-center rounded-lg border bg-linear-to-br px-3 py-2 text-xs font-medium whitespace-nowrap backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-md sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
