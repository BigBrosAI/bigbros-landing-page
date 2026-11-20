import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import type { Product } from '@/lib/catalog';
import { cn } from '@/lib/utils';

export function ProductGlyph({ p, className, size = 'md' }: { p: Product; className?: string; size?: 'md' | 'lg' }) {
  if (p.brand) return <BrandTile slug={p.brand} size={size === 'lg' ? 56 : 44} className={className} />;
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-700 shadow-sm',
        size === 'lg' ? 'h-14 w-14' : 'h-11 w-11',
        className
      )}
    >
      {p.brand ? <BrandIcon slug={p.brand} className={size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} /> : <p.icon className={size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} />}
    </span>
  );
}

export function ProductCard({ p, className }: { p: Product; className?: string }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className={cn(
        'shine shine-soft shine-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift',
        className
      )}
    >
      <span aria-hidden className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <ProductGlyph p={p} />
        {p.badge && <span className="rounded-full bg-lime-200 px-2 py-0.5 text-[11px] font-bold text-forest">{p.badge}</span>}
      </div>
      <h3 className="relative mt-5 text-lg font-bold tracking-tight">{p.name}</h3>
      <p className="relative mt-1.5 flex-1 text-[15px] leading-relaxed text-ink-600">{p.short}</p>
      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
        Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
