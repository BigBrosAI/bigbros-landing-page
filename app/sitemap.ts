import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://bigbrosai.com';
const APP_DIR = path.join(process.cwd(), 'app');

function getRoutes(dir: string, basePath = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let routes: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    if (entry.name === 'api') continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const route = `${basePath}/${entry.name}`;

      const hasPage =
        fs.existsSync(path.join(fullPath, 'page.tsx')) ||
        fs.existsSync(path.join(fullPath, 'page.jsx'));

      if (hasPage) {
        routes.push(route);
      }

      routes.push(...getRoutes(fullPath, route));
    }
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getRoutes(APP_DIR);

  return routes.map((route) => ({
    url: `${BASE_URL}${route === '' ? '/' : route}`,
    lastModified: new Date(),
  }));
}
