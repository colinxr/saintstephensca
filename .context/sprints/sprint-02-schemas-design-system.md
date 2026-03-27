# Sprint 2: Schema Design & Core Schemas

**Duration:** 2 weeks  
**Epic:** Epic 2 - CMS Setup & Schema Design  
**Epic:** Epic 3 - Design System & Prototyping (partial)  
**Goal:** Schema architecture complete, CSS foundation laid

---

## Tickets

### SPRINT-2-001: Design Page Schema
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Page schema with title, slug, mainContent, sidebarWidgets
- [ ] Validation rules on required fields
- [ ] Schema documented

**Implementation:**
Create `sanity/schemas/page.ts`:
```typescript
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() },
    { name: 'alertBox', title: 'Alert Box', type: 'reference', to: [{ type: 'alert' }] },
    { name: 'mainContent', title: 'Main Content', type: 'array', of: [
      { type: 'block' },
      { type: 'alignedImage' }
    ]},
    { name: 'sidebarWidgets', title: 'Sidebar', type: 'array', of: [
      { type: 'string' } // Widget type reference
    ]}
  ]
}
```

---

### SPRINT-2-002: Create Alert Box Schema
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Alert schema with title, content, style, active flag
- [ ] Optional association to specific pages

**Implementation:**
Create `sanity/schemas/alert.ts`:
```typescript
export default {
  name: 'alert',
  title: 'Alert Box',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'style', title: 'Style', type: 'string', options: {
      list: [
        { title: 'Default', value: 'default' },
        { title: 'Christmas', value: 'christmas' },
        { title: 'Urgent', value: 'urgent' }
      ]
    }},
    { name: 'isActive', title: 'Active', type: 'boolean', initialValue: false }
  ]
}
```

---

### SPRINT-2-003: Create Aligned Image Schema
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Image schema with alignment (left/center/right)
- [ ] Required alt text
- [ ] Optional caption

**Implementation:**
Create `sanity/schemas/alignedImage.ts`:
```typescript
export default {
  name: 'alignedImage',
  title: 'Aligned Image',
  type: 'object',
  fields: [
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
    { name: 'alignment', title: 'Alignment', type: 'string', options: {
      list: [
        { title: 'Left', value: 'left' },
        { title: 'Center', value: 'center' },
        { title: 'Right', value: 'right' }
      ]
    }},
    { name: 'caption', title: 'Caption', type: 'string' },
    { name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required().error('Alt text is required for accessibility') }
  ]
}
```

---

### SPRINT-2-004: Create Navigation Schema
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] MenuItem schema with label, link, children (dropdown)
- [ ] Ordering support
- [ ] Recursive structure for nested menus

**Implementation:**
Create `sanity/schemas/menuItem.ts`:
```typescript
export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'link', title: 'Link', type: 'string', description: 'Page slug or external URL' },
    { name: 'children', title: 'Dropdown Items', type: 'array', of: [{ type: 'menuItem' }] },
    { name: 'order', title: 'Order', type: 'number' }
  ]
}
```

---

### SPRINT-2-005: Create Site Settings Schema (Singleton)
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Singleton schema for global content
- [ ] Header image, church name, address, footer info
- [ ] Navigation structure
- [ ] Social links and donation links

**Implementation:**
Create `sanity/schemas/siteSettings.ts`:
```typescript
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // Disable create/delete
  fields: [
    { name: 'churchName', title: 'Church Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'headerImage', title: 'Header Image', type: 'image' },
    { name: 'navigation', title: 'Navigation', type: 'array', of: [{ type: 'menuItem' }] },
    { name: 'footerCopyright', title: 'Footer Copyright', type: 'string' },
    { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'object', fields: [
      { name: 'platform', type: 'string' },
      { name: 'url', type: 'url' }
    ]}]},
    { name: 'donationLink', title: 'Donation Link', type: 'url' }
  ]
}
```

---

### SPRINT-2-006: Set Up CSS Variables & Design Tokens
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] CSS custom properties for all colors
- [ ] Typography scale defined
- [ ] Spacing scale defined
- [ ] Source from prototype.css

**Implementation:**
Create `src/styles/design-tokens.css`:
```css
:root {
  /* Colors */
  --text-color: #2b2500;
  --text-color-light: #5c4d1a;
  --bg-color: #fffef5;
  --bg-alt: #fff9e6;
  --accent-color: #f5c518;
  --accent-light: #ffdd55;
  --accent-dark: #d4a600;
  --accent-muted: #f5e6b3;
  --border-color: #e8dba8;
  --border-color-dark: #d4c192;
  --alert-bg-color: #fff9e6;
  --link-color: #996600;
  --link-hover: #2b2500;
  
  /* Typography */
  --font-family: "Public Sans", sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.6;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
}
```

---

### SPRINT-2-007: Implement Base Typography Styles
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Heading styles (h1-h6)
- [ ] Paragraph and list styles
- [ ] Link styles with hover states

**Implementation:**
Create `src/styles/typography.css`:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-md);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }

p { margin-bottom: var(--space-md); }

a {
  color: var(--link-color);
  text-decoration: underline;
}
a:hover { color: var(--link-hover); }
```

---

## Sprint 2 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-2-001 | Page Schema | ☐ |
| SPRINT-2-002 | Alert Schema | ☐ |
| SPRINT-2-003 | Aligned Image Schema | ☐ |
| SPRINT-2-004 | Navigation Schema | ☐ |
| SPRINT-2-005 | Site Settings Schema | ☐ |
| SPRINT-2-006 | CSS Design Tokens | ☐ |
| SPRINT-2-007 | Typography Styles | ☐ |

**Definition of Done:**
- All schemas createable in Sanity Studio
- CSS variables cascade correctly
- No lint errors
