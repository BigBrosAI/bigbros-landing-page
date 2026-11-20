import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Changelog — What’s New in BigBrosAI',
  description: 'The latest features, improvements and fixes in the BigBrosAI WhatsApp Business API platform.',
  path: '/changelog',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
