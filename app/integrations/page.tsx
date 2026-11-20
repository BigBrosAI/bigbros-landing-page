import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink, Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { BrandTile } from '@/components/landing/brand-icon';
import { IntegrationsSection, ClosingCta } from '@/components/landing/sections';
import { integrations } from '@/lib/catalog';
import { siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Integrations — Shopify, WooCommerce, Google Sheets, Meta & more',
  description:
    'Connect BigBrosAI to Shopify, WooCommerce, Google Sheets, Meta ads, WhatsApp Pay and Razorpay — or build your own with the REST API and webhooks.',
  path: '/integrations',
});

export default function IntegrationsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="Integrations"
          title={
            <>
              Plugged into the tools <span className="text-gradient-brand">you already use</span>.
            </>
          }
          subtitle="Connect your store, sheets, ads and payments in a few clicks — or build anything with the REST API and webhooks."
        >
          <ButtonLink href={siteConfig.links.docs} size="xl" variant="outline" arrow className="rounded-full">
            Read the API docs
          </ButtonLink>
        </PageHero>

        <section className="pb-24">
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {integrations.map((it, k) => (
                <Reveal
                  as="li"
                  key={it.name}
                  delay={(k % 4) * 0.06}
                  className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    {it.brand ? (
                      <BrandTile slug={it.brand} size={48} />
                    ) : it.icon ? (
                      <span className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-border bg-white shadow-sm">
                        <it.icon className="h-6 w-6 text-forest" />
                      </span>
                    ) : null}
                    <span className="rounded-full bg-muted px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">{it.category}</span>
                  </div>
                  <h2 className="mt-5 text-lg font-bold tracking-tight">{it.name}</h2>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{it.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
        <IntegrationsSection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
