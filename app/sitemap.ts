import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { products } from '@/lib/catalog';
import { siteConfig } from '@/lib/site';

const APP_DIR = path.join(process.cwd(), 'app');

/** Every static page under /app, plus one entry per product page. */
function staticRoutes(dir: string, base = ''): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || /^[_.(\[]/.test(entry.name) || entry.name === 'api') continue;
    const full = path.join(dir, entry.name);
    const route = `${base}/${entry.name}`;
    if (fs.existsSync(path.join(full, 'page.tsx'))) out.push(route);
    out.push(...staticRoutes(full, route));
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', ...staticRoutes(APP_DIR), ...products.map((p) => `/products/${p.slug}`)];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route || '/'}`,
    lastModified: new Date(),
    priority: route === '' ? 1 : route.startsWith('/products') || route === '/pricing' ? 0.8 : 0.5,
  }));
}
