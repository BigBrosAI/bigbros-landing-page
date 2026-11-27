import { ArrowRight, Info, Lightbulb } from 'lucide-react';
import { SmartLink } from '@/components/site/primitives';
import { BrandIcon } from '@/components/landing/brand-icon';
import type { BlogCta, Block } from '@/lib/blog';
import { cn } from '@/lib/utils';

/** A marketing call-to-action card, used inline in posts and at the end. */
export function CtaCard({ cta, variant = 'inline' }: { cta: BlogCta; variant?: 'inline' | 'end' }) {
  return (
    <aside
      className={cn(
        'not-prose relative overflow-hidden rounded-[1.75rem] bg-forest text-white',
        variant === 'end' ? 'p-8 sm:p-10' : 'my-10 p-7 sm:p-8'
      )}
    >
      <div aria-hidden className="bg-grain-light absolute inset-0 opacity-60" />
      <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-16 -top-16 h-64 w-64 text-lime-300/15">
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeDasharray="2 6" />
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeDasharray="2 8" />
      </svg>
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-lime-300">
            <BrandIcon slug="whatsapp" color="#BEF264" className="h-3.5 w-3.5" /> BigBrosAI
          </p>
          <p className={cn('mt-2 font-display font-bold leading-tight tracking-tight', variant === 'end' ? 'text-3xl' : 'text-2xl')}>{cta.title}</p>
          {cta.body && <p className="mt-2 text-[15.5px] leading-relaxed text-white/75">{cta.body}</p>}
        </div>
        <SmartLink
          href={cta.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-lime-300 px-6 py-3 text-[15px] font-semibold text-forest transition-colors hover:bg-lime-200 sm:self-center"
        >
          {cta.href.startsWith('https://wa.me') && <BrandIcon slug="whatsapp" color="#0B2E23" className="h-4 w-4" />}
          {cta.button} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </SmartLink>
      </div>
    </aside>
  );
}

/** Renders a post body: Markdown HTML, CTA cards and tip/note callouts. */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blog-prose">
      {blocks.map((b, i) => {
        if (b.type === 'html') return <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
        if (b.type === 'cta') return <CtaCard key={i} cta={b} />;
        const Icon = b.tone === 'tip' ? Lightbulb : Info;
        return (
          <aside
            key={i}
            className={cn(
              'callout my-8 flex gap-4 rounded-2xl border p-5',
              b.tone === 'tip' ? 'border-lime-300/60 bg-lime-200/25 dark:bg-lime-300/10' : 'border-brand-100 bg-brand-50/70 dark:border-brand-900 dark:bg-brand-900/20'
            )}
          >
            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', b.tone === 'tip' ? 'bg-lime-300 text-forest' : 'bg-brand-600 text-white')}>
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: b.html }} />
          </aside>
        );
      })}
    </div>
  );
}

/** Sticky sidebar card with the post's main CTA and a WhatsApp chat link. */
export function SideCta({ cta, whatsappHref }: { cta: BlogCta; whatsappHref: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <p className="font-display text-lg font-bold leading-snug tracking-tight">{cta.title}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{cta.body}</p>
      <SmartLink href={cta.href} className="group mt-5 flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700">
        {cta.button} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </SmartLink>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener"
        className="mt-2.5 flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
      >
        <BrandIcon slug="whatsapp" className="h-4 w-4" /> Chat on WhatsApp
      </a>
    </div>
  );
}
