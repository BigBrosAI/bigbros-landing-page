import { cn } from '@/lib/utils';

const CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons';

/** Official brand colours from simple-icons. */
export const brandColors = {
  shopify: '#7AB55C',
  woocommerce: '#96588A',
  googlesheets: '#34A853',
  meta: '#0467DF',
  whatsapp: '#25D366',
  facebook: '#0866FF',
  instagram: '#E4405F',
} as const;

export type BrandSlug = keyof typeof brandColors;

/**
 * A simple-icons glyph rendered through a CSS mask, so it can take any colour
 * (brand colour by default, or `currentColor`) without an <img> per icon.
 */
export function BrandIcon({
  slug,
  className,
  color,
  title,
}: {
  slug: BrandSlug;
  className?: string;
  /** CSS colour; defaults to the brand colour. Pass 'currentColor' to inherit. */
  color?: string;
  title?: string;
}) {
  const url = `url(${CDN}/${slug}.svg)`;
  return (
    <span
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn('inline-block h-4 w-4 shrink-0', className)}
      style={{
        backgroundColor: color ?? brandColors[slug],
        WebkitMask: `${url} center / contain no-repeat`,
        mask: `${url} center / contain no-repeat`,
      }}
    />
  );
}
