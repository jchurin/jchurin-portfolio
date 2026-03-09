import aboutData from "./about.data.json";

export function About() {
  const { title, bio, highlights } = aboutData;

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-section snap-start">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mb-8">
          {title}
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          {bio.map((paragraph, i) => (
            <p key={i} className="text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-border bg-muted/30 text-foreground text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
