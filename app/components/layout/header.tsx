import { useEffect, useState } from "react";
import headerData from "./header.data.json";

export function Header() {
  const [activeSection, setActiveSection] = useState<string | null>("hero");

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) return;

    const sectionIds = headerData.links.map((link) =>
      link.href.replace("#", "")
    );

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
    return () =>
      scrollContainer.removeEventListener("scroll", updateActiveSection);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="font-semibold text-foreground hover:text-primary transition-colors"
        >
          {headerData.logo}
        </a>
        {/* Section links */}
        <ul className="flex gap-6 text-muted-foreground text-sm">
          {headerData.links.map(({ href, label }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={href}>
                <a
                  href={href}
                  className={`relative transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-medium" : ""
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-[1.15rem] left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
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
