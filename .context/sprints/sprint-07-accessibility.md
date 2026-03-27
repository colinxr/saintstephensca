# Sprint 7: Accessibility Implementation

**Duration:** 2 weeks  
**Epic:** Epic 6 - Accessibility Implementation  
**Goal:** WCAG 2.1 AA compliance, full keyboard navigation

---

## Tickets

### SPRINT-7-001: Add Skip Navigation Link
**Estimate:** 1 hour  
**Acceptance Criteria:**
- [ ] Skip link as first focusable element
- [ ] Visible only on focus
- [ ] Links to main content

**Implementation:**
Add to `BaseLayout.astro`:
```astro
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <!-- Rest of layout -->
</body>
```

Add to CSS:
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--accent-color);
  color: var(--text-color);
  padding: var(--space-sm) var(--space-md);
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

---

### SPRINT-7-002: Implement Keyboard Dropdown Navigation
**Estimate:** 6 hours  
**Acceptance Criteria:**
- [ ] Arrow keys navigate within dropdowns
- [ ] Escape closes dropdown
- [ ] Enter/Space activates links
- [ ] Tab moves to next top-level item

**Implementation:**
Update navigation script:
```javascript
document.querySelectorAll('nav li').forEach(item => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('ul');
  
  if (submenu) {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        submenu.querySelector('a')?.focus();
      }
      if (e.key === 'Escape') {
        submenu.style.display = 'none';
        link?.focus();
      }
    });
    
    link?.addEventListener('focus', () => {
      submenu.style.display = 'block';
    });
  }
});
```

---

### SPRINT-7-003: Add ARIA Landmarks
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Header with role="banner"
- [ ] Nav with aria-label
- [ ] Main with id="main-content"
- [ ] Sidebar with role="complementary"
- [ ] Footer with role="contentinfo"

**Implementation:**
Update components with proper ARIA:
```astro
<!-- Header.astro -->
<header role="banner">

<!-- Navigation.astro -->
<nav role="navigation" aria-label="Main navigation">

<!-- PageLayout.astro -->
<main id="main-content" role="main">

<!-- Sidebar.astro -->
<aside role="complementary">

<!-- Footer.astro -->
<footer role="contentinfo">
```

---

### SPRINT-7-004: Verify Color Contrast
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] All text meets 4.5:1 contrast ratio
- [ ] Large text meets 3:1 ratio
- [ ] Links meet 3:1 against background

**Implementation:**
Using browser DevTools or axe:
1. Check all text/background combinations
2. Verify against WCAG requirements
3. Current palette verification (from impl-plan):
   - `--text-color: #2b2500` on `--bg-color: #fffef5` = 12.6:1 ✓
   - `--link-color: #996600` on `--bg-color: #fffef5` = 4.8:1 ✓
   - `--accent-color: #f5c518` on `--text-color: #2b2500` = 3.2:1 ✓

---

### SPRINT-7-005: Add Focus Indicators
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Visible focus ring on all interactive elements
- [ ] Minimum 3:1 contrast against background
- [ ] Not removed with outline: none

**Implementation:**
Add to CSS:
```css
:focus-visible {
  outline: 3px solid var(--accent-color);
  outline-offset: 2px;
}

/* Remove default if replacing */
button:focus:not(:focus-visible),
a:focus:not(:focus-visible) {
  outline: none;
}
```

---

### SPRINT-7-006: Screen Reader Testing
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] VoiceOver (macOS) testing completed
- [ ] Logical heading hierarchy
- [ ] Images have alt text
- [ ] Dynamic content announced

**Implementation:**
1. Navigate with VoiceOver (Cmd+F5)
2. Check heading structure (no skipped levels)
3. Verify all images have alt
4. Test alert box announcement
5. Document any issues

---

### SPRINT-7-007: Automated Accessibility Audit
**Estimate:** 3 hours  
**Acceptance Criteria:**
- [ ] axe DevTools report generated
- [ ] Zero critical/high violations
- [ ] Report documented

**Implementation:**
```bash
# Install axe
npm install -D @axe-core/playwright

# Run in test
const AxeBuilder = require('@axe-core/playwright').default;
const results = await new AxeBuilder({ page }).analyze();
console.log(results);
```

---

## Sprint 7 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-7-001 | Skip Link | ☐ |
| SPRINT-7-002 | Keyboard Dropdowns | ☐ |
| SPRINT-7-003 | ARIA Landmarks | ☐ |
| SPRINT-7-004 | Color Contrast | ☐ |
| SPRINT-7-005 | Focus Indicators | ☐ |
| SPRINT-7-006 | Screen Reader Test | ☐ |
| SPRINT-7-007 | Automated Audit | ☐ |

**Definition of Done:**
- Zero critical/high accessibility violations
- Full keyboard navigation functional
- Screen reader testing passed
- WCAG 2.1 AA compliance documented
