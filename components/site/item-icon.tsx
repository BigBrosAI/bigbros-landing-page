import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';
import { BrandIcon, type BrandSlug } from '@/components/landing/brand-icon';
import { cn } from '@/lib/utils';

/**
 * Icon tile for a feature or list item. Brand logos (WhatsApp, Shopify…) win over generic
 * icons; with neither, a check mark is shown.
 */
export function ItemIcon({ icon: Icon, brand, className, tone = 'solid' }: { icon?: LucideIcon; brand?: BrandSlug; className?: string; tone?: 'solid' | 'soft' }) {
  return (
    <span
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
        brand ? 'border border-border bg-white shadow-sm' : tone === 'solid' ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 dark:bg-brand-900/40 dark:text-brand-200 dark:ring-brand-800',
        className
      )}
    >
      {brand ? <BrandIcon slug={brand} className="h-5 w-5" /> : Icon ? <Icon className="h-[18px] w-[18px]" /> : <Check className="h-4 w-4" />}
    </span>
  );
}

const brandByName: [RegExp, BrandSlug][] = [
  [/^whatsapp/i, 'whatsapp'],
  [/^shopify/i, 'shopify'],
  [/^woocommerce/i, 'woocommerce'],
  [/^google sheets/i, 'googlesheets'],
  [/^meta/i, 'meta'],
  [/^facebook/i, 'facebook'],
  [/^instagram/i, 'instagram'],
  [/^razorpay/i, 'razorpay'],
];

/** Brand logo for an integration or app name, when we have one. */
export const brandFor = (name: string) => brandByName.find(([re]) => re.test(name))?.[1];
