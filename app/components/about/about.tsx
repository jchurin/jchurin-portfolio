import aboutData from "./about.data.json";

export function About() {
  const { title, bio, highlights } = aboutData;

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-section snap-start overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--theme-secondary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4">
        <h2 className="font-heading text-3xl sm:text-4xl font-normal text-foreground mb-8">
          {title}
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed mb-10">
          {bio.map((paragraph, i) => (
            <p key={i} className="text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="flex flex-wrap gap-3">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="inline-flex items-center px-4 py-2.5 rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 to-secondary/10 text-foreground text-sm font-medium hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 hover:scale-105 transition-all duration-200 backdrop-blur-sm cursor-default"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
