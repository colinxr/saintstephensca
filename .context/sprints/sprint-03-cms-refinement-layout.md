# Sprint 3: CMS Refinement & Layout Infrastructure

**Duration:** 2 weeks  
**Epic:** Epic 2 - CMS Setup & Schema Design (completion)  
**Epic:** Epic 4 - Frontend Core Layout (partial)  
**Goal:** Full schema implementation, page shell with header/footer

---

## Tickets

### SPRINT-3-001: Implement Sidebar Widget Schemas
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Sidebar widget schema with type discriminator
- [ ] Widget types: serviceSchedule, donation, social, badge
- [ ] Widget content varies by type

**Implementation:**
Create `sanity/schemas/sidebarWidget.ts`:
```typescript
export default {
  name: 'sidebarWidget',
  title: 'Sidebar Widget',
  type: 'object',
  fields: [
    { name: 'widgetType', title: 'Widget Type', type: 'string', options: {
      list: [
        { title: 'Service Schedule', value: 'serviceSchedule' },
        { title: 'Donation', value: 'donation' },
        { title: 'Social Links', value: 'social' },
        { title: 'Badge', value: 'badge' }
      ]
    }},
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'linkText', title: 'Link Text', type: 'string' },
    { name: 'linkUrl', title: 'Link URL', type: 'url' }
  ]
}
```

---

### SPRINT-3-002: Configure Sanity Preview
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Preview URL configured in sanity.config.ts
- [ ] Preview endpoint in Astro
- [ ] Preview secret validation works

**Implementation:**
Update `sanity/sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { previewPlugin } from 'sanity-plugin-preview'

export default defineConfig({
  // ... existing config
  plugins: [
    structureTool(),
    previewPlugin({
      previewUrl: '/preview'
    })
  ]
})
```

Create `src/pages/preview.ts`:
```typescript
import type { APIRoute } from 'astro'
import { sanityClient } from '../lib/sanity'

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')
  
  if (secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }
  
  return new Response(null, { status: 307, headers: { 'Location': '/' }})
}
```

---

### SPRINT-3-003: Create Base Layout Component
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] BaseLayout with HTML shell
- [ ] Language attribute set
- [ ] Meta viewport
- [ ] Font preconnect

**Implementation:**
Create `src/layouts/BaseLayout.astro`:
```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Saint Stephen-in-the-Fields Anglican Church' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
  <slot />
</body>
</html>
```

---

### SPRINT-3-004: Create Header Component
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Header with site branding (h1)
- [ ] Header image from CMS
- [ ] Address bar with diocese link
- [ ] ARIA landmarks

**Implementation:**
Create `src/components/Header.astro`:
```astro
---
import type { SiteSettings } from '../lib/types';

interface Props {
  settings: SiteSettings;
}

const { settings } = Astro.props;
---

<header role="banner">
  <div id="site-branding">
    <h1>
      <a href="/">{settings.churchName}</a>
    </h1>
    {settings.headerImage && (
      <img 
        src={settings.headerImage} 
        alt="" 
        class="header-image"
      />
    )}
  </div>
  <div class="address-bar">
    <address>{settings.address}</address>
    {settings.diocesanLink && (
      <a href={settings.diocesanLink}>Anglican Diocese of Toronto</a>
    )}
  </div>
</header>
```

---

### SPRINT-3-005: Create Footer Component
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Semantic footer with role="contentinfo"
- [ ] Copyright from CMS settings
- [ ] Links to social if set

**Implementation:**
Create `src/components/Footer.astro`:
```astro
---
interface Props {
  copyright: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

const { copyright, socialLinks = [] } = Astro.props;
---

<footer role="contentinfo">
  <p>&copy; {new Date().getFullYear()} {copyright}</p>
  {socialLinks.length > 0 && (
    <nav aria-label="Social media links">
      {socialLinks.map(link => (
        <a href={link.url}>{link.platform}</a>
      ))}
    </nav>
  )}
</footer>
```

---

### SPRINT-3-006: Create Page Layout Shell
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Wraps BaseLayout
- [ ] Includes Header, Navigation, Footer
- [ ] Two-column grid structure ready

**Implementation:**
Create `src/layouts/PageLayout.astro`:
```astro
---
import BaseLayout from './BaseLayout.astro';
import Header from '../components/Header.astro';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';
import type { SiteSettings } from '../lib/types';

interface Props {
  title: string;
  settings: SiteSettings;
}

const { title, settings } = Astro.props;
---

<BaseLayout title={title}>
  <div class="outer">
    <Header settings={settings} />
    <Navigation items={settings.navigation} />
    <div class="wrapper">
      <div class="container">
        <slot />
      </div>
    </div>
    <Footer copyright={settings.footerCopyright} socialLinks={settings.socialLinks} />
  </div>
</BaseLayout>
```

---

## Sprint 3 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-3-001 | Sidebar Widget Schemas | ☐ |
| SPRINT-3-002 | Preview Configuration | ☐ |
| SPRINT-3-003 | Base Layout | ☐ |
| SPRINT-3-004 | Header Component | ☐ |
| SPRINT-3-005 | Footer Component | ☐ |
| SPRINT-3-006 | Page Layout Shell | ☐ |

**Definition of Done:**
- Preview works in Sanity Studio
- All layouts render correctly
- CSS imports work
