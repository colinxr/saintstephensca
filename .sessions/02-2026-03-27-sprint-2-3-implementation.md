# Session 02 - Sprint 2 & Sprint 3 Implementation

**Date:** March 27, 2026  
**Duration:** TBD

---

## Overview

This session will implement the tickets from Sprint 2 and Sprint 3 in parallel using separate worktrees and subagents.

---

## Sprint 2: Schema Design & Core Schemas

**7 tickets, ~23 hours total**

| Ticket       | Description            |
| ------------ | ---------------------- |
| SPRINT-2-001 | Design Page Schema     |
| SPRINT-2-002 | Alert Box Schema       |
| SPRINT-2-003 | Aligned Image Schema   |
| SPRINT-2-004 | Navigation Schema      |
| SPRINT-2-005 | Site Settings Schema   |
| SPRINT-2-006 | CSS Design Tokens      |
| SPRINT-2-007 | Base Typography Styles |

**Branch:** `sprint-2/schemas-design-system`

---

## Sprint 3: CMS Refinement & Layout Infrastructure

**6 tickets, ~20 hours total**

| Ticket       | Description              |
| ------------ | ------------------------ |
| SPRINT-3-001 | Sidebar Widget Schemas   |
| SPRINT-3-002 | Configure Sanity Preview |
| SPRINT-3-003 | Base Layout Component    |
| SPRINT-3-004 | Header Component         |
| SPRINT-3-005 | Footer Component         |
| SPRINT-3-006 | Page Layout Shell        |

**Branch:** `sprint-3/cms-refinement-layout`

---

## Process

```
┌─────────────────────────────────────────────┐
│           THIS SESSION FILE                 │
│  (created, documenting what we're doing)    │
└─────────────────────────────────────────────┘
                    │
      ┌─────────────┴─────────────┐
      ↓                           ↓
┌───────────────────┐   ┌───────────────────┐
│   SUBAGENT Sprint 2   │   │   SUBAGENT Sprint 3   │
│   worktree:           │   │   worktree:           │
│   sprint-2/...        │   │   sprint-3/...        │
│   Branch: sprint-2/   │   │   Branch: sprint-3/  │
│       schemas-design │   │       cms-refinement │
│           -system    │   │           -layout    │
└───────────────────┘   └───────────────────┘
      │                           │
      └─────────────┬─────────────┘
                    ↓
         ┌───────────────────┐
         │   OPEN PRs        │
         │   → review        │
         │   → merge         │
         └───────────────────┘
```

---

## Subagents

| Agent     | Sprint   | Worktree             | Branch                           |
| --------- | -------- | -------------------- | -------------------------------- |
| `general` | Sprint 2 | `worktrees/sprint-2` | `sprint-2/schemas-design-system` |
| `general` | Sprint 3 | `worktrees/sprint-3` | `sprint-3/cms-refinement-layout` |

---

## Goals

1. Sprint 2 subagent creates branch, implements 7 tickets, opens PR
2. Sprint 3 subagent creates branch, implements 6 tickets, opens PR
3. Review both PRs
4. Merge both PRs

---

## PR Reviews Completed

### PR #6 - Sprint 2: schema design and core schemas

**Status:** REQUEST_CHANGES

**Critical Issues:**

1. `sidebarWidgets` field uses `type: 'string'` (should reference `sidebarWidget` type)
2. `sanity.config.ts` references non-existent schemas (`navigation`, `sidebarBlock`)
3. `__experimental_actions` invalid in siteSettings

**Major Issues:**

- Menu item link lacks URL validation
- No depth limit on recursive menu
- Alignment field lacks validation
- Missing h4-h6 typography styles

---

### PR #7 - Sprint 3: CMS refinement and layout infrastructure

**Status:** REQUEST_CHANGES

**Critical Issues:**

1. Type mismatch: `headerImage` typed as `string` but Sanity returns object
2. `sidebarWidget` schema not integrated into index
3. Sidebar type mismatch (strings vs `sidebarWidget` reference)
4. Schema type name mismatch (`sidebarWidget` vs `sidebarBlock`)

**Major Issues:**

- Header image alt text empty (accessibility concern)
- Redundant ARIA on Navigation (`role="navigation"` + `aria-label`)
- No skip navigation link for keyboard users
- Navigation only supports 2 levels

---

## Integration Issues

Both PRs have issues with the sidebar widget system:

- Sprint 2's `page.ts` uses `sidebarWidgets` as `string[]` (meaningless for editors)
- Sprint 3 created `sidebarWidget` schema but didn't wire it up
- The type definitions don't match between schema and TypeScript

---

## Recommended Next Steps

1. **Fix Sprint 2 first:**
   - Create proper `sidebarWidget` document type
   - Fix `page.ts` to reference `sidebarWidget` instead of strings
   - Fix `sanity.config.ts` schema references
   - Add validation rules

2. **Then Sprint 3 can integrate properly:**
   - Update `headerImage` type to match Sanity image object
   - Wire up sidebarWidget in schema exports
   - Fix navigation accessibility

---

## Git State

| PR  | Branch                           | Worktree             | Status       |
| --- | -------------------------------- | -------------------- | ------------ |
| #6  | `sprint-2/schemas-design-system` | `worktrees/sprint-2` | **APPROVED** |
| #7  | `sprint-3/cms-refinement-layout` | `worktrees/sprint-3` | **APPROVED** |

---

## Resolved

Both PRs are now approved and ready to merge into `main`.
