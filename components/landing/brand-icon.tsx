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
  razorpay: '#0C2451',
  android: '#34A853',
  nvidia: '#76B900',
  x: '#000000',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  gmail: '#EA4335',
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

/** Tile background for app-icon style logos; Meta and Google Sheets read best on white. */
const tileBg: Partial<Record<BrandSlug, string>> = {
  shopify: '#5E8E3E',
  woocommerce: '#7F54B3',
  whatsapp: '#25D366',
  razorpay: '#0C2451',
  instagram: '#E4405F',
  nvidia: '#000000',
};
const glyphScale: Partial<Record<BrandSlug, string>> = { woocommerce: 'w-[72%] h-[72%]' };

/**
 * App-icon style logo: brand-coloured rounded square with a white glyph, or a
 * white tile with the brand-coloured glyph for marks that need it.
 */
export function BrandTile({ slug, className, size = 40 }: { slug: BrandSlug; className?: string; size?: number }) {
  const bg = tileBg[slug];
  return (
    <span
      className={cn('relative inline-flex shrink-0 items-center justify-center overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.12)]', !bg && 'bg-white ring-1 ring-black/5', className)}
      style={{ width: size, height: size, borderRadius: size * 0.28, background: bg }}
    >
      <BrandIcon slug={slug} color={bg ? '#fff' : undefined} className={glyphScale[slug] ?? 'h-[52%] w-[52%]'} />
    </span>
  );
}
