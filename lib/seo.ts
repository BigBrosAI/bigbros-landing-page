import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

/**
 * Share card for WhatsApp, LinkedIn, X, Facebook etc. A static file in /public
 * (not generated at request time) so it works on any host, including Cloudflare Workers.
 */
export const ogImage = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'BigBrosAI — Free WhatsApp Business API & AI Chatbot Platform',
};

/** Per-page metadata with a self-referencing canonical URL and matching Open Graph / Twitter tags. */
/** Trims text to `max` characters at a word boundary. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s—-]+$/, '')}…`;
}

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  shareTitle,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Title for link previews when it should differ from `${title} | BigBrosAI`. */
  shareTitle?: string;
}): Metadata {
  const full = shareTitle ?? `${title} | ${siteConfig.name}`;
  // Google shows roughly 60 characters of a title and 160 of a description. Long titles
  // drop the "| BigBrosAI" suffix instead of being cut mid-word; long descriptions are
  // trimmed at a word boundary for the meta tag (share cards keep the full text).
  const fits = full.length <= 62;
  return {
    title: fits ? title : { absolute: title },
    description: clip(description, 158),
    alternates: { canonical: path, languages: { 'en-IN': path, 'x-default': path } },
    openGraph: { type: 'website', siteName: siteConfig.name, locale: 'en_IN', url: path, title: full, description, images: [ogImage] },
    twitter: { card: 'summary_large_image', site: '@bigbrosai', title: full, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : null),
  };
}

/**
 * One-paragraph, fact-dense description of BigBrosAI. Used in the Organization schema and
 * llms.txt so search engines and AI assistants describe the company consistently.
 */
export const organizationDescription =
  'BigBrosAI (BIGBROS AI Pvt. Ltd.) is an Indian WhatsApp Business API platform based in Mathura and Agra, Uttar Pradesh. ' +
  'It gives businesses WhatsApp campaigns and broadcasts, a shared team inbox, no-code AI chatbot flows, WhatsApp Pay, ' +
  'Click-to-WhatsApp ads and a transactional email API in one dashboard. Plans start free, with Basic at ₹999 a month and Pro at ₹2,199 a month. ' +
  'BigBrosAI is a member of NVIDIA Inception.';

/** BreadcrumbList JSON-LD from [name, path] pairs, with Home first. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'] as [string, string], ...items].map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
