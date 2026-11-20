import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Sales & Support',
  description: 'Talk to the BigBrosAI team about the WhatsApp Business API, pricing, demos or support. We usually reply within one business day.',
  path: '/contact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
