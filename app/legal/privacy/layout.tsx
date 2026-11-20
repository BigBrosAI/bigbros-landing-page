import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How BIGBROS AI Pvt. Ltd. collects, uses and protects personal data when you use BigBrosAI.',
  path: '/legal/privacy',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
