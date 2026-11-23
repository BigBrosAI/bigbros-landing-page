"use client";

import { money, setCurrency, useCurrency } from '@/lib/currency';
import { cn } from '@/lib/utils';

/**
 * A price in the visitor's currency. When there's no USD figure, USD visitors see
 * `usdFallback` (or nothing) instead of a converted guess.
 */
export function Price({ inr, usd, decimals, usdFallback = null }: { inr: number; usd?: number | null; decimals?: number; usdFallback?: React.ReactNode }) {
  const c = useCurrency();
  if (c === 'USD') return usd == null ? <>{usdFallback}</> : <>{money(usd, 'USD', decimals)}</>;
  return <>{money(inr, 'INR', decimals)}</>;
}

/** Text that differs by currency (e.g. a feature line that mentions a rupee amount). */
export function ByCurrency({ inr, usd }: { inr: React.ReactNode; usd: React.ReactNode }) {
  return <>{useCurrency() === 'USD' ? usd : inr}</>;
}

export function CurrencyToggle({ className, dark }: { className?: string; dark?: boolean }) {
  const c = useCurrency();
  return (
    <div role="radiogroup" aria-label="Currency" className={cn('inline-flex rounded-full border p-1 text-sm font-semibold', dark ? 'border-white/15 bg-white/5' : 'border-border bg-card shadow-sm', className)}>
      {(['INR', 'USD'] as const).map((k) => (
        <button
          key={k}
          type="button"
          role="radio"
          aria-checked={c === k}
          onClick={() => setCurrency(k)}
          className={cn(
            'rounded-full px-4 py-1.5 transition-colors',
            c === k ? (dark ? 'bg-lime-300 text-forest' : 'bg-forest text-white') : dark ? 'text-white/70' : 'text-ink-600',
          )}
        >
          {k === 'INR' ? '₹ INR' : '$ USD'}
        </button>
      ))}
    </div>
  );
}
