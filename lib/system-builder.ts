export const systemModules = [
  {
    slug: "school-management",
    name: "School management",
    description: "Student records, admissions, academic administration and school operations.",
    color: "#438BFF",
    category: "EDUCATION",
  },
  {
    slug: "accounting-finance",
    name: "Accounting & finance",
    description: "Invoicing, fees, expenses, reconciliations and financial reporting.",
    color: "#36D5F5",
    category: "FINANCE",
  },
  {
    slug: "inventory",
    name: "Inventory",
    description: "Products, stock movement, purchasing and warehouse visibility.",
    color: "#875CFF",
    category: "OPERATIONS",
  },
  {
    slug: "sales-crm",
    name: "Sales & CRM",
    description: "Leads, customers, quotations, sales pipelines and follow-ups.",
    color: "#6FE0F7",
    category: "CUSTOMERS",
  },
  {
    slug: "hr-payroll",
    name: "HR & payroll",
    description: "Employee records, leave, attendance and payroll workflows.",
    color: "#8FA8FF",
    category: "PEOPLE",
  },
  {
    slug: "custom-integrations",
    name: "Custom integrations",
    description: "Connect existing applications, APIs and third-party services.",
    color: "#A78BFA",
    category: "CONNECTIVITY",
  },
] as const;

export type SystemModuleSlug = (typeof systemModules)[number]["slug"];
