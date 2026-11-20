import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import { ClosingCta } from '@/components/landing/sections';
import { channels } from '@/lib/catalog';
import { siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Channels — WhatsApp, Email, SMS, RCS & Instagram',
  description:
    'BigBrosAI brings WhatsApp and Email together in one dashboard today, with SMS, RCS and Instagram DM on the way.',
  path: '/channels',
});

export default function ChannelsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="Channels"
          title={
            <>
              Meet customers <span className="text-gradient-brand">wherever they are</span>.
            </>
          }
          subtitle="WhatsApp and Email are live today, all from one dashboard and one contact list. SMS, RCS and Instagram DM are coming next."
        >
          <ul className="flex flex-wrap justify-center gap-2">
            {channels.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold shadow-sm transition-colors hover:border-brand-200"
                >
                  {c.brand ? <BrandIcon slug={c.brand} /> : <c.icon className="h-4 w-4 text-brand-700" />}
                  {c.name}
                  <span className={cn('rounded-full px-1.5 py-px text-[10px] font-bold uppercase', c.status === 'Live' ? 'bg-brand-100 text-brand-800' : 'bg-muted text-muted-foreground')}>
                    {c.status}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </PageHero>

        <section className="pb-24">
          <Container className="space-y-6">
            {channels.map((c, i) => (
              <Reveal
                key={c.id}
                id={c.id}
                className={cn(
                  'scroll-mt-32 grid gap-8 rounded-[2rem] border p-7 sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-center',
                  c.status === 'Live' ? 'border-border bg-card shadow-card' : 'border-dashed border-border bg-card/50'
                )}
              >
                <div>
                  <div className="flex items-center gap-3">
                    {c.brand ? (
                      <BrandTile slug={c.brand} size={56} />
                    ) : (
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white shadow-sm">
                        <c.icon className="h-7 w-7 text-brand-700" />
                      </span>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{c.name}</h2>
                      <span className={cn('mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold', c.status === 'Live' ? 'text-brand-700' : 'text-muted-foreground')}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', c.status === 'Live' ? 'bg-brand-500' : 'bg-muted-foreground/50')} />
                        {c.status === 'Live' ? 'Live now' : 'Coming soon'}
                      </span>
                    </div>
                  </div>
                  <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-600">{c.body}</p>
                  {c.href ? (
                    <Link href={c.href} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:underline">
                      Get started with {c.name} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Notify me: ${c.name}`)}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-foreground">
                      Get notified at launch <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 rounded-xl border border-border bg-background/60 px-3.5 py-3 text-[14.5px] font-medium">
                      <Check className={cn('h-4 w-4 shrink-0', c.status === 'Live' ? 'text-brand-600' : 'text-muted-foreground')} />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="sr-only">{i}</span>
              </Reveal>
            ))}
          </Container>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
