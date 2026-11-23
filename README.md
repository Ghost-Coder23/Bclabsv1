# BC Labs & Consultancy

**Technology Without Boundaries.**

The official website for BC Labs & Consultancy — a full-service technology company serving organisations across Africa and internationally.

## Technology

- Next.js 16 App Router
- React 19.3 and TypeScript
- Tailwind CSS 4.3
- Motion for React
- Lucide icons
- CSS-based layered depth and motion effects for the current 3D-inspired hero

The first milestone prioritises a fast, responsive experience. A WebGL/Three.js scene can be introduced later where it adds clear value.

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

A GitHub Actions workflow runs these checks on pushes and pull requests to `main`.

## Environment

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_CONTACT_EMAIL` — required for the mailto-based project enquiry form.
- `NEXT_PUBLIC_SITE_URL` — canonical production URL used for metadata and sitemap generation.

No contact details, client logos, testimonials or project results are fabricated. The public portfolio and editorial topics are clearly marked as being prepared.

## Brand system

- Midnight navy: `#080D1B`
- Deep navy: `#0D1425`
- Electric blue: `#1769FF`
- Cyan: `#36D5F5`
- Violet: `#875CFF`
- Space Grotesk + Inter

Brand assets are available in `public/brand`.

## Website pages

- Home
- About
- Services
- Solutions
- Our Work
- Insights
- Contact
