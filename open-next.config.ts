import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

/**
 * Every page on this site is prerendered at build time, so serve them straight
 * from Workers static assets instead of re-rendering on each request (which hit
 * the Worker CPU limit and returned intermittent 500/503s).
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
