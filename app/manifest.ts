import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — WhatsApp Business API Platform`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F8F6',
    theme_color: '#0B2E23',
    icons: [{ src: '/favicon.png', sizes: '800x800', type: 'image/png', purpose: 'any' }],
  };
}
