import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import { ButtonLink, Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { HeroPhone } from '@/components/landing/hero-phone';
import { activeAffiliations, siteConfig } from '@/lib/site';

/** Rays fanning out from one point — a nod to the BigBrosAI mark. */
function RayBurst() {
  const rays = [
    { a: 192, l: 520 },
    { a: 206, l: 640 },
    { a: 222, l: 600 },
    { a: 238, l: 700 },
    { a: 254, l: 560 },
    { a: 270, l: 660 },
  ];
  return (
    <svg aria-hidden viewBox="0 0 800 800" className="absolute -right-40 -top-24 h-[52rem] w-[52rem] opacity-50 sm:-right-24 sm:opacity-90">
      <defs>
        <linearGradient id="ray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#16a34a" stopOpacity="0" />
          <stop offset="1" stopColor="#16a34a" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <g data-reveal="" className="is-in" style={{ transformOrigin: '600px 200px' }}>
        {rays.map((r, i) => {
          const rad = (r.a * Math.PI) / 180;
          const x = Math.round((600 + Math.cos(rad) * r.l) * 100) / 100;
          const y = Math.round((200 - Math.sin(rad) * r.l) * 100) / 100;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={Math.round((600 + Math.cos(rad) * 70) * 100) / 100}
              y2={Math.round((200 - Math.sin(rad) * 70) * 100) / 100}
              stroke="url(#ray)"
              strokeWidth={34}
              strokeLinecap="round"
              className="draw-in"
              style={{ ['--len' as string]: r.l, ['--draw-delay' as string]: `${0.15 + i * 0.08}s` }}
            />
          );
        })}
        <circle cx="600" cy="200" r="34" fill="#16a34a" fillOpacity="0.16" />
      </g>
    </svg>
  );
}

export function Hero() {
  const affiliation = activeAffiliations[0];
  return (
    <section className="relative -mt-16 overflow-hidden pt-16">
      <div aria-hidden className="bg-mesh absolute inset-0" />
      <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <RayBurst />

      <Container className="relative grid items-center gap-14 pb-24 pt-16 sm:pt-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:pb-32 lg:pt-28">
        <div>
          <Reveal className="flex flex-wrap items-center gap-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 py-1 pl-1 pr-3 text-[13px] font-medium text-brand-800">
              <BrandTile slug="whatsapp" size={24} className="rounded-full" />
              Official WhatsApp Business API
            </p>
            {affiliation && (
              <a
                href={affiliation.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-[13px] font-medium text-ink-600 shadow-sm transition-colors hover:text-foreground"
              >
                <span className="flex h-6 items-center gap-1 rounded-full bg-black px-2">
                  <BrandIcon slug="nvidia" className="h-3.5 w-3.5" />
                  <span className="text-[10.5px] font-bold tracking-wide text-white">NVIDIA</span>
                </span>
                Backed by NVIDIA
              </a>
            )}
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-8 font-display text-[2.5rem] font-bold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-[3.4rem] lg:text-[4rem]">
              Turn WhatsApp into your{' '}
              <span className="text-gradient-brand relative whitespace-nowrap">
                best sales channel.
                <svg aria-hidden viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full sm:-bottom-3 sm:h-4">
                  <path
                    d="M3 13 C 60 4, 140 3, 297 9"
                    fill="none"
                    stroke="#bef264"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="draw-in is-in"
                    style={{ ['--len' as string]: 300, ['--draw-delay' as string]: '0.6s' }}
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink-600">
              Send approved campaigns, answer every chat from one shared inbox, automate replies with AI and collect
              payments — all on the official WhatsApp Business API.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.links.signup} size="xl" arrow className="rounded-full">
              Start for free
            </ButtonLink>
            <ButtonLink href={siteConfig.links.bookDemo} size="xl" variant="outline" className="rounded-full">
              Book a demo
            </ButtonLink>
          </Reveal>

        </div>

        <div aria-label="Illustrative product demo of a WhatsApp conversation" className="relative lg:pl-6">
          <Reveal delay={0.2} y={36}>
            <HeroPhone />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
