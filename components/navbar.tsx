"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { BrandIcon } from '@/components/landing/brand-icon';
import { ButtonLink, Container, SmartLink } from '@/components/site/primitives';
import { productGroups, products } from '@/lib/catalog';
import { mainNav, resourceItems } from '@/lib/navigation';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

type Menu = 'products' | 'resources' | null;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const open = (m: Menu) => {
    clearTimeout(timer.current);
    setMenu(m);
  };
  const scheduleClose = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu(null), 140);
  };
  const close = () => {
    setMobileOpen(false);
    setMenu(null);
  };
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50" onMouseLeave={scheduleClose}>
      <AnnouncementBar />
      <div
        className={cn(
          'border-b transition-[background-color,border-color] duration-300',
          scrolled || mobileOpen || menu ? 'border-border/80 bg-background/85 backdrop-blur-xl backdrop-saturate-150' : 'border-transparent bg-background/0'
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="BigBrosAI home" className="shrink-0" onClick={close}>
            <Logo width={130} priority />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => (
                <li key={item.label} onMouseEnter={() => (item.menu ? open(item.menu) : scheduleClose())}>
                  {item.menu ? (
                    <button
                      type="button"
                      aria-expanded={menu === item.menu}
                      aria-haspopup="true"
                      onClick={() => setMenu(menu === item.menu ? null : item.menu!)}
                      className={cn(
                        'flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors',
                        menu === item.menu || isActive(item.href) ? 'text-foreground' : 'text-ink-600 hover:text-foreground'
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn('h-3.5 w-3.5 opacity-60 transition-transform duration-200', menu === item.menu && 'rotate-180')} />
                    </button>
                  ) : (
                    <SmartLink
                      href={item.href}
                      className={cn(
                        'relative block rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors',
                        isActive(item.href) ? 'text-foreground' : 'text-ink-600 hover:text-foreground'
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && <span className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-brand-600" />}
                    </SmartLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-1.5 lg:flex" onMouseEnter={scheduleClose}>
            <SmartLink href={siteConfig.links.login} className="rounded-full px-3.5 py-2 text-[14.5px] font-medium text-ink-600 transition-colors hover:text-foreground">
              Log in
            </SmartLink>
            <ButtonLink href={siteConfig.links.signup} size="sm" arrow className="h-10 rounded-full px-5">
              Start for free
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

      <div aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] bg-brand-600" />

      {/* desktop mega menus */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key={menu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseEnter={() => open(menu)}
            className="absolute inset-x-0 top-full hidden border-b border-border bg-background/95 shadow-float backdrop-blur-xl lg:block"
          >
            <Container className="py-7">{menu === 'products' ? <ProductsMenu onNavigate={close} /> : <ResourcesMenu onNavigate={close} />}</Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[6.25rem] overflow-y-auto bg-background lg:hidden"
          >
            <MobileMenu onNavigate={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AnnouncementBar() {
  return (
    <a
      href="https://www.nvidia.com/en-us/startups/"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-9 items-center justify-center gap-2 bg-forest px-4 text-center text-[13px] font-medium text-white/90"
    >
      <span className="flex items-center gap-1 rounded-full bg-black px-2 py-0.5">
        <BrandIcon slug="nvidia" className="h-3 w-3" />
        <span className="text-[10px] font-bold tracking-wide text-white">NVIDIA</span>
      </span>
      <span className="truncate">
        BigBrosAI is now <span className="text-white">backed by NVIDIA</span>
      </span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function ProductIcon({ p, className }: { p: (typeof products)[number]; className?: string }) {
  return (
    <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card transition-colors group-hover:border-brand-200 group-hover:bg-brand-50', className)}>
      {p.brand ? <BrandIcon slug={p.brand} className="h-4 w-4" /> : <p.icon className="h-4 w-4 text-brand-700" />}
    </span>
  );
}

function ProductsMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_17rem] gap-8">
      {productGroups.map((g) => (
        <div key={g.name}>
          <p className="mb-3 px-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {g.name} · <span className="normal-case tracking-normal">{g.blurb}</span>
          </p>
          <ul className="space-y-0.5">
            {products
              .filter((p) => p.group === g.name)
              .map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} onClick={onNavigate} className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-muted">
                    <ProductIcon p={p} />
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                        {p.name}
                        {p.badge && <span className="rounded-full bg-brand-100 px-1.5 py-px text-[10px] font-bold text-brand-800">{p.badge}</span>}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">{p.short}</span>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <Link href="/pricing" onClick={onNavigate} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-forest p-6 text-white">
        <div aria-hidden className="bg-grain-light absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/30 blur-2xl" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-300">Start free</p>
          <p className="mt-2 font-display text-lg font-semibold leading-snug">Free WhatsApp API, ₹50 bonus and 300 emails a day.</p>
        </div>
        <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
          See plans & pricing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}

function ResourcesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid grid-cols-4 gap-1">
      {resourceItems.map((r) => (
        <li key={r.label}>
          <SmartLink href={r.href} onClick={onNavigate} className="group flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted">
            {r.icon && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-brand-700 group-hover:bg-brand-50">
                <r.icon className="h-4 w-4" />
              </span>
            )}
            <span>
              <span className="block text-sm font-semibold">{r.label}</span>
              <span className="block text-[12.5px] text-muted-foreground">{r.description}</span>
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>('Products');
  return (
    <Container className="flex min-h-full flex-col py-4">
      <ul className="divide-y divide-border">
        {mainNav.map((item) =>
          item.menu ? (
            <li key={item.label}>
              <button
                type="button"
                aria-expanded={expanded === item.label}
                onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                className="flex w-full items-center justify-between py-4 text-lg font-semibold"
              >
                {item.label}
                <ChevronDown className={cn('h-4 w-4 transition-transform', expanded === item.label && 'rotate-180')} />
              </button>
              <AnimatePresence initial={false}>
                {expanded === item.label && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="-mx-2 overflow-hidden pb-3"
                  >
                    {(item.menu === 'products'
                      ? products.map((p) => ({ key: p.slug, href: `/products/${p.slug}`, label: p.name, node: <ProductIcon p={p} className="h-8 w-8" /> }))
                      : resourceItems.map((r) => ({
                          key: r.label,
                          href: r.href,
                          label: r.label,
                          node: r.icon ? (
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-brand-700">
                              <r.icon className="h-4 w-4" />
                            </span>
                          ) : null,
                        }))
                    ).map((x) => (
                      <li key={x.key}>
                        <SmartLink href={x.href} onClick={onNavigate} className="group flex items-center gap-3 rounded-xl p-2 text-[15px] font-medium">
                          {x.node}
                          {x.label}
                        </SmartLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ) : (
            <li key={item.label}>
              <SmartLink href={item.href} onClick={onNavigate} className="flex items-center justify-between py-4 text-lg font-semibold">
                {item.label}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </SmartLink>
            </li>
          )
        )}
      </ul>
      <div className="mt-auto grid gap-3 pt-8">
        <ButtonLink href={siteConfig.links.signup} size="lg" arrow className="rounded-full">
          Start for free
        </ButtonLink>
        <ButtonLink href={siteConfig.links.login} size="lg" variant="outline" className="rounded-full">
          Log in
        </ButtonLink>
      </div>
    </Container>
  );
}
