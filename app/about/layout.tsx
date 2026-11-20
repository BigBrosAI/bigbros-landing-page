import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About BigBrosAI',
  description: 'BigBrosAI builds the WhatsApp Business API platform for teams that sell and support in chat — campaigns, live chat, AI chatbots, payments and email.',
  path: '/about',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
