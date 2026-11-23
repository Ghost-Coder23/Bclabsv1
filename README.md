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

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Quality checks

\`\`\`bash
npm run lint
npm run typecheck
npm run build
\`\`\`

GitHub Actions runs linting, type checking and a production build on pushes and pull requests to \`main\`.

## Environment

Copy \`.env.example\` to \`.env.local\` and configure:

- \`NEXT_PUBLIC_CONTACT_EMAIL\` — required for the current mailto-based project enquiry form.
- \`NEXT_PUBLIC_SITE_URL\` — canonical production URL used for metadata and sitemap generation.

No client logos, testimonials or project results are fabricated. The public portfolio and editorial topics are clearly marked as being prepared.

## Brand system

- Midnight navy: \`#080D1B\`
- Deep navy: \`#0D1425\`
- Electric blue: \`#1769FF\`
- Cyan: \`#36D5F5\`
- Violet: \`#875CFF\`
- Space Grotesk + Inter

The supplied BC Labs logo and monogram are in \`public/brand\`.

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
