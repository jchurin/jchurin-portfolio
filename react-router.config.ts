import type { Config } from "@react-router/dev/config";

export default {
  // GitHub Pages requires SPA mode (static files only, no SSR)
  ssr: false,
  // Set basename for GitHub Pages subdirectory deployment (production only)
  basename: process.env.NODE_ENV === "production" ? "/jchurin-portfolio" : "/",
} satisfies Config;
