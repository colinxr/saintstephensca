# Sprint 8: Content Migration

**Duration:** 2 weeks  
**Epic:** Epic 8 - Content Migration  
**Goal:** All existing content migrated from TextPattern to Sanity

---

## Tickets

### SPRINT-8-000: Sitemap Confirmation
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Final page list confirmed (no pages to add or remove)
- [ ] Navigation structure (dropdowns) confirmed
- [ ] URL structure documented
- [ ] Any page deletions or URL changes noted for redirects

**CONFIRMED SITEMAP:**

| Page | Type | URL |
|------|------|-----|
| Home | Page | `/` |
| Contact | Dropdown | `/contact` |
| └ Address, Phone, Email | Sub-page | `/contact/address` |
| └ Clergy and Staff | Sub-page | `/contact/clergy` |
| Worship | Dropdown | `/worship` |
| └ Our Weekly Services | Sub-page | `/worship/services` |
| └ Children | Sub-page | `/worship/children` |
| └ Livestreamed Services | Sub-page | `/worship/livestream` |
| Outreach | Dropdown | `/outreach` |
| └ Weekend Breakfast Programme | Sub-page | `/outreach/breakfast` |
| └ Safe Space Drop In | Sub-page | `/outreach/safe-space` |
| └ Relationship-Based Support | Sub-page | `/outreach/support` |
| └ Our Neighbourhood | Sub-page | `/outreach/neighbourhood` |
| └ Poverty and Income Inequality | Sub-page | `/outreach/poverty` |
| History | Page | `/history` |

**Total: 5 pages + 10 sub-pages = 15 pages across 3 dropdowns**

**Navigation Schema Required:**
```typescript
{
  label: "Contact",
  link: "/contact",
  children: [
    { label: "Address, Phone, Email", link: "/contact/address" },
    { label: "Clergy and Staff", link: "/contact/clergy" }
  ]
}
```

**IMPORTANT:** This step prevents building pages that will be deleted. Do not skip.

---

### SPRINT-8-001: Content Audit
**Estimate:** 6 hours  
**Acceptance Criteria:**
- [ ] Complete list of TextPattern pages
- [ ] All images identified and exported
- [ ] Content inventory documented

**Implementation:**
Create spreadsheet/document with:
| Page Title | URL | Content Type | Images | Notes |
|------------|-----|-------------|--------|-------|
| Home | / | Welcome content | TBD | |
| Contact | /contact | Dropdown parent | - | |
| Address, Phone, Email | /contact/address | Contact info | TBD | |
| Clergy and Staff | /contact/clergy | Staff bios | TBD | |
| Worship | /worship | Dropdown parent | - | |
| Our Weekly Services | /worship/services | Service schedule | TBD | |
| Children | /worship/children | Children's programs | TBD | |
| Livestreamed Services | /worship/livestream | Livestream info | TBD | |
| Outreach | /outreach | Dropdown parent | - | |
| Weekend Breakfast Programme | /outreach/breakfast | Program info | TBD | |
| Safe Space Drop In | /outreach/safe-space | Program info | TBD | |
| Relationship-Based Support | /outreach/support | Program info | TBD | |
| Our Neighbourhood | /outreach/neighbourhood | Community info | TBD | |
| Poverty and Income Inequality | /outreach/poverty | Advocacy info | TBD | |
| History | /history | Historical content | TBD | |

---

### SPRINT-8-002: Export Text Content
**Estimate:** 8 hours  
**Acceptance Criteria:**
- [ ] All page content exported
- [ ] Structured format for import
- [ ] HTML converted to Portable Text

**Implementation:**
1. Log into TextPattern admin
2. Export each page content as HTML
3. Convert HTML to Portable Text format:
   ```json
   {
     "_type": "block",
     "style": "normal",
     "children": [
       { "_type": "span", "text": "Content here" }
     ]
   }
   ```
4. Store in migration spreadsheet

---

### SPRINT-8-003: Export and Upload Images
**Estimate:** 8 hours  
**Acceptance Criteria:**
- [ ] All images downloaded from TextPattern
- [ ] Uploaded to Sanity assets
- [ ] Image references updated

**Implementation:**
```bash
# 1. Download all images from TextPattern
mkdir -p migration/images
# Use wget or manual download

# 2. Upload to Sanity
cd sanity
npx sanity upload ../migration/images/*.jpg

# 3. Update migration spreadsheet with Sanity image IDs
```

---

### SPRINT-8-004: Create Page Content in Sanity
**Estimate:** 16 hours (2 days)  
**Acceptance Criteria:**
- [ ] All pages created in Sanity
- [ ] Content properly formatted
- [ ] Images linked correctly

**Implementation:**
1. Open Sanity Studio
2. For each page:
   - Create new document
   - Set title and slug
   - Paste/format content
   - Attach images
   - Set sidebar widgets
3. Publish when complete

---

### SPRINT-8-005: Configure Redirects
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] URL changes documented
- [ ] Redirects configured in Cloudflare
- [ ] 404 page handles gracefully

**Implementation:**
Create `static/_redirects` for Netlify or Cloudflare Pages:
```
/old-page /new-page 301
/about-us /about 301
```

Create `src/pages/404.astro`:
```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import { getSiteSettings } from '../lib/sanity';
const settings = await getSiteSettings();
---

<PageLayout title="Page Not Found" settings={settings}>
  <main id="main-content">
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Return to homepage</a>
  </main>
</PageLayout>
```

---

### SPRINT-8-006: Migration Validation
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] All pages render correctly
- [ ] No missing content
- [ ] Images display properly

**Implementation:**
1. Compare rendered pages against original
2. Check for:
   - Missing text
   - Broken images
   - Incorrect formatting
   - Missing images
3. Document any discrepancies
4. Fix issues in Sanity

---

## Sprint 8 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-8-000 | Sitemap Confirmation | ☐ |
| SPRINT-8-001 | Content Audit | ☐ |
| SPRINT-8-002 | Export Text | ☐ |
| SPRINT-8-003 | Export Images | ☐ |
| SPRINT-8-004 | Create in Sanity | ☐ |
| SPRINT-8-005 | Configure Redirects | ☐ |
| SPRINT-8-006 | Validation | ☐ |

**Definition of Done:**
- All content migrated to Sanity
- All pages render correctly
- Redirects configured
- No broken links or missing images
