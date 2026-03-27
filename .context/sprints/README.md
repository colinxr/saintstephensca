# Sprint Plan Overview

**Project:** Saint Stephen-in-the-Fields Website Migration  
**From:** TextPattern CMS → Sanity CMS + Astro  
**Duration:** 10 sprints (~5 months)

---

## Sprint Timeline

| Sprint | Duration | Focus | Key Deliverables |
|--------|----------|-------|------------------|
| [Sprint 1](./sprint-01-foundation.md) | 2 weeks | Foundation | Repo, Sanity project, Astro setup, CI/CD |
| [Sprint 2](./sprint-02-schemas-design-system.md) | 2 weeks | Schema Design + Design System | CMS schemas (draft), CSS variables, typography |
| [Sprint 3](./sprint-03-cms-refinement-layout.md) | 2 weeks | CMS Refinement + Layout | Full schemas, preview, page shell, header/footer |
| [Sprint 4](./sprint-04-navigation-structure.md) | 2 weeks | Navigation & Structure | Dropdown nav, two-column layout, responsive |
| [Sprint 5](./sprint-05-alert-article-components.md) | 2 weeks | Content Components | Alert box, article, rich text, image alignment |
| [Sprint 6](./sprint-06-sidebar-preview.md) | 2 weeks | Sidebar & Preview | Sidebar widgets, preview system |
| [Sprint 7](./sprint-07-accessibility.md) | 2 weeks | Accessibility | WCAG 2.1 AA compliance, keyboard nav |
| [Sprint 8](./sprint-08-content-migration.md) | 2 weeks | Content Migration | All content migrated from TextPattern |
| [Sprint 9](./sprint-09-performance-qa.md) | 2 weeks | Performance & QA | Lighthouse 90+, cross-browser testing |
| [Sprint 10](./sprint-10-launch-training.md) | 2 weeks | Launch | Production deploy, training, docs |

**Total Estimated Duration:** 20 weeks (~5 months)

---

## Epic Mapping

| Epic | Sprints |
|------|---------|
| Epic 1: Project Foundation & DevOps | Sprint 1 |
| Epic 2: CMS Setup & Schema Design | Sprint 2-3 |
| Epic 3: Design System & Prototyping | Sprint 2-3 |
| Epic 4: Frontend Core Layout | Sprint 3-4 |
| Epic 5: Content Components | Sprint 5-6 |
| Epic 6: Accessibility Implementation | Sprint 7 |
| Epic 7: Preview System | Sprint 6-7 |
| Epic 8: Content Migration | Sprint 8 |
| Epic 9: Performance & QA | Sprint 9 |
| Epic 10: Launch & Training | Sprint 10 |

---

## Quick Reference

### Ticket Count by Sprint

| Sprint | Tickets |
|--------|---------|
| Sprint 1 | 5 |
| Sprint 2 | 7 |
| Sprint 3 | 6 |
| Sprint 4 | 6 |
| Sprint 5 | 6 |
| Sprint 6 | 6 |
| Sprint 7 | 7 |
| Sprint 8 | 6 |
| Sprint 9 | 8 |
| Sprint 10 | 7 |

**Total Tickets:** 64

### Files Reference

- Technical Implementation: [impl-plan.md](../stories/impl-plan.md)
- Epic Backlog: [epics.md](../stories/epics.md)
- Sprint Tickets: This directory

---

## Running the Project

### Start Development

```bash
# Terminal 1: Sanity Studio
cd sanity && npm run dev

# Terminal 2: Astro Frontend
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy

```bash
npm run deploy -- --prod
```

---

## Notes

- **Parallelization:** Sprints 2-3 run CMS and design system work in parallel
- **Buffer Time:** Each sprint includes buffer for unexpected issues
- **Review Cadence:** Bi-weekly sprint reviews with stakeholders
- **Scope Adjustments:** If timeline pressure, deprioritize Sprint 9 advanced SEO features and Sprint 10 extended training
