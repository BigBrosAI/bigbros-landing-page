import Link from 'next/link';
import { Logo } from '@/components/logo';
import { BrandIcon } from '@/components/landing/brand-icon';
import { Container, SmartLink } from '@/components/site/primitives';
import { footerNav } from '@/lib/navigation';
import { activeAffiliations, siteConfig } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="forest relative overflow-hidden">
      <div aria-hidden className="bg-grain-light absolute inset-0 opacity-60" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Link href="/" aria-label="BigBrosAI home">
              <Logo width={150} tone="light" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              The WhatsApp Business API platform for teams that sell and support in chat — inbox, campaigns, AI
              flows and payments in one place.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            {activeAffiliations.length > 0 && (
              <ul className="mt-6 space-y-2">
                {activeAffiliations.map((a) => (
                  <li key={a.id}>
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70 transition-colors hover:text-white"
                    >
                      <BrandIcon slug="nvidia" className="h-3.5 w-3.5" />
                      {a.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand-300">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.items.map((item) => (
                    <li key={item.href + item.label}>
                      <SmartLink href={item.href} className="text-sm text-white/65 transition-colors hover:text-white">
                        {item.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-16 select-none text-center text-[19vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.04] sm:text-[15vw] lg:text-[12.5rem]"
        >
          bigbrosai
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>WhatsApp is a trademark of Meta Platforms, Inc.</p>
        </div>
      </Container>
    </footer>
  );
}
