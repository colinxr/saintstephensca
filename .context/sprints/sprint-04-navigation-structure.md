# Sprint 4: Navigation & Page Structure

**Duration:** 2 weeks  
**Epic:** Epic 4 - Frontend Core Layout (completion)  
**Goal:** Dropdown navigation, two-column layout, responsive behavior

---

## Tickets

### SPRINT-4-001: Create Navigation Component
**Estimate:** 6 hours  
**Acceptance Criteria:**
- [ ] Semantic nav with role="navigation"
- [ ] Renders menu items from CMS
- [ ] Dropdown support for nested items

**Implementation:**
Create `src/components/Navigation.astro`:
```astro
---
interface MenuItem {
  label: string;
  link: string;
  children?: MenuItem[];
}

interface Props {
  items: MenuItem[];
}

const { items } = Astro.props;
---

<nav role="navigation" aria-label="Main navigation">
  <button 
    class="menu-toggle" 
    aria-expanded="false" 
    aria-controls="main-menu"
  >
    Menu
  </button>
  <ul id="main-menu" class="menu">
    {items.map(item => (
      <li>
        <a href={item.link}>{item.label}</a>
        {item.children && item.children.length > 0 && (
          <ul class="submenu">
            {item.children.map(child => (
              <li><a href={child.link}>{child.label}</a></li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
</nav>
```

---

### SPRINT-4-002: Implement CSS Dropdown Menu
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Desktop: hover to reveal dropdowns
- [ ] Keyboard focus support with :focus-within
- [ ] Proper z-index layering

**Implementation:**
Add to `src/styles/navigation.css`:
```css
nav ul.menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  position: relative;
}

nav li:hover > ul.submenu,
nav li:focus-within > ul.submenu {
  display: block;
}

ul.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  min-width: 200px;
  z-index: 100;
}
```

---

### SPRINT-4-003: Mobile Navigation Toggle
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Hamburger button on mobile
- [ ] Toggles menu visibility
- [ ] ARIA attributes update correctly

**Implementation:**
Add to navigation component:
```astro
<style>
  .menu-toggle { display: none; }
  @media (max-width: 768px) {
    .menu-toggle { display: block; }
    nav ul.menu { display: none; }
    nav ul.menu.open { display: block; }
  }
</style>

<script>
  document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    const menu = document.querySelector('#main-menu');
    const toggle = document.querySelector('.menu-toggle');
    menu?.classList.toggle('open');
    toggle?.setAttribute('aria-expanded', 
      toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
  });
</script>
```

---

### SPRINT-4-004: Implement Two-Column Blog Layout
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] CSS Grid for main + sidebar
- [ ] Main content area with proper width
- [ ] Sidebar with proper width

**Implementation:**
Add to `src/styles/layout.css`:
```css
.container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
}

main {
  min-width: 0; /* Prevent overflow */
}

aside {
  min-width: 0;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
  aside { order: 2; }
}
```

---

### SPRINT-4-005: Add Responsive Breakpoints
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] Mobile-first approach
- [ ] Breakpoint at 768px for tablet
- [ ] Breakpoint at 1024px for desktop
- [ ] No horizontal scroll on any viewport

**Implementation:**
Review and update all CSS with:
```css
/* Base styles (mobile) */
.element { width: 100%; }

/* Tablet */
@media (min-width: 768px) {
  .element { width: 50%; }
}

/* Desktop */
@media (min-width: 1024px) {
  .element { width: 33%; }
}
```

---

### SPRINT-4-006: Visual Regression Testing
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Page renders without layout breaks
- [ ] Header, nav, content, sidebar all visible
- [ ] Footer renders at bottom

**Implementation:**
```bash
npm install -D playwright
npx playwright install chromium
# Run visual comparison against prototype reference
```

---

## Sprint 4 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-4-001 | Navigation Component | ☐ |
| SPRINT-4-002 | CSS Dropdown Menu | ☐ |
| SPRINT-4-003 | Mobile Toggle | ☐ |
| SPRINT-4-004 | Two-Column Layout | ☐ |
| SPRINT-4-005 | Responsive Breakpoints | ☐ |
| SPRINT-4-006 | Visual Regression | ☐ |

**Definition of Done:**
- Navigation fully keyboard accessible
- Dropdowns work on desktop and mobile
- Two-column layout renders correctly
- No layout breaks at any breakpoint
