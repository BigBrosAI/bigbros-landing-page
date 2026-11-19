import { siteConfig } from '@/lib/site';

export type NavItem = { label: string; href: string };

/** Top navigation. Section anchors point at the home page so they work from any route. */
export const mainNav: NavItem[] = [
  { label: 'Inbox', href: '/#inbox' },
  { label: 'Campaigns', href: '/#campaigns' },
  { label: 'Chatbots', href: '/#flows' },
  { label: 'Integrations', href: '/#integrations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: siteConfig.links.docs },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { label: 'Live chat inbox', href: '/#inbox' },
      { label: 'Campaigns & broadcasts', href: '/#campaigns' },
      { label: 'AI chatbot flows', href: '/#flows' },
      { label: 'Integrations & payments', href: '/#integrations' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Developers',
    items: [
      { label: 'Documentation', href: siteConfig.links.docs },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Dashboard', href: siteConfig.links.dashboard },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
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
