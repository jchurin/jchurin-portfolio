import { useEffect, useState } from "react";
import headerData from "./header.data.json";

export function Header() {
  const [activeSection, setActiveSection] = useState<string | null>("hero");

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) return;

    const sectionIds = headerData.links.map((link) => link.href.replace("#", ""));

    const updateActiveSection = () => {
      const triggerZone = 200; // Header height + offset

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= triggerZone) current = id;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    scrollContainer.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    return () => scrollContainer.removeEventListener("scroll", updateActiveSection);
  }, []);

  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="font-heading text-foreground hover:text-primary text-xl transition-colors"
        >
          {headerData.logo}
        </a>
        {/* Section links */}
        <ul className="text-muted-foreground flex gap-6 text-sm">
          {headerData.links.map(({ href, label }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={href}>
                <a
                  href={href}
                  className={`hover:text-foreground relative transition-colors ${
                    isActive ? "text-foreground font-medium" : ""
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="from-primary to-secondary absolute right-0 -bottom-[1.15rem] left-0 h-0.5 rounded-full bg-gradient-to-r" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
