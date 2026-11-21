/**
 * Central site configuration. Every outbound dashboard link and every brand
 * claim on the marketing site reads from here — never hard-code these elsewhere.
 */

const DASHBOARD_URL = (process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.bigbrosai.com').replace(/\/$/, '');

export const siteConfig = {
  name: 'BigBrosAI',
  legalName: 'BIGBROS AI Pvt. Ltd.',
  /** Primary host — the live site serves on www. Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bigbrosai.com').replace(/\/$/, ''),
  tagline: 'One Platform. Every Business Conversation.',
  description:
    'Build meaningful customer relationships with powerful WhatsApp Business APIs, intelligent automation, AI-driven conversations, and unified business messaging.',
  email: 'support@bigbrosai.com',
  /** General / sales and careers inbox (used in the hiring JD). */
  helloEmail: 'hello@bigbrosai.com',
  phones: ['+91 80066 66197', '+91 80066 66198', '+91 70177 53527', '+91 82795 10767'],
  /** WhatsApp chat number, as linked from the previous site. */
  whatsapp: { number: '918279305027', display: '+91 82793 05027' },
  offices: [
    { label: 'Registered office', lines: ['E-93, Govind Nagar, Near Shiv Park', 'Mathura, Uttar Pradesh 281001, India'] },
    { label: 'Agra office', lines: ['48-A Kalakunj, Subhash Nagar', 'Agra, Uttar Pradesh 282010, India'] },
  ],
  hours: ['Monday – Friday · 9:00 AM – 6:00 PM IST', 'Saturday · 10:00 AM – 2:00 PM IST'],

  links: {
    /** Existing SaaS application. The marketing site never handles auth itself. */
    dashboard: DASHBOARD_URL,
    login: process.env.NEXT_PUBLIC_DASHBOARD_LOGIN_URL || DASHBOARD_URL,
    signup: process.env.NEXT_PUBLIC_DASHBOARD_SIGNUP_URL || DASHBOARD_URL,
    /** Lead-capture destination for "Talk to Sales" / "Book a Demo". Switch to /book-demo once that page ships. */
    bookDemo: '/contact?topic=demo',
    contactSales: '/contact?topic=sales',
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

  /** Official profiles, as linked from the previous bigbrosai.com. */
  social: [
    { slug: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/bigbrosai/' },
    { slug: 'x', label: 'X', href: 'https://x.com/bigbrosai' },
    { slug: 'youtube', label: 'YouTube', href: 'https://youtube.com/@bigbrosai' },
    { slug: 'instagram', label: 'Instagram', href: 'https://instagram.com/bigbrosai_official/' },
    { slug: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/918279305027' },
  ] as const,
} as const;

export type Affiliation = (typeof siteConfig.affiliations)[number];

export const activeAffiliations = siteConfig.affiliations.filter((a) => a.enabled);

export function absoluteUrl(path = '/') {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
