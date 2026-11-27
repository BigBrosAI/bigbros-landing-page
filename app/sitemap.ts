import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { products } from '@/lib/catalog';
import { tools } from '@/lib/tools';
import { jobs } from '@/lib/jobs';
import { competitors } from '@/lib/compare';
import { solutions } from '@/lib/solutions';
import { guides } from '@/lib/guides';
import { integrationPages } from '@/lib/integration-pages';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site';

const APP_DIR = path.join(process.cwd(), 'app');

/** Every static page under /app (skipping dynamic and private folders). */
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

function meta(route: string): Pick<MetadataRoute.Sitemap[number], 'priority' | 'changeFrequency'> {
  if (route === '') return { priority: 1, changeFrequency: 'weekly' };
  if (route === '/pricing' || route === '/products') return { priority: 0.9, changeFrequency: 'weekly' };
  if (route.startsWith('/products/')) return { priority: 0.8, changeFrequency: 'monthly' };
  if (route.startsWith('/solutions/') || route.startsWith('/compare/') || route.startsWith('/integrations/')) return { priority: 0.8, changeFrequency: 'monthly' };
  if (route === '/blog') return { priority: 0.7, changeFrequency: 'weekly' };
  if (route.startsWith('/blog/') || route.startsWith('/guides/')) return { priority: 0.7, changeFrequency: 'monthly' };
  if (route.startsWith('/tools/')) return { priority: 0.7, changeFrequency: 'monthly' };
  if (route.startsWith('/legal/')) return { priority: 0.3, changeFrequency: 'yearly' };
  if (route === '/tools' || route === '/changelog') return { priority: 0.6, changeFrequency: 'weekly' };
  return { priority: 0.6, changeFrequency: 'monthly' };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ['', ...staticRoutes(APP_DIR), ...products.map((p) => `/products/${p.slug}`), ...tools.map((t) => `/tools/${t.slug}`), ...jobs.map((j) => `/careers/${j.slug}`), ...solutions.map((x) => `/solutions/${x.slug}`), ...competitors.map((c) => `/compare/${c.slug}`), ...guides.map((g) => `/guides/${g.slug}`), ...integrationPages.map((i) => `/integrations/${i.slug}`), ...getAllPosts().map((p) => `/blog/${p.slug}`)];
  // Real content dates where we have them, so crawlers can tell what changed.
  const dated = new Map<string, Date>(getAllPosts().map((p) => [`/blog/${p.slug}`, new Date(`${p.updated ?? p.date}T00:00:00Z`)]));
  guides.forEach((g) => {
    const d = new Date(`${g.updated} UTC`);
    if (!Number.isNaN(d.getTime())) dated.set(`/guides/${g.slug}`, d);
  });
  return Array.from(new Set(routes)).map((route) => ({
    url: `${siteConfig.url}${route || '/'}`,
    lastModified: dated.get(route) ?? lastModified,
    ...meta(route),
  }));
}
