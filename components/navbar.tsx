"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ButtonLink, Container, SmartLink } from '@/components/site/primitives';
import { mainNav } from '@/lib/navigation';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || mobileOpen
            ? 'border-border/80 bg-background/80 backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-background/0'
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="BigBrosAI home" className="shrink-0" onClick={close}>
            <Logo width={126} priority />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 shadow-sm backdrop-blur">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <SmartLink
                    href={item.href}
                    className={cn(
                      'block rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-foreground text-background'
                        : 'text-ink-600 hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-1.5 lg:flex">
            <SmartLink
              href={siteConfig.links.login}
              className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-600 transition-colors hover:text-foreground"
            >
              Log in
            </SmartLink>
            <ButtonLink href={siteConfig.links.signup} size="sm" arrow className="rounded-full px-4">
              Start free
            </ButtonLink>
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>
      </div>

      <div aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-background lg:hidden"
          >
            <Container className="flex min-h-full flex-col py-6">
              <ul className="divide-y divide-border">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i + 0.05 }}
                  >
                    <SmartLink
                      href={item.href}
                      onClick={close}
                      className="flex items-center justify-between py-4 text-lg font-semibold"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </SmartLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-8">
                <ButtonLink href={siteConfig.links.signup} size="lg" arrow className="rounded-full">
                  Start free
                </ButtonLink>
                <ButtonLink href={siteConfig.links.login} size="lg" variant="outline" className="rounded-full">
                  Log in
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
