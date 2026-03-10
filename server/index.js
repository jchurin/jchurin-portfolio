import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect, useRef } from "react";
import { X, Menu, ChevronLeft, ChevronRight, ExternalLink, Github, Linkedin, Mail, Phone } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links$1 = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "overflow-hidden touch-pan-y",
      children: [/* @__PURE__ */ jsx("div", {
        className: "h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth overscroll-y-contain",
        "data-scroll-container": true,
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "container mx-auto p-4 pt-16",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links: links$1
}, Symbol.toStringTag, { value: "Module" }));
const logo = "Portfolio";
const links = [{ "href": "#hero", "label": "Home" }, { "href": "#about", "label": "About" }, { "href": "#projects", "label": "Projects" }, { "href": "#experience", "label": "Experience" }, { "href": "#skills", "label": "Skills" }, { "href": "#contact", "label": "Contact" }];
const headerData = {
  logo,
  links
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) return;
    const sectionIds = headerData.links.map((link) => link.href.replace("#", ""));
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
      passive: true
    });
    return () => scrollContainer.removeEventListener("scroll", updateActiveSection);
  }, []);
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };
  return /* @__PURE__ */ jsxs("header", { className: "border-border/60 bg-background/70 sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxs("nav", { className: "container mx-auto flex items-center justify-between px-4 py-3 md:py-4", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#hero",
          className: "font-heading text-foreground hover:text-primary text-lg md:text-xl transition-colors",
          onClick: handleLinkClick,
          children: headerData.logo
        }
      ),
      /* @__PURE__ */ jsx("ul", { className: "text-muted-foreground hidden md:flex gap-4 lg:gap-6 text-sm", children: headerData.links.map(({ href, label }) => {
        const sectionId = href.replace("#", "");
        const isActive = activeSection === sectionId;
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "a",
          {
            href,
            className: cn(
              "hover:text-foreground relative transition-colors",
              isActive && "text-foreground font-medium"
            ),
            children: [
              label,
              isActive && /* @__PURE__ */ jsx("span", { className: "from-primary to-secondary absolute right-0 -bottom-[1.15rem] left-0 h-0.5 rounded-full bg-linear-to-r" })
            ]
          }
        ) }, href);
      }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          className: "text-foreground hover:text-primary md:hidden p-2 transition-colors",
          "aria-label": "Toggle menu",
          children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl", children: /* @__PURE__ */ jsx("ul", { className: "container mx-auto px-4 py-4 space-y-3", children: headerData.links.map(({ href, label }) => {
      const sectionId = href.replace("#", "");
      const isActive = activeSection === sectionId;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href,
          onClick: handleLinkClick,
          className: cn(
            "block py-2 px-4 rounded-lg transition-colors",
            isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          ),
          children: label
        }
      ) }, href);
    }) }) })
  ] });
}
const name = "Juan Churin";
const badge = "Senior Frontend Engineer";
const tagline = "Building exceptional user experiences with modern web technologies. Specialized in React, TypeScript, and scalable design systems.";
const cta = { "primary": "View Projects", "secondary": "Let's Connect" };
const heroData = {
  name,
  badge,
  tagline,
  cta
};
function Hero() {
  const { name: name2, badge: badge2, tagline: tagline2, cta: cta2 } = heroData;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "hero",
      className: "py-section relative flex min-h-screen snap-start flex-col justify-between overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15]",
              style: {
                background: "radial-gradient(circle, var(--theme-primary) 0%, transparent 50%)",
                filter: "blur(120px)"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-1/3 left-1/3 h-[800px] w-[800px] rounded-full opacity-[0.08]",
              style: {
                background: "radial-gradient(circle, var(--theme-secondary) 0%, transparent 70%)",
                filter: "blur(100px)"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-1/4 right-1/4 h-[600px] w-[600px] rounded-full opacity-[0.06]",
              style: {
                background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)",
                filter: "blur(90px)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center", children: [
          /* @__PURE__ */ jsxs("span", { className: "border-primary/20 from-primary/10 to-secondary/10 text-foreground shadow-primary/5 mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border bg-linear-to-r px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "bg-primary shadow-primary/50 relative inline-flex h-2 w-2 rounded-full shadow-lg" })
            ] }),
            badge2
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "font-heading text-foreground from-foreground via-foreground to-foreground/70 mb-3 sm:mb-4 bg-linear-to-br bg-clip-text text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl px-2", children: name2 }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 sm:mb-12 max-w-xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light px-2", children: tagline2 }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#projects",
                className: "group from-primary to-secondary text-primary-foreground hover:shadow-primary/25 inline-flex items-center justify-center rounded-lg bg-linear-to-r px-6 sm:px-8 py-3 sm:py-3.5 font-medium transition-all duration-200 hover:shadow-xl text-sm sm:text-base",
                children: cta2.primary
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#contact",
                className: "border-border/60 bg-background/60 text-foreground hover:bg-muted/50 hover:border-primary/30 inline-flex items-center justify-center rounded-lg border px-6 sm:px-8 py-3 sm:py-3.5 font-medium backdrop-blur-sm transition-all duration-200 hover:shadow-lg text-sm sm:text-base",
                children: cta2.secondary
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#about",
            className: "text-muted-foreground/60 hover:text-muted-foreground hidden sm:flex flex-col items-center gap-2 self-center pb-6 md:pb-8 transition-colors",
            "aria-label": "Scroll to about",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs tracking-widest uppercase", children: "Scroll" }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "h-5 w-5 animate-bounce",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const title$4 = "About Me";
const bio = ["I'm a frontend engineer with over {years} years of experience building production-ready applications for startups and enterprises. I specialize in React, TypeScript, and modern frontend architecture, with a strong focus on creating scalable, maintainable solutions.", "My approach combines technical excellence with user-centric design. I'm passionate about crafting interfaces that are not only visually appealing but also performant, accessible, and delightful to use. From implementing complex state management to building comprehensive design systems, I thrive on solving challenging problems that directly impact user experience."];
const highlights = ["React & TypeScript Expert", "Design Systems & Component Architecture", "Performance Optimization", "Accessibility Champion", "Modern Frontend Tooling", "Mentoring & Code Review"];
const aboutData = {
  title: title$4,
  bio,
  highlights
};
function calculateYearsOfExperience(startDate) {
  const now = /* @__PURE__ */ new Date();
  const diffInMs = now.getTime() - startDate.getTime();
  const diffInYears = diffInMs / (1e3 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffInYears);
}
const CAREER_START_DATE = new Date(2015, 9, 1);
function getYearsOfExperience() {
  return calculateYearsOfExperience(CAREER_START_DATE);
}
function About() {
  const { title: title2, bio: bio2, highlights: highlights2 } = aboutData;
  const yearsOfExperience = getYearsOfExperience();
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "about",
      className: "py-section relative flex min-h-screen snap-start flex-col justify-center overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden opacity-30", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-1/3 right-1/4 h-64 w-64 rounded-full blur-3xl",
            style: {
              background: "radial-gradient(circle, var(--theme-secondary) 0%, transparent 70%)"
            }
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-3xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-foreground mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left", children: title2 }),
          /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mb-8 sm:mb-10 space-y-4 sm:space-y-6 leading-relaxed", children: bio2.map((paragraph, i) => /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg", children: paragraph.replace("{years}", yearsOfExperience.toString()) }, i)) }),
          /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start", children: highlights2.map((item, i) => /* @__PURE__ */ jsx(
            "li",
            {
              className: "border-border/60 from-primary/10 to-secondary/10 text-foreground hover:border-primary/40 hover:shadow-primary/10 inline-flex cursor-default items-center rounded-lg sm:rounded-xl border bg-linear-to-br px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-md",
              children: item
            },
            i
          )) })
        ] })
      ]
    }
  );
}
const title$3 = "Featured Projects";
const subtitle$1 = "A selection of work showcasing technical depth and attention to detail";
const projects = [{ "title": "React Design System Library", "description": "A comprehensive design system featuring 20+ production-ready components with TypeScript support, theme customization, and accessibility built-in. Includes documentation, interactive examples, and a flexible Tailwind-based styling approach for rapid development.", "image": "/assets/images/project-1.png", "tech": ["React", "TypeScript", "Tailwind CSS", "Vite", "Storybook"], "links": { "live": "https://jchurin.github.io/react-vite-design-system-library", "github": "https://github.com/jchurin/react-vite-design-system-library" } }];
const projectsData = {
  title: title$3,
  subtitle: subtitle$1,
  projects
};
function PaginatedSlider({
  items: items2,
  itemsPerPage,
  renderPage,
  className,
  showNavigation = true,
  showDots = true,
  gap = "gap-6"
}) {
  const [activePage, setActivePage] = useState(0);
  const scrollContainerRef = useRef(null);
  const totalPages = Math.ceil(items2.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
    const start = pageIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return items2.slice(start, end);
  });
  const scrollToPage = (pageIndex) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const pageWidth = container.scrollWidth / totalPages;
    container.scrollTo({
      left: pageWidth * pageIndex,
      behavior: "smooth"
    });
  };
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const pageWidth = container.scrollWidth / totalPages;
    const currentPage = Math.round(container.scrollLeft / pageWidth);
    setActivePage(currentPage);
  };
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    showNavigation && totalPages > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scrollToPage(Math.max(0, activePage - 1)),
          disabled: activePage === 0,
          className: cn(
            "hidden sm:block absolute -left-2 md:-left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/90 p-1.5 md:p-2 shadow-lg backdrop-blur-sm transition-all duration-200",
            activePage === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-primary/10 hover:border-primary/40 cursor-pointer"
          ),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4 md:h-5 md:w-5" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scrollToPage(Math.min(totalPages - 1, activePage + 1)),
          disabled: activePage === totalPages - 1,
          className: cn(
            "hidden sm:block absolute -right-2 md:-right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/90 p-1.5 md:p-2 shadow-lg backdrop-blur-sm transition-all duration-200",
            activePage === totalPages - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-primary/10 hover:border-primary/40 cursor-pointer"
          ),
          "aria-label": "Next page",
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 md:h-5 md:w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollContainerRef,
        className: "flex snap-x snap-mandatory overflow-x-auto scrollbar-hide",
        children: pages.map((pageItems, pageIndex) => {
          const startIndex = pageIndex * itemsPerPage;
          return /* @__PURE__ */ jsx("div", { className: "relative min-w-full snap-center", children: renderPage(pageItems, pageIndex, startIndex) }, pageIndex);
        })
      }
    ),
    showDots && totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "mt-6 sm:mt-8 flex justify-center gap-2", children: pages.map((_, pageIndex) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => scrollToPage(pageIndex),
        className: cn(
          "h-2 sm:h-2 rounded-full transition-all duration-300 touch-manipulation",
          activePage === pageIndex ? "w-8 sm:w-8 bg-primary" : "w-2 sm:w-2 bg-border hover:bg-primary/50"
        ),
        "aria-label": `Go to page ${pageIndex + 1}`
      },
      pageIndex
    )) })
  ] });
}
const ITEMS_PER_PAGE_DESKTOP$1 = 2;
const ITEMS_PER_PAGE_MOBILE$1 = 1;
function Projects() {
  const { title: title2, subtitle: subtitle2, projects: projects2 } = projectsData;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE$1 : ITEMS_PER_PAGE_DESKTOP$1;
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "py-section min-h-screen snap-start flex flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-heading text-foreground mb-2 text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left", children: title2 }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base text-center sm:text-left", children: subtitle2 }),
    /* @__PURE__ */ jsx(
      PaginatedSlider,
      {
        items: projects2,
        itemsPerPage,
        renderPage: (pageProjects) => /* @__PURE__ */ jsx("ul", { className: "space-y-4 sm:space-y-6", children: pageProjects.map((project, i) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "group border-border from-primary/10 to-muted/10 relative overflow-hidden rounded-xl sm:rounded-2xl border bg-linear-to-br",
            children: [
              /* @__PURE__ */ jsx("div", { className: "from-primary/0 to-secondary/0 absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-br" }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row gap-4 sm:gap-6 p-4 sm:p-6 md:p-8", children: [
                project.image && /* @__PURE__ */ jsx("div", { className: "md:w-2/5 lg:w-1/3 shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-video md:aspect-square overflow-hidden rounded-lg sm:rounded-xl border border-border/40 bg-muted/20", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: project.image,
                      alt: project.title,
                      className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-foreground mb-2 text-lg sm:text-xl font-semibold", children: project.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base flex-1", children: project.description }),
                  /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-5 flex flex-wrap gap-1.5 sm:gap-2", children: project.tech.map((tech, j) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "bg-background/80 border-border/40 text-muted-foreground rounded-md sm:rounded-lg border px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm",
                      children: tech
                    },
                    j
                  )) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4", children: [
                    project.links?.live && /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: project.links.live,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "text-primary hover:text-secondary group/link inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium transition-colors",
                        children: [
                          /* @__PURE__ */ jsx(ExternalLink, { className: "size-4" }),
                          "View live"
                        ]
                      }
                    ),
                    project.links?.github && /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: project.links.github,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "text-primary hover:text-secondary inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium transition-colors",
                        children: [
                          /* @__PURE__ */ jsx(Github, { className: "size-4" }),
                          "Source code"
                        ]
                      }
                    )
                  ] })
                ] })
              ] })
            ]
          },
          i
        )) })
      }
    )
  ] }) });
}
const title$2 = "Experience";
const subtitle = "A timeline of my career";
const jobs = [{ "company": "Softwaremind", "client": "Airia", "role": "Frontend Engineer", "period": "Nov 2024 - Now", "tech": ["React", "TypeScript", "AI/ML"], "highlights": ["Built scalable React/TypeScript apps for an AI governance platform with data-intensive dashboards and compliance workflows.", "Led frontend architecture: state management, modular components, and TypeScript standards for long-term scalability.", "Collaborated with backend, DevOps, design, and product to deliver high-performance UX integrated with AI services."] }, { "company": "Softwaremind", "client": "Branch", "role": "Frontend Engineer", "period": "Mar 2023 - Nov 2024", "tech": ["React", "Redux", "MUI", "Emotion", "Sass"], "highlights": ["Developed microfrontends with React and Redux, implementing MUI-based design system.", "Used Emotion, CSS, and Sass for consistent, scalable styling across the app.", "Owned end-to-end delivery: documentation, deployment, unit/integration tests, and code reviews."] }, { "company": "Fanzeem", "client": "Fanzeem", "role": "Frontend Engineer", "period": "Nov 2021 - Feb 2023", "tech": ["React Native", "MobX", "Expo", "Figma"], "highlights": ["Solely built a mobile app/game with React Native, managing the full frontend lifecycle.", "Used MobX for state management and Expo for streamlined deployment and updates.", "Collaborated with design (Figma) and backend for pixel-perfect UI and seamless integration."] }, { "company": "Leniolabs", "client": "Ellie Mae", "role": "FE Technical Leader", "period": "Jun 2020 - Nov 2021", "tech": ["React", "Redux", "CSS/Sass", "Design Systems"], "highlights": ["Led a team of 8-10 developers in a microfrontend project with React, Redux, and CSS/Sass.", "Maintained and expanded the design system for consistent UI across all microfrontends.", "Managed GitHub workflows, PR reviews, and mentored junior developers."] }, { "company": "Leniolabs", "client": "Ellie Mae", "role": "Frontend Engineer", "period": "Nov 2018 - Jun 2020", "tech": ["React", "Redux", "CSS", "Sass"], "highlights": ["Built microfrontend apps with React and Redux, ensuring seamless integration.", "Implemented and maintained UI elements using the project's design system.", "Wrote unit tests and used CSS/Sass for performant, scalable styling."] }, { "company": "Aconcagua Software Factory", "client": "Various", "role": "Software Developer", "period": "Oct 2015 - Nov 2018", "tech": ["React", "Angular", "Java", "PHP", "Python", "MySQL"], "highlights": ["Developed full-stack web apps with Java, PHP, Python, JavaScript, React, Angular, and jQuery.", "Managed MySQL, SQL Server, and Oracle databases with optimized queries.", "Collaborated with cross-functional teams on backend and frontend for diverse clients."] }];
const experienceData = {
  title: title$2,
  subtitle,
  jobs
};
const ExperienceCard = ({
  primaryTitle,
  secondaryTitle,
  subtitle: subtitle2,
  tech,
  highlights: highlights2,
  isHovered,
  datePeriod
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border-border from-primary/10 to-muted/10 min-w-0 flex-1 cursor-pointer rounded-lg border bg-linear-to-br p-3 sm:p-4 transition-all duration-300",
        isHovered && "border-primary/30 shadow-lg shadow-primary/5"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2", children: [
            /* @__PURE__ */ jsx(
              "h3",
              {
                className: cn(
                  "text-sm sm:text-base font-semibold transition-colors duration-300",
                  isHovered ? "text-primary" : "text-foreground"
                ),
                children: primaryTitle
              }
            ),
            secondaryTitle && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs sm:text-sm", children: secondaryTitle })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs sm:text-sm", children: subtitle2 })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              maxHeight: isHovered ? "500px" : "0",
              opacity: isHovered ? 1 : 0,
              marginTop: isHovered ? "0.75rem" : "0",
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3", children: [
              tech && tech.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 sm:gap-1.5", children: tech.map((t, k) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "bg-background/60 border-border/30 text-muted-foreground rounded-md border px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium",
                  children: t
                },
                k
              )) }),
              /* @__PURE__ */ jsx("ul", { className: "text-muted-foreground space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs leading-relaxed", children: highlights2.map((highlight, j) => /* @__PURE__ */ jsxs("li", { className: "flex gap-1.5 sm:gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary mt-0.5 shrink-0 text-xs sm:text-sm", children: "•" }),
                /* @__PURE__ */ jsx("span", { children: highlight })
              ] }, j)) })
            ] })
          }
        )
      ]
    }
  );
};
const getTailwindOpacity = (percent) => {
  const opacities = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];
  return opacities.reduce(
    (prev, curr) => Math.abs(curr - percent) < Math.abs(prev - percent) ? curr : prev
  );
};
const TimelineItem = ({
  datePeriod,
  primaryTitle,
  secondaryTitle,
  subtitle: subtitle2,
  tech,
  highlights: highlights2,
  isHovered,
  index,
  totalItems,
  ...props
}) => {
  const progress = 100 / totalItems * (index + 1);
  const previousProgress = 100 / totalItems * index;
  const fromOpacity = getTailwindOpacity(100 - previousProgress);
  const toOpacity = getTailwindOpacity(100 - progress);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-12",
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "sm:min-w-36 sm:text-right", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs sm:text-xs font-medium block sm:inline", children: datePeriod }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "hidden sm:block absolute top-0 bottom-0 left-42 w-px",
              "bg-linear-to-b",
              `from-primary/${fromOpacity}`,
              `to-primary/${toOpacity}`
            )
          }
        ),
        /* @__PURE__ */ jsx(
          ExperienceCard,
          {
            primaryTitle,
            secondaryTitle,
            subtitle: subtitle2,
            tech,
            highlights: highlights2,
            isHovered,
            datePeriod
          }
        )
      ]
    }
  );
};
const ITEMS_PER_PAGE_DESKTOP = 4;
const ITEMS_PER_PAGE_MOBILE = 2;
function Experience() {
  const { title: title2, subtitle: subtitle2, jobs: jobs2 } = experienceData;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const handleToggle = (index) => {
    setHoveredIndex(hoveredIndex === index ? null : index);
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "experience",
      className: "py-section flex min-h-screen snap-start flex-col justify-center",
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-4xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-foreground mb-2 text-center text-2xl sm:text-3xl md:text-4xl font-normal", children: title2 }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 sm:mb-12 text-center text-sm sm:text-base", children: subtitle2 }),
        /* @__PURE__ */ jsx(
          PaginatedSlider,
          {
            items: jobs2,
            itemsPerPage,
            renderPage: (pageJobs, _pageIndex, startIndex) => /* @__PURE__ */ jsx("div", { className: "relative flex flex-col gap-4 sm:gap-6", children: pageJobs.map((job, itemIndex) => {
              const globalIndex = startIndex + itemIndex;
              return /* @__PURE__ */ jsx(
                TimelineItem,
                {
                  onMouseEnter: () => setHoveredIndex(globalIndex),
                  onMouseLeave: () => setHoveredIndex(null),
                  onClick: () => handleToggle(globalIndex),
                  datePeriod: job.period,
                  primaryTitle: job.company,
                  secondaryTitle: job.client,
                  subtitle: job.role,
                  tech: job.tech,
                  highlights: job.highlights,
                  isHovered: hoveredIndex === globalIndex,
                  index: globalIndex,
                  totalItems: jobs2.length
                },
                globalIndex
              );
            }) })
          }
        )
      ] })
    }
  );
}
const title$1 = "Technical Expertise";
const skills = ["React", "TypeScript", "JavaScript (ES6+)", "Redux", "React Query", "Next.js", "HTML5", "CSS3 / Sass", "Tailwind CSS", "Material-UI", "Styled Components", "Jest", "React Testing Library", "Git", "Webpack", "Vite", "Figma", "Responsive Design", "Web Accessibility"];
const languages = [{ "name": "Spanish", "level": "Native" }, { "name": "English", "level": "Professional Working Proficiency (B1)" }];
const skillsData = {
  title: title$1,
  skills,
  languages
};
function Skills() {
  const { title: title2, skills: skills2, languages: languages2 } = skillsData;
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "skills",
      className: "py-section flex min-h-screen snap-start flex-col justify-center",
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-foreground mb-3 text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left", children: title2 }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg text-center sm:text-left", children: "Technologies and tools I work with" }),
        /* @__PURE__ */ jsx("ul", { className: "mb-10 sm:mb-14 flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start", children: skills2.map((skill, i) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center rounded-lg sm:rounded-xl border bg-gradient-to-br px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg",
            children: skill
          },
          i
        )) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-foreground mb-4 sm:mb-6 flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl font-semibold", children: [
            /* @__PURE__ */ jsx("span", { className: "from-primary to-secondary h-5 sm:h-6 w-1 rounded-full bg-gradient-to-b" }),
            "Languages"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start", children: languages2.map((lang, i) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "group border-border/60 from-muted/40 to-muted/20 text-foreground hover:border-primary/40 hover:shadow-primary/5 inline-flex cursor-default items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border bg-gradient-to-br px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: lang.name }),
                /* @__PURE__ */ jsx("span", { className: "bg-border h-3 sm:h-4 w-px" }),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: lang.level })
              ]
            },
            i
          )) })
        ] })
      ] })
    }
  );
}
const title = "Let's Work Together";
const items = [{ "type": "phone", "label": "+54-2613029504", "href": "tel:+542613029504" }, { "type": "email", "label": "juanchurin@gmail.com", "href": "mailto:juanchurin@gmail.com" }, { "type": "linkedin", "label": "linkedin.com/in/jchurin", "href": "https://linkedin.com/in/jchurin/" }];
const contactData = {
  title,
  items
};
const iconMap = {
  phone: Phone,
  email: Mail,
  linkedin: Linkedin
};
function Contact() {
  const { title: title2, items: items2 } = contactData;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "contact",
      className: "py-section relative flex min-h-screen snap-start flex-col justify-center overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl",
            style: {
              background: "radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)"
            }
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-3xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-heading from-foreground to-foreground/70 mb-4 bg-gradient-to-br bg-clip-text text-2xl sm:text-3xl md:text-4xl font-normal text-transparent text-center sm:text-left", children: title2 }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg text-center sm:text-left", children: "Available for freelance projects and full-time opportunities. Let's discuss how I can help bring your ideas to life." }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: items2.map((item, i) => {
            const Icon = iconMap[item.type];
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: item.href,
                target: item.type === "linkedin" ? "_blank" : void 0,
                rel: item.type === "linkedin" ? "noreferrer" : void 0,
                className: "group border-border/60 from-muted/30 to-muted/10 hover:border-primary/40 hover:shadow-primary/5 flex items-center gap-3 sm:gap-4 rounded-lg sm:rounded-xl border bg-gradient-to-r p-4 sm:p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                children: [
                  Icon && /* @__PURE__ */ jsx("div", { className: "from-primary/20 to-secondary/20 text-primary flex size-10 sm:size-12 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm transition-transform duration-200 group-hover:scale-110 shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "size-4 sm:size-5" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-foreground group-hover:text-primary text-base sm:text-lg font-medium transition-colors", children: item.label })
                ]
              }
            ) }, i);
          }) })
        ] })
      ]
    }
  );
}
function meta({}) {
  return [{
    title: "Portfolio"
  }, {
    name: "description",
    content: "My career portfolio and projects"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
      className: "container mx-auto px-2 sm:px-4",
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(About, {}), /* @__PURE__ */ jsx(Projects, {}), /* @__PURE__ */ jsx(Experience, {}), /* @__PURE__ */ jsx(Skills, {}), /* @__PURE__ */ jsx(Contact, {})]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/jchurin-portfolioassets/entry.client-C4vAeVvd.js", "imports": ["/jchurin-portfolioassets/chunk-EPOLDU6W-CP3WDhNt.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/jchurin-portfolioassets/root-3k9jGx-b.js", "imports": ["/jchurin-portfolioassets/chunk-EPOLDU6W-CP3WDhNt.js"], "css": ["/jchurin-portfolioassets/root-Cv2yyRYr.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/jchurin-portfolioassets/home-DW3_zAGB.js", "imports": ["/jchurin-portfolioassets/chunk-EPOLDU6W-CP3WDhNt.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/jchurin-portfolioassets/manifest-ca33f858.js", "version": "ca33f858", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/jchurin-portfolio";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
