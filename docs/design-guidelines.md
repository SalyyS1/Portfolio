# SalyVn Portfolio - Design Guidelines

**Version:** Phase 02 (Complete)
**Last Updated:** 2025-12-22
**Theme:** Cyberpunk-Minimalist with Glassmorphism

## Design System Overview

The design system is built on a custom theme within **Tailwind CSS v4** using the `@theme` block in `/src/styles/main.css`. All design tokens are centralized and documented below.

---

## 1. Color Palette

### Primary Colors
- **Primary Cyan:** `#00ffff`
  - Primary action, accents, glows
  - Variants: Dark `#00cccc`, Light `#66ffff`
  - Glow effect: `rgba(0, 255, 255, 0.5)`

### Surface Colors (Dark Theme)
- **Darker:** `#0a0a15` - Deepest background
- **Dark:** `#10101a` - Primary background
- **Surface:** `#1a1a2e` - Card backgrounds
- **Light:** `#252540` - Elevated surfaces

### Text Colors
- **Primary:** `#f5f5f5` - Main readable text
- **Secondary:** `#aaaaaa` - Subheadings, meta
- **Muted:** `#888888` - Disabled, subtle

### Accent Colors
- **Purple:** `#a855f7` - Gradient accents
- **Lime:** `#84cc16` - Status/highlights

### Legacy Support
- `--color-dark: #1a1a1a`
- `--color-gray-custom: #333333`
- `--color-gray-light: #aaaaaa`

---

## 2. Typography

### Fonts
- **Sans-serif:** Poppins (400, 500, 600, 700) - Primary font
- **Monospace:** JetBrains Mono (400, 700) - Code blocks

### Font Size Scale
| Class | Size | Pixels | Usage |
|-------|------|--------|-------|
| `--font-size-xs` | 0.75rem | 12px | Small labels, badges |
| `--font-size-sm` | 0.875rem | 14px | Secondary text |
| `--font-size-base` | 1rem | 16px | Body text |
| `--font-size-lg` | 1.125rem | 18px | Section intro |
| `--font-size-xl` | 1.25rem | 20px | Subheadings |
| `--font-size-2xl` | 1.5rem | 24px | Card titles |
| `--font-size-3xl` | 2rem | 32px | Section headers |
| `--font-size-4xl` | 2.5rem | 40px | Page titles |
| `--font-size-hero` | 3.5rem | 56px | Hero banners |

### Line Height
- Default body: `1.7` - Comfortable reading
- Code/pre: Monospace-specific

---

## 3. Spacing System (8-Point Grid)

All spacing uses a **8-point base grid** for consistency.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--spacing-1` | 0.25rem | 4px | Icon padding, tight spacing |
| `--spacing-2` | 0.5rem | 8px | Button padding, gaps |
| `--spacing-3` | 0.75rem | 12px | Field padding |
| `--spacing-4` | 1rem | 16px | Standard padding |
| `--spacing-6` | 1.5rem | 24px | Card padding |
| `--spacing-8` | 2rem | 32px | Section spacing |
| `--spacing-12` | 3rem | 48px | Large gaps |
| `--spacing-16` | 4rem | 64px | Section dividers |
| `--spacing-20` | 5rem | 80px | Major sections |
| `--spacing-24` | 6rem | 96px | Hero spacing |

---

## 4. Shadow System

### Card Shadows
- **Default:** `0 4px 15px rgba(0, 255, 255, 0.15)` - Subtle depth
- **Hover:** `0 10px 30px rgba(0, 255, 255, 0.3)` - Lifted appearance
- **Glow:** `0 0 20px rgba(0, 255, 255, 0.4)` - Neon glow

### Button Shadows
- **Default:** `0 4px 15px rgba(0, 255, 255, 0.3)` - Button press
- **Hover:** `0 6px 20px rgba(0, 255, 255, 0.5)` - Active state

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.375rem (6px) | Small elements |
| `--radius-md` | 0.5rem (8px) | Default (buttons, inputs) |
| `--radius-lg` | 0.75rem (12px) | Cards |
| `--radius-xl` | 1rem (16px) | Modals, large cards |
| `--radius-full` | 9999px | Perfect circles, badges |

---

## 6. Component Library

### Glass Card (`.glass-card`)
Glassmorphism effect with backdrop blur and transparency.

```css
.glass-card {
  background: rgba(16, 16, 26, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease-out;
}

.glass-card:hover {
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: var(--shadow-card-hover);
}
```

**Variants:**
- `.glass-card-hover` - Lift effect on hover (`translateY(-0.5rem)`)
- `.glass-subtle` - Lighter blur (8px) and transparency

**Usage:** Information cards, project containers, about sections

---

### Button System

#### Base Button (`.btn`)
```css
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
font-weight: 500;
transition: all 0.3s ease-out;
```

**Focus Style:**
```css
outline: 2px solid rgba(0, 255, 255, 0.5);
outline-offset: 2px;
```

#### Primary Button (`.btn-primary`)
- Background: Cyan (`#00ffff`)
- Text: Dark surface
- On hover: Dark variant, lift 2px, enhanced shadow

#### Ghost Button (`.btn-ghost`)
- Background: Transparent with white/10
- Border: White/20
- On hover: White/20 bg, White/30 border

#### Icon Button (`.btn-icon`)
- Perfect circular (radius-full)
- Size: 0.75rem padding
- On hover: Scale 1.1, fill with primary color

#### Size Variants
- `.btn-sm` - `0.5rem 1rem`, `font-size-sm`
- `.btn-lg` - `1rem 2rem`, `font-size-lg`

---

### Badges & Tags

#### Badge (`.badge`)
Pill-shaped, used for skill tags and labels.

```css
padding: 0.25rem 0.75rem;
font-size: var(--font-size-xs);
border-radius: var(--radius-full);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
```

**Variant:** `.badge-primary` - Cyan background with primary border

#### Tag (`.tag`)
Rectangular, lighter styling for categorization.

```css
padding: 0.25rem 0.5rem;
border-radius: var(--radius-sm);
background: rgba(255, 255, 255, 0.1);
transition: all 0.2s ease-out;
```

---

### Section Titles

#### Main Title (`.section-title`)
- Font size: `font-size-4xl` (40px)
- Weight: 700
- Center-aligned with decorative underline
- Text shadow glow: `0 0 15px rgba(0, 255, 255, 0.5)`

**Pseudo-element underline:**
- Width: 6rem, Height: 0.25rem
- Color: Primary cyan
- Positioned 1rem below text

#### Subtitle (`.section-subtitle`)
- Font size: `font-size-lg`
- Color: Text secondary
- Italic styling
- Margin-bottom: 3rem

---

### Form Inputs

#### Text Input (`.input`)
```css
padding: 0.75rem 1rem;
background: rgba(16, 16, 26, 0.5);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: var(--radius-md);
transition: all 0.2s ease-out;
```

**Focus State:**
- Border: Cyan/50
- Shadow: `0 0 0 3px rgba(0, 255, 255, 0.1)`

**Placeholder:**
- Color: Text muted (`#888888`)

#### Textarea (`.textarea`)
- Min-height: 120px
- Resize: Vertical only
- Same styling as input with focus states

---

### Utility Classes

#### Text Effects
- `.text-glow` - Neon text shadow `0 0 10px rgba(0, 255, 255, 0.8)`
- `.text-gradient` - Cyan to purple gradient with clip effect

#### Link Styling
- `.link` - Primary cyan color, no underline
- On hover: Light cyan variant with glow shadow

#### Dividers
- `.divider` - 1px height with horizontal gradient
  - Gradient: `transparent → rgba(0, 255, 255, 0.3) → transparent`
  - Margin: 2rem vertical

---

## 7. Animations & Transitions

### Defined Keyframes

#### `fadeIn`
```css
0% { opacity: 0; }
100% { opacity: 1; }
```
Duration: 0.5s ease-out

#### `slideUp`
```css
0% { opacity: 0; transform: translateY(20px); }
100% { opacity: 1; transform: translateY(0); }
```
Duration: 0.5s ease-out

#### `pulseGlow`
```css
0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
50% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.6); }
```
Duration: 2s ease-in-out infinite

### Transition Rules
- Default: `all 0.3s ease-out`
- Quick interactions: `0.2s ease-out`
- Smooth transitions: `0.5s ease-out`

---

## 8. Scrollbar Styling

Custom webkit scrollbar for dark theme:
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #0a0a15; }
::-webkit-scrollbar-thumb { background: #00cccc; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #00ffff; }
```

---

## 9. Accessibility Features

### Skip Link
- `.skip-link` - Positioned off-screen, revealed on focus
- Keyboard users can jump to main content
- Background: Primary cyan, dark text

### Focus Visibility
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```
WCAG AA compliant cyan outline

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Respects user's motion preferences

### Contrast Ratios
- Primary cyan (#00ffff) on dark backgrounds: 7.3:1 (WCAG AAA)
- Text primary (#f5f5f5) on surfaces: 8.1:1 (WCAG AAA)
- Text secondary (#aaaaaa) on surfaces: 4.8:1 (WCAG AA)

---

## 10. Responsive Utilities

### Container Widths
```css
.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1280px; }
```

### Breakpoints (Tailwind v4)
- Mobile-first approach
- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop)

---

## 11. Light Mode Support

CSS variables automatically switch in light mode:
```css
:root {
  --bg-primary: #f5f5f5;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #333333;
}
```

**Note:** UI is optimized for dark mode; light mode support is functional but secondary.

---

## 12. Design Tokens Reference

### Quick Copy-Paste Variables
```css
/* Colors */
--color-primary: #00ffff;
--color-surface-darker: #0a0a15;
--color-text-primary: #f5f5f5;
--color-accent-purple: #a855f7;

/* Typography */
--font-family-sans: 'Poppins', system-ui, sans-serif;

/* Spacing */
--spacing-4: 1rem;

/* Shadows */
--shadow-card: 0 4px 15px rgba(0, 255, 255, 0.15);
```

---

## Implementation Notes

1. **Tailwind v4:** Uses CSS-based `@theme` instead of config files
2. **Import:** CSS requires `@import "tailwindcss";` at the top
3. **Backward Compatibility:** Legacy color variables preserved for existing code
4. **Glass Effect:** Requires `-webkit-backdrop-filter` for Safari support
5. **Neon Aesthetic:** Cyan glow used consistently across interactive elements

---

## Design Philosophy

- **Cyberpunk-Minimalist:** Neon accents on minimal, dark surfaces
- **Glassmorphism:** Transparency and blur for depth perception
- **Accessibility First:** High contrast, keyboard navigation, motion respect
- **Performance:** GPU-accelerated transforms, minimal animations
- **Consistency:** All tokens centralized in `@theme` block

