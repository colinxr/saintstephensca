# Sprint 9: Performance & QA

**Duration:** 2 weeks  
**Epic:** Epic 9 - Performance & QA  
**Goal:** Site production-ready with Lighthouse 90+ scores

---

## Tickets

### SPRINT-9-001: Lighthouse Performance Audit
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Baseline Lighthouse scores captured
- [ ] Performance score 90+ (mobile)
- [ ] Issues documented

**Implementation:**
```bash
npm install -D lighthouse
npx lighthouse https://staging.ststephens.ca --output html --output-path ./lighthouse-report.html
```

Or use Chrome DevTools > Lighthouse tab

---

### SPRINT-9-002: Image Optimization
**Estimate:** 6 hours  
**Acceptance Criteria:**
- [ ] All images in WebP format
- [ ] Responsive srcset implemented
- [ ] Lazy loading for below-fold images

**Implementation:**
1. Convert images to WebP:
   ```bash
   # Use cwebp or online converter
   cwebp -q 80 input.jpg -o output.webp
   ```

2. Update image component:
   ```astro
   <img 
     src={image.src}
     srcset={`${image.src400} 400w, ${image.src800} 800w`}
     sizes="(max-width: 768px) 100vw, 50vw"
     loading="lazy"
     width={image.width}
     height={image.height}
     alt={image.alt}
   />
   ```

---

### SPRINT-9-003: Minify CSS & JavaScript
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Astro production build minified
- [ ] No unused CSS
- [ ] Critical CSS inlined

**Implementation:**
```bash
npm run build
# Astro handles minification automatically
```

Verify with:
```bash
npm install -D purgecss
# Check for unused styles
```

---

### SPRINT-9-004: Font Optimization
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Font display swap
- [ ] Preconnect to Google Fonts
- [ ] No layout shift from fonts

**Implementation:**
Update `BaseLayout.astro`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=...">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=..." media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=..."></noscript>
```

Add to CSS:
```css
@font-face {
  font-display: swap;
}
```

---

### SPRINT-9-005: Core Web Vitals Optimization
**Estimate:** 6 hours  
**Acceptance Criteria:**
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

**Implementation:**
For LCP:
- Preload hero image: `<link rel="preload" as="image" href="/images/header.webp">`
- Ensure header image is optimized

For FID:
- Defer non-critical JavaScript
- No heavy main-thread work

For CLS:
- Explicit width/height on all images
- Reserve space for dynamic content
- No late-loading fonts causing shift

---

### SPRINT-9-006: Cross-Browser Testing
**Estimate:** 6 hours  
**Acceptance Criteria:**
- [ ] Chrome, Firefox, Safari, Edge - last 2 versions
- [ ] iOS Safari, Chrome Android
- [ ] No rendering differences

**Implementation:**
1. Test manually on available devices
2. Use BrowserStack for additional browsers
3. Check:
   - Layout
   - Fonts
   - JavaScript functionality
   - Forms (if any)

---

### SPRINT-9-007: SEO Basics
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Meta titles and descriptions
- [ ] OG tags for social sharing
- [ ] sitemap.xml generated
- [ ] robots.txt configured

**Implementation:**
Create `src/pages/sitemap.xml.ts`:
```typescript
import type { APIRoute } from 'astro';
import { sanityClient } from '../lib/sanity';

export const GET: APIRoute = async () => {
  const pages = await sanityClient.fetch(`*[_type == "page"]{ slug }`);
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>https://ststephens.ca/${page.slug.current}</loc>
        </url>
      `).join('')}
    </urlset>`;
    
  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' }});
};
```

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://ststephens.ca/sitemap.xml
```

---

### SPRINT-9-008: Broken Link Audit
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] No broken internal links
- [ ] No broken external links
- [ ] All images load

**Implementation:**
```bash
npm install -D broken-link-checker
npx blc http://localhost:4321 --filter 404 --recursive --get --exclude-external
```

---

## Sprint 9 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-9-001 | Lighthouse Audit | ☐ |
| SPRINT-9-002 | Image Optimization | ☐ |
| SPRINT-9-003 | Minification | ☐ |
| SPRINT-9-004 | Font Optimization | ☐ |
| SPRINT-9-005 | Core Web Vitals | ☐ |
| SPRINT-9-006 | Cross-Browser Test | ☐ |
| SPRINT-9-007 | SEO Basics | ☐ |
| SPRINT-9-008 | Link Audit | ☐ |

**Definition of Done:**
- Lighthouse Performance 90+
- Core Web Vitals passing
- Cross-browser tested
- SEO elements in place
