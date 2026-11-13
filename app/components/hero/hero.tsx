import heroData from "./hero.data.json";
import { AiToolkit } from "./AiToolkit";

export function Hero() {
  const { name, badge, tagline, cta, aiToolkit } = heroData;

  return (
    <section
      id="hero"
      className="py-section min-h-below-header relative flex snap-start flex-col justify-between overflow-hidden"
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

      <div className="relative mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
        {/* Badge */}
        <span className="border-primary/20 from-primary/10 to-secondary/10 text-foreground shadow-primary/5 mb-6 inline-flex items-center gap-2 rounded-full border bg-linear-to-r px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm sm:mb-8 sm:px-4 sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary shadow-primary/50 relative inline-flex h-2 w-2 rounded-full shadow-lg" />
          </span>
          {badge}
        </span>

        {/* Name */}
        <h1 className="font-heading text-foreground from-foreground via-foreground to-foreground/70 mb-3 bg-linear-to-br bg-clip-text px-2 text-4xl font-normal tracking-tight sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          {name}
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground mb-8 max-w-xl px-2 text-base leading-relaxed font-light sm:mb-12 sm:text-lg md:text-xl lg:text-2xl">
          {tagline}
        </p>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:gap-4 sm:px-0">
          <a
            href="#projects"
            className="group from-primary to-secondary text-primary-foreground hover:shadow-primary/25 inline-flex items-center justify-center rounded-lg bg-linear-to-r px-6 py-3 text-sm font-medium transition-all duration-200 hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-base"
          >
            {cta.primary}
          </a>
          <a
            href="#contact"
            className="border-border/60 bg-background/60 text-foreground hover:bg-muted/50 hover:border-primary/30 inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:shadow-lg sm:px-8 sm:py-3.5 sm:text-base"
          >
            {cta.secondary}
          </a>
        </div>

        {/* AI Toolkit */}
        <AiToolkit label={aiToolkit.label} tools={aiToolkit.tools} />
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <a
        href="#about"
        className="text-muted-foreground/60 hover:text-muted-foreground hidden flex-col items-center gap-2 self-center pb-6 transition-colors sm:flex md:pb-8"
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
