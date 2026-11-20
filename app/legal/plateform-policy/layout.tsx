import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Platform Usage Policy',
  description: 'Acceptable use rules for messaging on BigBrosAI and the WhatsApp Business Platform.',
  path: '/legal/plateform-policy',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
