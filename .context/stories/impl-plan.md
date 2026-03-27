# Technical Implementation Plan
## Saint Stephen-in-the-Fields Website Migration
### TextPattern CMS → Sanity CMS + Astro

---

## 1. Technical Architecture Overview

### 1.1 System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Sanity CMS     │────▶│  Astro SSG      │────▶│  Cloudflare     │
│  (Content API)   │     │  (Frontend)     │     │  (Hosting)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Studio (Edit)  │     │  Preview Iframe │
│  @sanity/studio │     │  (Live Updates) │
└─────────────────┘     └─────────────────┘
```

### 1.2 Tech Stack

- **CMS:** Sanity v3 (free, open-source)
- **Frontend:** Astro v5 (static site generation)
- **Hosting:** Cloudflare Pages (via @astrojs/cloudflare adapter)
- **Styling:** Vanilla CSS (prototype.css)
- **Fonts:** Google Fonts - Public Sans (400, 700, 400 italic)
- **Images:** Cloudflare Images service

### 1.3 Project Structure

```
saintstephensca/
├── sanity/                    # Sanity Studio
│   ├── schemas/
│   │   ├── index.ts          # Schema exports
│   │   ├── page.ts           # Page schema
│   │   ├── alert.ts          # Alert box schema
│   │   ├── menuItem.ts       # Navigation item schema
│   │   ├── sidebarWidget.ts   # Sidebar widget schema
│   │   └── siteSettings.ts   # Global site settings
│   ├── sanity.config.ts      # Studio configuration
│   └── package.json
├── src/
│   ├── components/           # Astro components
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   ├── AlertBox.astro
│   │   ├── Article.astro
│   │   ├── Sidebar.astro
│   │   ├── Footer.astro
│   │   └── PageLayout.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── [...slug].astro   # Dynamic pages
│   │   └── preview.ts        # Sanity preview endpoint
│   ├── lib/
│   │   └── sanity.ts         # Sanity client & queries
│   └── styles/
│       └── prototype.css     # Main stylesheet
├── public/
│   ├── fonts/
│   └── images/
├── astro.config.mjs
├── sanity.config.ts
└── package.json
```

---

## 2. Component Inventory

### 2.1 Header Components

| Component | Purpose | States |
|-----------|---------|--------|
| `Header.astro` | Site branding with church name, background image | Default |
| `#site-branding` | Contains h1 with home link | - |
| `.address-bar` | Dark utility bar with address/diocese | - |
| `.diocese-link` | Link to Anglican Diocese of Toronto | Default, Hover |

### 2.2 Navigation Components

| Component | Purpose | States |
|-----------|---------|--------|
| `Navigation.astro` | Primary menu with dropdown support | - |
| `nav ul#menu` | Menu list | - |
| `nav li` | Menu item | Default, Active, Hover |
| `nav li a` | Menu link | Default, Active, Hover, Focus |

**Dropdown Menu Structure:**
- Worship (dropdown: Services, Sermons, Music)
- Outreach (dropdown: Breakfast, Drop-In, Advocacy)
- Arts (dropdown: Events, Gallery)
- About (dropdown: History, Staff, Governance)

### 2.3 Content Components

| Component | Purpose | Notes |
|-----------|---------|-------|
| `.alert-box` | Per-page announcements | Optional, CMS-controlled |
| `.welcome` | Main welcome content | Rich text + optional image |
| `.featured-image` | Aligned images in content | Float right, max 300px |
| `.site-previews` | Program preview grid | 3-column layout |
| `.preview-block` | Individual program card | Title, description, link |

### 2.4 Sidebar Widgets

| Widget | Purpose | CMS Schema |
|--------|---------|------------|
| `.service-schedule` | Weekly service times | `serviceSchedule` (global) |
| `.donations` | Donation links | `donationWidget` (global) |
| `.social` | Social media links | `socialLinks` (global) |
| `.badges` | Affirming badge | `siteBadge` (global) |

### 2.5 Footer Component

| Component | Purpose |
|-----------|---------|
| `Footer.astro` | Global footer with copyright |
| `footer[role="contentinfo"]` | Semantic footer landmark |

### 2.6 CSS Variables (Design Tokens)

```css
:root {
  --text-color: #2b2500;
  --text-color-light: #5c4d1a;
  --bg-color: #fffef5;
  --bg-alt: #fff9e6;
  --accent-color: #f5c518;
  --accent-light: #ffdd55;
  --accent-dark: #d4a600;
  --accent-muted: #f5e6b3;
  --border-color: #e8dba8;
  --border-color-dark: #d4c192;
  --alert-bg-color: #fff9e6;
  --link-color: #996600;
  --link-hover: #2b2500;
  --public-sans: "Public Sans", sans-serif;
}
```

---

## 3. Sanity Schema Requirements

### 3.1 Core Schemas

#### Site Settings (Singleton)
```typescript
{
  name: 'siteSettings',
  fields: [
    { name: 'churchName', type: 'string' },
    { name: 'tagline', type: 'string' },
    { name: 'address', type: 'text' },
    { name: 'diocesanLink', type: 'url' },
    { name: 'headerImage', type: 'image' },
    { name: 'footerCopyright', type: 'string' },
    { name: 'socialLinks', type: 'array', of: [{ type: 'object', fields: [...] }] },
    { name: 'donationLinks', type: 'array', of: [{ type: 'object', fields: [...] }] },
    { name: 'serviceSchedule', type: 'array', of: [{ type: 'serviceItem' }] },
    { name: 'navigation', type: 'array', of: [{ type: 'menuItem' }] }
  ]
}
```

#### Page Schema
```typescript
{
  name: 'page',
  fields: [
    { name: 'title', type: 'string', validation: required },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'alertBox', type: 'alert', optional: true },
    { name: 'mainContent', type: 'array', of: [
      { type: 'block' },           // Rich text
      { type: 'alignedImage' },    // Left/center/right aligned
      { type: 'programPreview' }   // Program cards
    ]},
    { name: 'sidebarWidgets', type: 'array', of: [
      { type: 'serviceSchedule' },
      { type: 'donationWidget' },
      { type: 'socialWidget' },
      { type: 'badgeWidget' }
    ]},
    { name: 'seo', type: 'object', fields: [
      { name: 'metaTitle', type: 'string' },
      { name: 'metaDescription', type: 'text' }
    ]}
  ]
}
```

#### Alert Box Schema
```typescript
{
  name: 'alert',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
    { name: 'style', type: 'string', options: {
      list: ['default', 'christmas', 'urgent']
    }}
  ]
}
```

#### Menu Item Schema (Recursive for Dropdowns)
```typescript
{
  name: 'menuItem',
  fields: [
    { name: 'label', type: 'string' },
    { name: 'link', type: 'string' },  // Page slug or external URL
    { name: 'children', type: 'array', of: [{ type: 'menuItem' }] }, // Dropdown items
    { name: 'order', type: 'number' }
  ]
}
```

#### Aligned Image Schema
```typescript
{
  name: 'alignedImage',
  fields: [
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'alignment', type: 'string', options: {
      list: ['left', 'center', 'right']
    }},
    { name: 'caption', type: 'string', optional: true },
    { name: 'alt', type: 'string', validation: required }
  ]
}
```

### 3.2 Schema Simplicity Guidelines

1. **Global widgets** (service schedule, donations, social) should be edited in Site Settings
2. **Per-page content** should use the Page schema with modular blocks
3. **Avoid nested complexity** - maximum 2 levels of depth
4. **Use validation rules** to enforce required fields
5. **Provide sensible defaults** for optional fields

---

## 4. Astro Page Structure

### 4.1 Page Routing

| Route | Template | Source |
|-------|----------|--------|
| `/` | `index.astro` | Homepage with hardcoded welcome content |
| `/[slug]` | `[...slug].astro` | Dynamic pages from Sanity |
| `/preview` | `preview.ts` | Sanity preview API endpoint |

### 4.2 Layout Hierarchy

```
BaseLayout.astro
└── PageLayout.astro (wraps content areas)
    ├── Header.astro
    │   ├── SiteBranding
    │   └── AddressBar
    ├── Navigation.astro
    ├── AlertBox.astro (optional)
    ├── Article.astro
    │   ├── PageHeader (title)
    │   └── RichText (Sanity Portable Text)
    ├── Sidebar.astro
    │   ├── ServiceSchedule widget
    │   ├── DonationWidget
    │   ├── SocialWidget
    │   └── BadgeWidget
    └── Footer.astro
```

### 4.3 Key Astro Components

#### PageLayout.astro
```astro
---
import Header from '../components/Header.astro';
import Navigation from '../components/Navigation.astro';
import Sidebar from '../components/Sidebar.astro';
import Footer from '../components/Footer.astro';
import { getSiteSettings } from '../lib/sanity';

const settings = await getSiteSettings();
const { title, alertBox, mainContent, sidebarWidgets } = Astro.props;
---

<html lang="en-CA">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | {settings.churchName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="/prototype.css" />
</head>
<body>
  <div class="outer">
    <Header settings={settings} />
    <Navigation items={settings.navigation} />
    
    <div class="wrapper">
      <div class="container">
        <main role="main">
          {alertBox && <AlertBox {...alertBox} />}
          <article>
            <slot name="main" />
          </article>
        </main>
        <Sidebar widgets={sidebarWidgets || settings.defaultWidgets} />
      </div>
    </div>
    
    <Footer settings={settings} />
  </div>
</body>
</html>
```

### 4.4 Sanity Integration

#### Client Setup (src/lib/sanity.ts)
```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  // For preview:
  token: import.meta.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts'
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
```

#### Preview Endpoint (src/pages/preview.ts)
```typescript
import type { APIRoute } from 'astro';
import { sanityClient } from '../lib/sanity';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  if (secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }
  
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');
  
  // Redirect to preview URL with draft content
  return new Response(null, {
    status: 307,
    headers: { 'Location': `/api/preview?type=${type}&id=${id}` }
  });
};
```

---

## 5. Accessibility Implementation Checklist

### 5.1 WCAG 2.1 AA Compliance

#### Navigation (Priority: Critical)
- [ ] Skip link as first focusable element (`<a href="#main" class="skip-link">Skip to main content</a>`)
- [ ] All navigation items keyboard accessible (Tab/Enter)
- [ ] Dropdown menus keyboard operable (Arrow keys, Escape)
- [ ] Focus indicator visible on all interactive elements (3:1 contrast minimum)
- [ ] ARIA landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="complementary"`, `role="contentinfo"`
- [ ] Mobile menu: hamburger button with `aria-expanded`, `aria-controls`

#### Images (Priority: High)
- [ ] All images have meaningful `alt` text (or `alt=""` for decorative)
- [ ] Images within rich text support `alt` field in CMS
- [ ] Figure/figcaption structure for captioned images

#### Color & Contrast (Priority: High)
- [ ] Text contrast ratio: 4.5:1 minimum (body text) / 3:1 (large text)
- [ ] Link text contrast: 3:1 against background
- [ ] Focus indicators: 3:1 against adjacent colors
- [ ] Current color palette meets requirements:
  - `--text-color: #2b2500` on `--bg-color: #fffef5` = 12.6:1 ✓
  - `--link-color: #996600` on `--bg-color: #fffef5` = 4.8:1 ✓
  - `--accent-color: #f5c518` on `--text-color: #2b2500` = 3.2:1 ✓

#### Forms (Priority: High)
- [ ] Labels associated with inputs (`for`/`id` or `aria-labelledby`)
- [ ] Error messages programmatically associated
- [ ] Required fields indicated visually AND in code (`required` attribute)

#### Screen Reader Support (Priority: Critical)
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] Page title updated on navigation
- [ ] Live regions for dynamic content (alert boxes)
- [ ] `lang` attribute on `<html>`
- [ ] Navigation announces current page/section

### 5.2 Keyboard Navigation Flow

```
1. Tab → Skip Link (visible on focus)
2. Tab → Church Name Logo (Home link)
3. Tab → Address Bar Links (if any)
4. Tab → Main Navigation Menu
   ├── Tab/Enter → Top-level items
   ├── Enter/Space → Activate link or toggle dropdown
   ├── Arrow Down → Open dropdown / move to first child
   ├── Arrow Up/Down → Navigate within dropdown
   ├── Escape → Close dropdown
5. Tab → Main Content
6. Tab → Sidebar Widgets
7. Tab → Footer
8. Tab → (back to top or exit)
```

### 5.3 Testing Tools

- **Automated:** axe DevTools, WAVE, Lighthouse
- **Manual:** VoiceOver (macOS), NVDA (Windows)
- **Checklist:** WCAG 2.1 AA conformance matrix

---

## 6. Performance Optimization Strategy

### 6.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | Preload header image, optimize |
| FID (First Input Delay) | < 100ms | Minimal JS, code splitting |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit image dimensions |
| TTFB (Time to First Byte) | < 600ms | Edge caching (Cloudflare) |

### 6.2 Image Optimization

- **Format:** WebP with JPEG fallback
- **Responsive:** Multiple srcset sizes (`srcset="image-400.webp 400w, image-800.webp 800w"`)
- **Lazy Loading:** `loading="lazy"` for below-fold images
- **Dimensions:** Explicit width/height to prevent CLS
- **Hero Image:** Preload in `<head>`:
  ```html
  <link rel="preload" as="image" href="/images/header.webp">
  ```

### 6.3 CSS Optimization

- **Critical CSS:** Inline above-fold styles
- **Minification:** Astro handles during build
- **Unused:** Tree-shake in production
- **Fonts:** 
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" as="style" href="fonts.css">
  <link rel="stylesheet" href="fonts.css" media="print" onload="this.media='all'">
  ```

### 6.4 JavaScript Minimization

- **Philosophy:** Vanilla JS only, no frameworks
- **Dropdown Menu:** Pure CSS or minimal vanilla JS
- **Mobile Navigation:** Toggle class, no animation libraries
- **Preview:** Minimal preview script from Sanity

#### Dropdown Implementation (CSS-first)
```css
nav li:hover ul {
  display: block;
}
@media (max-width: 768px) {
  nav ul { display: none; }
  nav ul.open { display: block; }
}
```

#### Mobile Menu Toggle (Vanilla JS)
```javascript
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('#menu')?.classList.toggle('open');
});
```

### 6.5 Caching Strategy

| Resource | Cache Duration | Type |
|----------|---------------|------|
| HTML pages | 1 hour (stale-while-revalidate) | Edge |
| CSS/JS | 1 year (immutable) | Edge |
| Images | 1 year (immutable) | Edge |
| Google Fonts | 1 day | Browser |

### 6.6 Build Output Targets

- **Total Page Weight:** < 500KB (excluding images)
- **Request Count:** < 15 requests per page
- **Critical Path:** < 3 render-blocking resources

---

## 7. Migration Approach

### 7.1 Phase 1: Foundation (Week 1-2)

1. **Sanity Studio Setup**
   - Create Sanity project (`npx create-sanity@latest`)
   - Configure schemas (page, alert, menuItem, siteSettings)
   - Set up content models for existing pages
   - Configure preview URLs

2. **Astro Project Init**
   - Clone prototype/ presentation to root
   - Install dependencies
   - Configure Cloudflare adapter
   - Set up Sanity client

3. **Component Development**
   - Create all Astro components from prototype
   - Apply CSS from prototype.css
   - Test component rendering

### 7.2 Phase 2: Content Migration (Week 3-4)

1. **Content Audit**
   - List all TextPattern pages
   - Map to Sanity schemas
   - Identify content gaps

2. **Data Migration**
   - Export TextPattern content (manually initially)
   - Import to Sanity (CSV import or manual)
   - Verify image assets

3. **Template Development**
   - Build page templates
   - Connect to Sanity data
   - Test preview functionality

### 7.3 Phase 3: Integration & Testing (Week 5-6)

1. **Preview System**
   - Configure Sanity preview
   - Set up preview secret
   - Test in Studio

2. **Accessibility Audit**
   - Run automated tests (axe)
   - Manual keyboard testing
   - Screen reader testing

3. **Performance Testing**
   - Lighthouse audit
   - Fix any issues
   - Verify Core Web Vitals

### 7.4 Phase 4: Deployment (Week 7)

1. **Staging Deployment**
   - Deploy to Cloudflare Pages staging
   - Team review
   - Feedback incorporation

2. **Production Deployment**
   - DNS cutover
   - Monitor error logs
   - Verify redirects

3. **Training & Handoff**
   - Train content editors
   - Document CMS usage
   - Provide style guide reference

---

## 8. Development Workflow

### 8.1 Local Development

```bash
# Terminal 1: Sanity Studio
cd sanity && sanity dev

# Terminal 2: Astro Frontend  
cd .. && npm run dev
```

### 8.2 Sanity Studio Commands

```bash
cd sanity
sanity deploy          # Deploy studio to sanity.io
sanity manage         # Open project dashboard
sanity dataset import # Import content (CSV)
```

### 8.3 Astro Commands

```bash
npm run dev           # Local development
npm run build         # Production build
npm run preview       # Preview production build
npm run deploy        # Deploy to Cloudflare
```

### 8.4 Content Editing Workflow

1. Navigate to `/studio` or provided URL
2. Select page to edit
3. Modify content in rich text editor
4. Preview updates in side panel (iframe)
5. Publish when ready
6. Site rebuilds automatically via webhook

### 8.5 Preview Workflow

1. Editor clicks "Preview" in Sanity Studio
2. Sanity returns draft content with preview token
3. Astro fetches draft content from API
4. Preview renders with live updates
5. Editor can see changes before publishing

---

## 9. Key Decisions & Trade-offs

### 9.1 Schema Simplicity vs. Flexibility

**Decision:** Prioritize editor simplicity

- Sidebar widgets stored in Site Settings (single source of truth)
- Page content uses modular blocks
- No nested references beyond 2 levels
- Validation enforces required fields

### 9.2 Dropdown Menu Implementation

**Decision:** CSS-only with vanilla JS fallback

- Pros: No framework, minimal JS, accessible
- Cons: Less animation control
- Solution: Use `:hover` + `:focus-within` for CSS, JS only for mobile toggle

### 9.3 Image Alignment in Rich Text

**Decision:** Custom block type with alignment enum

- Not using Portable Text's default image
- Custom `alignedImage` schema with left/center/right
- CSS handles float/display based on alignment value

### 9.4 Preview System Architecture

**Decision:** Server-side preview with token validation

- Sanity provides preview API
- Astro preview endpoint validates secret
- Draft content fetched with `perspective: 'previewDrafts'`
- No client-side real-time updates (too complex for this use case)

---

## 10. Files Reference

### 10.1 Source Files to Migrate

| Prototype File | Purpose | Target |
|---------------|---------|--------|
| `prototype.css` | Main stylesheet | `src/styles/prototype.css` |
| `st-stephen-in-the-fields-church-2021-1024x768.webp` | Header image | `public/images/` |
| `119t.jpg` | Beggar Jesus image | `public/images/` |

### 10.2 Schema Files to Create

| File | Schema |
|------|--------|
| `sanity/schemas/index.ts` | Export all schemas |
| `sanity/schemas/page.ts` | Page content schema |
| `sanity/schemas/alert.ts` | Alert box schema |
| `sanity/schemas/menuItem.ts` | Navigation item schema |
| `sanity/schemas/siteSettings.ts` | Global settings (singleton) |
| `sanity/schemas/alignedImage.ts` | Rich text image schema |

### 10.3 Component Files to Create

| File | Component |
|------|-----------|
| `src/components/Header.astro` | Site header with branding |
| `src/components/Navigation.astro` | Main navigation menu |
| `src/components/AlertBox.astro` | Alert announcement box |
| `src/components/Article.astro` | Page article wrapper |
| `src/components/Sidebar.astro` | Sidebar container |
| `src/components/Footer.astro` | Site footer |
| `src/components/PageLayout.astro` | Page template layout |
| `src/layouts/BaseLayout.astro` | HTML shell layout |

---

*Document Version: 1.0*
*Last Updated: March 2026*
*Project: Saint Stephen-in-the-Fields Website Migration*
