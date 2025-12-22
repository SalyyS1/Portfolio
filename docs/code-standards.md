# Code Standards & Architecture

## JavaScript Standards

### Module Organization
- **File Structure:** One component per file under `src/components/`
- **Export Style:** Named exports (ES6 modules)
- **Import Pattern:** Relative paths from component directory
- **Initialization:** Single `init*` or `render*` function per module

```javascript
// Pattern: Each component exports a single init function
export function initThemeToggle() { ... }
export function renderProjects() { ... }
```

### Naming Conventions

**Functions:**
- Initialization: `init[Component]()` (e.g., `initSkinViewer`)
- Renderers: `render[Component]()` (e.g., `renderProjects`)
- Helpers: camelCase descriptive names (e.g., `toggleTheme`, `createProjectCard`)
- Private: Prefix with `_` or use closure (e.g., `_showSkinError`)

**Variables:**
- Constants: UPPER_SNAKE_CASE (e.g., `SKIN_CONFIG`, `THEME_KEY`, `DARK_CLASS`)
- Objects/Arrays: camelCase (e.g., `projects`, `skinUrl`)
- DOM Elements: suffix with `El` or `Node` (e.g., `canvas`, `navLinks`)

**CSS Classes:**
- Tailwind utilities: lowercase with hyphens (e.g., `bg-darker`, `text-primary`)
- Custom classes: kebab-case (e.g., `glass-card`, `text-glow`)

### Code Patterns

**Safe DOM Manipulation:**
```javascript
// ✓ Safe: textContent (no XSS)
element.textContent = userContent

// ✗ Avoid: innerHTML with user data
element.innerHTML = userContent

// ✓ Safe: Static HTML via setAttribute
img.src = url
element.href = link
```

**Event Handling:**
```javascript
// Use addEventListener, no inline handlers
element.addEventListener('click', (e) => {
  e.preventDefault()
  // handle event
})
```

**Null Checks:**
```javascript
// Early return pattern for optional elements
if (!element) return

// Check existence before using
if (element && element.classList) { ... }
```

### Comments & Documentation

**JSDoc Format (for public functions):**
```javascript
/**
 * Initialize the skin viewer on the canvas element
 */
export function initSkinViewer() { ... }

/**
 * Create a project card element
 * @param {Object} project - Project data
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(project) { ... }
```

**Inline Comments:**
- Use sparingly, explain "why" not "what"
- Group related comments with code

## CSS Standards

### Tailwind CSS v4

**Configuration:** Inline `@theme` directive in `src/styles/main.css`

**Class Organization:**
- Layout: `flex`, `grid`, `w-*`, `h-*`
- Spacing: `p-*`, `m-*`, `gap-*`
- Colors: `bg-*`, `text-*`, `border-*`
- Effects: `shadow-*`, `opacity-*`, `transition-*`
- States: `hover:*`, `focus:*`, `group-hover:*`

**Breakpoints:** `md:` (768px) for responsive design

**Custom Colors (via @theme):**
```css
--color-primary: #00ffff      /* Cyan accent */
--color-dark: #1a1a1a        /* Secondary background */
--color-darker: #0a0a15      /* Primary background */
--color-light: #f5f5f5       /* Light text */
--color-gray-light: #aaaaaa  /* Secondary text */
```

**Theme Variables:**
```css
/* Light mode (default) */
--bg-primary: #f5f5f5
--text-primary: #1a1a1a

/* Dark mode */
.dark { --bg-primary: #0a0a15; }
```

**Animation Classes:**
- `fadeIn` (0.5s ease-out)
- `slideUp` (0.5s ease-out with translateY)

## HTML Standards

### Semantic Markup
- Sections identified by `id` attributes: `#home`, `#projects`, `#about`, `#contact`
- Navigation uses semantic `<nav>` with `<ul>` and `<li>`
- Button elements for interactive controls (not divs)

### Accessibility
- `alt` attributes on all images (required)
- `aria-label` on icon buttons
- `aria-hidden="true"` on decorative elements
- Proper `lang` attribute on root element

### Link Attributes
- External links: `target="_blank" rel="noopener noreferrer"`
- Internal links: anchor-based `href="#section-id"`

## Component Architecture

### Initialization Pattern

All components follow this pattern:

```javascript
/**
 * [Description]
 */

// 1. Configuration/Constants
const CONFIG = { ... }

// 2. Main export function
export function init[Component]() {
  // Validate DOM elements exist
  if (!element) return

  // Initialize sub-functions
  initSubFeature()
}

// 3. Helper functions (private)
function helper() { ... }
```

### Data Structure Pattern

**Project Objects:**
```javascript
{
  name: string,
  type: 'Web' | 'Tool' | 'Plugin' | 'Config',
  tools: string[],
  description: string,
  image: string (relative path),
  demo: string | null (URL),
  github: string | null (URL)
}
```

**Skin Configuration:**
```javascript
{
  uuid: string (Minecraft UUID),
  name: string,
  width: number,
  height: number,
  zoom: number
}
```

## Performance Guidelines

### Bundle Size
- Avoid large dependencies (use vanilla JS when possible)
- Use dynamic imports for optional features
- Lazy-load images with `loading="lazy"`

### DOM Performance
- Batch DOM updates
- Use `classList` for multiple changes
- Avoid reflows with calculated positions (cache values)

### CSS Performance
- Prefer `transform` and `opacity` for animations (GPU-accelerated)
- Use Tailwind's utility classes (already optimized)
- Limit use of `nth-child` selectors in CSS

## Error Handling

### Try-Catch Usage
```javascript
try {
  risky()
} catch (error) {
  console.error('Context: ', error)
  showUserFriendlyError()
}
```

### Fallback UI
- Always provide user-friendly error messages
- Use `textContent` for error text (XSS safe)
- Don't expose technical error details to users

## Testing Approach

Currently no test framework configured. For future implementation:

**Unit Tests:** Individual component initialization
**Integration Tests:** Component interactions
**E2E Tests:** Full user flows (navigation, theme toggle)

## Build Configuration

### Vite
- **Dev Server:** Port 3000 with auto-open
- **Output:** ESbuild minification, no source maps
- **Assets:** Served from `/public/assets`

### Environment
- **Node Type:** ES Modules (`"type": "module"`)
- **Node Version:** Recommend 18+

## Code Review Checklist

- [ ] No `innerHTML` with user-controlled content
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] Functions have JSDoc comments
- [ ] Console errors/warnings for debugging are minimal
- [ ] Classes use Tailwind utilities (no custom CSS unless necessary)
- [ ] Responsive design tested at `md:` breakpoint
- [ ] Images have lazy loading and alt text
- [ ] No hardcoded dimensions (use Tailwind)

## File Size Targets

- **bundle:** < 50KB gzipped (after build)
- **images:** Optimized, next-gen formats where possible
- **CSS:** Purged by Tailwind (only used utilities included)

## Dependencies Update Policy

- Tailwind CSS: Follow v4.x patch updates
- Vite: Update within stable minor versions
- CDN libraries: Pin versions explicitly in HTML
