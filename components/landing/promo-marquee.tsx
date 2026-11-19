import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, BadgeIndianRupee, Code2, Gauge, Gift, Infinity as InfinityIcon, Mail, Sparkles, Timer, Webhook, Zap } from 'lucide-react';
import { BrandTile, type BrandSlug } from '@/components/landing/brand-icon';
import { cn } from '@/lib/utils';

type Lane = { name: string; caption: string; href: string; brand?: BrandSlug; icon?: React.ComponentType<{ className?: string }>; soon?: boolean };

const lane: Lane[] = [
  { name: 'WhatsApp', caption: 'Official Business API', href: '/products/whatsapp-business-api', brand: 'whatsapp' },
  { name: 'Shopify', caption: 'Orders · carts · COD', href: '/integrations', brand: 'shopify' },
  { name: 'WooCommerce', caption: 'Store events', href: '/integrations', brand: 'woocommerce' },
  { name: 'Google Sheets', caption: 'Leads & contacts', href: '/integrations', brand: 'googlesheets' },
  { name: 'Meta Ads', caption: 'Click-to-WhatsApp', href: '/products/click-to-whatsapp-ads', brand: 'meta' },
  { name: 'WhatsApp Pay', caption: 'UPI in the chat', href: '/products/whatsapp-payments', brand: 'whatsapp' },
  { name: 'Razorpay', caption: 'Payment links', href: '/integrations', brand: 'razorpay' },
  { name: 'Email API', caption: '300 free / day', href: '/products/email-api', icon: Mail },
  { name: 'Instagram DM', caption: 'Coming soon', href: '/channels#instagram', brand: 'instagram', soon: true },
  { name: 'REST API', caption: 'Send from code', href: '/products/whatsapp-business-api', icon: Code2 },
  { name: 'Webhooks', caption: 'Real-time events', href: '/integrations', icon: Webhook },
];

const perks = [
  { icon: Zap, text: 'Zero setup fees' },
  { icon: BadgeIndianRupee, text: 'No per-message markup' },
  { icon: InfinityIcon, text: 'Unlimited free service conversations' },
  { icon: Mail, text: '300 free emails every day' },
  { icon: Gift, text: '₹50 signup bonus' },
  { icon: Gauge, text: 'Up to 5,000 messages / minute' },
  { icon: BadgeCheck, text: 'Green tick verification' },
  { icon: Timer, text: 'Set up in minutes' },
];

/**
 * Full-bleed integrations lane (cells divided by hairlines) drifting left → right,
 * with a thinner perks ticker running the other way. Pauses on hover.
 */
export function PromoMarquee() {
  return (
    <section aria-label="Integrations and perks" className="marquee-pause forest relative overflow-hidden">
      <div aria-hidden className="bg-grain-light absolute inset-0 opacity-40" />
      <div className="relative border-b border-white/10 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <Track direction="right" duration={70}>
          {lane.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group relative flex h-[5.5rem] w-[15.5rem] shrink-0 items-center gap-3.5 border-r border-white/10 px-6 transition-colors hover:bg-white/[0.05]"
            >
              {c.brand ? (
                <BrandTile slug={c.brand} size={42} />
              ) : c.icon ? (
                <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-white shadow-sm">
                  <c.icon className="h-5 w-5 text-forest" />
                </span>
              ) : null}
              <span className="min-w-0 leading-tight">
                <span className="block font-display text-[16px] font-semibold text-white">{c.name}</span>
                <span className={cn('mt-1 block font-mono text-[10.5px] uppercase tracking-[0.14em]', c.soon ? 'text-lime-300' : 'text-white/45 group-hover:text-brand-300')}>
                  {c.caption}
                </span>
              </span>
              <ArrowUpRight className="absolute right-4 top-4 h-3.5 w-3.5 text-white/0 transition-colors group-hover:text-brand-300" />
            </Link>
          ))}
        </Track>
      </div>
      <div className="relative py-3 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <Track direction="left" duration={50}>
          {perks.map((k) => (
            <span key={k.text} className="flex shrink-0 items-center gap-2 px-5 text-[14px] font-medium text-white/70">
              <k.icon className="h-4 w-4 text-brand-300" />
              {k.text}
              <Sparkles aria-hidden className="ml-5 h-3 w-3 text-lime-300/60" />
            </span>
          ))}
        </Track>
      </div>
    </section>
  );
}

function Track({ children, direction, duration }: { children: React.ReactNode; direction: 'left' | 'right'; duration: number }) {
  return (
    <div className="flex overflow-hidden">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn('flex shrink-0 items-center', direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left')}
          style={{ animationDuration: `${duration}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
