import heroData from "./hero.data.json";

export function Hero() {
  const { name, badge, tagline, cta } = heroData;

  return (
    <section
      id="hero"
      className="py-section relative flex min-h-screen snap-start flex-col justify-between overflow-hidden"
    >
      {/* Layered diffuse background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large ambient glow - primary */}
        <div
          className="absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, var(--theme-primary) 0%, transparent 50%)",
            filter: "blur(120px)",
          }}
        />
        {/* Secondary ambient layer */}
        <div
          className="absolute top-1/3 left-1/3 h-[800px] w-[800px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, var(--theme-secondary) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Accent layer */}
        <div
          className="absolute top-1/4 right-1/4 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <span className="border-primary/20 from-primary/10 to-secondary/10 text-foreground shadow-primary/5 mb-8 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-1.5 text-sm font-medium shadow-lg backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary shadow-primary/50 relative inline-flex h-2 w-2 rounded-full shadow-lg" />
          </span>
          {badge}
        </span>

        {/* Name - serif for elegance */}
        <h1 className="font-heading text-foreground from-foreground via-foreground to-foreground/70 mb-4 bg-linear-to-br bg-clip-text text-5xl font-normal tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {name}
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground mb-12 max-w-xl text-xl leading-relaxed font-light sm:text-2xl">
          {tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#projects"
            className="group from-primary to-secondary text-primary-foreground hover:shadow-primary/25 inline-flex items-center justify-center rounded-lg bg-linear-to-r px-8 py-3.5 font-medium transition-all duration-200 hover:shadow-xl"
          >
            {cta.primary}
          </a>
          <a
            href="#contact"
            className="border-border/60 bg-background/60 text-foreground hover:bg-muted/50 hover:border-primary/30 inline-flex items-center justify-center rounded-lg border px-8 py-3.5 font-medium backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
          >
            {cta.secondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="text-muted-foreground/60 hover:text-muted-foreground flex flex-col items-center gap-2 self-center pb-8 transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          className="h-5 w-5 animate-bounce"
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
