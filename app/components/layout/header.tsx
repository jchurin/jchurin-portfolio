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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo / Name */}
        <a href="#hero" className="font-semibold text-foreground">
          {headerData.logo}
        </a>
        {/* Section links */}
        <ul className="flex gap-6 text-muted-foreground">
          {headerData.links.map(({ href, label }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={href}>
                <a
                  href={href}
                  className={`transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-medium" : ""
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
