import aboutData from "./about.data.json";
import { getYearsOfExperience } from "../../utils/experience";

export function About() {
  const { title, bio, highlights } = aboutData;
  const yearsOfExperience = getYearsOfExperience();

  return (
    <section
      id="about"
      className="py-section relative flex min-h-screen snap-start flex-col justify-center overflow-hidden"
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

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-foreground mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left">
          {title}
        </h2>

        <div className="text-muted-foreground mb-8 sm:mb-10 space-y-4 sm:space-y-6 leading-relaxed">
          {bio.map((paragraph, i) => (
            <p key={i} className="text-base sm:text-lg">
              {paragraph.replace("{years}", yearsOfExperience.toString())}
            </p>
          ))}
        </div>

        <ul className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="border-border/60 from-primary/10 to-secondary/10 text-foreground hover:border-primary/40 hover:shadow-primary/10 inline-flex cursor-default items-center rounded-lg sm:rounded-xl border bg-linear-to-br px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
