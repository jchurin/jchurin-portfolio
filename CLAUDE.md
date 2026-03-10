# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server at http://localhost:5173
npm run build        # Build for production
npm start            # Run production build
npm run typecheck    # Type check TypeScript
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

## Architecture Overview

### Single-Page Portfolio with Snap Scrolling
This is a single-page portfolio application built with **React Router 7** featuring vertical scroll-snap sections. The entire layout is contained in one scrollable viewport with smooth snap-to-section behavior controlled by CSS scroll-snap.

**Key Layout Structure:**
- `app/root.tsx` wraps content in a full-screen scroll container with `snap-y snap-mandatory`
- Each section component has `snap-start` to create snap points
- Sections are designed to fit within viewport (`min-h-screen`) to maintain snap behavior
- Header is sticky and uses scroll tracking to highlight active section

### Component Architecture

**Section Components** (`app/components/`):
Each major section (hero, about, projects, experience, skills, contact) follows this pattern:
- Component file: `<section>/<section>.tsx`
- Data file: `<section>/<section>.data.json` - Content is JSON-driven for easy editing
- Subcomponents: Some sections have supporting components (e.g., `TimelineItem`, `ExperienceCard`)

**Common Components** (`app/components/common/`):
- `PaginatedSlider.tsx` - Generic reusable slider with pagination
  - Type-safe with generics
  - Accepts `items`, `itemsPerPage`, and `renderPage` callback
  - Includes navigation arrows and dot indicators
  - Used in Experience section for paginated timeline

**Layout Components** (`app/components/layout/`):
- `Header.tsx` - Sticky navigation with active section tracking
  - Listens to scroll container via `data-scroll-container` attribute
  - Updates active state based on scroll position
  - Config: `header.data.json`

### Styling System

**Theme** (`app/theme/theme.css`):
- Design tokens defined in CSS variables using OKLCH color space
- Supports automatic dark mode via `prefers-color-scheme`
- Variables mapped to Tailwind utilities via `@theme` directive
- Color palette: `--theme-primary`, `--theme-secondary`, `--theme-accent`, plus semantic colors
- Typography: `font-sans` (Inter), `font-heading` (Space Grotesk), `font-mono`
- Spacing: `--spacing-section`, `--spacing-section-sm`

**Tailwind Configuration:**
- Using Tailwind CSS v4 with `@tailwindcss/vite`
- Custom utilities available via theme variables (e.g., `bg-primary`, `text-foreground`)
- Prettier with `prettier-plugin-tailwindcss` for class sorting

**Utility Functions:**
- `app/utils/cn.ts` - Combines `clsx` and `tailwind-merge` for conditional class merging
- Use `cn()` instead of template literals for className conditionals

### State Management

**Local Component State:**
- Most interactivity is local (hover states, active indices)
- No global state management library
- React hooks (`useState`, `useRef`, `useEffect`) for component-level state

**Example Patterns:**
- Hover tracking: `const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)`
- Scroll tracking: `useRef` + scroll event listeners
- Pagination: Local state for `activePage`

### Data-Driven Content

All section content lives in `*.data.json` files next to components:
- `hero.data.json` - Name, badge, tagline, CTAs
- `about.data.json` - Bio paragraphs, highlights
- `projects.data.json` - Project list with tech stacks, links
- `experience.data.json` - Job history with period, company, client, role, tech, highlights
- `skills.data.json` - Skills list, languages with proficiency levels
- `contact.data.json` - Contact methods with icons and links
- `header.data.json` - Logo text and navigation links

To update content, edit the JSON files rather than modifying component code.

### Dynamic Gradients and Animations

**Timeline Gradient Pattern:**
Components like `TimelineItem` use dynamic gradients based on progress:
- Calculate opacity from progress percentage
- Map to nearest Tailwind opacity value (0, 5, 10, 20...100)
- Use inline styles when dynamic values don't match Tailwind's predefined set
- Example: Timeline shows fading gradient from completed (100% opacity) to future (0% opacity)

**Accordion Animation:**
Expandable sections use inline `style` objects for smooth transitions:
```tsx
style={{
    maxHeight: isOpen ? "500px" : "0",
    opacity: isOpen ? 1 : 0,
    transition: "max-height 0.4s ease, opacity 0.4s ease"
}}
```
Avoid CSS-only transitions for dynamic values; inline styles ensure proper animation.

### React Router 7 Specifics

- Type-safe routes with generated types in `+types/` directories
- Route-level exports: `meta()`, `links()`, `loader()`, etc.
- File-based routing in `app/routes/`
- SSR-ready with `@react-router/node` and `@react-router/serve`

## Development Patterns

### Code Style and Comments

**Comment Policy:**
Keep code clean and self-documenting. Avoid unnecessary comments that explain what the code does.

**Comments NOT allowed:**
- Standalone comments explaining obvious code logic
- Inline comments describing simple operations
- Section divider comments in non-JSX code
- TODO comments without tickets/issues

**Comments ARE allowed:**
- **JSDoc comments** for functions, methods, and complex types
  ```tsx
  /**
   * Calculates the progress percentage for timeline items
   * @param index - Item index in the list
   * @param total - Total number of items
   * @returns Progress value between 0 and 1
   */
  function calculateProgress(index: number, total: number): number {
    return index / (total - 1);
  }
  ```

- **JSX section comments** for organizing component markup
  ```tsx
  {/* Header Navigation */}
  <nav>...</nav>

  {/* Main Content Area */}
  <main>...</main>
  ```

- **Critical context** where behavior is non-obvious or counterintuitive
  ```tsx
  // HACK: Safari doesn't support backdrop-filter with transforms
  // Using fixed positioning workaround instead
  ```

**Best Practices:**
- Write clear, descriptive variable and function names instead of comments
- Extract complex logic into well-named helper functions
- Use TypeScript types to document expected data shapes
- Only comment WHY, not WHAT (the code already shows what)

### Adding New Sections
1. Create folder: `app/components/<section>/`
2. Add component: `<section>.tsx`
3. Add data file: `<section>.data.json`
4. Export from `app/components/index.ts`
5. Import and render in `app/routes/home.tsx`
6. Add navigation link to `app/components/layout/header.data.json`
7. Ensure section has `snap-start` and `min-h-screen` classes

### Customizing Theme
Edit `app/theme/theme.css`:
- Light mode: Modify `:root` variables
- Dark mode: Modify `@media (prefers-color-scheme: dark)` block
- Use OKLCH format: `oklch(lightness chroma hue)`
- Changes apply site-wide through Tailwind utility classes

### Working with the Paginated Slider
```tsx
import { PaginatedSlider } from "../common/PaginatedSlider";

<PaginatedSlider
  items={dataArray}
  itemsPerPage={4}
  renderPage={(pageItems, pageIndex, startIndex) => (
    <div className="flex flex-col gap-6">
      {pageItems.map((item, i) => (
        <Component key={startIndex + i} {...item} globalIndex={startIndex + i} />
      ))}
    </div>
  )}
/>
```
- Pass global index when needed (e.g., for gradients across all pages)
- `startIndex` parameter gives the first item's global position

### Scroll Snap Constraints
- Sections must fit within viewport to avoid breaking snap behavior
- If content grows too large, use pagination (like Experience section)
- Avoid internal scrolling inside sections that could interfere with main scroll
- Test at different viewport sizes to ensure sections remain within screen bounds
