export const enquiryStatuses = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "qualified", label: "Qualified" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "spam", label: "Spam" },
] as const;

export type EnquiryStatus = (typeof enquiryStatuses)[number]["value"];

export type Enquiry = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  organisation: string;
  country: string;
  service: string;
  selected_modules: string[];
  message: string;
  status: EnquiryStatus;
  admin_notes: string;
};

export function statusLabel(status: string) {
  return enquiryStatuses.find((item) => item.value === status)?.label ?? status;
}

export function formatEnquiryDate(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
