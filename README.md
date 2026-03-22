# Portfolio Site — Lavoisier Cornerstone

**Live (Vercel):** https://portfolio-site-black-sigma.vercel.app  
**GitHub Repo:** https://github.com/cornerstonian/portfolio-site

A professional portfolio and marketing site built with Next.js, Tailwind CSS, and deployed via automated CI/CD pipelines on both Vercel and Azure Static Web Apps.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework (App Router) |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icon library |
| Vercel | Primary deployment + CI/CD |
| Azure Static Web Apps | Secondary deployment + CI/CD |
| GitHub Actions | Automated deployment pipeline |

---

## Project Structure

```
portfolio-site/
├── public/
│   └── headshot.jpg          # Profile photo
├── src/
│   └── app/
│       ├── globals.css        # Global styles + Tailwind
│       ├── layout.tsx         # Root layout + fonts + metadata
│       └── page.tsx           # Main page (all sections)
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind theme + hunter green colors
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies + scripts
```

---

## Site Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, elevator speech, availability banner, CTAs |
| **About** | Story, headshot, stats, background |
| **Skills** | Tool-based categories (Cloud, Systems, Networking, Security, Dev, Tools) |
| **Projects** | 6 projects with tags, status badges, GitHub + live links |
| **Certifications** | Security+, AZ-900, Google IT, CCNA (in progress) |
| **Contact** | Email, LinkedIn, GitHub links |

---

## Part 1 — Build the Site Locally

### Prerequisites
- Node.js 18+ installed
- Git installed
- VS Code (recommended)

### Step 1: Clone the Repository
```bash
git clone https://github.com/cornerstonian/portfolio-site.git
cd portfolio-site
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Locally
```bash
npm run dev
```
Open your browser to `http://localhost:3000` — you'll see the site running live.

### Step 4: Build for Production (test)
```bash
npm run build
```
A successful build confirms the site is ready to deploy.

---

## Part 2 — Vercel Deployment (Already Live)

The site is already deployed to Vercel. This is the current live URL:  
**https://portfolio-site-black-sigma.vercel.app**

### How it works (CI/CD loop):
```
You edit code locally
    ↓
git add . && git commit -m "update" && git push origin main
    ↓
Vercel detects the push to main
    ↓
Vercel automatically builds and deploys
    ↓
Site is live within ~30 seconds
```

### To redeploy manually:
```bash
VERCEL_ORG_ID="GJ0Vf8tCRXnkacdgqbiF8Ben" \
VERCEL_PROJECT_ID="prj_Ti9dwAZSCnWYRyPNN3a84Dy8ucok" \
npx vercel --token "YOUR_VERCEL_TOKEN" --yes --prod
```

---

## Part 3 — Azure Static Web Apps Deployment

This deploys the same codebase to Azure, creating a second live environment with its own CI/CD pipeline via GitHub Actions.

### Step 1: Sign in to Azure Portal
Go to https://portal.azure.com and sign in.

### Step 2: Create a Static Web App
1. In the search bar, type **Static Web Apps** and select it
2. Click **+ Create**
3. Fill in the configuration:
   - **Subscription:** Your Azure subscription
   - **Resource Group:** Create new → name it `portfolio-rg`
   - **Name:** `lavoisier-portfolio`
   - **Plan type:** Free
   - **Region:** East US 2 (or closest to you)
   - **Deployment Source:** GitHub

### Step 3: Connect to GitHub
1. Click **Sign in with GitHub** and authorize Azure
2. **Organization:** `cornerstonian`
3. **Repository:** `portfolio-site`
4. **Branch:** `main`

### Step 4: Configure Build Details
| Field | Value |
|---|---|
| Build Preset | Next.js |
| App Location | `/` |
| Api Location | *(leave blank)* |
| Output Location | `.next` |

### Step 5: Review and Create
1. Click **Review + Create**
2. Click **Create**
3. Azure will take 1-2 minutes to provision

### Step 6: What Happens Automatically
When Azure creates the Static Web App, it automatically:
- Generates a GitHub Actions workflow file in your repo at:  
  `.github/workflows/azure-static-web-apps-[your-url].yml`
- Adds a deployment secret (`AZURE_STATIC_WEB_APPS_API_TOKEN`) to your GitHub repo
- Triggers the first deployment immediately

### Step 7: Monitor the Deployment
1. Go to your GitHub repo: https://github.com/cornerstonian/portfolio-site
2. Click the **Actions** tab
3. Watch the workflow run — green checkmark = deployed ✅

### Step 8: Access Your Azure URL
1. Go back to the Azure Portal → your Static Web App
2. Copy the **URL** (format: `https://[random-name].azurestaticapps.net`)
3. Open it in your browser — same site, now running on Azure

---

## Part 4 — The Full CI/CD Story (Both Platforms)

Once Azure is connected, every push to `main` triggers **two simultaneous deployments:**

```
git push origin main
    ↓
GitHub detects push
    ↓ (simultaneously)
    ├── Vercel pipeline fires → deploys to Vercel URL
    └── Azure GitHub Actions fires → deploys to Azure URL
```

**Same codebase. Two cloud platforms. Zero manual steps.**

This is the multi-cloud CI/CD story you can walk through in every interview.

---

## Making Updates

### Edit content
All site content is in one file:  
`src/app/page.tsx`

Key data arrays at the top of the file:
- `SKILLS` — skill categories and tools
- `PROJECTS` — project cards
- `CERTS` — certifications

### Add/replace your headshot
Replace `public/headshot.jpg` with any JPEG photo, keeping the same filename.

### Update LinkedIn URL
Search for `https://linkedin.com` in `page.tsx` and replace with your full LinkedIn profile URL.

### Push any change live
```bash
git add .
git commit -m "describe your change"
git push origin main
```
Both Vercel and Azure auto-deploy within ~30-60 seconds.

---

## Environments & Technologies Used

- **Next.js 14** — React framework with App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first CSS with custom hunter green palette
- **Framer Motion** — Scroll-triggered animations
- **Lucide React** — Icon library
- **Google Fonts** — Playfair Display (headings), Plus Jakarta Sans (body), JetBrains Mono (code)
- **GitHub** — Version control + source of truth for both pipelines
- **GitHub Actions** — Azure deployment automation
- **Vercel** — Primary hosting + deployment
- **Azure Static Web Apps** — Secondary hosting + deployment
- **CDN** — Both platforms serve via global CDN (fast worldwide load times)

---

## Key Concepts Demonstrated

| Concept | Implementation |
|---|---|
| CI/CD | Auto-deploy on every git push |
| Multi-cloud | Same app on Vercel + Azure simultaneously |
| Infrastructure as Code | GitHub Actions workflow (.yml) |
| Static Site Generation | Next.js SSG builds at deploy time |
| Version Control | Full git history, meaningful commit messages |
| Documentation | This README |

---

## Author

**Lavoisier Cornerstone**  
📧 netcloudsec@proton.me  
🐙 https://github.com/cornerstonian  
🔗 LinkedIn (add your URL)

*Spring, TX — Available for Sysadmin / IT roles in Houston, Dallas, Austin, and Waco*
