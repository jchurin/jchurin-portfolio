import heroData from "./hero.data.json";

export function Hero() {
  const { name, badge, tagline, cta } = heroData;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between py-section overflow-hidden snap-start"
    >
      {/* Layered diffuse background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large ambient glow - primary */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, var(--theme-primary) 0%, transparent 50%)",
            filter: "blur(120px)",
          }}
        />
        {/* Secondary ambient layer */}
        <div
          className="absolute top-1/3 left-1/3 w-[800px] h-[800px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, var(--theme-secondary) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Accent layer */}
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm text-foreground text-sm font-medium shadow-lg shadow-primary/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-lg shadow-primary/50" />
          </span>
          {badge}
        </span>

        {/* Name - serif for elegance */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-foreground tracking-tight mb-4 bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
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
            className="group inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-linear-to-r from-primary to-secondary text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/25 transition-all duration-200"
          >
            {cta.primary}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-border/60 bg-background/60 backdrop-blur-sm text-foreground font-medium hover:bg-muted/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200"
          >
            {cta.secondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="flex flex-col items-center gap-2 pb-8 text-muted-foreground/60 hover:text-muted-foreground transition-colors self-center"
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
