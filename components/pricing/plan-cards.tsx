"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ButtonLink } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { inr, planPrice, plans } from '@/lib/plans';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export function PlanCards({ compact }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
          {[false, true].map((a) => (
            <button
              key={String(a)}
              type="button"
              role="radio"
              aria-checked={annual === a}
              onClick={() => setAnnual(a)}
              className={cn('relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors', annual === a ? 'text-white' : 'text-ink-600')}
            >
              {annual === a && <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-forest" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              {a ? 'Annual' : 'Monthly'}
              {a && <span className={cn('rounded-full px-1.5 py-px text-[10px] font-bold', annual ? 'bg-lime-300 text-forest' : 'bg-brand-100 text-brand-800')}>−10%</span>}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => {
          const price = planPrice(p, annual);
          const featured = p.popular;
          const features = compact ? p.features.slice(0, 5) : p.features;
          return (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 0.06}
              className={cn('relative flex flex-col rounded-3xl border p-7', featured ? 'ring-sweep forest border-transparent shadow-lift' : 'border-border bg-card')}
            >
              <div className="flex items-center justify-between">
                <h3 className={cn('text-lg font-bold', featured && 'text-white')}>{p.name}</h3>
                {featured && <span className="rounded-full bg-lime-300 px-2.5 py-1 text-[11px] font-bold text-forest">Most popular</span>}
              </div>
              <p className={cn('mt-1.5 min-h-[2.75rem] text-sm leading-snug', featured ? 'text-white/65' : 'text-muted-foreground')}>{p.blurb}</p>
              <div className={cn('mt-5 flex items-baseline gap-1.5', featured && 'text-white')}>
                {price === null ? (
                  <span className="font-display text-4xl font-bold tracking-tight">Custom</span>
                ) : price === 0 ? (
                  <span className="font-display text-4xl font-bold tracking-tight">Free</span>
                ) : (
                  <>
                    <motion.span key={price} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold tracking-tight">
                      {inr(price)}
                    </motion.span>
                    <span className={cn('text-sm', featured ? 'text-white/60' : 'text-muted-foreground')}>/ month</span>
                  </>
                )}
              </div>
              <p className={cn('mt-1 h-4 text-[12px]', featured ? 'text-white/50' : 'text-muted-foreground')}>
                {price && annual ? `Billed yearly · ${inr(price * 12)}` : price === 0 ? 'Free forever' : ''}
              </p>
              <ButtonLink
                href={p.href === 'sales' ? siteConfig.links.contactSales : siteConfig.links.signup}
                variant={featured ? 'default' : 'outline'}
                size="lg"
                className={cn('mt-6 w-full rounded-full', featured && 'bg-lime-300 text-forest hover:bg-lime-200')}
              >
                {p.cta}
              </ButtonLink>
              {p.inherits && <p className={cn('mt-6 text-[12.5px] font-semibold', featured ? 'text-lime-300' : 'text-brand-800')}>{p.inherits}</p>}
              <ul className={cn('space-y-2.5 text-[14px]', p.inherits ? 'mt-3' : 'mt-6')}>
                {features.map((f) => (
                  <li key={f} className={cn('flex gap-2.5', featured ? 'text-white/85' : 'text-ink-600')}>
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', featured ? 'text-lime-300' : 'text-brand-600')} />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
