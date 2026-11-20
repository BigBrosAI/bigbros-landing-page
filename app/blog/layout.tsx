import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Blog — WhatsApp Marketing & Automation Guides',
  description: 'Guides and playbooks on WhatsApp marketing, broadcasts, chatbots, automation and customer support from the BigBrosAI team.',
  path: '/blog',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
