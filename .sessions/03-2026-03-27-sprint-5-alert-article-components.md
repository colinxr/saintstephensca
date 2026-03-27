# Session 03 - Sprint 5: Alert Box & Article Components

**Date:** March 27, 2026  
**Duration:** ~1 hour

---

## Overview

Implementing Sprint 5: Alert Box & Article Components. Each ticket is its own commit.

---

## Tickets

| Ticket       | Description            | Commit  | Status |
| ------------ | ---------------------- | ------- | ------ |
| SPRINT-5-001 | Alert Box Component    | a5abc97 | ✅     |
| SPRINT-5-002 | Article Component      | c1849d4 | ✅     |
| SPRINT-5-003 | Portable Text Renderer | eee0bb0 | ✅     |
| SPRINT-5-004 | Aligned Image Styles   | 0aa2adf | ✅     |
| SPRINT-5-005 | Sidebar Component      | 7d282c7 | ✅     |
| SPRINT-5-006 | CMS Data Connection    | e0318c8 | ✅     |

---

## Git History

| Commit  | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| a5abc97 | SPRINT-5-001: Create AlertBox component with dismissible functionality       |
| c1849d4 | SPRINT-5-002: Create Article component with semantic article element         |
| eee0bb0 | SPRINT-5-003: Create Portable Text renderer for rich text content            |
| 0aa2adf | SPRINT-5-004: Add aligned image styles for left, right, and center alignment |
| 7d282c7 | SPRINT-5-005: Create Sidebar component with widget support                   |
| e0318c8 | SPRINT-5-006: Connect CMS data to pages with Sanity integration              |
| bae4b18 | docs: add session 03 documentation                                           |

---

## Files Created/Modified

### Components

- `src/components/AlertBox.astro` - Alert box with dismissible functionality
- `src/components/Article.astro` - Semantic article wrapper
- `src/components/Sidebar.astro` - Sidebar with widget support

### Lib

- `src/lib/sanity.ts` - Added urlFor, getSiteSettings, getPageBySlug, getHomePage
- `src/lib/portable-text.ts` - Portable text renderer for rich text

### Styles

- `src/styles/content.css` - Aligned image styles (left, right, center)

### Pages

- `src/pages/index.astro` - Connected to Sanity CMS

### Schemas

- `sanity/schemas/alert.ts` - Added `style` field (default, christmas, urgent)

### Dependencies

- Added `@sanity/client` and `@sanity/image-url` packages

---

## Test Data

Test data should be created in Sanity Studio:

- Sample alert with content
- Sample page with main content and sidebar widgets
- Sample sidebar widgets (donation, service schedule)

To create test data:

1. Start Sanity Studio: `cd sanity && npm run dev`
2. Navigate to http://localhost:3333
3. Create Site Settings document first
4. Create Alert documents
5. Create Sidebar Widget documents
6. Create Page document with slug "home"

---

## Definition of Done

- [x] Content renders from Sanity
- [x] Images align correctly
- [x] Alert dismissible
- [x] Sidebar widgets display

---

## Notes

- Uses `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` from root `.env`
- Alert dismiss uses `sessionStorage` to persist dismissal per page
- Portable text supports headings, paragraphs, strong/em, links, and aligned images
