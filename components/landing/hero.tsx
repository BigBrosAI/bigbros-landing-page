import { CheckCircle2 } from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';
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
          const x = 600 + Math.cos(rad) * r.l;
          const y = 200 - Math.sin(rad) * r.l;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={600 + Math.cos(rad) * 70}
              y2={200 - Math.sin(rad) * 70}
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
      <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <RayBurst />

      <Container className="relative grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 py-1 pl-1 pr-3 text-[13px] font-medium text-brand-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                <BrandIcon slug="whatsapp" className="h-3.5 w-3.5" />
              </span>
              Official WhatsApp Business Platform
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.6rem]">
              Sell, support and grow{' '}
              <span className="relative whitespace-nowrap text-brand-800">
                inside WhatsApp.
                <svg aria-hidden viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full sm:-bottom-3 sm:h-4">
                  <path
                    d="M3 13 C 60 4, 140 3, 297 9"
                    fill="none"
                    stroke="#4ade80"
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
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">
              BigBrosAI brings a shared live-chat inbox, approved broadcast campaigns, AI chatbot flows and WhatsApp
              Pay together on the official API — so every chat moves a customer forward.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.links.signup} size="xl" arrow className="rounded-full">
              Start free
            </ButtonLink>
            <ButtonLink href={siteConfig.links.bookDemo} size="xl" variant="outline" className="rounded-full">
              Book a demo
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-600">
              {['Free Starter plan', 'Set up from your browser', affiliation ? affiliation.label : null]
                .filter(Boolean)
                .map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-600" /> {t}
                  </li>
                ))}
            </ul>
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
