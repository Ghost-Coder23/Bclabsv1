# BC Labs & Consultancy

**Technology Without Boundaries.**

The official website for BC Labs & Consultancy — a full-service technology company serving organisations across Africa and internationally.

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Three.js for service-specific interactive 3D scenes
- Motion for React for interface transitions
- Lucide icons

## Getting started

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

GitHub Actions runs linting, type checking and a production build on pushes and pull requests to `main`.

## Environment

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL` — canonical production URL used for metadata and sitemap generation.
- The Supabase settings listed in the “Supabase setup” section below — required for enquiry storage and the admin workspace.

No client logos, testimonials or project results are fabricated. The public portfolio and editorial topics are clearly marked as being prepared.

## Brand system

- Midnight navy: `#080D1B`
- Deep navy: `#0D1425`
- Electric blue: `#1769FF`
- Cyan: `#36D5F5`
- Violet: `#875CFF`
- Space Grotesk + Inter

The supplied BC Labs logo and monogram are in `public/brand`.

## 3D service experience

The homepage and Services page use six separate Three.js scenes:

- Custom software: layered application planes
- ERP: connected modular cubes
- Education technology: floating digital platform
- Cloud & DevOps: cloud network and infrastructure layers
- Automation: synchronised gears
- Consultancy: connected decision network

Scenes load close to the viewport, respond to pointer movement, pause when the browser tab is hidden, release GPU resources when removed, and fall back to accessible icons when WebGL is not suitable or reduced motion is enabled.

## Website pages

- Home
- About
- Services
- Solutions
- Our Work
- Insights
- Contact

## Interactive solution builder

The homepage includes a visitor-facing system configurator. Visitors can select:

- School management
- Accounting & finance
- Inventory
- Sales & CRM
- HR & payroll
- Custom integrations

Each selected module animates into position around the BC Labs core in the 3D preview. The **Request My Solution** link carries the selected module slugs to the contact page, where the service and project brief are prefilled.

The builder does not quote prices or promise that every module can be combined without discovery. It captures the visitor's requirements for a scoping conversation.


## Private admin dashboard

The owner workspace is available at `/admin`. It includes enquiry totals, a recent activity view, the full enquiry pipeline, status tracking and private internal notes. Public contact-form submissions are written to Supabase rather than handed off to the visitor's email application.

### Supabase setup

1. Create a Supabase project for BC Labs.
2. Open the Supabase SQL Editor and run `supabase/migrations/20261123000100_contact_submissions.sql`.
3. In Supabase Authentication, create the owner account with email and password. Disable public sign-ups; administrator accounts should be created by the owner.
4. Add the following environment variables to Vercel and your local `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` — server-side only; never expose this in browser code.
   - `ADMIN_EMAILS` — comma-separated allowlist of administrator email addresses.
5. Redeploy the site and sign in at `/admin/login`.

The contact submissions table has row-level security enabled and denies direct browser access to public and authenticated roles. The public form can only submit through the validated Next.js contact endpoint. Dashboard reads and updates require a verified Supabase session and an email match against `ADMIN_EMAILS`. The service-role key remains server-side and must never be added to a `NEXT_PUBLIC_` variable.
