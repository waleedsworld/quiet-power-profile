/**
 * contact.ts — configuration for the inquiry form in <ContactSection />.
 *
 * The form is intentionally zero-backend: it composes a clean, structured
 * email and opens the visitor's mail client, so the template works on any
 * static host with no server, database, or third-party form service. Tune
 * the option lists below to match the kinds of work you want to attract.
 */

export interface SelectOption {
  value: string;
  label: string;
}

/** What the visitor wants to talk about. */
export const engagementTypes: SelectOption[] = [
  { value: "advisory", label: "Advisory / Consulting" },
  { value: "speaking", label: "Speaking / Keynote" },
  { value: "investment", label: "Investment / Fundraising" },
  { value: "partnership", label: "Partnership / Collaboration" },
  { value: "press", label: "Press / Interview" },
  { value: "other", label: "Something else" },
];

/** Rough budget / scope bands — helps you triage inbound. */
export const budgetBands: SelectOption[] = [
  { value: "unsure", label: "Not sure yet" },
  { value: "under-10k", label: "Under $10k" },
  { value: "10-50k", label: "$10k – $50k" },
  { value: "50-250k", label: "$50k – $250k" },
  { value: "250k-plus", label: "$250k+" },
];

/** How soon they'd like to move. */
export const timelines: SelectOption[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

const labelFor = (options: SelectOption[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

export interface Inquiry {
  name: string;
  email: string;
  company?: string;
  engagement: string;
  budget: string;
  timeline: string;
  message: string;
}

/** Build a human-readable subject line for the composed email. */
export const inquirySubject = (data: Inquiry) =>
  `[${labelFor(engagementTypes, data.engagement)}] Inquiry from ${data.name}`;

/** Build a clean, plain-text body from the inquiry fields. */
export const inquiryBody = (data: Inquiry) =>
  [
    `Name:        ${data.name}`,
    `Email:       ${data.email}`,
    data.company ? `Company:     ${data.company}` : null,
    `Topic:       ${labelFor(engagementTypes, data.engagement)}`,
    `Budget:      ${labelFor(budgetBands, data.budget)}`,
    `Timeline:    ${labelFor(timelines, data.timeline)}`,
    ``,
    `Message:`,
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
