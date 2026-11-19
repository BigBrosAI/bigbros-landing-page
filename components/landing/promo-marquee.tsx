import Link from 'next/link';
import { BadgeCheck, BadgeIndianRupee, Code2, Gauge, Gift, Infinity as InfinityIcon, Mail, Sparkles, Timer, Zap } from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';
import { products } from '@/lib/catalog';
import { cn } from '@/lib/utils';

const perks = [
  { icon: Zap, text: 'Zero setup fees' },
  { icon: BadgeIndianRupee, text: 'No per-message markup' },
  { icon: InfinityIcon, text: 'Unlimited free service conversations' },
  { icon: Mail, text: '300 free emails every day' },
  { icon: Gift, text: '₹50 signup bonus' },
  { icon: Code2, text: 'Developer REST API & webhooks' },
  { icon: Gauge, text: 'Up to 5,000 messages / minute' },
  { icon: BadgeCheck, text: 'Green tick verification' },
  { icon: Timer, text: 'Set up in minutes' },
];

/**
 * Two marquee rows moving in opposite directions: product pills (linked) on
 * top, platform perks below. Pauses on hover; static under reduced motion.
 */
export function PromoMarquee() {
  return (
    <section aria-label="Products and perks" className="marquee-pause forest relative overflow-hidden py-5">
      <div aria-hidden className="bg-grain-light absolute inset-0 opacity-50" />
      <div className="relative space-y-3 [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <Row direction="right" speed="slow">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm font-medium text-white/90 transition-colors hover:border-brand-400/50 hover:bg-white/[0.12] hover:text-white"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                {p.brand ? <BrandIcon slug={p.brand} className="h-3.5 w-3.5" /> : <p.icon className="h-3.5 w-3.5 text-brand-700" />}
              </span>
              {p.name}
              {p.badge && (
                <span className="rounded-full bg-lime-300 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-forest">
                  {p.badge}
                </span>
              )}
            </Link>
          ))}
          {(['shopify', 'woocommerce', 'googlesheets', 'razorpay'] as const).map((b) => (
            <Link
              key={b}
              href="/integrations"
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.12]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                <BrandIcon slug={b} className="h-3.5 w-3.5" />
              </span>
              {{ shopify: 'Shopify', woocommerce: 'WooCommerce', googlesheets: 'Google Sheets', razorpay: 'Razorpay' }[b]}
            </Link>
          ))}
        </Row>
        <Row direction="left" speed="fast">
          {perks.map((k) => (
            <span key={k.text} className="flex shrink-0 items-center gap-2 px-2 text-[15px] font-semibold text-white/75">
              <k.icon className="h-4 w-4 text-brand-300" />
              {k.text}
              <Sparkles aria-hidden className="ml-4 h-3.5 w-3.5 text-lime-300/70" />
            </span>
          ))}
        </Row>
      </div>
    </section>
  );
}

function Row({ children, direction, speed }: { children: React.ReactNode; direction: 'left' | 'right'; speed: 'slow' | 'fast' }) {
  return (
    <div className="flex overflow-hidden">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            'flex shrink-0 items-center gap-3 pr-3',
            direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left',
            speed === 'slow' ? '[animation-duration:60s]' : '[animation-duration:45s]'
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
