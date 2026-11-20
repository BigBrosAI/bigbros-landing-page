import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Careers at BigBrosAI',
  description: 'Join BigBrosAI and help businesses grow on WhatsApp. See open roles across engineering, product, sales and support.',
  path: '/careers',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
