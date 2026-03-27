# Sprint 6: Sidebar Widgets & Preview

**Duration:** 2 weeks  
**Epic:** Epic 5 - Content Components (completion)  
**Epic:** Epic 7 - Preview System (partial)  
**Goal:** Sidebar blocks complete, preview system functional

---

## Tickets

### SPRINT-6-001: Implement Donation Widget
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Styled donation call-to-action
- [ ] Link to donation page
- [ ] Prominent visual treatment

**Implementation:**
Add to Sidebar component:
```astro
{widget.widgetType === 'donation' && (
  <div class="widget-donation">
    <h3>Support Our Mission</h3>
    <p>Your generosity makes our work possible.</p>
    <a href={widget.linkUrl} class="btn-donate">
      {widget.linkText || 'Donate Now'}
    </a>
  </div>
)}
```

Add styles:
```css
.widget-donation {
  background: var(--accent-muted);
  padding: var(--space-md);
  border-radius: 4px;
  text-align: center;
}

.btn-donate {
  display: inline-block;
  background: var(--accent-color);
  color: var(--text-color);
  padding: var(--space-sm) var(--space-md);
  border-radius: 4px;
  font-weight: 700;
  margin-top: var(--space-sm);
}
```

---

### SPRINT-6-002: Implement Service Schedule Widget
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Lists weekly service times
- [ ] Rich text content for additional info
- [ ] Clean, readable formatting

**Implementation:**
Add to Sidebar component:
```astro
{widget.widgetType === 'serviceSchedule' && (
  <div class="widget-services">
    <h3>{widget.title || 'Service Times'}</h3>
    <div class="widget-content">
      {/* Render Portable Text */}
    </div>
  </div>
)}
```

---

### SPRINT-6-003: Implement Social Links Widget
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Lists social media links
- [ ] Icons for each platform
- [ ] Opens in new tab

**Implementation:**
```astro
{widget.widgetType === 'social' && (
  <div class="widget-social">
    <h3>{widget.title || 'Connect With Us'}</h3>
    <nav aria-label="Social media">
      {widget.content?.map(link => (
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.platform}
        </a>
      ))}
    </nav>
  </div>
)}
```

---

### SPRINT-6-004: Finalize Preview System
**Estimate:** 5 hours  
**Acceptance Criteria:**
- [ ] Preview endpoint validates secret
- [ ] Draft content returned
- [ ] Preview iframe in Studio works

**Implementation:**
Update `src/pages/preview.ts`:
```typescript
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  if (secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 });
  }
  
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');
  
  // Fetch draft content from Sanity
  const client = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    token: import.meta.env.SANITY_API_TOKEN,
    perspective: 'previewDrafts',
    useCdn: false
  });
  
  const document = await client.fetch(`*[_type == $type && _id == $id][0]`, { type, id });
  
  // Redirect to appropriate preview URL
  const previewUrl = document?.slug?.current 
    ? `/preview/${document.slug.current}`
    : '/';
  
  return new Response(null, {
    status: 307,
    headers: { 'Location': `${previewUrl}?preview=true` }
  });
};
```

---

### SPRINT-6-005: Create Preview Page Template
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Renders draft content
- [ ] Visual indicator this is preview mode
- [ ] Shows published vs draft state

**Implementation:**
Create `src/pages/preview/[...slug].astro`:
```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import { getSiteSettings } from '../../lib/sanity';
import { getPreviewPage } from '../../lib/sanity';

const settings = await getSiteSettings();
const page = await getPreviewPage(Astro.params.slug);

if (!page) {
  return Astro.redirect('/404');
}
---

<PageLayout title={page.title} settings={settings}>
  <div class="preview-banner">
    <span>Preview Mode</span>
    <a href={`/studio/page/${page._id}`}>Edit in Sanity</a>
  </div>
  
  <main role="main">
    {page.alertBox && <AlertBox alert={page.alertBox} />}
    <Article title={page.title}>
      {/* Render content */}
    </Article>
  </main>
</PageLayout>
```

---

### SPRINT-6-006: Test Full Preview Workflow
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Editor opens page in Studio
- [ ] Clicks Preview button
- [ ] Preview window shows draft content
- [ ] Changes reflected immediately

**Implementation:**
1. Open Sanity Studio
2. Navigate to a page
3. Click "Preview" in top-right
4. Verify preview window opens with draft content
5. Edit content, save draft
6. Refresh preview - see changes

---

## Sprint 6 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-6-001 | Donation Widget | ☐ |
| SPRINT-6-002 | Service Schedule Widget | ☐ |
| SPRINT-6-003 | Social Links Widget | ☐ |
| SPRINT-6-004 | Preview Endpoint | ☐ |
| SPRINT-6-005 | Preview Template | ☐ |
| SPRINT-6-006 | Preview Workflow Test | ☐ |

**Definition of Done:**
- All widgets render from CMS
- Preview system fully functional
- Editor can preview changes before publishing
