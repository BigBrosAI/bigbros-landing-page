import type { LucideIcon } from 'lucide-react';
import { BadgeCheck, BarChart3, Bot, CreditCard, FilePlus2, Filter, Fingerprint, Link2, Megaphone, ReceiptText, RefreshCw, ShoppingCart, Target, TrendingUp, Truck } from 'lucide-react';
import type { BrandSlug } from '@/components/landing/brand-icon';
/*
 * Detail pages for each integration (/integrations/[slug]).
 * Setup steps and message types mirror the dashboard (bbai-dashboard: integrations/*,
 * whatsapp-pay). Update both together if the product flow changes.
 */

export type IntegrationPage = {
  slug: string;
  name: string;
  brand: BrandSlug;
  category: string;
  seo: { title: string; description: string };
  hero: { title: string; subtitle: string };
  /** Longer explanation shown under the hero: why and how teams use it. */
  overview: string[];
  /** What you can send or do once connected. */
  capabilities: { icon?: LucideIcon; brand?: BrandSlug; title: string; body: string }[];
  /** How to connect, in the order the dashboard shows it. */
  steps: { title: string; body: string }[];
  goodToKnow: string[];
  faqs: { q: string; a: string }[];
  /** Related solution and product slugs. */
  solutions: string[];
  products: string[];
};

export const integrationPages: IntegrationPage[] = [
  {
    slug: 'shopify',
    name: 'Shopify',
    brand: 'shopify',
    category: 'E-commerce',
    seo: {
      title: 'Shopify WhatsApp Integration: Order Updates, COD & Cart Recovery',
      description:
        'Connect Shopify to BigBrosAI and send WhatsApp order confirmations, COD confirmations, shipping updates with tracking and abandoned cart reminders automatically.',
    },
    hero: {
      title: 'Shopify orders, updated on WhatsApp automatically.',
      subtitle:
        'Connect your store once. Every new order, cash-on-delivery order, shipment and abandoned checkout sends the right WhatsApp message on its own.',
    },
    overview: [
      'Most Shopify stores in India still confirm orders by email or SMS, and many customers never open either. WhatsApp is where they already chat, so an order update there gets read within minutes. Connecting Shopify to BigBrosAI turns your store’s order events into WhatsApp messages without anyone on your team pressing send.',
      'The four messages cover the moments that matter most after checkout. An order confirmation reassures the customer. A COD confirmation asks cash-on-delivery buyers to confirm before you ship, which helps cut fake orders and costly returns, and can nudge them to pay online instead. A shipping message shares the tracking link so fewer people message you asking where their parcel is. And an abandoned cart reminder brings back shoppers who left checkout without paying.',
      'Every message uses an approved WhatsApp template that you choose, with variables like the customer’s name, order number and amount filled in from Shopify. You can test each one with sample order data, switch them on one at a time, and stop everything with a single switch.',
    ],
    capabilities: [
      { icon: ReceiptText, title: 'Order confirmation', body: 'Sent when a customer places an order.' },
      { icon: BadgeCheck, title: 'COD confirmation', body: 'Sent instead of the order confirmation for cash-on-delivery orders. Ask the customer to confirm, or offer a discount to pay online.' },
      { icon: Truck, title: 'Order shipped', body: 'Sent when the order is fulfilled, with the tracking link.' },
      { icon: ShoppingCart, title: 'Abandoned cart reminder', body: 'Sent if a customer leaves checkout without paying, after a delay you choose.' },
    ],
    steps: [
      { title: 'Enter your store', body: 'Type your .myshopify.com address. You’ll find it in Shopify admin → Settings → Domains.' },
      { title: 'Create an app in Shopify', body: 'In the Shopify Dev Dashboard, create an app for your store, or open an existing custom app under Settings → Apps → Develop apps.' },
      { title: 'Allow order access', body: 'Give the app order access, and request customer name and phone under protected customer data, so BigBrosAI can message your customers.' },
      { title: 'Install and paste the keys', body: 'Install the app on your store and paste its credentials into BigBrosAI. We subscribe to order events and set up WhatsApp templates for each message.' },
    ],
    goodToKnow: [
      'Choose a WhatsApp template for each message and fill its variables with order details.',
      'Send a test with sample order data before switching a message on.',
      'See every message sent, the last order event and anything that needs attention on the integration page.',
      'Stop all order messages with one switch whenever you need to.',
    ],
    faqs: [
      { q: 'Do I need a developer to connect Shopify?', a: 'No. The setup is a few copy-and-paste steps in your Shopify admin, and the dashboard shows exactly where to find each value.' },
      { q: 'Which messages can I send?', a: 'Order confirmation, COD confirmation, order shipped with tracking, and abandoned cart reminders. Each one can be switched on or off separately.' },
      { q: 'Are these messages charged?', a: 'Order and shipping updates are usually utility messages, charged per message at Meta’s rate, and free inside an open customer service window. Cart reminders are usually marketing messages.' },
    ],
    solutions: ['ecommerce'],
    products: ['automation', 'whatsapp-broadcast'],
  },
  {
    slug: 'woocommerce',
    name: 'WooCommerce',
    brand: 'woocommerce',
    category: 'E-commerce',
    seo: {
      title: 'WooCommerce WhatsApp Integration: Order & COD Messages',
      description:
        'Connect your WooCommerce store to BigBrosAI and send WhatsApp order confirmations, COD confirmations, shipping updates and abandoned cart reminders.',
    },
    hero: {
      title: 'WooCommerce + WhatsApp, connected in a click.',
      subtitle: 'Approve BigBrosAI in your WordPress admin and your store starts sending order, COD and shipping messages on WhatsApp.',
    },
    overview: [
      'If your store runs on WordPress with WooCommerce, you can send the same WhatsApp order messages as larger platforms without installing extra plugins. BigBrosAI connects through WooCommerce’s built-in REST API, so setup takes a couple of minutes.',
      'Once connected, BigBrosAI creates the order webhooks for you. When an order is placed, confirmed as cash on delivery, shipped or abandoned at checkout, your store tells BigBrosAI and the matching WhatsApp template goes out to the customer.',
      'Because messages go out on the official WhatsApp Business API, they come from your verified business number, can include buttons and links, and show delivery and read status in your dashboard.',
    ],
    capabilities: [
      { icon: ReceiptText, title: 'Order confirmation', body: 'Sent when a customer places an order.' },
      { icon: BadgeCheck, title: 'COD confirmation', body: 'Ask cash-on-delivery customers to confirm before you ship, or offer a discount to pay online.' },
      { icon: Truck, title: 'Order shipped', body: 'Sent when the order is fulfilled, with the tracking link.' },
      { icon: ShoppingCart, title: 'Abandoned cart reminder', body: 'Bring back shoppers who leave checkout without paying.' },
    ],
    steps: [
      { title: 'Enter your site address', body: 'The address of your WordPress site, starting with https://.' },
      { title: 'Click Approve in WooCommerce', body: 'Log in to WordPress if asked. WooCommerce creates an API key for BigBrosAI.' },
      { title: 'Or paste keys yourself', body: 'Prefer manual setup? Go to WooCommerce → Settings → Advanced → REST API, create a key and paste the consumer key and secret.' },
      { title: 'Choose your messages', body: 'We create the order webhooks and set up WhatsApp templates for each message. Pick which ones to switch on.' },
    ],
    goodToKnow: [
      'WooCommerce shows the consumer secret only once, so copy it straight away if you set up keys manually.',
      'Send a test message with sample order data before going live.',
      'Recent messages and order events appear on the integration page.',
    ],
    faqs: [
      { q: 'Does it need a plugin?', a: 'No separate plugin is needed. BigBrosAI connects through WooCommerce’s built-in REST API and webhooks.' },
      { q: 'Can I use my own templates?', a: 'Yes. Choose any approved WhatsApp template for each message and fill its variables with order details.' },
      { q: 'What if my store is on a staging site?', a: 'Connect the live store address you want customers to receive messages from. You can disconnect and reconnect at any time.' },
    ],
    solutions: ['ecommerce'],
    products: ['automation', 'whatsapp-payments'],
  },
  {
    slug: 'google-sheets',
    name: 'Google Sheets',
    brand: 'googlesheets',
    category: 'Data',
    seo: {
      title: 'Google Sheets to WhatsApp: Send Messages When Rows Change',
      description:
        'Connect Google Sheets to BigBrosAI and send WhatsApp template messages automatically when a row is added or a column changes. Set up in about 2 minutes.',
    },
    hero: {
      title: 'Turn your sheet into WhatsApp messages.',
      subtitle:
        'Add a row or change a status in Google Sheets, and BigBrosAI sends the right WhatsApp template to that customer. No code, set up in about 2 minutes.',
    },
    overview: [
      'A lot of businesses run on a spreadsheet: leads from a website form, admissions, bookings, orders, service requests. The Google Sheets integration lets that sheet send WhatsApp messages by itself, so the moment a row is added or a status changes, the customer hears from you.',
      'You set it up with simple rules. One rule can fire when a new row is added, for example sending a welcome message to every new lead. Another can fire when a column changes, for example sending an update when the Status column becomes “Shipped” or “Approved”. You pick the phone number column, the WhatsApp template and which columns fill its variables.',
      'It works with anything that writes to a sheet, including Google Forms, website form plugins and other tools that export rows. Your team keeps working in the sheet they already know, and BigBrosAI handles the messages.',
    ],
    capabilities: [
      { icon: FilePlus2, title: 'When a row is added', body: 'Send a welcome, booking or order message as soon as a new row appears, for example from a form.' },
      { icon: RefreshCw, title: 'When a column changes', body: 'Send an update when a status column changes, like “Shipped”, “Approved” or “Ready for pickup”.' },
      { icon: Filter, title: 'Only for certain values', body: 'Limit a rule to one value, so a message goes out only when the status becomes exactly what you choose.' },
      { icon: Fingerprint, title: 'One message per row', body: 'Pick a unique ID column, like Order ID, so each row gets one message even if you sort or move rows.' },
    ],
    steps: [
      { title: 'Add a sheet', body: 'Pick the sheet in BigBrosAI. We only get access to the sheets you pick, nothing else in your Drive.' },
      { title: 'Run the setup script', body: 'We create a private script for it. In the sheet, open Extensions → Apps Script and run setupBigBrosAI.' },
      { title: 'Allow access and check', body: 'Allow access on the first run, then check the sheet shows “Connected to BigBrosAI”.' },
      { title: 'Add a rule', body: 'Pick when to send, the phone number column and an approved WhatsApp template, then turn the rule on.' },
    ],
    goodToKnow: [
      'Each sheet can have one “row added” rule and one “column changes” rule.',
      'Phone numbers can include the country code, or be 10-digit Indian numbers.',
      'The script is your own and only reads your sheet. If it leaks, generate a new one; your rules are kept.',
      'The number of sheets you can connect depends on your plan.',
    ],
    faqs: [
      { q: 'Do I need to know Apps Script?', a: 'No. BigBrosAI writes the script for you. You only open Apps Script from the sheet and click Run once.' },
      { q: 'Can I use it with Google Forms?', a: 'Yes. Forms that save responses to a sheet add a new row for each response, which can trigger a “row added” message.' },
      { q: 'Is my data safe?', a: 'BigBrosAI only gets access to the sheets you pick. The script only reads that sheet and sends row updates to BigBrosAI.' },
    ],
    solutions: ['coaching-institutes', 'real-estate'],
    products: ['automation', 'whatsapp-broadcast'],
  },
  {
    slug: 'whatsapp-pay',
    name: 'WhatsApp Pay',
    brand: 'whatsapp',
    category: 'Payments',
    seo: {
      title: 'WhatsApp Pay for Business: Collect UPI Payments in Chat',
      description:
        'Collect UPI payments inside WhatsApp with BigBrosAI. Link Razorpay, PayU, Zaakpay or a UPI ID, send order messages with payment and track every transaction.',
    },
    hero: {
      title: 'Get paid without leaving the chat.',
      subtitle: 'Send an order on WhatsApp and let customers pay by UPI right there, with a payment link fallback when native payment isn’t available.',
    },
    overview: [
      'Every extra step between “I want this” and “I’ve paid” loses customers. WhatsApp Pay removes those steps: you send the order in the chat, and the customer pays by UPI without leaving WhatsApp.',
      'BigBrosAI connects WhatsApp Pay to the payment provider you already use, Razorpay, PayU or Zaakpay, or directly to a UPI ID. Payments settle to your account as usual, and each transaction appears in the BigBrosAI dashboard with its status, so you can see what was paid and follow up on what wasn’t.',
      'It pairs well with chatbot flows and WhatsApp Forms: collect what the customer wants and where to deliver it, then send the payment request in the same conversation. If native WhatsApp Pay isn’t available for a customer, a payment link fallback makes sure they can still pay.',
    ],
    capabilities: [
      { brand: 'whatsapp', title: 'Pay inside WhatsApp', body: 'Customers review the order and pay by UPI without opening another app or website.' },
      { icon: CreditCard, title: 'Your payment provider', body: 'Link Razorpay, PayU, Zaakpay or a UPI ID as the payment configuration.' },
      { icon: Link2, title: 'Payment link fallback', body: 'Use a payment link when native WhatsApp Pay is unavailable for a customer or transaction.' },
      { icon: BarChart3, title: 'Transactions dashboard', body: 'See every payment, search by order or phone, and track your success rate.' },
    ],
    steps: [
      { title: 'Connect your WhatsApp Business account', body: 'WhatsApp Pay works on the official WhatsApp Business API account you connect to BigBrosAI.' },
      { title: 'Link your payment provider', body: 'Choose Razorpay, PayU, Zaakpay or a UPI ID.' },
      { title: 'Create a payment configuration', body: 'Name it, add your merchant details and set it as the default.' },
      { title: 'Start collecting', body: 'Share order messages with payment in templates and flows, and watch transactions arrive.' },
    ],
    goodToKnow: [
      'Collect order details first with a WhatsApp Flow, then send the payment request.',
      'New payment configurations are activated after Meta’s testing.',
      'WhatsApp Pay is for payments in India in INR.',
    ],
    faqs: [
      { q: 'Which payment providers are supported?', a: 'Razorpay, PayU and Zaakpay, or a UPI ID.' },
      { q: 'What if a customer can’t pay inside WhatsApp?', a: 'Turn on payment link fallback and they’ll get a link to pay instead.' },
      { q: 'Does it work with Shopify?', a: 'Use Shopify for order messages and WhatsApp Pay for orders you take in chat. Ask our team about combining them for your store.' },
    ],
    solutions: ['ecommerce', 'restaurants', 'coaching-institutes'],
    products: ['whatsapp-payments', 'whatsapp-forms'],
  },
  {
    slug: 'razorpay',
    name: 'Razorpay',
    brand: 'razorpay',
    category: 'Payments',
    seo: {
      title: 'Razorpay WhatsApp Integration: Payment Links & WhatsApp Pay',
      description: 'Use Razorpay with BigBrosAI to send payment links on WhatsApp, collect UPI payments in chat with WhatsApp Pay and confirm orders automatically.',
    },
    hero: {
      title: 'Razorpay payments, collected on WhatsApp.',
      subtitle: 'Use your Razorpay account to send payment links and power WhatsApp Pay, so customers can pay the moment they decide to buy.',
    },
    overview: [
      'Many Indian businesses already collect payments through Razorpay. With BigBrosAI you can use that same account to get paid on WhatsApp, either with payment links inside messages or as the provider behind WhatsApp Pay.',
      'Payment links work everywhere: drop one into a template message, a broadcast or a chatbot flow, and the customer pays on Razorpay’s checkout. With WhatsApp Pay, customers pay by UPI without leaving the chat, and Razorpay processes the payment.',
      'Either way, your money settles to your Razorpay account as usual, and BigBrosAI shows each transaction so your team knows which orders are paid.',
    ],
    capabilities: [
      { icon: Link2, title: 'Payment links in chat', body: 'Send a Razorpay payment link inside a template message or chatbot flow.' },
      { brand: 'whatsapp', title: 'Powers WhatsApp Pay', body: 'Set Razorpay as your WhatsApp Pay provider to collect UPI inside the chat.' },
      { icon: BadgeCheck, title: 'Automatic confirmations', body: 'Confirm the order on WhatsApp once the payment goes through.' },
      { icon: BarChart3, title: 'Track every payment', body: 'See transactions and success rate in the BigBrosAI dashboard.' },
    ],
    steps: [
      { title: 'Open WhatsApp Pay in BigBrosAI', body: 'Go to WhatsApp Pay and create a new payment configuration.' },
      { title: 'Choose Razorpay', body: 'Pick Razorpay as the payment provider and add your merchant details.' },
      { title: 'Set it as default', body: 'Make it the default configuration for your WhatsApp number.' },
      { title: 'Send your first payment request', body: 'Use it in a template or flow and test with a small order.' },
    ],
    goodToKnow: ['PayU and Zaakpay are also supported, as is a plain UPI ID.', 'New payment configurations are activated after Meta’s testing.'],
    faqs: [
      { q: 'Do I need a Razorpay account?', a: 'Yes. Use your existing Razorpay merchant account; payments settle to it as usual.' },
      { q: 'Can I use payment links without WhatsApp Pay?', a: 'Yes. Payment links work as a fallback for customers who can’t pay inside WhatsApp.' },
    ],
    solutions: ['ecommerce', 'coaching-institutes'],
    products: ['whatsapp-payments'],
  },
  {
    slug: 'meta-ads',
    name: 'Meta Ads',
    brand: 'meta',
    category: 'Advertising',
    seo: {
      title: 'Click-to-WhatsApp Ads with Conversions API | BigBrosAI',
      description:
        'Run Facebook and Instagram ads that open a WhatsApp chat, greet every lead with a chatbot and send conversion events back to Meta with the Conversions API.',
    },
    hero: {
      title: 'Ads that open a conversation.',
      subtitle:
        'Run Click-to-WhatsApp ads on Facebook and Instagram, greet every lead instantly with a flow and send conversions back to Meta to find better buyers.',
    },
    overview: [
      'Ads that send people to a website lose most of them on the landing page. Click-to-WhatsApp ads open a chat instead, which is where many Indian customers are most comfortable asking questions and buying.',
      'BigBrosAI makes those chats useful. The moment someone taps your ad, a chatbot flow greets them, asks a few qualifying questions and tags them by the ad they came from. Serious leads go straight to the right person in your shared inbox, with the full conversation.',
      'With the Conversions API, BigBrosAI sends conversion events back to Meta, such as a lead becoming qualified or a purchase. That helps Meta’s ad delivery find more people like your best customers, so your ad budget goes further over time.',
    ],
    capabilities: [
      { icon: Megaphone, title: 'Launch from the dashboard', body: 'Create Click-to-WhatsApp ads for Facebook and Instagram.' },
      { icon: Bot, title: 'Instant replies', body: 'Greet every lead with a chatbot flow, day or night.' },
      { icon: Target, title: 'Conversions API', body: 'Send conversion events back to Meta so it can find more leads like your best ones.' },
      { icon: TrendingUp, title: 'Ad-to-revenue tracking', body: 'See which ads produce conversations and conversions.' },
    ],
    steps: [
      { title: 'Connect Meta', body: 'Link your Facebook page, Instagram account and ad account.' },
      { title: 'Create the ad', body: 'Pick the audience, budget and the WhatsApp greeting.' },
      { title: 'Attach a flow', body: 'Choose the chatbot flow that qualifies each lead and tags them by ad and answers.' },
      { title: 'Convert in chat', body: 'Hot leads go to the right agent in the shared inbox.' },
    ],
    goodToKnow: ['Click-to-WhatsApp ads are available on Basic and above.', 'Conversations that start from these ads open a customer service window, so your replies are free inside it.'],
    faqs: [
      { q: 'Do I pay Meta separately for the ads?', a: 'Yes. Ad spend is billed by Meta to your ad account. BigBrosAI handles the chat, flows and tracking.' },
      { q: 'Can I see which ad a lead came from?', a: 'Yes. Leads are tagged by ad and campaign, so you can segment and report on them.' },
    ],
    solutions: ['real-estate', 'coaching-institutes'],
    products: ['click-to-whatsapp-ads', 'chatbot-builder'],
  },
];

export const integrationPageBySlug: Record<string, IntegrationPage> = Object.fromEntries(integrationPages.map((i) => [i.slug, i]));
