import heroData from "./hero.data.json";

export function Hero() {
  const { name, badge, tagline, cta } = heroData;

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center py-section overflow-hidden"
    >
      {/* Subtle gradient orb - decorative background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.15] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border bg-muted/50 text-muted-foreground text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          {badge}
        </span>

        {/* Name - serif for elegance */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-foreground tracking-tight mb-4">
          {name}
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-muted-foreground font-light max-w-xl mb-12 leading-relaxed">
          {tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            {cta.primary}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted/50 transition-colors"
          >
            {cta.secondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </section>
  );
}
