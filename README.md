# Portfolio Landing Page

A personal portfolio and career resume built with React Router, featuring a single-page layout with scroll-snap sections.

## Tech Stack

- **React Router** – Routing and SSR
- **React 19** – UI
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling with a custom theme
- **Lucide React** – Icons

## Sections

- **Hero** – Introduction and CTAs
- **About** – Bio and highlights
- **Projects** – Work showcase with links
- **Experience** – Career timeline
- **Skills** – Technologies and languages
- **Contact** – Phone, email, LinkedIn

Content for each section is loaded from JSON files next to their components for easy editing.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

## Project Structure

```
app/
├── components/       # Section components
│   ├── hero/
│   ├── about/
│   ├── projects/
│   ├── experience/
│   ├── skills/
│   ├── contact/
│   └── layout/
├── theme/            # Design tokens (colors, spacing)
├── routes/
└── app.css
```

## Customization

- **Theme** – Edit `app/theme/theme.css` for colors, fonts, and spacing
- **Content** – Update the `*.data.json` files in each component folder
- **Header links** – Modify `app/components/layout/header.data.json`
