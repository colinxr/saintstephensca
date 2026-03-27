# Sprint 10: Launch & Training

**Duration:** 2 weeks  
**Epic:** Epic 10 - Launch & Training  
**Goal:** Site live, team trained

---

## Tickets

### SPRINT-10-001: Production Deployment
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Site deployed to production
- [ ] SSL certificate active
- [ ] Domain pointed correctly

**Implementation:**
```bash
# Deploy to Cloudflare Pages
npm run deploy -- --prod

# Or use GitHub Actions (automatic on main push)
```

Verify:
- Site accessible at ststephens.ca
- HTTPS working
- No mixed content warnings

---

### SPRINT-10-002: DNS & Domain Configuration
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Domain pointed to Cloudflare
- [ ] DNS records correct
- [ ] SSL certificate issued

**Implementation:**
1. Update DNS at domain registrar:
   - A record: @ → Cloudflare Pages IP
   - CNAME: www → @ or Cloudflare Pages domain
2. Enable Cloudflare SSL/TLS
3. Set encryption mode to "Full"
4. Wait for propagation (up to 48 hours)

---

### SPRINT-10-003: Post-Launch Monitoring
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Uptime check configured
- [ ] Error monitoring set up
- [ ] Alert contacts configured

**Implementation:**
Set up at least one:
- Cloudflare Analytics (automatic)
- UptimeRobot (free tier)
- Pingdom
- Sentry for JS errors

---

### SPRINT-10-004: Create Editor Documentation
**Estimate:** 8 hours  
**Acceptance Criteria:**
- [ ] How to edit pages guide
- [ ] How to manage alert boxes
- [ ] How to add images
- [ ] How to use preview

**Implementation:**
Create `docs/editor-guide.md`:
```markdown
# Saint Stephens Website Editor Guide

## Getting Started
Access the CMS at https://ststephens.ca/studio

## Editing Pages
1. Navigate to the page you want to edit
2. Click "Edit" in the top navigation
3. Make your changes
4. Click "Publish" to make live

## Adding Images
...

## Previewing Changes
...
```

---

### SPRINT-10-005: Editor Training Session
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Hands-on training completed
- [ ] Editors can perform basic tasks
- [ ] Questions answered

**Implementation:**
1. Schedule 1-hour training session
2. Cover:
   - Logging in
   - Editing a page
   - Adding an alert
   - Previewing changes
   - Publishing
3. Provide practice exercise
4. Share documentation link

---

### SPRINT-10-006: Backup Strategy
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Sanity backup configured
- [ ] Recovery documented
- [ ] Tested

**Implementation:**
Sanity has built-in automatic backups. Document recovery steps:
1. Go to sanity.io/manage
2. Select project
3. Go to Settings > Backups
4. Restore from backup

---

### SPRINT-10-007: Handoff Checklist
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] All deliverables transferred
- [ ] Support contacts shared
- [ ] Project retrospective completed

**Implementation:**
Deliverables checklist:
- [ ] GitHub repository access
- [ ] Sanity Studio access
- [ ] Cloudflare Pages dashboard
- [ ] Domain registrar access (if needed)
- [ ] Editor documentation
- [ ] This sprint plan

---

## Sprint 10 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-10-001 | Production Deploy | ☐ |
| SPRINT-10-002 | DNS Configuration | ☐ |
| SPRINT-10-003 | Monitoring | ☐ |
| SPRINT-10-004 | Editor Docs | ☐ |
| SPRINT-10-005 | Training Session | ☐ |
| SPRINT-10-006 | Backup Strategy | ☐ |
| SPRINT-10-007 | Handoff Checklist | ☐ |

**Definition of Done:**
- Site live at production URL
- Editors trained and comfortable
- Documentation delivered
- Support contacts established
- Project retrospective completed
