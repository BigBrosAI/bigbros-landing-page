import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description: 'The terms that govern your use of the BigBrosAI platform, website and services.',
  path: '/legal/terms',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
