import { ButtonLink, Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import { HeroStage } from '@/components/landing/hero-stage';
import { ClientLogos } from '@/components/landing/client-logos';
import { activeAffiliations, siteConfig } from '@/lib/site';

export function Hero() {
  const affiliation = activeAffiliations[0];
  return (
    <section className="relative -mt-16 overflow-hidden pt-16">
      <div aria-hidden className="bg-mesh absolute inset-0" />
      <div
        aria-hidden
        className="bg-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,#000_30%,transparent_75%)]"
      />

      <Container className="relative pb-16 pt-16 text-center sm:pt-24 lg:pb-24">
        <Reveal className="flex flex-wrap items-center justify-center gap-2">
          <span className="frame-shine inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-brand-800 shadow-sm">
            <BrandTile slug="whatsapp" size={24} className="rounded-full" />
            Official WhatsApp Business API
          </span>
          {affiliation && (
            <a
              href={affiliation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="frame-shine inline-flex items-center gap-2 rounded-full border border-border bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-ink-600 shadow-sm transition-colors hover:text-foreground"
            >
              <span className="flex h-6 items-center gap-1 rounded-full bg-black px-2">
                <BrandIcon slug="nvidia" className="h-3.5 w-3.5" />
                <span className="text-[10.5px] font-bold tracking-wide text-white">NVIDIA</span>
              </span>
              {affiliation.label}
            </a>
          )}
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.4rem]">
            Grow your business on WhatsApp <span className="text-gradient-brand">with AI that never sleeps.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">
            Campaigns, live chat, AI chatbots and payments on the official WhatsApp Business API — one platform your
            whole team can use, free to start.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.links.signup} size="xl" arrow className="rounded-full px-8">
            Start for free
          </ButtonLink>
          <ButtonLink href={siteConfig.links.bookDemo} size="xl" variant="outline" className="rounded-full px-8">
            Book a demo
          </ButtonLink>
        </Reveal>

        <ClientLogos />

        <Reveal delay={0.24} y={40} className="mt-16 sm:mt-20">
          <HeroStage />
        </Reveal>
      </Container>
    </section>
  );
}
