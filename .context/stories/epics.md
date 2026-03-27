# Saint Stephens Church Website Migration - Product Backlog

**Project:** TextPattern → Sanity CMS + Astro  
**Team Size:** Small team (2-3 people, part-time)  
**Target:** WCAG 2.1 AA accessibility, light-weight performant site

---

## Epic Overview

| Epic | Name | Priority | Estimated Duration |
|------|------|----------|-------------------|
| 1 | Project Foundation & DevOps | P0 - Critical | Sprint 1 |
| 2 | CMS Setup & Schema Design | P0 - Critical | Sprint 2-3 |
| 3 | Design System & Prototyping | P1 - High | Sprint 2-3 |
| 4 | Frontend Core Layout | P0 - Critical | Sprint 3-4 |
| 5 | Content Components | P1 - High | Sprint 5-6 |
| 6 | Accessibility Implementation | P0 - Critical | Sprint 7 |
| 7 | Preview System | P1 - High | Sprint 6-7 |
| 8 | Content Migration | P2 - Medium | Sprint 8 |
| 9 | Performance & QA | P1 - High | Sprint 9 |
| 10 | Launch & Training | P1 - High | Sprint 10 |

---

## Epic 1: Project Foundation & DevOps

**Goal:** Establish development environment, repository, and deployment pipeline.

### Sprints

#### Sprint 1: Foundation Setup
**Duration:** 2 weeks  
**Goal:** Fully operational development environment

### Acceptance Criteria
- [ ] Git repository initialized with `.gitignore` for Node.js/Sanity/Astro
- [ ] Sanity project created and configured (free tier)
- [ ] Astro project scaffolded with required dependencies
- [ ] Basic CI/CD pipeline configured (GitHub Actions or similar)
- [ ] Development workflow documented (commands for local dev, build, deploy)
- [ ] Code formatting and linting configured (ESLint, Prettier)

---

## Epic 2: CMS Setup & Schema Design

**Goal:** Design and implement Sanity schemas that enable non-technical editors to manage all website content.

### Sprints

#### Sprint 2: Schema Design & Core Schemas
**Duration:** 2 weeks  
**Goal:** Schema architecture complete, basic schemas implemented

#### Sprint 3: CMS Refinement & Preview Setup
**Duration:** 2 weeks  
**Goal:** Full schema implementation including preview integration

### Acceptance Criteria
- [ ] Page schema with: title, slug, alert box (optional), body (rich text), sidebar content
- [ ] Alert Box schema: title, content (rich text), active status, optional page association
- [ ] Sidebar Widget schema: widget type (donation/services/custom), content per type
- [ ] Rich Text schema with Portable Text and custom image alignment marks
- [ ] Image schema with: alt text (required), caption, alignment option (left/right/center)
- [ ] Navigation schema: menu items with dropdown support (label, link, children)
- [ ] Site Settings schema: global header image, header text, footer content, donation link
- [ ] Sanity preview window configured and functional
- [ ] Content model documented for editor reference

---

## Epic 3: Design System & Prototyping

**Goal:** Create consistent styling based on the existing prototype, establishing CSS variables and base components.

### Sprints

#### Sprint 2: Design System Foundation
**Duration:** 2 weeks (parallel with Sprint 2)  
**Goal:** CSS variables, typography, color system, base styles

#### Sprint 3: Component Patterns
**Duration:** 2 weeks (parallel with Sprint 3)  
**Goal:** Component library documented and implemented

### Acceptance Criteria
- [ ] CSS custom properties for: colors (primary, secondary, text, background, alerts), typography (font families, sizes, weights, line heights), spacing (margin/padding scale), breakpoints
- [ ] Base reset/normalize styles applied
- [ ] Typography styles for headings (h1-h6), paragraphs, lists, blockquotes
- [ ] Button styles (primary, secondary, text-only variants)
- [ ] Form input styles (text, textarea, select) with focus states
- [ ] Utility classes for common patterns (text alignment, spacing, visibility)
- [ ] Component documentation with usage examples

---

## Epic 4: Frontend Core Layout

**Goal:** Implement the global layout structure: header, navigation with dropdowns, two-column blog layout, and footer.

### Sprints

#### Sprint 3: Layout Infrastructure
**Duration:** 2 weeks (overlaps with Sprint 3)  
**Goal:** Page shell, header, footer, CSS Grid/Flexbox layout system

#### Sprint 4: Navigation & Page Structure
**Duration:** 2 weeks  
**Goal:** Dropdown navigation, sidebar structure, responsive behavior

### Acceptance Criteria
- [ ] Global header with: church photo (from CMS), header text beneath photo
- [ ] Global navigation with: dropdown menus, keyboard-accessible (tab, enter, escape, arrow keys)
- [ ] Mobile-responsive navigation (hamburger menu on small screens)
- [ ] Two-column blog layout: Main content area + Sidebar
- [ ] Global footer with: copyright, contact info, links
- [ ] Layout is responsive (mobile-first, breakpoints for tablet, desktop)
- [ ] Layout passes visual regression testing against prototype

---

## Epic 5: Content Components

**Goal:** Implement all editable content components that editors can manage via Sanity.

### Sprints

#### Sprint 5: Alert Box & Article Components
**Duration:** 2 weeks  
**Goal:** Alert box, article header, rich text body with image alignment

#### Sprint 6: Sidebar Widgets
**Duration:** 2 weeks  
**Goal:** Sidebar blocks (donation, services), widget management

### Acceptance Criteria
- [ ] Alert Box: displays above main article, styled appropriately, closeable by user
- [ ] Article Header: page title (h1), optional subtitle
- [ ] Rich Text Body: renders Portable Text with proper semantic HTML
- [ ] Image Alignment: images can be aligned left, right, or center with captions
- [ ] Donation Sidebar Block: prominent call-to-action with link
- [ ] Services Sidebar Block: text block outlining church services
- [ ] All components editable via Sanity preview
- [ ] Components handle empty/null states gracefully

---

## Epic 6: Accessibility Implementation

**Goal:** Achieve WCAG 2.1 AA compliance across the entire site.

### Sprints

#### Sprint 7: Accessibility Audit & Remediation
**Duration:** 2 weeks  
**Goal:** All WCAG 2.1 AA criteria met, keyboard navigation fully functional

### Acceptance Criteria
- [ ] Semantic HTML structure (proper heading hierarchy, landmarks: header, nav, main, aside, footer)
- [ ] Skip-to-content link visible on keyboard focus
- [ ] All interactive elements keyboard-accessible (dropdown nav, buttons, links)
- [ ] Focus indicators visible and high-contrast (not just default browser styling)
- [ ] Dropdown menus fully keyboard-operable (arrow keys, escape to close)
- [ ] Color contrast ratios meet AA standards (4.5:1 for text, 3:1 for large text)
- [ ] All images have descriptive alt text (decorative images have empty alt)
- [ ] Form labels associated with inputs
- [ ] Error messages announced to screen readers
- [ ] Page titles descriptive and unique
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] Screen reader testing completed (VoiceOver, NVDA)
- [ ] Accessibility audit report generated (using axe or similar)

---

## Epic 7: Preview System

**Goal:** Enable Sanity's preview window functionality for real-time content editing feedback.

### Sprints

#### Sprint 6: Preview Integration (parallel with Sprint 6)
**Duration:** 1 week  
**Goal:** Preview system functional

#### Sprint 7: Preview Refinement (parallel with Sprint 7)
**Duration:** 1 week  
**Goal:** Editor training and documentation

### Acceptance Criteria
- [ ] Sanity Studio configured with preview pane
- [ ] Preview renders current page content in real-time
- [ ] Preview works for: pages, alert boxes, sidebar widgets
- [ ] Clear visual indication when in preview mode
- [ ] Editorial guide documentation for using preview

---

## Epic 8: Content Migration

**Goal:** Migrate existing content from TextPattern to Sanity.

### Sprints

#### Sprint 8: Content Migration
**Duration:** 2 weeks  
**Goal:** All existing content migrated, validated, and live

### Acceptance Criteria
- [ ] Content inventory completed (pages, images, documents)
- [ ] Text content exported from TextPattern
- [ ] Images exported and uploaded to Sanity
- [ ] Content mapped to new Sanity schemas
- [ ] Migration validation: all pages render correctly
- [ ] Redirects configured for changed URLs
- [ ] 404 page handled gracefully

---

## Epic 9: Performance & QA

**Goal:** Ensure site meets performance targets and passes QA.

### Sprints

#### Sprint 9: Performance & QA
**Duration:** 2 weeks  
**Goal:** Site production-ready

### Acceptance Criteria
- [ ] Lighthouse Performance score: 90+ (mobile)
- [ ] Core Web Vitals optimized:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- [ ] Total page weight < 500KB (excluding images)
- [ ] Images lazy-loaded with proper sizing
- [ ] JavaScript minimal and deferred/async
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge - last 2 versions)
- [ ] Mobile device testing (iOS Safari, Chrome Android)
- [ ] Broken link audit completed
- [ ] SEO basics: meta titles, descriptions, OG tags, sitemap.xml, robots.txt

---

## Epic 10: Launch & Training

**Goal:** Successfully launch the new site and enable the church team to maintain it.

### Sprints

#### Sprint 10: Launch & Training
**Duration:** 2 weeks  
**Goal:** Site live, team trained

### Acceptance Criteria
- [ ] Production environment configured and deployed
- [ ] Custom domain pointed to new site
- [ ] SSL certificate active
- [ ] Backup strategy documented
- [ ] Editor training completed (hands-on session)
- [ ] Editor documentation delivered:
  - How to edit pages
  - How to add/update alert boxes
  - How to manage sidebar content
  - How to add images with alignment
  - How to preview changes before publishing
- [ ] Support contact established for post-launch issues
- [ ] Post-launch monitoring configured (uptime check)

---

## Sprint Timeline Summary

| Sprint | Duration | Focus | Key Deliverables |
|--------|----------|-------|------------------|
| Sprint 1 | 2 weeks | Foundation | Repo, Sanity project, Astro setup, CI/CD |
| Sprint 2 | 2 weeks | Schema Design + Design System | CMS schemas (draft), CSS variables, typography |
| Sprint 3 | 2 weeks | CMS Refinement + Layout | Full schemas, preview, page shell, header/footer |
| Sprint 4 | 2 weeks | Navigation & Structure | Dropdown nav, two-column layout, responsive |
| Sprint 5 | 2 weeks | Content Components | Alert box, article, rich text, image alignment |
| Sprint 6 | 2 weeks | Sidebar & Preview | Sidebar widgets, preview system |
| Sprint 7 | 2 weeks | Accessibility | WCAG 2.1 AA compliance, keyboard nav |
| Sprint 8 | 2 weeks | Content Migration | All content migrated from TextPattern |
| Sprint 9 | 2 weeks | Performance & QA | Lighthouse 90+, cross-browser testing |
| Sprint 10 | 2 weeks | Launch | Production deploy, training, docs |

**Total Estimated Duration:** 20 weeks (approximately 5 months)

---

## Notes

- **Parallelization:** Sprints 2-3 can run design system and CMS work in parallel for efficiency.
- **Buffer Time:** Each sprint includes 1-2 buffer days for unexpected issues.
- **Scope Adjustments:** If timeline pressure, deprioritize: Sprint 9 advanced SEO features, Sprint 10 extended training.
- **Review Cadence:** Bi-weekly sprint reviews with stakeholders for feedback.
