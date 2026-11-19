/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { formats: ['image/avif', 'image/webp'] },
  // Keep links from the previous bigbrosai.com working.
  async redirects() {
    return [
      { source: '/features', destination: '/products', permanent: true },
      { source: '/product/email', destination: '/products/email-api', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
    ];
  },
};

module.exports = nextConfig;
