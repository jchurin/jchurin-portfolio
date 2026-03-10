import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import headerData from "./header.data.json";
import { cn } from "../../utils/cn";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeDownload } from "./ResumeDownload";

export function Header() {
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) return;

    const sectionIds = headerData.links.map((link) => link.href.replace("#", ""));

    /**
     * Updates the active navigation section based on scroll position
     * Uses a trigger zone to determine when a section becomes active
     */
    const updateActiveSection = () => {
      const triggerZone = 200;

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

  /**
   * Closes the mobile menu when a navigation link is clicked
   */
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="font-heading text-foreground hover:text-primary text-lg md:text-xl transition-colors"
          onClick={handleLinkClick}
        >
          {headerData.logo}
        </a>

        {/* Desktop Navigation */}
        <ul className="text-muted-foreground hidden md:flex gap-4 lg:gap-6 text-sm">
          {headerData.links.map(({ href, label }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    "hover:text-foreground relative transition-colors",
                    isActive && "text-foreground font-medium"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="from-primary to-secondary absolute right-0 -bottom-[1.15rem] left-0 h-0.5 rounded-full bg-linear-to-r" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Resume Download + Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <ResumeDownload />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground hover:text-primary md:hidden p-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <ul className="container mx-auto px-4 py-4 space-y-3">
            {headerData.links.map(({ href, label }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-2 px-4 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
