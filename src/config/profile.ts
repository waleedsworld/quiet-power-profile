/**
 * profile.ts — single source of truth for the site's persona.
 *
 * Everything visitor-facing lives here so you can make this landing page
 * your own without touching a single component. Swap the strings, drop in
 * your links, rebuild — done. The default content below is a demo persona
 * ("Adrian Cole") to show the template off; replace it with yours.
 */

export interface Stat {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const profile = {
  // Identity
  name: "Adrian Cole",
  role: "CEO & Founder",
  initials: "AC",

  // Hero
  headline: ["BUILDING", "THE FUTURE", "OF TECH"],
  availability: "Available for Strategic Consulting",
  subtitle:
    "CEO & Founder with a proven track record of scaling global tech ventures and building high-impact teams across Silicon Valley and beyond.",

  heroStats: [
    { value: "50+", label: "Global Partners" },
    { value: "$100M+", label: "Revenue Generated" },
    { value: "15+", label: "Years Experience" },
  ] as Stat[],

  // Contact
  email: "hello@adriancole.dev",
  location: "San Francisco, CA · Remote Worldwide",

  // Social — set to "" to hide a link
  social: {
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
    github: "https://github.com/",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Journey", href: "#journey" },
  { label: "Media", href: "#media" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
