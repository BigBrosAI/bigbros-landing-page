import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Security & Data Protection',
  description: 'How BigBrosAI protects your data and your customers’ conversations on the official WhatsApp Business Platform.',
  path: '/security',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
