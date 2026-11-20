import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Refund Policy',
  description: 'BigBrosAI’s policy on refunds for subscriptions, wallet top-ups and add-ons.',
  path: '/legal/refund',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
