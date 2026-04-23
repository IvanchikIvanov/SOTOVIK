# ZABERG Design System

## Overview

**ZABERG** is a Russian-language premium electronics e-commerce store. The brand is positioned around precision and premium quality — "Каталог премиум техники" with the promise of exact parameter filtering (size, memory, RAM, NFC, availability, price).

**Sources provided:**
- 3 brand texture PNG images (see `assets/texture-magenta.png`, `assets/texture-blue.png`, `assets/texture-green.png`) — uploaded by the client; no Figma link or codebase was provided.
- Brand/product description in the project brief.

> ⚠️ No codebase or Figma was attached. This design system was constructed from the brand description and texture assets. Attach the source code or Figma for higher fidelity.

---

## Products & Catalog

| Category (RU) | Category (EN) |
|---|---|
| Смартфоны | Smartphones |
| Планшеты | Tablets |
| Компьютеры | Computers |
| Умные часы | Smart Watches |
| Наушники | Headphones |
| Игровые приставки | Gaming Consoles |
| Техника для дома | Home Appliances |
| Аксессуары | Accessories |

**Featured Brands:** Apple, Samsung, Xiaomi, Honor, Google, Realme, Dyson

---

## CONTENT FUNDAMENTALS

**Language:** Russian primary. UI copy is in Russian.

**Tone:** Confident, precise, technical. ZABERG speaks like a knowledgeable expert, not a pusher. Copy is short, factual, and specific.

**Casing:** Title case for headings in Russian convention (first word capitalized only). ALL CAPS used sparingly for the brand name "ZABERG" and category labels in nav.

**Voice — "you" not "I":** Copy addresses the user directly ("Выберите устройство", "Найдите нужный товар") — active, second-person imperative.

**Emoji:** Not used. The brand is premium and technical; emoji would undercut that.

**Numbers & specs:** Specs are front-and-center. Memory (GB), RAM, screen size ("), NFC, price (₽) are always shown prominently. Numbers are formatted with spaces as thousands separators (e.g. `129 990 ₽`).

**Example copy patterns:**
- Headlines: «Каталог премиум техники»
- Subheads: «Выберите устройство по точным параметрам: размер, память, RAM, NFC, наличие и цене»
- CTAs: «Смотреть каталог», «Добавить в корзину», «Подробнее»
- Filter labels: «Память», «Оперативная память», «Экран», «NFC», «В наличии»

---

## VISUAL FOUNDATIONS

### Color

A high-contrast, dark-base palette with three vivid stripe-texture accent colors:

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#0a0a0a` | Page background |
| `--bg-surface` | `#141414` | Cards, panels |
| `--bg-elevated` | `#1e1e1e` | Hover/elevated cards |
| `--fg-1` | `#ffffff` | Primary text |
| `--fg-2` | `#a0a0a0` | Secondary/meta text |
| `--fg-3` | `#505050` | Disabled/placeholder |
| `--accent-magenta` | `#d93caf` | Primary CTA, logo accent |
| `--accent-blue` | `#3a6fd8` | Links, filters, info |
| `--accent-green` | `#2db55d` | In-stock badges, success |
| `--border` | `#2a2a2a` | Card/panel borders |
| `--border-focus` | `#d93caf` | Focus ring |

### Typography

No custom font files provided. **Google Fonts substitution used:**
- **Display/Brand:** `Unbounded` (geometric, premium) — replaces any custom display font
- **Body/UI:** `Inter` — clean, readable for specs and catalog UI

> ⚠️ If ZABERG has a custom typeface, please provide font files and this will be updated.

| Scale | Font | Size | Weight | Usage |
|---|---|---|---|---|
| `--h1` | Unbounded | 48px | 800 | Page heroes |
| `--h2` | Unbounded | 32px | 700 | Section titles |
| `--h3` | Unbounded | 22px | 600 | Card titles |
| `--h4` | Inter | 18px | 600 | Sub-section, panel heads |
| `--body` | Inter | 15px | 400 | Body copy |
| `--small` | Inter | 13px | 400 | Meta, labels |
| `--micro` | Inter | 11px | 500 | Badges, tags |
| `--mono` | `monospace` | 13px | 400 | Specs, code |

### Spacing

Base unit: `8px`. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

### Corner Radii

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Badges, tags |
| `--radius-md` | `8px` | Buttons, inputs |
| `--radius-lg` | `12px` | Cards |
| `--radius-xl` | `20px` | Modal, large panels |

### Backgrounds & Textures

Three stripe-pattern textures are core visual assets:
- **Magenta stripes** (`assets/texture-magenta.png`) — hero sections, primary CTAs, featured product highlights
- **Blue stripes** (`assets/texture-blue.png`) — category headers, info panels
- **Green stripes** (`assets/texture-green.png`) — promotional banners, sale sections

Textures are used as `background-image` overlaid with a semi-transparent dark scrim (`rgba(0,0,0,0.65)`) to ensure text legibility.

### Cards

Cards have: `background: var(--bg-surface)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)`, `box-shadow: 0 2px 12px rgba(0,0,0,0.4)`. On hover: border lightens to `#3a3a3a`, subtle `translateY(-2px)` lift, shadow deepens.

### Animations

- Transitions: `200ms ease-out` default
- Hover lifts: `translateY(-2px)`
- No bounces; no spring physics. Clean, minimal, premium.
- Skeleton loading with `shimmer` keyframe on cards.

### Shadows & Elevation

| Level | Value |
|---|---|
| `--shadow-sm` | `0 1px 4px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 2px 12px rgba(0,0,0,0.4)` |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.6)` |

### Imagery

Product photos on dark neutral backgrounds. Color vibe: cool, desaturated. No grain. No warm tones. Photography is clean studio style.

### Hover & Press States

- **Buttons:** background darkens by ~15%, slight scale `0.98` on press
- **Cards:** lift + border lighten
- **Links:** color shifts to `--fg-1` (white), no underline on hover
- **Filters/chips:** toggle between `--bg-surface` and `--accent-blue` with white text

### Iconography (see ICONOGRAPHY below)

No custom icon font provided. Lucide Icons (stroke, 1.5px weight) used as CDN substitute.

---

## ICONOGRAPHY

**No custom icon set was provided.** Lucide Icons (`https://unpkg.com/lucide@latest`) is used as a substitute — it is a clean, 1.5px-stroke outline icon system that matches the technical, premium tone.

> ⚠️ If ZABERG uses a proprietary icon font or custom SVG set, please provide it and this will be updated.

**Usage patterns:**
- Category icons: one icon per category (smartphone, tablet, monitor, watch, headphones, gamepad, home, package)
- UI icons: search, cart, heart, filter, chevron, close, check, star
- Never used decoratively; always functional and labeled
- Size: 20px default in UI; 24px in nav; 16px in badges/tags

---

## File Index

```
README.md                    — this file
SKILL.md                     — agent skill definition
colors_and_type.css          — all CSS custom properties
assets/
  texture-magenta.png        — stripe texture (magenta)
  texture-blue.png           — stripe texture (blue)  
  texture-green.png          — stripe texture (green)
preview/
  colors-base.html           — base color swatches
  colors-accent.html         — accent color swatches
  colors-semantic.html       — semantic color tokens
  typography-display.html    — display type specimens
  typography-body.html       — body/UI type scale
  spacing-tokens.html        — spacing + radius tokens
  shadows.html               — shadow/elevation system
  textures.html              — texture assets
  btn-primary.html           — primary/secondary buttons
  btn-states.html            — button states
  form-inputs.html           — input fields & filters
  badges.html                — badges, tags, chips
  product-card.html          — product card component
  category-card.html         — category card component
ui_kits/
  website/
    README.md                — UI kit overview
    index.html               — interactive prototype
    Header.jsx               — site header component
    ProductCard.jsx          — product card
    CategoryGrid.jsx         — category grid
    FilterPanel.jsx          — filter sidebar
    ProductList.jsx          — product listing page
```
