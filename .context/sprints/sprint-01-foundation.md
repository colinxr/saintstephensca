# Sprint 1: Foundation Setup

**Duration:** 2 weeks  
**Epic:** Epic 1 - Project Foundation & DevOps  
**Goal:** Fully operational development environment

---

## Tickets

### SPRINT-1-001: Initialize Git Repository
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] Repository initialized with .gitignore for Node.js, Sanity, Astro
- [ ] Initial commit made
- [ ] Remote set to GitHub

**Implementation:**
```bash
git init
touch .gitignore
# Add patterns: node_modules, .sanity, dist, .env
git add .gitignore
git commit -m "chore: add project .gitignore"
```

---

### SPRINT-1-002: Create Sanity Project
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Sanity project created via `npx create-sanity@latest`
- [ ] Studio accessible at /studio
- [ ] Project ID noted for environment variables

**Implementation:**
```bash
mkdir sanity && cd sanity
npx create-sanity@latest
# Follow prompts: Next.js app (No), TypeScript (Yes), embedded studio (No)
```

**Files to create:**
- `sanity/sanity.config.ts`
- `sanity/package.json`
- `.env` with `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`

---

### SPRINT-1-003: Scaffold Astro Project
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] Astro project in root directory
- [ ] Dependencies installed
- [ ] Basic `npm run dev` works

**Implementation:**
```bash
npm create astro@latest -- --template minimal --no-install --no-git
npm install
npm run dev
```

**Files to create:**
- `astro.config.mjs`
- `package.json`
- `tsconfig.json`

---

### SPRINT-1-004: Configure CI/CD Pipeline
**Estimate:** 4 hours  
**Acceptance Criteria:**
- [ ] GitHub Actions workflow for Astro build
- [ ] Deploys to Cloudflare Pages on main push
- [ ] Preview deployments for PRs

**Implementation:**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: saintstephensca
          directory: dist
```

---

### SPRINT-1-005: Set Up Code Quality Tools
**Estimate:** 2 hours  
**Acceptance Criteria:**
- [ ] ESLint configured for Astro/TypeScript
- [ ] Prettier configured with consistent formatting
- [ ] Pre-commit hook runs lint

**Implementation:**
```bash
npm install -D eslint @typescript-eslint/parser eslint-plugin-astro prettier
npx eslint --init
# Configure .prettierrc
```

**Files to create:**
- `.eslintrc.cjs`
- `.prettierrc`
- `.husky/pre-commit`

---

## Sprint 1 Deliverables

| Ticket | Description | Status |
|--------|-------------|--------|
| SPRINT-1-001 | Git Repository | ☐ |
| SPRINT-1-002 | Sanity Project | ☐ |
| SPRINT-1-003 | Astro Project | ☐ |
| SPRINT-1-004 | CI/CD Pipeline | ☐ |
| SPRINT-1-005 | Code Quality | ☐ |

**Definition of Done:**
- All tickets completed
- Local dev environment works
- Deployment pipeline green
- Code lints without errors
