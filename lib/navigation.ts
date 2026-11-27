import type { LucideIcon } from 'lucide-react';
import { BookOpen, Building2, GraduationCap, PenLine, History, LifeBuoy, Mail, Newspaper, ShieldCheck, Briefcase, Scale, Store } from 'lucide-react';
import { channels, products } from '@/lib/catalog';
import { siteConfig } from '@/lib/site';
import { competitors } from '@/lib/compare';
import { solutions } from '@/lib/solutions';

export type NavItem = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavEntry = { label: string; href: string; menu?: 'products' | 'resources' };

export const mainNav: NavEntry[] = [
  { label: 'Products', href: '/products', menu: 'products' },
  { label: 'Channels', href: '/channels' },
  { label: 'Email', href: '/email' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Tools', href: '/tools' },
  { label: 'Resources', href: '/changelog', menu: 'resources' },
];

export const resourceItems: NavItem[] = [
  { label: 'Documentation', href: siteConfig.links.docs, description: 'Guides and API reference', icon: BookOpen },
  { label: 'Blog', href: '/blog', description: 'Product news & growth playbooks', icon: PenLine },
  { label: 'Guides', href: '/guides', description: 'Pricing, chatbots, templates & campaigns', icon: GraduationCap },
  { label: 'Free WhatsApp tools', href: '/tools', description: 'Link, QR, formatter & calculators', icon: Newspaper },
  { label: 'Solutions by industry', href: '/solutions', description: 'Clinics, coaching, real estate & more', icon: Store },
  { label: 'Compare', href: '/compare', description: 'BigBrosAI vs Wati, Interakt, AiSensy', icon: Scale },
  { label: 'Changelog', href: '/changelog', description: 'What’s new in the platform', icon: History },
  { label: 'Security', href: '/security', description: 'How we protect your data', icon: ShieldCheck },
  { label: 'About us', href: '/about', description: 'Our mission and team', icon: Building2 },
  { label: 'Careers', href: '/careers', description: 'We’re hiring', icon: Briefcase },
  { label: 'Contact', href: '/contact', description: 'Talk to our team', icon: Mail },
  { label: 'Help & support', href: `mailto:${siteConfig.email}`, description: siteConfig.email, icon: LifeBuoy },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  { title: 'Products', items: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })) },
  {
    title: 'Platform',
    items: [
      { label: 'All products', href: '/products' },
      { label: 'Email API & marketing', href: '/email' },
      ...channels.map((c) => ({ label: c.status === 'Soon' ? `${c.name} (soon)` : c.name, href: `/channels#${c.id}` })),
      { label: 'Integrations', href: '/integrations' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Solutions',
    items: [
      ...solutions.map((x) => ({ label: x.short, href: `/solutions/${x.slug}` })),
      ...competitors.map((c) => ({ label: `vs ${c.name}`, href: `/compare/${c.slug}` })),
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Guides', href: '/guides' },
      { label: 'Free WhatsApp tools', href: '/tools' },
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
