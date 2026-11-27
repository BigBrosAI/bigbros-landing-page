import type { LucideIcon } from 'lucide-react';
import { Bot, Inbox, Mail, Megaphone, ShoppingBag } from 'lucide-react';
import type { BrandSlug } from '@/components/landing/brand-icon';
/*
 * "BigBrosAI vs X" comparison pages.
 *
 * Competitor details are copied from each vendor's public pricing page on the date in
 * `checkedOn`. Prices change: re-check `sourceUrl` before editing, and keep every claim
 * factual and neutral. Anything not stated on their page is shown as "Not listed".
 * BigBrosAI details mirror lib/plans.ts and lib/catalog.ts.
 */

export type CompareRow = { label: string; us: string; them: string };

export type Competitor = {
  slug: string;
  name: string;
  sourceUrl: string;
  checkedOn: string;
  seo: { title: string; description: string };
  intro: string;
  /** Longer written comparison shown after the table. */
  overview: string[];
  rows: CompareRow[];
  reasons: { title: string; body: string }[];
  /** Where the competitor may suit a team better. Keeps the page honest and credible. */
  theirStrengths: string[];
  /** Integrations listed on the vendor's own site (`integrationsUrl`). */
  integrations: string[];
  integrationsUrl: string;
  /** First-year platform fee on the entry plan, platform fee only. Omit when the vendor doesn't list one. */
  yearCost?: { plan: string; amount: number; basis: string };
  bestFor: { us: string; them: string };
  faqs: { q: string; a: string }[];
};

const CHECKED = '27 November 2026';

/** BigBrosAI's side of every table, from lib/plans.ts. */
export const us = {
  freePlan: 'Yes, Starter is free forever',
  entry: '₹999/month (Basic, monthly billing)',
  chatbot: 'Add-on: 5 flows for ₹2,199, extra slots ₹250',
  seats: '1 owner + 4 agents on Basic',
  extraSeats: '₹99 per user per month',
  marketing: '₹0.9999 per message',
  service: 'Free, unlimited',
  email: '300 free emails a day, built in',
};

/** BigBrosAI's first-year platform fee on Basic, billed yearly (lib/plans.ts annualInr). */
export const usYearCost = { plan: 'Basic, billed yearly', amount: 10789 };

/** Integrations BigBrosAI supports today (lib/catalog.ts). */
export const usIntegrations = ['Shopify', 'WooCommerce', 'Google Sheets', 'Meta Ads (Click-to-WhatsApp, Conversions API)', 'WhatsApp Pay', 'Razorpay', 'PayU', 'Zaakpay', 'REST API', 'Webhooks'];

/** What every BigBrosAI account can use, grouped. Mirrors lib/plans.ts and lib/catalog.ts. */
export const usFeatures: { group: string; icon?: LucideIcon; brand?: BrandSlug; items: string[] }[] = [
  { group: 'WhatsApp messaging', brand: 'whatsapp', items: ['Official WhatsApp Business API, free to start', 'Marketing, utility and authentication templates', 'Buttons, lists, media and catalogue messages', 'Up to 5,000 messages a minute on Pro'] },
  { group: 'Campaigns', icon: Megaphone, items: ['Broadcasts and retargeting', 'Smart audience segments and tags', 'CSV campaign scheduler (Pro)', 'Delivery, read and click reports'] },
  { group: 'Automation & AI', icon: Bot, items: ['No-code flow builder', 'Build or edit a flow from a plain-English prompt', 'AI chatbot that answers from your FAQs, PDFs or website', 'AI routing when customers don’t type a keyword'] },
  { group: 'Team inbox', icon: Inbox, items: ['Shared live chat for your team', '1 owner + 4 agents on Basic and Pro', 'Extra agents at ₹99 per user per month', 'Human handoff from any flow'] },
  { group: 'Sell & grow', icon: ShoppingBag, items: ['WhatsApp Pay and payment links', 'Click-to-WhatsApp ads with Conversions API', 'WhatsApp Forms inside the chat', 'Shopify and WooCommerce order messages'] },
  { group: 'Email', icon: Mail, items: ['300 free transactional emails a day', '₹0.125 per email after that', 'DKIM, SPF and DMARC authentication', 'Webhooks and attachments'] },
];

/** How to move to BigBrosAI. Kept general: number migration is handled with the customer on a call. */
export const switchSteps = [
  { title: 'Create a free account', body: 'Sign up on the Starter plan. You get a ₹50 signup bonus and 300 free emails a day.' },
  { title: 'Move or connect your number', body: 'Meta lets a WhatsApp Business number move between providers. Book a switch call and we’ll walk you through it, or start with a new number.' },
  { title: 'Rebuild flows in minutes', body: 'Describe each chatbot in plain words and the AI flow builder creates an editable flow, with trigger keywords ready.' },
  { title: 'Bring your contacts and go live', body: 'Upload your contacts, recreate your templates and switch your flows live. Test on up to three numbers first.' },
];

export const competitors: Competitor[] = [
  {
    slug: 'wati-alternative',
    name: 'Wati',
    sourceUrl: 'https://www.wati.io/pricing/',
    checkedOn: CHECKED,
    seo: {
      title: 'Wati Alternative: BigBrosAI vs Wati Pricing & Features (2026)',
      description:
        'Comparing Wati and BigBrosAI for the WhatsApp Business API in India: free plan, monthly price, team seats, chatbots and message rates, side by side.',
    },
    intro:
      'Wati is a popular WhatsApp Business API platform. If you want a free plan to start on, monthly billing and more seats on the entry plan, BigBrosAI is worth a look.',
    overview: [
      'Wati and BigBrosAI both give businesses the official WhatsApp Business API with a team inbox, broadcasts and chatbots. Both run on Meta’s platform, so message delivery, template approval and WhatsApp’s rules are the same on either. The real differences are in how you pay, how many people you can add and what is bundled.',
      'Wati has no free plan; you start with a 7-day trial and its Growth plan is listed at ₹2,699 a month billed quarterly, with 3 users and chatbots included. BigBrosAI lets you start free on the Starter plan, and its Basic plan is ₹999 a month, billed monthly, with an owner and 4 agents. Chatbot flows on BigBrosAI are a separate add-on, so if you need several bots from day one, add that to your comparison.',
      'For a small business testing WhatsApp, or a team of four or five that mostly needs broadcasts and a shared inbox, BigBrosAI usually costs less to run. If you need deep CRM integrations like HubSpot or Salesforce today, Wati’s larger catalogue may matter more than price.',
    ],
    rows: [
      { label: 'Free plan', us: us.freePlan, them: 'No, 7-day free trial' },
      { label: 'Entry paid plan', us: us.entry, them: '₹2,699/month (Growth, billed quarterly)' },
      { label: 'Team seats on entry plan', us: us.seats, them: '3 users on Growth' },
      { label: 'Extra seats', us: us.extraSeats, them: 'Not available on Growth; ₹1,299/user/month on Pro' },
      { label: 'Chatbots', us: us.chatbot, them: 'Included on Growth, 1,000 automation triggers/month' },
      { label: 'Marketing message, India', us: us.marketing, them: 'Not listed on pricing page' },
      { label: 'Service conversations', us: us.service, them: 'Not listed on pricing page' },
      { label: 'Transactional email', us: us.email, them: 'Not listed' },
    ],
    reasons: [
      { title: 'Start free, pay when it works', body: 'Get the WhatsApp Business API, live chat and templates on the free Starter plan. Upgrade only once WhatsApp is bringing in business.' },
      { title: 'Lower entry price, billed monthly', body: 'Basic is ₹999 a month with no quarterly commitment, and yearly billing saves 10%.' },
      { title: 'Room for your whole team', body: 'Basic includes an owner and 4 agents, and extra agents are ₹99 a month each.' },
    ],
    theirStrengths: [
      'Chatbots and automation triggers are included on Wati’s entry plan, while on BigBrosAI chatbot flows are a paid add-on.',
      'Wati offers a Shopify add-on and higher tiers with advanced workflows for large teams.',
      'Wati lists a larger integration catalogue, including HubSpot, Salesforce, Zoho and Zapier (which connects to 1,000+ apps). BigBrosAI connects to Shopify, WooCommerce, Google Sheets, Meta and payments today, plus a REST API and webhooks.',
    ],
    integrations: ['Shopify', 'WooCommerce', 'WhatsApp Shop', 'Google Sheets', 'HubSpot', 'Salesforce', 'Zoho', 'Klaviyo', 'Twilio', 'Razorpay', 'Stripe', 'PayPal', 'Google Workspace', 'Zapier', 'Pabbly', 'Zoho Flow', 'Make'],
    integrationsUrl: 'https://www.wati.io/integrations/',
    yearCost: { plan: 'Growth, billed quarterly', amount: 2699 * 12, basis: '₹2,699/month listed price × 12' },
    bestFor: { us: 'Small and growing teams that want a free plan, monthly billing and room for 5 people without a big platform fee.', them: 'Teams that want chatbots bundled into the base plan and need CRM integrations like HubSpot or Salesforce.' },
    faqs: [
      { q: 'Is BigBrosAI cheaper than Wati?', a: 'On the plans listed publicly, yes for getting started: BigBrosAI has a free plan and Basic is ₹999 a month, while Wati’s Growth plan is listed at ₹2,699 a month billed quarterly. Add chatbot flows and WhatsApp message charges to compare your full monthly cost.' },
      { q: 'Can I move my WhatsApp number from Wati?', a: 'Meta allows a WhatsApp Business number to move between providers. Book a call and our team will walk you through it.' },
      { q: 'Do both use the official WhatsApp Business API?', a: 'Yes. Both platforms run on Meta’s official WhatsApp Business Platform.' },
    ],
  },
  {
    slug: 'interakt-alternative',
    name: 'Interakt',
    sourceUrl: 'https://www.interakt.shop/pricing/',
    checkedOn: CHECKED,
    seo: {
      title: 'Interakt Alternative: BigBrosAI vs Interakt Pricing (2026)',
      description:
        'Comparing Interakt and BigBrosAI for WhatsApp marketing in India: free plan, monthly plan price, chatbots, team seats and per-message rates.',
    },
    intro:
      'Interakt is a WhatsApp platform used by many Indian businesses. If you want to start free and keep your monthly platform fee low, here is how BigBrosAI compares.',
    overview: [
      'Interakt is one of the best-known WhatsApp platforms for Indian small businesses, especially online stores. BigBrosAI covers the same core: the official WhatsApp Business API, campaigns, a shared inbox, chatbot flows and store integrations like Shopify and WooCommerce.',
      'The main trade-off is platform fee versus message rate. Interakt doesn’t list a free plan, and its Growth plan is ₹2,799 a month plus taxes. BigBrosAI starts free and its paid plans are ₹999 and ₹2,199 a month. On the other hand, Interakt lists a slightly lower marketing message rate (₹0.949 to ₹0.958 against BigBrosAI’s ₹0.9999).',
      'In practice, the platform fee matters more for most small and mid-size senders: at 20,000 marketing messages a month, a 4 to 5 paise difference adds up to about ₹800 to ₹1,000, while the plan fee difference on Interakt’s Growth plan is about ₹1,800 a month. Very high-volume senders should run their own numbers with the pricing calculator.',
    ],
    rows: [
      { label: 'Free plan', us: us.freePlan, them: 'None listed' },
      { label: 'Entry plan with WhatsApp chatbots', us: '₹999/month (Basic) + flow add-on', them: '₹2,799/month + taxes (Growth)' },
      { label: 'Branching chatbots', us: us.chatbot, them: 'Advanced plan, ₹3,799/month + taxes' },
      { label: 'Team seats on entry plan', us: us.seats, them: 'Not listed for Growth' },
      { label: 'Marketing message, India', us: us.marketing, them: '₹0.958 (Growth), ₹0.949 (Advanced)' },
      { label: 'AI agents', us: 'AI replies inside chatbot flows', them: 'Add-on, ₹3,000 on Growth and Advanced' },
      { label: 'Transactional email', us: us.email, them: 'Not listed' },
    ],
    reasons: [
      { title: 'A free plan to start on', body: 'Connect the WhatsApp Business API, reply to customers and build templates without paying a platform fee.' },
      { title: 'A smaller monthly fee', body: 'Basic is ₹999 a month and Pro is ₹2,199, both below Interakt’s listed Growth plan.' },
      { title: 'Email included', body: 'Every account gets 300 free transactional emails a day alongside WhatsApp.' },
    ],
    theirStrengths: [
      'Interakt lists a slightly lower marketing message rate (₹0.949 to ₹0.958, against our ₹0.9999). If you send very large broadcasts, check which total works out lower.',
      'Interakt also sells a Sales CRM plan and an Instagram-only plan.',
      'Interakt lists a wide integration catalogue, including Zoho, Freshworks, Salesforce, TallyPrime and Zapier.',
    ],
    integrations: ['Shopify', 'WooCommerce', 'Google Sheets', 'TallyPrime', 'Razorpay', 'PayU', 'WhatsApp Pay', 'Stripe', 'Zoho CRM', 'Zoho Books', 'Freshworks CRM', 'Freshdesk', 'Salesforce', 'CleverTap', 'WebEngage', 'Zapier', 'Make', 'Facebook Lead Forms', 'Pickrr'],
    integrationsUrl: 'https://www.interakt.shop/integrations/',
    yearCost: { plan: 'Growth, monthly', amount: 2799 * 12, basis: '₹2,799/month + taxes × 12' },
    bestFor: { us: 'Businesses that want to start free and keep the monthly platform fee low, with email included.', them: 'High-volume senders where a slightly lower per-message rate outweighs the platform fee, and teams that rely on Zoho or Freshworks.' },
    faqs: [
      { q: 'Which is cheaper, Interakt or BigBrosAI?', a: 'BigBrosAI has the lower platform fee (free, ₹999 or ₹2,199 a month). Interakt lists a slightly lower per-message marketing rate. For most small and mid-size senders the lower platform fee matters more, but run your own numbers with our pricing calculator.' },
      { q: 'Can I move my WhatsApp number from Interakt?', a: 'Meta allows a WhatsApp Business number to move between providers. Book a call and our team will walk you through it.' },
      { q: 'Does BigBrosAI support chatbots with branching?', a: 'Yes. The flow builder supports buttons, list menus, questions, conditions, tags, team notifications, AI replies and human handoff.' },
    ],
  },
  {
    slug: 'aisensy-alternative',
    name: 'AiSensy',
    sourceUrl: 'https://aisensy.com/pricing',
    checkedOn: CHECKED,
    seo: {
      title: 'AiSensy Alternative: BigBrosAI vs AiSensy (2026)',
      description:
        'Comparing AiSensy and BigBrosAI for the WhatsApp Business API: free plans, chatbot builder pricing, AI, team seats and per-message rates in India.',
    },
    intro:
      'AiSensy and BigBrosAI both offer a free plan. The difference is in what the chatbot builder costs, the message rate and what comes with the platform.',
    overview: [
      'AiSensy and BigBrosAI are the two platforms in this list that both offer a free plan, which makes the comparison closer. Both give you the official WhatsApp Business API, broadcasts and a team inbox without paying a platform fee to start.',
      'The differences show up as you grow. On AiSensy, the drag-and-drop chatbot builder is an add-on at ₹2,500 a month for 5 chatbots, and an AI agent builder is another ₹1,350 a month. On BigBrosAI, a pack of 5 chatbot flows is ₹2,199, and AI replies are a block you can add to any flow, answering from your FAQs, PDFs or website. AiSensy lists marketing messages to India at ₹1.09; BigBrosAI lists ₹0.9999.',
      'BigBrosAI also includes 300 free transactional emails a day, which is useful for receipts, OTPs and updates that should also land in an inbox. If your team needs unlimited users or uses tools like LeadSquared and CleverTap, AiSensy’s plans and integrations may suit you better.',
    ],
    rows: [
      { label: 'Free plan', us: us.freePlan, them: 'Yes, Free Forever plan' },
      { label: 'Chatbot builder', us: us.chatbot, them: 'Add-on, ₹2,500/month (5 chatbots)' },
      { label: 'AI chatbot', us: 'AI replies inside chatbot flows', them: 'AI Agent add-on, ₹1,350/month (1,000 AI messages)' },
      { label: 'Marketing message, India', us: us.marketing, them: '₹1.09 per message' },
      { label: 'Utility & authentication, India', us: '₹0.145 per message', them: '₹0.145 per message' },
      { label: 'Transactional email', us: us.email, them: 'Not listed' },
    ],
    reasons: [
      { title: 'A lower listed marketing rate', body: 'Marketing messages to Indian numbers are listed at ₹0.9999 on BigBrosAI and ₹1.09 on AiSensy’s pricing page. Check both on the same tax basis for your volume.' },
      { title: 'AI built into your flows', body: 'Add an AI Chatbot block to any flow to answer from your own FAQs, PDFs or website, and hand over to a person when it can’t.' },
      { title: 'WhatsApp and email together', body: 'Send receipts, OTPs and updates by email too, with 300 free emails a day.' },
    ],
    theirStrengths: [
      'AiSensy offers a plan with unlimited users, which suits large support teams.',
      'AiSensy sells a dedicated AI Agent builder as a separate add-on.',
      'AiSensy lists integrations BigBrosAI doesn’t have yet, such as LeadSquared, CleverTap and Zapier.',
    ],
    integrations: ['Shopify', 'WooCommerce', 'OpenCart', 'Razorpay', 'PayU', 'CleverTap', 'WebEngage', 'LeadSquared', 'Zapier', 'Pabbly Connect', 'Integrately', 'viaSocket', 'API integration'],
    integrationsUrl: 'https://aisensy.com/integrations',
    bestFor: { us: 'Teams that want AI replies built into their chatbot flows, transactional email in the same place and a lower listed marketing rate.', them: 'Large support teams that need unlimited users, and teams that use LeadSquared or Zapier heavily.' },
    faqs: [
      { q: 'Is BigBrosAI cheaper than AiSensy?', a: 'Both have free plans. BigBrosAI lists a lower marketing message rate for India (₹0.9999 against ₹1.09) and builds AI replies into its chatbot flows. Compare your full monthly cost with our pricing calculator.' },
      { q: 'Can I move my WhatsApp number from AiSensy?', a: 'Meta allows a WhatsApp Business number to move between providers. Book a call and our team will walk you through it.' },
      { q: 'Do I keep my approved templates?', a: 'Templates are approved per WhatsApp Business account. Our team will help you check what carries over and resubmit anything that needs it.' },
    ],
  },
  {
    slug: 'gallabox-alternative',
    name: 'Gallabox',
    sourceUrl: 'https://www.gallabox.com/pricing',
    checkedOn: CHECKED,
    seo: {
      title: 'Gallabox Alternative: BigBrosAI vs Gallabox Pricing (2026)',
      description:
        'Comparing Gallabox and BigBrosAI for the WhatsApp Business API in India: free plan, plan prices, users, chatbot flows and integrations.',
    },
    intro:
      'Gallabox is a WhatsApp platform with chatbot flows on every paid plan. If you want a free plan and a lower monthly fee for a small team, here is how BigBrosAI compares.',
    overview: [
      'Gallabox is a WhatsApp platform aimed at growing sales and support teams, with chatbot flows included on every paid plan. BigBrosAI covers the same essentials and is built to be affordable for small teams getting started.',
      'Gallabox doesn’t list a free plan. Its Basic plan is ₹2,999 a month billed quarterly or ₹2,399 billed yearly, capped at 3 users, with 5 active chatbot flows. BigBrosAI starts free, and Basic is ₹999 a month for an owner and 4 agents, with extra agents at ₹99 a month. Chatbot flows on BigBrosAI are an add-on pack.',
      'If you have a team of five or more and mostly need an inbox, campaigns and a few bots, BigBrosAI usually costs less, especially as you add seats. Gallabox makes sense if you need many flows bundled in, or integrations with tools like Shiprocket, Zoho or HubSpot.',
    ],
    rows: [
      { label: 'Free plan', us: us.freePlan, them: 'No, free trial (length not listed)' },
      { label: 'Entry paid plan', us: us.entry, them: '₹2,999/month billed quarterly, or ₹2,399/month billed yearly (Basic)' },
      { label: 'Team seats on entry plan', us: us.seats, them: '3 users on Basic (hard cap)' },
      { label: 'Extra seats', us: us.extraSeats, them: '₹1,200/user/month on Essential, ₹1,500 on Advanced' },
      { label: 'Chatbots', us: us.chatbot, them: '5 active flows on Basic, 20 on Essential' },
      { label: 'Marketing message, India', us: us.marketing, them: 'Not listed on pricing page' },
      { label: 'Transactional email', us: us.email, them: 'Not listed' },
    ],
    reasons: [
      { title: 'A free plan to start on', body: 'Get the WhatsApp Business API, live chat and templates without a platform fee, and upgrade when you need campaigns.' },
      { title: 'Lower fee for a team of 5', body: 'Basic is ₹999 a month with an owner and 4 agents. Gallabox’s Basic plan is capped at 3 users.' },
      { title: 'Cheaper extra seats', body: 'Add agents for ₹99 a month each, against ₹1,200 or more listed by Gallabox.' },
    ],
    theirStrengths: [
      'Chatbot flows are included on every Gallabox paid plan, while on BigBrosAI they are a paid add-on.',
      'Gallabox lists a broad integration catalogue, including Shiprocket, Zoho, HubSpot, LeadSquared, Salesforce, Calendly and Zapier.',
    ],
    integrations: ['Shopify', 'Facebook Leads', 'Razorpay', 'Cashfree', 'Stripe', 'Shiprocket', 'Shipway', 'Zoho Books', 'Calendly', 'Zoho', 'LeadSquared', 'HubSpot', 'WebEngage', 'CleverTap', 'MoEngage', 'Pipedrive', 'Salesforce', 'Zapier', 'Pabbly Connect', 'Webhooks'],
    integrationsUrl: 'https://www.gallabox.com/pricing',
    yearCost: { plan: 'Basic, billed yearly', amount: 2399 * 12, basis: '₹2,399/month listed price × 12' },
    bestFor: {
      us: 'Small teams that want a free plan, 5 seats on a ₹999 plan and cheap extra agents.',
      them: 'Teams that need many chatbot flows bundled in and integrations with shipping tools or CRMs.',
    },
    faqs: [
      { q: 'Is BigBrosAI cheaper than Gallabox?', a: 'For small teams, yes on listed platform fees: BigBrosAI has a free plan and Basic is ₹999 a month for 5 seats, while Gallabox Basic is listed at ₹2,399 a month billed yearly for 3 users. Add chatbot flows and message charges to compare your full cost.' },
      { q: 'Can I move my WhatsApp number from Gallabox?', a: 'Meta allows a WhatsApp Business number to move between providers. Book a call and our team will walk you through it.' },
      { q: 'Does BigBrosAI have chatbot flows like Gallabox?', a: 'Yes. Build flows visually or from a plain-English prompt, with buttons, lists, questions, conditions, AI replies and human handoff.' },
    ],
  },
  {
    slug: 'doubletick-alternative',
    name: 'DoubleTick',
    sourceUrl: 'https://doubletick.io/pricing',
    checkedOn: CHECKED,
    seo: {
      title: 'DoubleTick Alternative: BigBrosAI vs DoubleTick Pricing (2026)',
      description:
        'Comparing DoubleTick and BigBrosAI for WhatsApp in India: free plan, plan prices, agents, chatbot builder and integrations, side by side.',
    },
    intro:
      'DoubleTick is a WhatsApp platform built around sales teams. If you want a free plan and a chatbot builder without moving to a ₹7,700 plan, BigBrosAI is worth comparing.',
    overview: [
      'DoubleTick focuses on sales teams using WhatsApp, with plans built around agents and AI agents. BigBrosAI is a broader messaging platform for small and growing businesses, with campaigns, chatbot flows, payments, store integrations and email in one place.',
      'DoubleTick lists no free plan. Its Starter plan is ₹3,000 a month (₹36,000 billed yearly plus GST) with 5 agents, but its Bot Studio chatbot builder starts on the Pro + AI plan at ₹7,700 a month. BigBrosAI starts free, and you can add chatbot flows to the ₹999 Basic plan.',
      'If you want automation without moving to a high plan, BigBrosAI is the more affordable path. If your team lives in IndiaMart, Tally or LeadSquared and needs many AI agents, DoubleTick’s integrations and AI tiers may be worth the higher price.',
    ],
    rows: [
      { label: 'Free plan', us: us.freePlan, them: 'No, 7-day trial on Pro + AI' },
      { label: 'Entry paid plan', us: us.entry, them: '₹3,000/month (Starter, ₹36,000 billed yearly + GST)' },
      { label: 'Team seats on entry plan', us: us.seats, them: '5 agents on Starter' },
      { label: 'Chatbot builder', us: us.chatbot, them: 'Bot Studio on Pro + AI (₹7,700/month); Starter has default bots only' },
      { label: 'Marketing message, India', us: us.marketing, them: 'Not listed on pricing page' },
      { label: 'Transactional email', us: us.email, them: 'Not listed' },
    ],
    reasons: [
      { title: 'Start free', body: 'BigBrosAI’s Starter plan is free forever. DoubleTick lists no free plan.' },
      { title: 'A flow builder on a ₹999 plan', body: 'Add chatbot flows to Basic instead of moving to a ₹7,700-a-month plan for a bot builder.' },
      { title: 'Store and sheet integrations built in', body: 'Connect Shopify, WooCommerce or Google Sheets and send WhatsApp messages from order events and row updates.' },
    ],
    theirStrengths: [
      'DoubleTick includes up to 10 AI agents on Pro + AI and up to 50 on Enterprise.',
      'DoubleTick lists add-on integrations BigBrosAI doesn’t have, including Zoho CRM, HubSpot, LeadSquared, Salesforce, Tally, IndiaMart and Zapier.',
    ],
    integrations: ['Shopify', 'WooCommerce', 'Google Sheets', 'Zoho CRM', 'HubSpot', 'Bitrix', 'LeadSquared', 'Salesforce', 'Tally', 'IndiaMart', 'Zapier', 'QuickSell', 'WhatsApp Pay'],
    integrationsUrl: 'https://doubletick.io/pricing',
    yearCost: { plan: 'Starter, billed yearly', amount: 36000, basis: '₹36,000 billed yearly + GST' },
    bestFor: {
      us: 'Businesses that want a free start, a chatbot builder on a low plan and email in the same place.',
      them: 'Sales-led teams that need many AI agents and CRM integrations such as IndiaMart, Tally or LeadSquared.',
    },
    faqs: [
      { q: 'Is BigBrosAI cheaper than DoubleTick?', a: 'On listed platform fees, yes: BigBrosAI has a free plan and Basic is ₹999 a month, while DoubleTick Starter is listed at ₹3,000 a month. DoubleTick’s Bot Studio starts on its ₹7,700 Pro + AI plan.' },
      { q: 'Can I move my WhatsApp number from DoubleTick?', a: 'Meta allows a WhatsApp Business number to move between providers. Book a call and our team will walk you through it.' },
      { q: 'Does BigBrosAI support Shopify?', a: 'Yes. Connect your Shopify store to send order confirmations, COD confirmations, shipping updates and abandoned cart reminders on WhatsApp.' },
    ],
  },
];

export const competitorBySlug: Record<string, Competitor> = Object.fromEntries(competitors.map((c) => [c.slug, c]));
