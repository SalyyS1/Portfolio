# SalyVn Portfolio - Codebase Summary

## Project Overview
SalyVn's personal portfolio website built with modern web technologies. Showcases Minecraft development projects, web development work, and freelance portfolio with interactive 3D skin viewer.

**Framework:** Vite + Tailwind CSS v4
**Language:** JavaScript (ES6 modules)
**Theme:** Dark-first with light mode toggle
**Build Tool:** Vite 7.3.0

## Directory Structure

```
/
├── src/
│   ├── main.js                    # Entry point, initializes all components
│   ├── styles/
│   │   └── main.css              # Tailwind CSS with custom theme config
│   └── components/
│       ├── skin-viewer.js        # 3D Minecraft skin viewer (skinview3d)
│       ├── projects.js           # Dynamic project card renderer
│       ├── navigation.js         # Mobile menu, smooth scroll, active links
│       └── theme-toggle.js       # Dark/light theme with localStorage
├── public/
│   └── assets/
│       ├── bd.jpg               # Background image
│       ├── logo.png             # Logo
│       ├── avatar.png           # Profile avatar
│       ├── team-profile.jpg     # Project image
│       ├── profile.jpg          # Project image
│       ├── landing-page.jpg     # Project image
│       ├── vscode-extension.jpg # Project image
│       ├── cultivation.jpg      # Project image
│       └── upgrade-config.jpg   # Project image
├── index.html                    # Main HTML (dark mode default)
├── package.json                  # Project dependencies
├── vite.config.js               # Vite configuration
├── .repomixignore               # Repomix ignore patterns
├── .gitignore                   # Git ignore patterns
└── dist/                        # Build output (generated)
```

## Core Components

### main.js
**Purpose:** Application entry point
**Responsibilities:**
- Imports component initializers
- Triggers DOM initialization on `DOMContentLoaded`
- Boot sequence: theme → navigation → skin viewer → projects

### Components/

#### skin-viewer.js
**Type:** 3D Visualization
**Dependencies:** skinview3d@4.1.0 (CDN)
**Configuration:**
```javascript
SKIN_CONFIG = {
  uuid: '9b6ebdbbd92041faa61721ddc6658708',  // SalyVn's Minecraft UUID
  width: 300,
  height: 400,
  zoom: 0.8
}
```
**Features:**
- Fetches skin from Crafatar API
- Enables rotate and zoom controls
- Walking animation (if available)
- Error handling with fallback UI
- XSS-safe error rendering (uses textContent)

#### projects.js
**Type:** Dynamic Content Renderer
**Data:** 6 hardcoded project objects
**Features:**
- Lazy-loaded images
- Glass-morphism cards with hover effects
- Project metadata: name, type, tools, description, demo/github links
- Tool tags rendering
- XSS-safe DOM creation (textContent only)
- GitHub SVG icon embedded (static)

**Project Types:** Web, Tool, Plugin, Config
**Project Data Fields:** name, type, tools[], description, image, demo, github

#### navigation.js
**Type:** UX Enhancement
**Features:**
- Mobile hamburger menu toggle
- Smooth scroll to sections
- Active link highlighting via Intersection Observer
- Auto-close menu on link click (mobile)
- Responsive behavior (md breakpoint)

#### theme-toggle.js
**Type:** State Management
**Storage:** localStorage (key: 'salyvn-theme')
**Modes:** 'dark' (default), 'light'
**Features:**
- Persists theme preference
- Updates icon visibility (sun/moon)
- Class toggle on documentElement

## Styling System

### Tailwind CSS v4
**Config:** Inline `@theme` directive in main.css
**Custom Variables:**
```css
--color-primary: #00ffff (cyan)
--color-dark: #1a1a1a
--color-darker: #0a0a15
--color-light: #f5f5f5
--color-gray-light: #aaaaaa
```

**Fonts:** Poppins (sans), JetBrains Mono (mono)
**Animations:** fadeIn, slideUp (defined in @theme)

### Theme System
**CSS Variables (Light/Dark modes):**
- `--bg-primary`, `--bg-secondary`
- `--text-primary`, `--text-secondary`
- `--card-shadow`, `--hover-shadow`, `--border-color`

## Build Configuration (Vite)

**Development Server:**
- Port: 3000
- Auto-open browser on start
- Hot Module Replacement enabled

**Production Build:**
- Output: `./dist`
- Assets directory: `./assets`
- Minifier: esbuild
- Source maps: disabled

**Public Directory:** `./public` (serves `/assets`)

## External Dependencies

### Runtime
- **skinview3d** (CDN): 3D Minecraft skin visualization
- **Bootstrap Icons** (CDN): Icon library

### Dev Dependencies
- **Vite** 7.3.0: Build tool & dev server
- **Tailwind CSS** 4.1.18: Utility CSS framework
- **@tailwindcss/vite** 4.1.18: Vite integration plugin
- **PostCSS** 8.5.6: CSS transformation
- **Autoprefixer** 10.4.23: CSS vendor prefixes

## HTML Structure

**Root Element:** `<html lang="en" class="dark">` (dark by default)
**Body Classes:** `bg-darker text-light font-sans min-h-screen`

**Key Sections (id-based):**
- `#home` - Hero/intro section
- `#projects` - Projects grid container
- `#about` - About section
- `#contact` - Contact section

**Important Elements:**
- `.navbar` - Fixed navigation bar
- `.nav-links` - Navigation list (hidden md:flex)
- `.mobile-menu-btn` - Hamburger toggle
- `#skin-canvas` - Canvas for 3D skin viewer
- `#projectsGrid` - Container for project cards
- `#theme-toggle` - Theme toggle button

## Security Considerations

1. **XSS Prevention:**
   - Uses `textContent` instead of `innerHTML` for user-controllable data
   - Static SVGs (GitHub icon) are safe
   - External skin fetched from trusted source (crafatar.com)

2. **Content Security:**
   - No eval() or dynamic script injection
   - Safe DOM methods throughout
   - External scripts (skinview3d, Bootstrap Icons, fonts) from trusted CDNs

3. **Link Safety:**
   - All external links use `rel="noopener noreferrer"`
   - GitHub and demo links are hardcoded in data

## Performance Optimizations

- **Image Loading:** Lazy loading via `img.loading = 'lazy'`
- **CSS:** Tailwind's PurgeCSS via Vite plugin
- **Animations:** GPU-accelerated transforms (translate, scale)
- **Bundle:** ES6 modules for tree-shaking
- **No heavy dependencies:** Core functionality is vanilla JS

## Development Workflow

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Version Info
- **Package Version:** 1.0.0
- **Node Type:** ES Modules (type: "module")
- **Created:** 2025-12-22
- **Last Updated:** Phase 01 - Project Setup & Architecture

## Known Limitations / Future Considerations

1. **Project Data:** Currently hardcoded, could migrate to JSON/API
2. **Skin UUID:** Hardcoded, could make configurable
3. **Internationalization:** Single language (English)
4. **Dark Mode Default:** CSS variables support light mode but UI optimized for dark
5. **No Form Validation:** Contact section likely needs backend integration
