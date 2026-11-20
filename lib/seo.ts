import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { ogAlt, ogSize } from '@/lib/og-image';

const ogImage = { url: '/opengraph-image', ...ogSize, alt: ogAlt };

/**
 * Per-page metadata with a self-referencing canonical URL and matching
 * Open Graph / Twitter tags. The share image comes from app/opengraph-image.tsx.
 */
export function pageMetadata({ title, description, path, noindex }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const full = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: siteConfig.name, locale: 'en_IN', url: path, title: full, description, images: [ogImage] },
    twitter: { card: 'summary_large_image', site: '@bigbrosai', title: full, description, images: [ogImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : null),
  };
}
