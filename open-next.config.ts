import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

/**
 * Every page on this site is prerendered at build time, so serve them straight
 * from Workers static assets instead of re-rendering on each request (which hit
 * the Worker CPU limit and returned intermittent 500/503s).
 */
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// `npm run build` runs the OpenNext build (so Cloudflare works whether its build
// command is `npm run build` or `npm run cf:build`), so OpenNext must call Next
// directly here instead of `npm run build`, which would loop.
config.buildCommand = 'npx next build';

export default config;
