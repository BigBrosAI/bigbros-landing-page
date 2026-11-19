import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink, Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { ProductCard } from '@/components/landing/product-card';
import { ClosingCta } from '@/components/landing/sections';
import { PromoMarquee } from '@/components/landing/promo-marquee';
import { productGroups, products } from '@/lib/catalog';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Products — WhatsApp API, Inbox, Chatbots, Ads, Payments & Email',
  description:
    'Every BigBrosAI product in one place: free WhatsApp Business API, broadcasts, shared inbox, AI chatbot builder, automation, WhatsApp Forms, payments, click-to-WhatsApp ads, Email API and analytics.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="Products"
          title={
            <>
              Everything you need to grow on <span className="text-gradient-brand">WhatsApp</span>.
            </>
          }
          subtitle="Ten products that work as one — from the free official API to AI chatbots, payments, ads and email."
        >
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.links.signup} size="xl" arrow className="rounded-full">
              Start for free
            </ButtonLink>
            <ButtonLink href="/pricing" size="xl" variant="outline" className="rounded-full">
              See pricing
            </ButtonLink>
          </div>
        </PageHero>
        <PromoMarquee />

        {productGroups.map((g) => (
          <section key={g.name} className="py-16 sm:py-20">
            <Container>
              <Reveal className="flex items-end justify-between gap-6 border-b border-border pb-5">
                <div>
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">{g.name}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{g.blurb}</h2>
                </div>
                <span className="hidden font-mono text-sm text-muted-foreground sm:block">
                  {products.filter((p) => p.group === g.name).length} products
                </span>
              </Reveal>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products
                  .filter((p) => p.group === g.name)
                  .map((p, i) => (
                    <Reveal as="li" key={p.slug} delay={i * 0.06}>
                      <ProductCard p={p} />
                    </Reveal>
                  ))}
              </ul>
            </Container>
          </section>
        ))}
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
