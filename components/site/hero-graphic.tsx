import {
  BadgeIndianRupee,
  Bot,
  Briefcase,
  Check,
  Clock,
  FileCheck2,
  Home,
  Inbox,
  KeyRound,
  Link2,
  Lock,
  MapPin,
  Phone,
  QrCode,
  Rocket,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { BrandTile, type BrandSlug } from '@/components/landing/brand-icon';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

type Chip = {
  title: string;
  sub: string;
  icon?: LucideIcon;
  brand?: BrandSlug;
  /** forest tile with a lime icon instead of the soft green tile */
  dark?: boolean;
  live?: boolean;
};

/** Four floating cards per page: two on each side of the hero title. */
export const heroScenes = {
  careers: [
    { title: 'Hiring now', sub: 'Sales & Marketing', icon: Briefcase, dark: true, live: true },
    { title: 'Remote-first', sub: 'Work from anywhere', icon: Home },
    { title: 'Ship every week', sub: 'Small team, real ownership', icon: Rocket },
    { title: 'Team sync', sub: 'Weekly, all remote', icon: Users },
  ],
  changelog: [
    { title: 'New release', sub: 'Shipped this week', icon: Tag, dark: true, live: true },
    { title: 'AI Flow Builder', sub: 'Describe it, get a flow', icon: Sparkles },
    { title: 'Fixed', sub: 'Faster CSV imports', icon: Check },
    { title: 'Roadmap', sub: 'Built from your feedback', icon: Rocket },
  ],
  channels: [
    { title: 'WhatsApp', sub: 'Business API', brand: 'whatsapp', live: true },
    { title: 'Instagram', sub: 'DMs in one inbox', brand: 'instagram' },
    { title: 'Email', sub: 'Transactional & marketing', brand: 'gmail' },
    { title: 'Facebook', sub: 'Messenger & ads', brand: 'facebook' },
  ],
  contact: [
    { title: 'Open weekdays', sub: 'Mon–Fri · 9 AM – 6 PM IST', icon: Clock, dark: true, live: true },
    { title: 'Call us', sub: siteConfig.phones[0], icon: Phone },
    { title: 'WhatsApp us', sub: siteConfig.whatsapp.display, brand: 'whatsapp' },
    { title: 'Visit us', sub: 'Mathura · Agra', icon: MapPin },
  ],
  integrations: [
    { title: 'Order synced', sub: 'Shopify → WhatsApp', brand: 'shopify', live: true },
    { title: 'Row added', sub: 'Google Sheets', brand: 'googlesheets' },
    { title: 'Payment received', sub: 'Razorpay', brand: 'razorpay' },
    { title: 'Cart recovered', sub: 'WooCommerce', brand: 'woocommerce' },
  ],
  pricing: [
    { title: 'Meta rates', sub: 'Passed through, no markup', icon: BadgeIndianRupee, dark: true },
    { title: 'Wallet', sub: 'Top up as you go', icon: Wallet },
    { title: 'Free replies', sub: 'Inside the 24-hour window', brand: 'whatsapp' },
    { title: 'Billed in INR', sub: 'Monthly plans', icon: Check },
  ],
  products: [
    { title: 'Broadcasts', sub: 'Send to segments', brand: 'whatsapp', live: true },
    { title: 'AI chatbot', sub: 'Answers 24×7', icon: Bot, dark: true },
    { title: 'Shared inbox', sub: 'Your whole team', icon: Inbox },
    { title: 'Email API', sub: 'Authenticated sending', brand: 'gmail' },
  ],
  security: [
    { title: 'Official platform', sub: 'WhatsApp Business API', icon: ShieldCheck, dark: true },
    { title: 'Encrypted', sub: 'Connections over TLS', icon: Lock },
    { title: 'Role-based access', sub: 'Owners, admins, agents', icon: Users },
    { title: 'Scoped API keys', sub: 'With IP allowlists', icon: KeyRound },
  ],
  tools: [
    { title: 'Link copied', sub: 'wa.me/91…', icon: Link2, live: true },
    { title: 'QR downloaded', sub: 'PNG · SVG', icon: QrCode, dark: true },
    { title: 'Template ready', sub: 'No rejection risks found', icon: FileCheck2 },
    { title: 'Campaign ROI', sub: 'Estimated before sending', icon: TrendingUp },
  ],
} satisfies Record<string, Chip[]>;

export type HeroScene = keyof typeof heroScenes;

function ChipCard({ c, className }: { c: Chip; className?: string }) {
  const Icon = c.icon;
  return (
    <div className={cn('flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 pr-4 text-left shadow-float backdrop-blur', className)}>
      {c.brand ? (
        <BrandTile slug={c.brand} size={36} />
      ) : (
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
            c.dark ? 'bg-forest text-lime-300' : 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
          )}
        >
          {Icon && <Icon className="h-[18px] w-[18px]" />}
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold leading-tight text-foreground">
          {c.title}
          {c.live && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-soft-ping absolute inline-flex h-full w-full rounded-full bg-brand-500" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
            </span>
          )}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-[12px] leading-tight text-muted-foreground">{c.sub}</span>
      </span>
    </div>
  );
}

/** Desktop: cards float on both sides of the hero. */
const slots = [
  'left-[3%] top-[30%] -rotate-[4deg]',
  'left-[7%] top-[62%] rotate-[3deg]',
  'right-[3%] top-[26%] rotate-[4deg]',
  'right-[6%] top-[58%] -rotate-[3deg]',
];

export function HeroGraphicSides({ scene }: { scene: HeroScene }) {
  const chips = heroScenes[scene] as Chip[];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      {/* faint orbit rings behind each side */}
      <svg className="absolute -left-24 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 text-brand-600/15" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeDasharray="2 5" />
        <circle cx="100" cy="100" r="92" stroke="currentColor" strokeDasharray="2 7" />
      </svg>
      <svg className="absolute -right-24 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 text-brand-600/15" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeDasharray="2 5" />
        <circle cx="100" cy="100" r="92" stroke="currentColor" strokeDasharray="2 7" />
      </svg>
      {chips.slice(0, 4).map((c, i) => (
        <div key={c.title} className={cn('absolute w-[13.5rem]', slots[i])}>
          <div className="animate-float" style={{ animationDelay: `${i * -1.4}s`, animationDuration: `${6 + i}s` }}>
            <ChipCard c={c} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Below xl: the same cards as a tidy row under the subtitle. */
export function HeroGraphicRow({ scene }: { scene: HeroScene }) {
  const chips = heroScenes[scene] as Chip[];
  return (
    <div aria-hidden className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 xl:hidden">
      {chips.slice(0, 4).map((c, i) => (
        <ChipCard key={c.title} c={c} className={cn('shadow-card', i % 2 ? 'sm:translate-y-2' : '')} />
      ))}
    </div>
  );
}
