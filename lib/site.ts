export const siteConfig = {
  name: "BC Labs & Consultancy",
  shortName: "BC Labs",
  tagline: "Technology Without Boundaries.",
  description:
    "BC Labs designs and delivers intelligent software, business systems and digital experiences that help organisations operate smarter and grow with confidence.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Our Work", href: "/work" },
    { label: "Insights", href: "/insights" },
  ],
};

export const services = [
  {
    number: "01",
    slug: "custom-software",
    title: "Custom software",
    headline: "Software shaped around how your organisation works",
    description:
      "We design and build business applications, web platforms, backend systems and APIs, from internal tools to full SaaS products.",
    problems: [
      "Off-the-shelf software forces your team to work around it",
      "Critical processes live in spreadsheets and email",
      "Existing systems cannot connect or scale",
    ],
    benefits: [
      "Tools that match your real workflow",
      "A codebase that can be maintained and extended",
      "Room to grow without a rebuild",
    ],
    includes: ["Business applications", "Web applications", "Backend systems", "API development", "SaaS platforms", "Custom enterprise solutions"],
    tags: ["Web applications", "SaaS platforms", "API engineering"],
    icon: "code",
  },
  {
    number: "02",
    slug: "erp-odoo",
    title: "ERP & business systems",
    headline: "One system for finance, stock, sales and operations",
    description:
      "We implement, customise and support Odoo so every department works from the same, current information.",
    problems: [
      "Departments keep separate and conflicting records",
      "Reports take days to assemble by hand",
      "An ERP was bought but never fitted the business",
    ],
    benefits: [
      "One trusted source of business data",
      "Faster, clearer management reporting",
      "Workflows that follow your own approvals and controls",
    ],
    includes: ["Odoo implementation", "Odoo customisation", "ERP integrations", "Business process optimisation", "Accounting and operational workflows", "ERP support and maintenance"],
    tags: ["Odoo", "ERP implementation", "Process optimisation"],
    icon: "layers",
  },
  {
    number: "03",
    slug: "education-technology",
    title: "Education technology",
    headline: "Run your school with less paperwork",
    description:
      "School management systems that bring administration, student records and fee management into one organised platform.",
    problems: [
      "Student records are scattered across files and registers",
      "Fee balances are hard to track and reconcile",
      "Administrators spend hours on repetitive admin",
    ],
    benefits: [
      "Student information in one secure place",
      "Clear visibility of fees and school finances",
      "More staff time for teaching and learners",
    ],
    includes: ["School management systems", "Academic administration", "Student information management", "School fee and financial management", "Digital education platforms"],
    tags: ["School management", "Academic workflows", "Digital platforms"],
    icon: "graduation",
  },
  {
    number: "04",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    headline: "Reliable systems that stay online",
    description:
      "We deploy, host and look after your applications so releases are safe and problems are caught early.",
    problems: [
      "Releases are manual and risky",
      "Nobody notices a fault until users complain",
      "Servers and databases depend on one person's knowledge",
    ],
    benefits: [
      "Repeatable, safer deployments",
      "Early warning when something breaks",
      "Documented infrastructure others can run",
    ],
    includes: ["Application deployment", "Server management", "Cloud infrastructure", "Docker-based deployments", "Database administration", "Application monitoring", "Technical maintenance"],
    tags: ["Cloud deployment", "Containers", "Infrastructure"],
    icon: "cloud",
  },
  {
    number: "05",
    slug: "automation-integrations",
    title: "Automation & integration",
    headline: "Connect your systems and remove repeat work",
    description:
      "We link the tools you already use and automate routine steps, so data moves by itself and staff focus on real work.",
    problems: [
      "Staff re-enter the same data in several tools",
      "Systems disagree because their data is out of sync",
      "Routine approvals depend on chasing people",
    ],
    benefits: [
      "Fewer errors from manual entry",
      "Data that stays consistent across systems",
      "Time returned to higher-value work",
    ],
    includes: ["Workflow automation", "System integrations", "API connectivity", "Data synchronisation", "Operational efficiency solutions"],
    tags: ["Workflow automation", "System integration", "Data exchange"],
    icon: "workflow",
  },
  {
    number: "06",
    slug: "it-consultancy",
    title: "Technology consultancy",
    headline: "Independent technical advice before you commit",
    description:
      "Clear, practical guidance on technology strategy, architecture and digital change, whether or not we build the solution.",
    problems: [
      "It is unclear which technology fits your goals and budget",
      "A digital transformation has no practical roadmap",
      "Existing systems need an honest technical review",
    ],
    benefits: [
      "A plan you can explain to your board or team",
      "Fewer expensive wrong turns",
      "Architecture that supports future growth",
    ],
    includes: ["Technology strategy", "Digital transformation", "Technical advisory", "System architecture", "Software and infrastructure consulting"],
    tags: ["Technical advisory", "Architecture", "Digital strategy"],
    icon: "compass",
  },
];

export const processSteps = [
  { number: "01", title: "Discover", description: "We listen, ask the right questions and understand the business challenge." },
  { number: "02", title: "Define", description: "We agree on priorities, scope and a practical path to the right solution." },
  { number: "03", title: "Engineer", description: "We design, build and validate the solution with care and transparency." },
  { number: "04", title: "Launch & evolve", description: "We help deploy, improve and support the technology as needs change." },
];

export const solutionAreas = [
  {
    eyebrow: "EDUCATION",
    title: "School operations",
    description: "Connected administration for fees, student information, academic records and everyday school workflows.",
    code: "EDU / 01",
    tone: "blue",
  },
  {
    eyebrow: "ENTERPRISE",
    title: "ERP & finance workflows",
    description: "Business systems that bring operational processes, financial information and teams into a more coherent flow.",
    code: "ERP / 02",
    tone: "violet",
  },
  {
    eyebrow: "DIGITAL PRODUCTS",
    title: "Custom platforms",
    description: "Purpose-built digital products and web applications shaped around a specific business opportunity.",
    code: "APP / 03",
    tone: "cyan",
  },
];
