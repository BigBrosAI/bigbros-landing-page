/**
 * Central site configuration. Every outbound dashboard link and every brand
 * claim on the marketing site reads from here — never hard-code these elsewhere.
 */

const DASHBOARD_URL = (process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.bigbrosai.com').replace(/\/$/, '');

export const siteConfig = {
  name: 'BigBrosAI',
  legalName: 'BIGBROS AI Pvt. Ltd.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://bigbrosai.com').replace(/\/$/, ''),
  tagline: 'One Platform. Every Business Conversation.',
  description:
    'Build meaningful customer relationships with powerful WhatsApp Business APIs, intelligent automation, AI-driven conversations, and unified business messaging.',
  email: 'support@bigbrosai.com',

  links: {
    /** Existing SaaS application. The marketing site never handles auth itself. */
    dashboard: DASHBOARD_URL,
    login: process.env.NEXT_PUBLIC_DASHBOARD_LOGIN_URL || DASHBOARD_URL,
    signup: process.env.NEXT_PUBLIC_DASHBOARD_SIGNUP_URL || DASHBOARD_URL,
    /** Lead-capture destination for "Talk to Sales" / "Book a Demo". Switch to /book-demo once that page ships. */
    bookDemo: '/contact',
    contactSales: '/contact',
    docs: 'https://docs.bigbrosai.com',
  },

  /**
   * Verified program affiliations only. Leave `logo` null until the official,
   * permission-cleared asset is added to /public — a text credit is shown instead.
   */
  affiliations: [
    {
      id: 'nvidia-inception',
      enabled: true,
      name: 'NVIDIA Inception',
      label: 'Backed by NVIDIA',
      description:
        "BigBrosAI is a member of NVIDIA Inception, NVIDIA's program that supports startups building with AI and accelerated computing.",
      href: 'https://www.nvidia.com/en-us/startups/',
      logo: null as null | { src: string; width: number; height: number },
    },
  ],

  social: {
    linkedin: '',
    x: '',
    github: '',
  },
} as const;

export type Affiliation = (typeof siteConfig.affiliations)[number];

export const activeAffiliations = siteConfig.affiliations.filter((a) => a.enabled);

export function absoluteUrl(path = '/') {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
