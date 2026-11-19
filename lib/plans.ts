/*
 * Plans and message rates, taken from the pricing on the existing bigbrosai.com.
 * Annual billing is 10% off the monthly price.
 */

export const ANNUAL_DISCOUNT = 0.1;

export type Plan = {
  id: 'starter' | 'basic' | 'pro' | 'enterprise';
  name: string;
  monthly: number | null; // null = custom
  blurb: string;
  cta: string;
  href: 'signup' | 'sales';
  popular?: boolean;
  inherits?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 0,
    blurb: 'For small businesses starting with WhatsApp marketing.',
    cta: 'Start for free',
    href: 'signup',
    features: [
      'Free WhatsApp Business API',
      '₹50 free signup bonus',
      'Unlimited free service conversations',
      '300 free emails / day (forever)',
      'Upload & manage contacts',
      'Tags & attributes',
      'Live chat dashboard',
      'Create template messages',
      'Email support',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    monthly: 999,
    blurb: 'For scaling teams who need automation and analytics.',
    cta: 'Get started',
    href: 'signup',
    inherits: 'Everything in Starter, plus',
    features: [
      'Up to 2 campaigns / day',
      '1 owner + 4 free agents',
      'Extra agents at ₹99 / user / month',
      'Click-to-WhatsApp ads',
      'Smart audience segregation',
      'Broadcasting & retargeting',
      'Template message APIs',
      '2,400 messages / minute',
      'Shared team inbox',
      '1 GB cloud storage',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 2199,
    blurb: 'For high-volume businesses with advanced needs.',
    cta: 'Get started',
    href: 'signup',
    popular: true,
    inherits: 'Everything in Basic, plus',
    features: [
      'Unlimited campaigns',
      'Campaign budget analytics',
      'Import contacts via CSV',
      'CSV campaign scheduler',
      '5,000 messages / minute',
      'User access control',
      'AI template builder',
      'Extra flow slots at ₹250 / slot',
      'Dedicated account manager',
      '99.9% SLA guarantee',
      '5 GB cloud storage',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    blurb: 'Unlimited messages, dedicated infrastructure and custom integrations.',
    cta: 'Contact sales',
    href: 'sales',
    inherits: 'Everything in Pro, plus',
    features: ['Unlimited throughput', 'Custom chatbot flows', 'Custom integrations', 'Free blue tick verification', 'Unlimited storage', 'Named account manager'],
  },
];

export const metaRates = [
  { label: 'Marketing', value: '₹0.9999', note: 'Promotions, offers, product updates' },
  { label: 'Utility', value: '₹0.145', note: 'Delivery updates, receipts, reminders' },
  { label: 'Authentication', value: '₹0.145', note: 'OTPs and account verification' },
  { label: 'Service', value: 'Free', note: 'Replies within the 24-hour window' },
];

type Cell = boolean | string;
export type CompareRow = { label: string; hint?: string; values: [Cell, Cell, Cell, Cell] };
export const comparison: { group: string; rows: CompareRow[] }[] = [
  {
    group: 'WhatsApp messaging',
    rows: [
      { label: 'WhatsApp Business API', values: [true, true, true, true] },
      { label: 'Unlimited free service conversations', hint: 'Customer-initiated support conversations are always free.', values: [true, true, true, true] },
      { label: 'Marketing messages', hint: 'Per message, India', values: ['—', '₹0.9999', '₹0.9999', 'Custom'] },
      { label: 'Utility messages', hint: 'Per message, India', values: ['—', '₹0.145', '₹0.145', 'Custom'] },
      { label: 'Authentication messages', hint: 'Per message, India', values: ['—', '₹0.145', '₹0.145', 'Custom'] },
      { label: 'Throughput', values: ['—', '2,400 / min', '5,000 / min', 'Unlimited'] },
    ],
  },
  {
    group: 'Campaigns',
    rows: [
      { label: 'Campaigns per day', values: ['—', '2', 'Unlimited', 'Unlimited'] },
      { label: 'Broadcasting & retargeting', values: [false, true, true, true] },
      { label: 'Smart audience segregation', values: [false, true, true, true] },
      { label: 'CSV campaign scheduler', values: [false, false, true, true] },
      { label: 'Campaign budget analytics', values: [false, false, true, true] },
    ],
  },
  {
    group: 'Contacts',
    rows: [
      { label: 'Create & manage contacts', values: [true, true, true, true] },
      { label: 'Tags', values: ['10', '10', '100', 'Unlimited'] },
      { label: 'Custom attributes', values: ['5', '5', '20', 'Unlimited'] },
      { label: 'Bulk CSV contact import', values: [false, false, true, true] },
      { label: 'Export contacts to CSV', values: [false, false, true, true] },
    ],
  },
  {
    group: 'Chatbot & automation',
    rows: [
      { label: 'Chatbot flows', hint: 'Extra slots ₹250 each', values: ['—', '5 for ₹2,199', '5 for ₹2,199', 'Custom'] },
      { label: 'AI template builder', values: [false, false, true, true] },
      { label: 'Click-to-WhatsApp ads', values: [false, true, true, true] },
    ],
  },
  {
    group: 'Team & platform',
    rows: [
      { label: 'Included seats', values: ['1 owner', '1 owner + 4 agents', '1 owner + 4 agents', 'Custom'] },
      { label: 'Extra agents', values: ['—', '₹99 / user / mo', '₹99 / user / mo', 'Custom'] },
      { label: 'User access control', values: [false, false, true, true] },
      { label: 'Blue tick verification', values: ['—', '₹999 one-time', '₹999 one-time', 'Included'] },
      { label: 'Webhooks', values: ['—', '₹999 / month', '₹999 / month', 'Custom'] },
      { label: 'Cloud storage', values: ['—', '1 GB', '5 GB', 'Unlimited'] },
      { label: 'Dedicated account manager', values: [false, false, true, true] },
      { label: '99.9% SLA', values: [false, false, true, true] },
    ],
  },
  {
    group: 'Email',
    rows: [
      { label: 'Free transactional emails', values: ['300 / day', '300 / day', '300 / day', '300 / day'] },
      { label: 'Beyond the free tier', values: ['₹0.125 / email', '₹0.125 / email', '₹0.125 / email', 'Custom'] },
    ],
  },
];

/** Per-message WhatsApp rates by destination (INR). */
export const countryRates: { market: string; code: string; marketing: string; utility: string; auth: string; authIntl: string }[] = [
  { market: 'India', code: '+91', marketing: '0.9999', utility: '0.1450', auth: '0.1450', authIntl: '3.1298' },
  { market: 'Argentina', code: '+54', marketing: '5.4352', utility: '2.2874', auth: '2.2874', authIntl: '—' },
  { market: 'Brazil', code: '+55', marketing: '5.4970', utility: '0.5981', auth: '0.5981', authIntl: '—' },
  { market: 'Chile', code: '+56', marketing: '7.8162', utility: '1.7585', auth: '1.7585', authIntl: '—' },
  { market: 'Colombia', code: '+57', marketing: '1.0993', utility: '0.0706', auth: '0.0706', authIntl: '—' },
  { market: 'Egypt', code: '+20', marketing: '5.6629', utility: '0.3167', auth: '0.3167', authIntl: '5.7202' },
  { market: 'France', code: '+33', marketing: '7.5588', utility: '2.6393', auth: '2.6393', authIntl: '—' },
  { market: 'Germany', code: '+49', marketing: '12.0088', utility: '4.8386', auth: '4.8386', authIntl: '—' },
  { market: 'Hong Kong', code: '+852', marketing: '6.4397', utility: '2.2867', auth: '2.2867', authIntl: '—' },
  { market: 'Hungary', code: '+36', marketing: '7.5596', utility: '3.0700', auth: '3.0700', authIntl: '—' },
  { market: 'Indonesia', code: '+62', marketing: '3.6133', utility: '2.1979', auth: '2.1979', authIntl: '11.9566' },
  { market: 'Israel', code: '+972', marketing: '3.1045', utility: '0.4662', auth: '0.4662', authIntl: '—' },
  { market: 'Italy', code: '+39', marketing: '6.9847', utility: '2.6369', auth: '2.6369', authIntl: '—' },
  { market: 'Malaysia', code: '+60', marketing: '7.5644', utility: '1.2314', auth: '1.2314', authIntl: '3.6767' },
  { market: 'Mexico', code: '+52', marketing: '2.6828', utility: '0.7471', auth: '0.7471', authIntl: '—' },
  { market: 'Netherlands', code: '+31', marketing: '14.0494', utility: '4.3987', auth: '4.3987', authIntl: '—' },
  { market: 'Nigeria', code: '+234', marketing: '4.5421', utility: '0.5898', auth: '0.5898', authIntl: '6.6042' },
  { market: 'Pakistan', code: '+92', marketing: '4.1620', utility: '0.8800', auth: '0.8800', authIntl: '6.6042' },
  { market: 'Peru', code: '+51', marketing: '6.1843', utility: '1.7594', auth: '1.7594', authIntl: '—' },
  { market: 'Poland', code: '+48', marketing: '3.2105', utility: '1.0702', auth: '1.0702', authIntl: '—' },
  { market: 'Qatar', code: '+974', marketing: '2.9992', utility: '1.0547', auth: '1.0547', authIntl: '—' },
  { market: 'Romania', code: '+40', marketing: '7.5596', utility: '2.5436', auth: '2.5436', authIntl: '—' },
  { market: 'Russia', code: '+7', marketing: '7.0520', utility: '3.5173', auth: '3.5173', authIntl: '—' },
  { market: 'Saudi Arabia', code: '+966', marketing: '4.3945', utility: '0.9401', auth: '0.9401', authIntl: '5.2645' },
  { market: 'Singapore', code: '+65', marketing: '6.4397', utility: '1.4072', auth: '1.4072', authIntl: '—' },
  { market: 'South Africa', code: '+27', marketing: '3.3385', utility: '0.6695', auth: '0.6695', authIntl: '1.7617' },
  { market: 'Spain', code: '+34', marketing: '6.2161', utility: '1.7578', auth: '1.7578', authIntl: '—' },
  { market: 'Turkey', code: '+90', marketing: '0.9587', utility: '0.0792', auth: '0.0792', authIntl: '—' },
  { market: 'United Arab Emirates', code: '+971', marketing: '4.3936', utility: '1.3811', auth: '1.3811', authIntl: '4.4810' },
  { market: 'United Kingdom', code: '+44', marketing: '5.5795', utility: '1.9346', auth: '1.9346', authIntl: '—' },
  { market: 'North America', code: 'Region', marketing: '2.1976', utility: '0.2989', auth: '0.2989', authIntl: '—' },
  { market: 'Rest of Africa', code: 'Region', marketing: '1.9796', utility: '0.3516', auth: '0.3516', authIntl: '—' },
  { market: 'Rest of Asia Pacific', code: 'Region', marketing: '6.7778', utility: '1.0460', auth: '1.0460', authIntl: '—' },
  { market: 'Rest of Central & Eastern Europe', code: 'Region', marketing: '7.5596', utility: '1.8595', auth: '1.8595', authIntl: '—' },
  { market: 'Rest of Latin America', code: 'Region', marketing: '6.5048', utility: '0.9934', auth: '0.9934', authIntl: '—' },
  { market: 'Rest of Middle East', code: 'Region', marketing: '2.9992', utility: '0.7998', auth: '0.7998', authIntl: '—' },
  { market: 'Rest of Western Europe', code: 'Region', marketing: '5.2054', utility: '1.5019', auth: '1.5019', authIntl: '—' },
  { market: 'Other', code: 'Default', marketing: '5.3098', utility: '0.6769', auth: '0.6769', authIntl: '—' },
];

export const terminology = [
  { title: 'Customer service window', body: 'When a customer messages you, a 24-hour window opens and resets with each new message. Inside it you can reply freely with any message, and utility templates sent in the window aren’t charged.' },
  { title: 'Service messages', body: 'All customer-initiated messages — support, chatbot replies and questions. Service conversations are free for every business on BigBrosAI.' },
  { title: 'Marketing messages', body: 'Promotions, offers and product updates. Charged per delivered message at Meta’s rate for the customer’s country.' },
  { title: 'Utility messages', body: 'Transactional updates like delivery status, receipts and reminders. Charged per delivered message, and free inside a service window.' },
  { title: 'Authentication messages', body: 'One-time passwords for sign-up, login and account recovery. Charged per delivered message.' },
];

export const pricingFaqs = [
  { q: 'Is there a free plan?', a: 'Yes. The Starter plan is free and every new account gets a ₹50 signup bonus to get started.' },
  { q: 'Do emails cost extra?', a: 'Every organisation gets 300 transactional emails per day free — no credit card, no expiry. Beyond that it’s ₹0.125 per email.' },
  { q: 'Are WhatsApp message charges included?', a: 'Platform fees are included in your plan. WhatsApp message charges are billed separately at Meta’s rates — see the country-wise table above.' },
  { q: 'Can I change plans anytime?', a: 'Yes. Upgrades take effect immediately; downgrades apply from the next billing cycle.' },
  { q: 'How does annual billing work?', a: 'Pay yearly and save 10% on Basic and Pro.' },
  { q: 'Do you offer refunds?', a: 'Refunds may be issued after a review of the request. See the refund policy for details.' },
];

export function planPrice(p: Plan, annual: boolean) {
  if (p.monthly === null) return null;
  if (p.monthly === 0) return 0;
  return annual ? Math.round(p.monthly * (1 - ANNUAL_DISCOUNT)) : p.monthly;
}

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
