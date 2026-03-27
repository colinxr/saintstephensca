This folder is related to the replatforming of the website and CMS for Saint
Stephens of the Field Anglican church in Kensington Market, Toronto. It is queer
affirming and open to all. Accessibility IS of utmost importance.

Outside of the church is a statue called Begger Jesus, a depiction of Christ
begging for money. It serves as a reminder that once Jesus said "Of the least of
you I am among you." During the COVID pandemic the church supported, against much
pressure from the city council, politicians, the police, and finally the fire
department, an encampment in the park next door to the church.

We are migrating their existing website from TextPattern CMS to a combination of
Sanity CMS and Astro. The goal of this project is to make the website more
accessible to update. Right now you need to know HTML and TextPattern's arcane
templating language in order to make edits, let alone construct new pages.

Sanity has been selected because it is free.

Sanity will require a preview window of the page it is editing. This is a
requirement.

In /prototype are files related to the initial design exploration and website
scaffolding.

In it are CSS styles preferred. There is a component library and style guide.

I will describe the layout.

A global header with a photo of the church,
part of the header is a line of text beneath the photo

followed by the global nav, which is a series of dropdown menus.

The rest of the page is a two column blog layout, Main and Sidebar.

In the main, it is possible to see an Alert Box. This is configured per page in
the CMS.

The alert box will sit above the main > article, which will have a header (page
title) and body copy. Body copy will be rich text from Sanity with images that
can be aligned left, right, or center with captions.

Sidebar will be made up of different blocks of content. One will be a
donation/contribution. Another is a simple text block outline services. I'm
unsure of how unique or global these widgets should be in the CMS. I want to
prioritize simplicity for the editor when thinking about how to define the
schema for these in the CMS.

then lastly a global footer.

The front-end of this will be built in Astro, let's just prefer bare HTML and
JavaScript where possible. Let's optimize for lightest page load and quickest
page performance.

Similarly this needs to adhere to the highest a11y standards, especially for
those using screen readers. Key navigation is not a luxury, it's the highest
standard of success.

---

## Project Context

This document provides project background, design specifications, and technical
requirements for the Saint Stephens of the Field Anglican church website migration
from TextPattern to Sanity CMS and Astro.

## Technical Stack

- **CMS:** Sanity (free, open-source)
- **Frontend:** Astro (static site generation)
- **Languages:** HTML, JavaScript (bare/minimal where possible)
- **Styling:** CSS (see /prototype for styles)

## File Structure

- `/prototype` - Design exploration and website scaffolding
  - CSS styles
  - Component library
  - Style guide

## Design Layout

### Header

Global header with a photo of the church and a line of text beneath the photo.

### Navigation

Global navigation with dropdown menus.

### Main Content Area

Two column blog layout with Main and Sidebar sections.

#### Alert Box

Configured per page in the CMS. Sits above the main article.

#### Article

Contains page title (header) and body copy. Body copy is rich text from Sanity
with images that can be aligned left, right, or center with captions.

### Sidebar

Made up of different content blocks:

- Donation/contribution block
- Simple text block outlining services

### Footer

Global footer.

## CMS Requirements

- Sanity CMS for content management
- Preview window required for page editing (Sanity requirement)
- Rich text with image alignment (left, right, center) and captions
- Per-page alert box configuration
- Sidebar widgets (schema TBD - prioritize editor simplicity)

## Accessibility Requirements

Target: WCAG 2.1 AA compliance (minimum)

- Screen reader compatibility
- Keyboard navigation
- Focus management
- High contrast ratios

## Performance Goals

- Lightest page load possible
- Quickest page performance
- Minimal JavaScript
- Optimize for Core Web Vitals

---

## Project Structure Report

### Overview

```
saintstephensca/
├── .astro/              # Astro internal files
├── .context/           # Context files
├── .git/                # Git repository
├── .husky/              # Git hooks (husky)
├── .sessions/           # Session files
├── dist/                # Build output
├── node_modules/        # Dependencies
├── prototype/           # Design exploration and wireframes
├── public/              # Static assets
├── sanity/              # Sanity CMS (Studio)
├── src/                 # Astro frontend source
│   ├── components/      # Astro components
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities (Sanity client, types)
│   ├── pages/           # Astro pages (including preview)
│   └── styles/          # CSS files
├── tests/               # Playwright tests
├── astro.config.mjs     # Astro configuration
├── package.json         # Dependencies
├── playwright.config.ts # Test configuration
└── AGENTS.md            # This file
```

### Sanity CMS (`/sanity`)

The Sanity Studio is configured with the following schemas:

| Schema          | File                       | Description                                                               |
| --------------- | -------------------------- | ------------------------------------------------------------------------- |
| `page`          | `schemas/page.ts`          | Main content pages with rich text, alert box, sidebar                     |
| `alert`         | `schemas/alert.ts`         | Reusable alert boxes for page announcements                               |
| `alignedImage`  | `schemas/alignedImage.ts`  | Images with left/right/center alignment and captions                      |
| `menuItem`      | `schemas/menuItem.ts`      | Navigation menu items                                                     |
| `sidebarWidget` | `schemas/sidebarWidget.ts` | Reusable sidebar blocks (Service Schedule, Donation, Social Links, Badge) |
| `siteSettings`  | `schemas/siteSettings.ts`  | Global site configuration                                                 |

**Key Files:**

- `sanity.config.ts:1` - Studio configuration with custom desk structure
- `schemas/index.ts:1` - Schema registration

### Astro Frontend (`/src`)

**Components (`src/components/`):**

- `Header.astro` - Global header with church photo
- `Navigation.astro` - Dropdown navigation menu
- `AlertBox.astro` - Page alert display
- `Article.astro` - Main content article
- `Sidebar.astro` - Sidebar with widget blocks
- `Footer.astro` - Global footer
- `AddressBar.astro` - Church address display

**Layouts (`src/layouts/`):**

- `BaseLayout.astro` - Base HTML wrapper
- `PageLayout.astro` - Two-column blog layout (main + sidebar)

**Pages (`src/pages/`):**

- `index.astro` - Homepage
- `preview.ts` - Preview API endpoint
- `preview/[...slug].astro` - Dynamic preview page (Sanity requirement)

**Lib (`src/lib/`):**

- `sanity.ts` - Sanity client setup, queries for pages/settings/preview
- `portable-text.ts` - Portable text rendering utilities
- `types.ts` - TypeScript type definitions

**Styles (`src/styles/`):**

- `design-tokens.css` - CSS custom properties (colors, spacing)
- `global.css` - Global styles
- `layout.css` - Two-column layout styles
- `navigation.css` - Navigation dropdown styles
- `typography.css` - Font styles
- `content.css` - Article/content styles

### Prototype (`/prototype`)

Design exploration files from the initial project phase:

| File                 | Purpose                    |
| -------------------- | -------------------------- |
| `prototype.html`     | Initial page mockup        |
| `prototype.css`      | Initial styles             |
| `components.html`    | Component library showcase |
| `styles.css`         | Comprehensive styles       |
| `brand.html`         | Brand identity exploration |
| `wireframe.html`     | Wireframe designs          |
| `contact.html`       | Contact page mockup        |
| `presentation.html`  | Design presentation        |
| `audit.md`           | Accessibility audit notes  |
| `refined-colors.css` | Color palette              |

### Dependencies

**Frontend (Astro):**

- `astro` - Static site generator
- `@astrojs/node` - Node.js adapter
- `@sanity/client` - Sanity data fetching
- `@sanity/image-url` - Image URL builder

**Dev Dependencies:**

- `eslint` + `eslint-plugin-astro` - Linting
- `prettier` + `prettier-plugin-astro` - Formatting
- `husky` + `lint-staged` - Git hooks
- `playwright` - E2E testing
