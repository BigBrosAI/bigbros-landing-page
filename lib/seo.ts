import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

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
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: siteConfig.name, locale: 'en_IN', url: path, title: full, description, images: [ogImage] },
    twitter: { card: 'summary_large_image', site: '@bigbrosai', title: full, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : null),
  };
}
