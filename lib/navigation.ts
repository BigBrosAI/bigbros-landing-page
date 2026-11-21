import type { LucideIcon } from 'lucide-react';
import { BookOpen, Building2, History, LifeBuoy, Mail, Newspaper, ShieldCheck, Briefcase } from 'lucide-react';
import { channels, products } from '@/lib/catalog';
import { siteConfig } from '@/lib/site';

export type NavItem = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavEntry = { label: string; href: string; menu?: 'products' | 'resources' };

export const mainNav: NavEntry[] = [
  { label: 'Products', href: '/products', menu: 'products' },
  { label: 'Channels', href: '/channels' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/blog', menu: 'resources' },
];

export const resourceItems: NavItem[] = [
  { label: 'Documentation', href: siteConfig.links.docs, description: 'Guides and API reference', icon: BookOpen },
  { label: 'Guides & resources', href: '/blog', description: 'Docs, videos and how-tos', icon: Newspaper },
  { label: 'Changelog', href: '/changelog', description: 'What’s new in the platform', icon: History },
  { label: 'Security', href: '/security', description: 'How we protect your data', icon: ShieldCheck },
  { label: 'About us', href: '/about', description: 'Our mission and team', icon: Building2 },
  { label: 'Careers', href: '/careers', description: 'We’re hiring — remote sales roles', icon: Briefcase },
  { label: 'Contact', href: '/contact', description: 'Talk to our team', icon: Mail },
  { label: 'Help & support', href: `mailto:${siteConfig.email}`, description: siteConfig.email, icon: LifeBuoy },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  { title: 'Products', items: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })) },
  {
    title: 'Platform',
    items: [
      { label: 'All products', href: '/products' },
      ...channels.map((c) => ({ label: c.status === 'Soon' ? `${c.name} (soon)` : c.name, href: `/channels#${c.id}` })),
      { label: 'Integrations', href: '/integrations' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Guides & resources', href: '/blog' },
      { label: 'Documentation', href: siteConfig.links.docs },
      { label: 'Security', href: '/security' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Refund Policy', href: '/legal/refund' },
      { label: 'Platform Usage Policy', href: '/legal/plateform-policy' },
    ],
  },
];
