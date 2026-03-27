# Sprint 5: Alert Box & Article Components

**Duration:** 2 weeks  
**Epic:** Epic 5 - Content Components (partial)  
**Goal:** Alert box, article header, rich text body with image alignment

---

## Tickets

### SPRINT-5-001: Create Alert Box Component
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] AlertBox component accepts alert data
- [ ] Styled per alert style (default, christmas, urgent)
- [ ] Dismissible by user (closes and doesn't reappear on same page)

**Implementation:**
Create `src/components/AlertBox.astro`:
```astro
---
interface Alert {
  title?: string;
  content: any[]; // Portable Text
  style: 'default' | 'christmas' | 'urgent';
}

interface Props {
  alert: Alert;
}

const { alert } = Astro.props;
---

{alert && (
  <div class={`alert-box alert-${alert.style || 'default'}`} role="alert">
    <button class="alert-close" aria-label="Dismiss alert">&times;</button>
    {alert.title && <strong>{alert.title}</strong>}
    <div class="alert-content">
      {/* Render Portable Text */}
    </div>
  </div>
)}

<style>
  .alert-box {
    padding: var(--space-md);
    margin-bottom: var(--space-md);
    border-radius: 4px;
  }
  .alert-default { background: var(--alert-bg-color); }
  .alert-urgent { background: #fee; border: 2px solid #c00; }
  .alert-christmas { background: var(--accent-muted); }
</style>

<script>
  document.querySelector('.alert-close')?.addEventListener('click', (e) => {
    const alert = e.target.closest('.alert-box');
    alert?.remove();
    sessionStorage.setItem('alert-dismissed', 'true');
  });
</script>
```

---

### SPRINT-5-002: Create Article Component
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Semantic article element
- [ ] Page header with h1
- [ ] Body slot for content

**Implementation:**
Create `src/components/Article.astro`:
```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<article>
  <header>
    <h1>{title}</h1>
  </header>
  <div class="article-body">
    <slot />
  </div>
</article>
```

---

### SPRINT-5-003: Render Portable Text (Rich Text)
**Estimate:** 5 hours  
**Acceptance Criteria:**
- [ ] Custom components for each block type
- [ ] Headings, paragraphs, lists, links styled correctly
- [ ] Embedded aligned images render

**Implementation:**
Create `src/lib/portable-text.ts`:
```typescript
import { sanityClient, urlFor } from './sanity';

export async function renderPortableText(blocks: any[]) {
  return blocks.map(block => {
    if (block._type === 'block') {
      return renderBlock(block);
    }
    if (block._type === 'alignedImage') {
      return renderAlignedImage(block);
    }
  }).join('');
}

function renderBlock(block: any) {
  const text = block.children.map((child: any) => {
    if (child.marks.includes('strong')) {
      return `<strong>${child.text}</strong>`;
    }
    return child.text;
  }).join('');
  
  const style = block.style || 'normal';
  return `<${style}>${text}</${style}>`;
}

function renderAlignedImage(image: any) {
  return `<figure class="image-${image.alignment}">
    <img src="${urlFor(image.image).width(800).url()}" alt="${image.alt}" />
    ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ''}
  </figure>`;
}
```

---

### SPRINT-5-004: Style Aligned Images
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Left-aligned images float left
- [ ] Right-aligned images float right
- [ ] Center-aligned images centered with caption
- [ ] Captions styled appropriately

**Implementation:**
Add to `src/styles/content.css`:
```css
.image-left {
  float: left;
  margin: var(--space-md) var(--space-md) var(--space-md) 0;
  max-width: 50%;
}

.image-right {
  float: right;
  margin: var(--space-md) 0 var(--space-md) var(--space-md);
  max-width: 50%;
}

.image-center {
  display: block;
  margin: var(--space-lg) auto;
  text-align: center;
}

figure { margin: 0; }
figcaption {
  font-size: 0.875rem;
  color: var(--text-color-light);
  font-style: italic;
}
```

---

### SPRINT-5-005: Create Sidebar Component
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Semantic aside element
- [ ] Renders widget blocks
- [ ] Falls back to default widgets from settings

**Implementation:**
Create `src/components/Sidebar.astro`:
```astro
---
import type { SiteSettings } from '../lib/types';

interface Widget {
  widgetType: string;
  title?: string;
  content?: any[];
  linkText?: string;
  linkUrl?: string;
}

interface Props {
  widgets?: Widget[];
  settings: SiteSettings;
}

const { widgets = [], settings } = Astro.props;
const defaultWidgets = settings.defaultWidgets || [];
const displayWidgets = widgets.length > 0 ? widgets : defaultWidgets;
---

<aside role="complementary">
  {displayWidgets.map(widget => (
    <div class={`widget widget-${widget.widgetType}`}>
      {widget.title && <h3>{widget.title}</h3>}
      <div class="widget-content">
        {/* Render widget content */}
      </div>
    </div>
  ))}
</aside>
```

---

### SPRINT-5-006: Connect CMS Data to Pages
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Homepage fetches from Sanity
- [ ] Dynamic pages render content
- [ ] Alert box displays when set

**Implementation:**
Update `src/pages/index.astro`:
```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import { sanityClient } from '../lib/sanity';
import { getSiteSettings } from '../lib/sanity';

const settings = await getSiteSettings();
const pageData = await sanityClient.fetch(`
  *[_type == "page" && slug.current == "home"][0] {
    title,
    alertBox,
    mainContent,
    sidebarWidgets
  }
`);
---

<PageLayout title={settings.churchName} settings={settings}>
  <main role="main">
    {pageData.alertBox && <AlertBox alert={pageData.alertBox} />}
    <Article title={pageData.title}>
      {/* Render mainContent */}
    </Article>
    <Sidebar widgets={pageData.sidebarWidgets} settings={settings} />
  </main>
</PageLayout>
```

---

## Sprint 5 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-5-001 | Alert Box Component | ☐ |
| SPRINT-5-002 | Article Component | ☐ |
| SPRINT-5-003 | Portable Text Renderer | ☐ |
| SPRINT-5-004 | Aligned Image Styles | ☐ |
| SPRINT-5-005 | Sidebar Component | ☐ |
| SPRINT-5-006 | CMS Data Connection | ☐ |

**Definition of Done:**
- Content renders from Sanity
- Images align correctly
- Alert dismissible
- Sidebar widgets display
