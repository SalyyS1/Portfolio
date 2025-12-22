# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser Environment                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              index.html (Root Document)             │    │
│  │  • Dark mode default (class="dark")                │    │
│  │  • Semantic HTML structure with id selectors      │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                   │
│          ┌────────────────┼────────────────┐                 │
│          ▼                ▼                 ▼                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │ main.js      │ │ main.css     │ │ index.html   │         │
│  │ (Entry)      │ │ (Tailwind)   │ │ (Markup)     │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│        │                 │                                    │
│        └─────────┬───────┘                                    │
│                  ▼                                            │
│  ┌───────────────────────────────────────────────┐          │
│  │        Component Initialization System         │          │
│  ├───────────────────────────────────────────────┤          │
│  │                                               │          │
│  │  [1] initThemeToggle()                       │          │
│  │      └─► Load theme from localStorage        │          │
│  │      └─► Apply dark/light class              │          │
│  │                                               │          │
│  │  [2] initNavigation()                        │          │
│  │      ├─► initMobileMenu()                    │          │
│  │      ├─► initSmoothScroll()                  │          │
│  │      └─► initActiveLinks()                   │          │
│  │                                               │          │
│  │  [3] initSkinViewer()                        │          │
│  │      ├─► Fetch skin from Crafatar API       │          │
│  │      ├─► Initialize skinview3d              │          │
│  │      └─► Handle errors gracefully           │          │
│  │                                               │          │
│  │  [4] renderProjects()                        │          │
│  │      └─► Dynamically create project cards   │          │
│  │                                               │          │
│  └───────────────────────────────────────────────┘          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Execution Flow

### Application Boot Sequence

```
Page Load
  │
  ├─► Parse HTML & Execute <script> imports
  │
  ├─► DOMContentLoaded Event
  │   ├─► initThemeToggle()
  │   │   ├─ Check localStorage for 'salyvn-theme'
  │   │   ├─ Apply .dark class if needed
  │   │   └─ Setup toggle button listener
  │   │
  │   ├─► initNavigation()
  │   │   ├─ Setup mobile hamburger menu
  │   │   ├─ Attach smooth scroll listeners
  │   │   └─ Create Intersection Observer for active links
  │   │
  │   ├─► initSkinViewer()
  │   │   ├─ Check for #skin-canvas element
  │   │   ├─ Fetch from Crafatar API
  │   │   └─ Initialize skinview3d.SkinViewer instance
  │   │
  │   └─► renderProjects()
  │       ├─ Get #projectsGrid container
  │       └─ Loop: Create & append project cards
  │
  └─► Page Interactive

Runtime Events
  ├─► Window Scroll → Intersection Observer updates active nav link
  ├─► Theme Toggle Click → Save to localStorage + toggle .dark
  ├─► Mobile Menu Click → Toggle nav-links visibility
  └─► Smooth Scroll Click → Animate to section
```

## Component Architecture

### 1. Theme Toggle Component

**File:** `src/components/theme-toggle.js`

**State:**
```
localStorage['salyvn-theme'] = 'dark' | 'light'
document.documentElement.classList = '.dark' (when dark mode)
```

**Responsibilities:**
- Restore theme preference on page load
- Toggle theme on button click
- Update icon visibility (sun/moon SVG)
- Persist preference in localStorage

**Key Functions:**
- `initThemeToggle()` - Setup theme system
- `toggleTheme(toggleBtn)` - Switch themes
- `updateToggleIcon(toggleBtn)` - Sync icon with theme

**DOM Dependencies:**
- Element: `#theme-toggle` (button)
- Selectors: `.sun-icon`, `.moon-icon`
- Root: `document.documentElement` (for class)

### 2. Navigation Component

**File:** `src/components/navigation.js`

**Three Sub-Systems:**

#### a) Mobile Menu
- Toggles `.nav-links` between `hidden` and `flex` classes
- Adds/removes `.active` class on hamburger button
- Auto-closes menu when clicking links on mobile (<768px)

#### b) Smooth Scroll
- Attaches click handlers to all `a[href^="#"]` anchors
- Calculates scroll position accounting for navbar height
- Uses `window.scrollTo({ behavior: 'smooth' })`

#### c) Active Link Highlighting
- Uses Intersection Observer API to detect visible sections
- Sections: `section[id]` elements
- Links: `.nav-links a` elements
- Adds `text-primary` class to matching link

**DOM Dependencies:**
- `.mobile-menu-btn` (hamburger)
- `.nav-links` (nav menu container)
- `section[id]` (scrollable sections)
- `.navbar` (for height offset calculation)

### 3. Skin Viewer Component

**File:** `src/components/skin-viewer.js`

**Configuration:**
```javascript
{
  uuid: '9b6ebdbbd92041faa61721ddc6658708',
  width: 300,
  height: 400,
  zoom: 0.8
}
```

**External Dependency:**
- Library: skinview3d (CDN via `<script>` tag)
- API: Crafatar API (`https://crafatar.com/skins/{uuid}`)

**Features:**
- Loads Minecraft skin via Crafatar
- Renders 3D model on canvas
- Enables rotate + zoom controls
- Plays walking animation (if available)
- Fallback error UI on failure

**DOM Dependencies:**
- Canvas: `#skin-canvas`
- Error container: `.minecraft-skin`

### 4. Projects Component

**File:** `src/components/projects.js`

**Data Structure:**
```javascript
const projects = [
  {
    name: string,
    type: 'Web' | 'Tool' | 'Plugin' | 'Config',
    tools: string[],        // e.g., ['HTML', 'CSS', 'JS']
    description: string,
    image: string,          // relative path
    demo: string | null,
    github: string | null
  },
  // ... 6 projects total
]
```

**Rendering Process:**
1. Get container: `#projectsGrid`
2. Loop each project
3. Create card structure (DOM elements)
4. Append to grid

**Card Structure:**
```
<div class="glass-card ...">
  <div class="image-container">
    <img> (lazy loaded)
    <div class="overlay"> (hover effect)
  </div>
  <div class="content">
    <h3>Project Name</h3>
    <p>Description</p>
    <div class="tags">
      <span>Tool</span> ...
    </div>
    <div class="links">
      <a href="demo">Demo</a>
      <a href="github">GitHub</a>
    </div>
  </div>
</div>
```

**DOM Dependencies:**
- Container: `#projectsGrid`

## Data Flow

### Theme State
```
localStorage ──► sessionStart
                    │
                    ▼
             document.documentElement
                    │
                    ├─► .dark removed (light mode)
                    └─► .dark applied (dark mode)
                         │
                         ▼
                    CSS variables apply
                    --bg-primary, --text-primary, etc.
```

### Navigation State
```
Window Scroll ──► Intersection Observer
                      │
                      ▼
                 Entry.isIntersecting?
                      │
                      ├─► Yes: Find matching nav link
                      │         └─► Add .text-primary
                      │
                      └─► No: Remove from previous link
```

### Project Data
```
projects[] (hardcoded)
    │
    ▼
renderProjects()
    │
    ├─► Loop each project
    │
    └─► createProjectCard() ──► Append to DOM
             │
             ├─ Create elements (safe DOM methods)
             ├─ Set attributes (src, href, etc.)
             ├─ Use textContent for text (XSS safe)
             └─ Append to grid
```

## External Dependencies

### Runtime
```
CDN ─┬─► skinview3d.min.js (3D rendering)
     │
     ├─► bootstrap-icons.css (Icons library)
     │
     ├─► Google Fonts
     │   ├─ Poppins (sans-serif)
     │   └─ JetBrains Mono (monospace)
     │
     └─► Crafatar API (Minecraft skins)
```

### Build-Time (Dev Dependencies)
```
npm install
     │
     ├─► vite (build tool)
     ├─► @tailwindcss/vite (CSS plugin)
     ├─► tailwindcss (CSS framework)
     ├─► postcss (CSS processor)
     └─► autoprefixer (CSS vendor prefixes)
```

## Styling Architecture

### CSS Processing Pipeline

```
src/styles/main.css
        │
        ├─► @import "tailwindcss"
        │        │
        │        ▼
        │   Tailwind CSS v4
        │   (utility-first framework)
        │
        ├─► @theme { custom colors, fonts }
        │        │
        │        ├─► color-primary: #00ffff
        │        ├─► color-dark: #1a1a1a
        │        └─► animations: fadeIn, slideUp
        │
        └─► :root variables (light mode)
            .dark variables (dark mode)
                 │
                 ▼
            CSS Variables
            --bg-primary
            --text-primary
            --text-secondary
            --card-shadow
```

### Color System

**Primary Color:** `#00ffff` (Cyan)
- Used for: accents, hover states, primary buttons, text-primary

**Background Colors:**
- Dark: `#0a0a15` (primary-bg)
- Secondary Dark: `#1a1a1a` (cards)
- Light: `#f5f5f5` (light mode)

**Text Colors:**
- Light: `#f5f5f5`
- Gray: `#aaaaaa`
- Dark: `#1a1a1a` (light mode)

## Security Architecture

### XSS Prevention
```
Component Data ─┬─► User Input? ──► Use textContent
                │
                ├─► Static HTML? ──► Safe (SVG icons)
                │
                └─► URL? ──► Validate & sanitize
                              (use href, src attributes)
```

### Content Security
- No `eval()` or dynamic script injection
- All scripts from trusted CDNs
- External links use `rel="noopener noreferrer"`
- Crafatar API is trusted source for skins

## Browser Compatibility

**Target:** Modern browsers (ES6 modules required)
- Chrome 61+
- Firefox 67+
- Safari 12+
- Edge 79+

**Features:**
- ES6 modules
- CSS Grid/Flexbox
- CSS Variables
- Intersection Observer API
- LocalStorage API

## Build & Deployment Pipeline

```
Source Code (src/)
        │
        ▼
    Vite
    ├─► Bundle JS modules
    ├─► Process CSS (Tailwind purge)
    ├─► Copy static assets
    └─► Minify output
        │
        ▼
    dist/
    ├─► index.html (minified)
    ├─► assets/
    │   ├─► main.[hash].js
    │   ├─► main.[hash].css
    │   ├─► images/
    │   └─► other static files
    └─► [Ready for deployment]
```

**Development:** `npm run dev` (port 3000)
**Production:** `npm run build` + `npm run preview`

## Scalability Considerations

### Current Limitations
- Project data hardcoded (not scalable for 100+ projects)
- No backend integration
- Skin UUID hardcoded
- No pagination/filtering

### Future Scaling Options
1. **Dynamic Data:** API endpoint for projects
2. **Project Management:** Database (MongoDB/PostgreSQL)
3. **Admin Interface:** CMS for managing portfolio
4. **Authentication:** User accounts if needed
5. **Server:** Node.js backend (Vite can integrate)

## Performance Characteristics

**Initial Load:**
- HTML: Parsed synchronously
- JS: Loaded as ES modules (parallel download)
- CSS: Tailwind utilities (purged, ~20-30KB gzipped)
- Assets: Images lazy-loaded

**Runtime:**
- Theme toggle: Instant (localStorage + class toggle)
- Navigation: Smooth scroll (CSS animation)
- Skin viewer: Initial load ~2-3 seconds (API + WebGL)
- Projects: Rendered synchronously (DOM creation ~100ms)

**Optimization Opportunities:**
- Cache Crafatar skin image
- Implement service worker for offline mode
- Split large images into multiple sizes
- Preload critical resources (fonts, skin)
