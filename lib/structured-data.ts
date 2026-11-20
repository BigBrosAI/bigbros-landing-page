import { plans, planPrice } from '@/lib/plans';
import { absoluteUrl, siteConfig } from '@/lib/site';

/** SoftwareApplication schema with the published plans as offers. */
export function softwareApplicationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: siteConfig.url,
    image: absoluteUrl('/og-image.png'),
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    offers: plans
      .filter((p) => p.monthly !== null)
      .map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: String(planPrice(p, false)),
        priceCurrency: 'INR',
        url: absoluteUrl('/pricing'),
        category: p.monthly === 0 ? 'Free' : 'Subscription',
      })),
  };
}
