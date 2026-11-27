import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Bell,
  Bot,
  Braces,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileCheck2,
  Filter,
  GitBranch,
  Globe2,
  Inbox,
  KeyRound,
  Languages,
  LayoutTemplate,
  Link2,
  ListChecks,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  MousePointerClick,
  Paperclip,
  Radio,
  Repeat,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  StickyNote,
  Tags,
  Target,
  Timer,
  UserCheck,
  Users,
  Webhook,
  Workflow,
  Zap,
} from 'lucide-react';
import type { BrandSlug } from '@/components/landing/brand-icon';

/*
 * Single source of truth for products, channels and integrations.
 * Content mirrors the product line-up and claims on the existing bigbrosai.com.
 */

export type ProductVisual = 'phone' | 'inbox' | 'campaign' | 'flow' | 'api' | 'ads' | 'forms' | 'email' | 'journey' | 'analytics';
export type ProductGroup = 'Engage' | 'Automate' | 'Grow';

export type Product = {
  slug: string;
  name: string;
  short: string;
  group: ProductGroup;
  icon: LucideIcon;
  brand?: BrandSlug;
  badge?: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; subtitle: string; chips: string[] };
  visual: ProductVisual;
  features: { icon: LucideIcon; title: string; body: string }[];
  steps: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  plans: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

export const products: Product[] = [
  {
    slug: 'whatsapp-business-api',
    name: 'WhatsApp Business API',
    short: 'Free official API with templates, webhooks and green tick',
    group: 'Engage',
    icon: MessageCircle,
    brand: 'whatsapp',
    badge: 'Free',
    seo: {
      title: 'Free WhatsApp Business API Provider in India',
      description:
        'Get the official WhatsApp Business API free with BigBrosAI. Unlimited free service conversations, template messages, webhooks, green tick verification and a developer-friendly REST API.',
    },
    hero: {
      eyebrow: 'WhatsApp Business API',
      title: 'The official WhatsApp Business API — free to start.',
      subtitle:
        'Connect your number, get templates approved and start conversations from the dashboard or the REST API. Customer-initiated service conversations are always free.',
      chips: ['Unlimited free service conversations', '₹50 signup bonus', 'Green tick verification'],
    },
    visual: 'api',
    features: [
      { icon: UserCheck, title: 'Guided onboarding', body: 'Link your Meta business account and register a number in minutes — no paperwork back-and-forth.' },
      { icon: FileCheck2, title: 'Template messages', body: 'Create marketing, utility and authentication templates and track their approval status.' },
      { icon: MousePointerClick, title: 'Interactive messages', body: 'Buttons, lists, media, catalogues and CTAs that customers act on in one tap.' },
      { icon: Webhook, title: 'Real-time webhooks', body: 'Receive inbound messages plus sent, delivered, read and failed events as they happen.' },
      { icon: ShieldCheck, title: 'Green tick verification', body: 'Apply for the verified badge so customers know it’s really you.' },
      { icon: Zap, title: 'High throughput', body: 'Up to 2,400 messages per minute on Basic and 5,000 on Pro, with queueing and retries built in.' },
    ],
    steps: [
      { title: 'Sign up free', body: 'Create a workspace and get a ₹50 signup bonus to start messaging.' },
      { title: 'Connect your number', body: 'Link Meta Business Manager and register a new or existing number.' },
      { title: 'Send from anywhere', body: 'Use the dashboard, the REST API or automations to reach customers.' },
    ],
    useCases: [
      { title: 'Order & delivery updates', body: 'Trigger utility templates from your backend when orders are placed, shipped or delivered.' },
      { title: 'OTP & verification', body: 'Deliver authentication codes on the channel customers check most.' },
      { title: 'Support at scale', body: 'Route inbound chats into the shared inbox or your own helpdesk via webhooks.' },
    ],
    plans: 'Free on every plan',
    faqs: [
      { q: 'Is the WhatsApp Business API really free?', a: 'Yes. Access to the API is free on the Starter plan, and service conversations started by your customers are always free. Template messages you send are charged at Meta’s per-message rates.' },
      { q: 'Can I use my existing number?', a: 'Yes, as long as it is not active on the WhatsApp or WhatsApp Business app. You may need to delete it from the app first.' },
      { q: 'Do I need a Facebook Business Manager?', a: 'Yes, Meta requires one. Our onboarding walks you through creating or connecting it.' },
    ],
    related: ['whatsapp-broadcast', 'live-chat', 'chatbot-builder'],
  },
  {
    slug: 'whatsapp-broadcast',
    name: 'Broadcast & Retargeting',
    short: 'Campaigns to unlimited contacts, scheduled and tracked',
    group: 'Engage',
    icon: Radio,
    seo: {
      title: 'WhatsApp Broadcast & Bulk Messaging Software',
      description:
        'Broadcast approved WhatsApp templates to unlimited contacts. Segment, schedule up to two months ahead, retarget engaged users and track every delivery, read and click.',
    },
    hero: {
      eyebrow: 'Broadcast & Retargeting',
      title: 'Campaigns that land where customers actually read.',
      subtitle:
        'Send approved templates to your whole list in one click — or from a CSV or the API. Schedule ahead, segment by tags and retarget whoever clicked, read or ignored.',
      chips: ['No per-message markup', 'Schedule up to 2 months ahead', 'Approval workflow'],
    },
    visual: 'campaign',
    features: [
      { icon: Filter, title: 'Smart segmentation', body: 'Target audiences by tags, attributes and past engagement.' },
      { icon: CalendarClock, title: 'Scheduling', body: 'Plan campaigns up to two months ahead, or schedule bulk sends from a CSV.' },
      { icon: Repeat, title: 'Retargeting', body: 'Follow up with people who clicked, read or ignored — from the same dashboard.' },
      { icon: Sparkles, title: 'Personalisation', body: 'Fill names, order details and offers into every message with template variables.' },
      { icon: ShieldCheck, title: 'Approval workflow', body: 'Require a manager’s sign-off before any campaign goes out.' },
      { icon: BarChart3, title: 'Live reporting', body: 'Delivered, read, replied and clicked — per campaign, in real time.' },
    ],
    steps: [
      { title: 'Pick an audience', body: 'Choose a segment, upload a CSV or trigger from your system via API.' },
      { title: 'Choose a template', body: 'Use an approved template with media, buttons and variables.' },
      { title: 'Approve, send, measure', body: 'Get sign-off, send now or later, then watch results arrive.' },
    ],
    useCases: [
      { title: 'Sales & launches', body: 'Announce offers, drops and early access to opted-in customers.' },
      { title: 'Abandoned carts', body: 'Bring shoppers back with a reminder and a one-tap checkout link.' },
      { title: 'Re-engagement', body: 'Win back lapsed customers with personalised offers.' },
    ],
    plans: 'Basic and above · CSV scheduler on Pro',
    faqs: [
      { q: 'Do customers need to opt in?', a: 'Yes. WhatsApp requires opt-in for marketing messages. BigBrosAI records consent and honours opt-outs automatically.' },
      { q: 'How many campaigns can I run?', a: 'Basic includes up to 2 campaigns per day; Pro and Enterprise include unlimited campaigns.' },
      { q: 'Is there a markup on messages?', a: 'No. You pay the platform plan plus Meta’s per-message rates — see the country-wise rates on the pricing page.' },
    ],
    related: ['click-to-whatsapp-ads', 'analytics', 'automation'],
  },
  {
    slug: 'live-chat',
    name: 'Shared Team Inbox',
    short: 'Multi-agent live chat with routing, notes and tags',
    group: 'Engage',
    icon: Inbox,
    seo: {
      title: 'WhatsApp Shared Team Inbox & Live Chat',
      description:
        'Let your whole team reply from one WhatsApp number. Smart routing, agent assignment, internal notes, tags, quick replies and CSAT in one shared inbox.',
    },
    hero: {
      eyebrow: 'Shared Team Inbox',
      title: 'One WhatsApp number. Your whole team replying.',
      subtitle:
        'Every chat lands in a live inbox and is routed to the right agent automatically — with full history, tags and private notes beside it.',
      chips: ['1 owner + 4 agents included', 'Smart routing', 'AI-suggested replies'],
    },
    visual: 'inbox',
    features: [
      { icon: Users, title: 'Multi-agent', body: 'Many agents on one business number — no shared phones.' },
      { icon: GitBranch, title: 'Smart routing', body: 'Assign by team, keyword or round-robin, and hand chats between agents.' },
      { icon: StickyNote, title: 'Internal notes & @mentions', body: 'Discuss a conversation privately without the customer seeing.' },
      { icon: Tags, title: 'Tags & attributes', body: 'See contact details, tags and history next to every chat.' },
      { icon: Zap, title: 'Quick replies', body: 'Answer common questions in a click with saved responses.' },
      { icon: ListChecks, title: 'CSAT feedback', body: 'Collect satisfaction scores when a conversation is resolved.' },
    ],
    steps: [
      { title: 'Invite your team', body: 'Add agents and set roles and permissions.' },
      { title: 'Set routing rules', body: 'Decide which chats go to which team or agent.' },
      { title: 'Reply together', body: 'Work through conversations with full context and AI help.' },
    ],
    useCases: [
      { title: 'Customer support', body: 'Resolve queries faster with shared context and quick replies.' },
      { title: 'Inside sales', body: 'Follow up on campaign and ad leads in real time.' },
      { title: 'Operations', body: 'Coordinate bookings, deliveries and confirmations.' },
    ],
    plans: 'Live chat on every plan · shared inbox on Basic and above',
    faqs: [
      { q: 'How many agents are included?', a: 'Basic and Pro include 1 owner and 4 agents. Extra agents are ₹99 per user per month.' },
      { q: 'Can the chatbot and humans share the inbox?', a: 'Yes. The chatbot handles what it can and hands off to an agent in the same inbox, with the full history.' },
      { q: 'Can I see past conversations?', a: 'Yes. Each contact profile keeps the complete conversation history.' },
    ],
    related: ['chatbot-builder', 'whatsapp-business-api', 'analytics'],
  },
  {
    slug: 'chatbot-builder',
    name: 'AI Chatbot Builder',
    short: 'No-code flows with AI intent and live-agent handoff',
    group: 'Automate',
    icon: Bot,
    badge: 'AI',
    seo: {
      title: 'No-code AI WhatsApp Chatbot Builder',
      description:
        'Build AI-powered WhatsApp chatbots with a drag-and-drop flow builder. Qualify leads, answer FAQs, share catalogues and hand off to a live agent — 24/7.',
    },
    hero: {
      eyebrow: 'AI Chatbot Builder',
      title: 'Automate the repetitive chats. Keep the human ones.',
      subtitle:
        'Drag and drop triggers, AI replies, conditions and actions into flows that qualify leads, answer FAQs and close sales — then hand off to a person when it matters.',
      chips: ['No-code builder', 'AI intent recognition', 'Live-agent handoff'],
    },
    visual: 'flow',
    features: [
      { icon: Workflow, title: 'Visual flow builder', body: 'Build conversations on a canvas — no code required.' },
      { icon: Sparkles, title: 'AI intent recognition', body: 'Understand what customers mean, not just the keywords they type.' },
      { icon: Target, title: 'Lead qualification', body: 'Ask the right questions and tag high-intent leads for sales.' },
      { icon: ShoppingCart, title: 'Catalogue integration', body: 'Share products and take orders right inside the chat.' },
      { icon: Webhook, title: 'CRM & webhooks', body: 'Fetch and update data in your own systems mid-flow.' },
      { icon: Languages, title: 'Human handoff', body: 'Pass the conversation to the right agent with full context.' },
    ],
    steps: [
      { title: 'Pick a trigger', body: 'Start from a keyword, an ad click, a button or an API event.' },
      { title: 'Design the flow', body: 'Add AI replies, questions, conditions and actions.' },
      { title: 'Go live', body: 'Turn it on for your number and review every run.' },
    ],
    useCases: [
      { title: '24/7 support', body: 'Answer order, return and policy questions at any hour.' },
      { title: 'Lead capture', body: 'Qualify ad and website leads before a salesperson steps in.' },
      { title: 'Product discovery', body: 'Recommend products and share catalogue links in the chat.' },
    ],
    plans: '5 chatbot flows for ₹2,199 · extra slots ₹250 each',
    faqs: [
      { q: 'Do I need to code?', a: 'No. Flows are built visually. Developers can extend them with webhooks and the API.' },
      { q: 'How is the chatbot priced?', a: 'A pack of 5 chatbot flows is ₹2,199 on Basic and Pro, and extra flow slots are ₹250 each. Enterprise is custom.' },
      { q: 'What happens when the bot can’t answer?', a: 'It hands the chat to your team in the shared inbox with the conversation so far.' },
    ],
    related: ['live-chat', 'whatsapp-forms', 'automation'],
  },
  {
    slug: 'automation',
    name: 'Automation & Journeys',
    short: 'Multi-step sequences triggered by what customers do',
    group: 'Automate',
    icon: Workflow,
    seo: {
      title: 'WhatsApp Automation & Customer Journeys',
      description:
        'Trigger personalised multi-step WhatsApp and email sequences from user actions, purchase events or time — welcome series, abandoned carts, reminders and follow-ups.',
    },
    hero: {
      eyebrow: 'Automation & Journeys',
      title: 'Set it once. Let every journey run itself.',
      subtitle:
        'Trigger personalised multi-step sequences from purchases, sign-ups, store events or time — across WhatsApp and email.',
      chips: ['Event & webhook triggers', 'WhatsApp + email steps', 'Delays & conditions'],
    },
    visual: 'journey',
    features: [
      { icon: Sparkles, title: 'Welcome & onboarding', body: 'Greet new customers and guide them to their first purchase.' },
      { icon: ShoppingCart, title: 'Abandoned cart recovery', body: 'Remind shoppers with a direct link back to checkout.' },
      { icon: Bell, title: 'Appointment reminders', body: 'Cut no-shows with timely reminders and confirmations.' },
      { icon: Repeat, title: 'Post-purchase follow-ups', body: 'Ask for reviews, share tips and suggest what’s next.' },
      { icon: Timer, title: 'Delays & conditions', body: 'Wait minutes or days, and branch on what the customer did.' },
      { icon: Webhook, title: 'Custom webhook triggers', body: 'Start journeys from any event in your own systems.' },
    ],
    steps: [
      { title: 'Choose a trigger', body: 'A store event, a tag, a form answer or a webhook.' },
      { title: 'Add the steps', body: 'Messages, emails, waits and conditions.' },
      { title: 'Watch it run', body: 'Every contact moves through the journey automatically.' },
    ],
    useCases: [
      { title: 'E-commerce', body: 'Order confirmations, cart recovery and review requests.' },
      { title: 'Clinics & services', body: 'Booking confirmations and reminders.' },
      { title: 'Education', body: 'Admission follow-ups and class reminders.' },
    ],
    plans: 'Basic and above',
    faqs: [
      { q: 'Which events can start a journey?', a: 'Inbound messages, keywords, tags, form submissions, Shopify and WooCommerce events, and webhooks from your own systems.' },
      { q: 'Can I mix WhatsApp and email?', a: 'Yes. Journeys can include WhatsApp messages and email steps side by side.' },
      { q: 'Can customers stop a journey?', a: 'Yes. Opt-outs are honoured automatically.' },
    ],
    related: ['chatbot-builder', 'email-api', 'whatsapp-broadcast'],
  },
  {
    slug: 'whatsapp-forms',
    name: 'WhatsApp Forms',
    short: 'Native forms inside the chat — no external links',
    group: 'Automate',
    icon: ClipboardList,
    badge: 'New',
    seo: {
      title: 'WhatsApp Forms for Lead Capture & Surveys',
      description:
        'Capture leads, feedback and bookings with native WhatsApp Forms. No external links, no drop-offs — answers go straight to your contacts or Google Sheets.',
    },
    hero: {
      eyebrow: 'WhatsApp Forms',
      title: 'Collect answers without sending anyone away.',
      subtitle:
        'Native forms open right inside WhatsApp — for leads, feedback, bookings and surveys. No external links, no drop-offs.',
      chips: ['Native in-chat forms', 'Saves to contacts', 'Google Sheets sync'],
    },
    visual: 'forms',
    features: [
      { icon: ClipboardList, title: 'Multi-step forms', body: 'Text fields, choices, dates and dropdowns across screens.' },
      { icon: Target, title: 'Lead capture', body: 'Collect name, email and intent from ad and campaign traffic.' },
      { icon: MessageSquareText, title: 'Feedback & surveys', body: 'Ask for ratings and comments after a purchase or chat.' },
      { icon: CalendarClock, title: 'Bookings', body: 'Let customers pick a slot and confirm in the same chat.' },
      { icon: Tags, title: 'Saves to contacts', body: 'Answers become contact attributes you can segment on.' },
      { icon: Link2, title: 'Sheets & webhooks', body: 'Send every submission to Google Sheets or your own system.' },
    ],
    steps: [
      { title: 'Build the form', body: 'Add the fields and screens you need.' },
      { title: 'Attach it', body: 'Send it in a campaign, a chatbot flow or an ad reply.' },
      { title: 'Use the answers', body: 'Segment, follow up or sync them to your tools.' },
    ],
    useCases: [
      { title: 'Lead generation', body: 'Qualify leads from click-to-WhatsApp ads instantly.' },
      { title: 'Customer feedback', body: 'Collect CSAT and reviews without a survey link.' },
      { title: 'Event sign-ups', body: 'Register attendees and send reminders automatically.' },
    ],
    plans: 'Basic and above',
    faqs: [
      { q: 'Do customers need to leave WhatsApp?', a: 'No. The form opens natively inside the chat.' },
      { q: 'Where do responses go?', a: 'Into the contact’s profile as attributes, and optionally to Google Sheets or a webhook.' },
      { q: 'Can I use forms in chatbot flows?', a: 'Yes. A form can be a step in any flow.' },
    ],
    related: ['chatbot-builder', 'click-to-whatsapp-ads', 'automation'],
  },
  {
    slug: 'whatsapp-payments',
    name: 'WhatsApp Payments',
    short: 'Collect via WhatsApp Pay, Razorpay and more',
    group: 'Grow',
    icon: CreditCard,
    seo: {
      title: 'Collect Payments on WhatsApp — WhatsApp Pay & Razorpay',
      description:
        'Send orders and collect payments inside WhatsApp with WhatsApp Pay and other payment modes like Razorpay and PayU. Confirmations and order sync happen automatically.',
    },
    hero: {
      eyebrow: 'WhatsApp Payments',
      title: 'From “I’ll take it” to paid — in the same chat.',
      subtitle:
        'Send an order, collect with WhatsApp Pay or other modes like Razorpay and PayU, and confirm automatically. No checkout page to abandon.',
      chips: ['WhatsApp Pay (UPI)', 'Razorpay & PayU', 'Auto confirmations'],
    },
    visual: 'phone',
    features: [
      { icon: CreditCard, title: 'WhatsApp Pay', body: 'Customers pay with UPI without leaving the conversation.' },
      { icon: Globe2, title: 'Other payment modes', body: 'Collect via Razorpay, PayU and other gateways too.' },
      { icon: ShoppingCart, title: 'Order messages', body: 'Send itemised orders with totals and a pay button.' },
      { icon: Bell, title: 'Payment confirmations', body: 'Confirm automatically the moment a payment succeeds.' },
      { icon: Repeat, title: 'Reminders', body: 'Nudge unpaid orders before they go cold.' },
      { icon: Webhook, title: 'Store sync', body: 'Update Shopify, WooCommerce or your own system on payment.' },
    ],
    steps: [
      { title: 'Connect a gateway', body: 'Enable WhatsApp Pay or link your payment provider.' },
      { title: 'Send an order', body: 'From the inbox, a chatbot flow or the API.' },
      { title: 'Get paid', body: 'Payment, confirmation and order sync — automatically.' },
    ],
    useCases: [
      { title: 'Conversational commerce', body: 'Sell straight from chats and catalogue messages.' },
      { title: 'Cash-on-delivery conversion', body: 'Offer prepaid at the moment of confirmation.' },
      { title: 'Fees & invoices', body: 'Collect course fees, bookings and invoices.' },
    ],
    plans: 'Basic and above',
    faqs: [
      { q: 'Which payment methods are supported?', a: 'WhatsApp Pay (UPI) plus other payment modes such as Razorpay and PayU.' },
      { q: 'Is the customer sent to a website?', a: 'With WhatsApp Pay the customer pays inside the chat. Other gateways open their secure payment page.' },
      { q: 'Are confirmations automatic?', a: 'Yes. A confirmation is sent and your store is updated when a payment succeeds.' },
    ],
    related: ['live-chat', 'chatbot-builder', 'automation'],
  },
  {
    slug: 'click-to-whatsapp-ads',
    name: 'Click-to-WhatsApp Ads',
    short: 'Facebook & Instagram ads that open a chat',
    group: 'Grow',
    icon: Megaphone,
    brand: 'meta',
    seo: {
      title: 'Click-to-WhatsApp Ads on Facebook & Instagram',
      description:
        'Run Facebook and Instagram ads that open a WhatsApp chat. Capture leads with Conversions API, segregate them smartly and automate replies with chatbot flows.',
    },
    hero: {
      eyebrow: 'Click-to-WhatsApp Ads',
      title: 'Ads that start conversations, not bounce rates.',
      subtitle:
        'Run Facebook and Instagram ads that land straight in WhatsApp. Capture quality leads with the Conversions API, sort them automatically and reply with chatbot flows.',
      chips: ['Facebook & Instagram', 'Conversions API', 'Auto-reply flows'],
    },
    visual: 'ads',
    features: [
      { icon: Megaphone, title: 'Launch from the dashboard', body: 'Create click-to-WhatsApp ads for Facebook and Instagram.' },
      { icon: Target, title: 'Conversions API', body: 'Send conversion events back to Meta to find better leads.' },
      { icon: Filter, title: 'Smart lead segregation', body: 'Tag and segment leads by ad, campaign and answers.' },
      { icon: Bot, title: 'Instant replies', body: 'Greet every lead with a chatbot flow, day or night.' },
      { icon: Users, title: 'Route to sales', body: 'Assign hot leads to the right agent in the inbox.' },
      { icon: BarChart3, title: 'Ad-to-revenue tracking', body: 'See which ads produce conversations and conversions.' },
    ],
    steps: [
      { title: 'Connect Meta', body: 'Link your Facebook page, Instagram and ad account.' },
      { title: 'Create the ad', body: 'Pick audience, budget and the WhatsApp greeting.' },
      { title: 'Convert in chat', body: 'Flows qualify leads; agents close them.' },
    ],
    useCases: [
      { title: 'Lead generation', body: 'Real estate, education and services enquiries.' },
      { title: 'D2C sales', body: 'Turn ad clicks into chats that end in orders.' },
      { title: 'Event registrations', body: 'Fill webinars and events with one tap.' },
    ],
    plans: 'Basic and above',
    faqs: [
      { q: 'Where do these ads run?', a: 'On Facebook and Instagram. When someone taps the ad, a WhatsApp chat with your business opens.' },
      { q: 'What is the Conversions API?', a: 'It sends conversion events from WhatsApp back to Meta so your ads can optimise for better-quality leads.' },
      { q: 'Are ad leads assigned automatically?', a: 'Yes. Leads can be tagged and routed to an agent or a chatbot flow.' },
    ],
    related: ['chatbot-builder', 'whatsapp-forms', 'live-chat'],
  },
  {
    slug: 'email-api',
    name: 'Email API',
    short: '300 free transactional emails every day',
    group: 'Grow',
    icon: Mail,
    badge: '300 free/day',
    seo: {
      title: 'Transactional Email API — 300 Free Emails Every Day',
      description:
        'Send transactional email from your own verified domain. 300 free emails per day on every plan, then ₹0.125 per email. DKIM, SPF, DMARC, webhooks and attachments.',
    },
    hero: {
      eyebrow: 'Email API · now live',
      title: '300 free emails. Every single day.',
      subtitle:
        'Send transactional email from your own verified domain with full authentication. No credit card, no trial, no expiry — only ₹0.125 per email beyond the free tier.',
      chips: ['300 free / day, forever', '₹0.125 per email after', 'DKIM · SPF · DMARC'],
    },
    visual: 'email',
    features: [
      { icon: ShieldCheck, title: 'Full authentication', body: 'DKIM, SPF and DMARC for strong deliverability.' },
      { icon: Globe2, title: 'Your own domain', body: 'Send from a verified domain your customers recognise.' },
      { icon: Webhook, title: 'Delivery webhooks', body: 'Get delivered, bounced and complaint events in real time.' },
      { icon: Paperclip, title: 'Attachments', body: 'Send invoices, tickets and receipts as files.' },
      { icon: KeyRound, title: 'Idempotency keys', body: 'Retry safely without sending duplicates.' },
      { icon: Braces, title: 'IP allowlist', body: 'Lock API access to your own servers.' },
    ],
    steps: [
      { title: 'Verify your domain', body: 'Add the DNS records for DKIM, SPF and DMARC.' },
      { title: 'Get an API key', body: 'Create a key in the dashboard.' },
      { title: 'Send', body: 'One POST request per email — 300 a day free.' },
    ],
    useCases: [
      { title: 'Receipts & invoices', body: 'Send transactional email from your backend.' },
      { title: 'Account email', body: 'Sign-up confirmations, password resets and alerts.' },
      { title: 'Follow-ups', body: 'Pair a WhatsApp message with a detailed email.' },
    ],
    plans: '300 free emails / day on every plan',
    faqs: [
      { q: 'Is the free tier really forever?', a: 'Yes. Every organisation gets 300 transactional emails per day — no credit card, no trial period, no expiry.' },
      { q: 'What does it cost beyond the free tier?', a: '₹0.125 per email, and you only pay for what you use.' },
      { q: 'Can I send from my own domain?', a: 'Yes. Verify your domain and send with DKIM, SPF and DMARC authentication.' },
    ],
    related: ['automation', 'whatsapp-business-api', 'analytics'],
  },
  {
    slug: 'analytics',
    name: 'Analytics',
    short: 'Delivery, read, click and ROI in real time',
    group: 'Grow',
    icon: BarChart3,
    seo: {
      title: 'WhatsApp Campaign Analytics & ROI Tracking',
      description:
        'Track delivery, read and click rates, campaign ROI and conversions in real time. A/B test messages and export reports to CSV or Excel.',
    },
    hero: {
      eyebrow: 'Analytics',
      title: 'Know which messages actually make money.',
      subtitle:
        'Track every message, click and conversion in real time — then compare campaigns, test variants and export the numbers.',
      chips: ['Real-time dashboards', 'A/B testing', 'CSV / Excel export'],
    },
    visual: 'analytics',
    features: [
      { icon: BarChart3, title: 'Delivery & read rates', body: 'Live dashboards for every campaign and template.' },
      { icon: Target, title: 'ROI & conversions', body: 'Attribute revenue to the campaigns that drove it.' },
      { icon: GitBranch, title: 'A/B testing', body: 'Test message variants and keep the winner.' },
      { icon: Users, title: 'Team performance', body: 'Response times and resolutions by agent.' },
      { icon: LayoutTemplate, title: 'Budget analytics', body: 'Track campaign spend against results on Pro.' },
      { icon: Webhook, title: 'Exports & webhooks', body: 'Export to CSV / Excel or stream events to your BI.' },
    ],
    steps: [
      { title: 'Send as usual', body: 'Metrics are collected for every message automatically.' },
      { title: 'Add conversions', body: 'Send purchase events from your store or API.' },
      { title: 'Optimise', body: 'Use the reports to decide what to send next.' },
    ],
    useCases: [
      { title: 'Campaign optimisation', body: 'Find the best segments, times and messages.' },
      { title: 'Support quality', body: 'Spot slow response times and busy hours.' },
      { title: 'Leadership reporting', body: 'Share clear numbers on what messaging delivers.' },
    ],
    plans: 'Core analytics on every plan · budget analytics on Pro',
    faqs: [
      { q: 'Is analytics included?', a: 'Core campaign metrics are on every plan. Campaign budget analytics is included on Pro.' },
      { q: 'Can I export data?', a: 'Yes, to CSV or Excel, and events are available through webhooks.' },
      { q: 'Can I A/B test?', a: 'Yes. Send variants to different segments and compare results side by side.' },
    ],
    related: ['whatsapp-broadcast', 'live-chat', 'email-api'],
  },
];

export const productGroups: { name: ProductGroup; blurb: string }[] = [
  { name: 'Engage', blurb: 'Reach and talk to customers' },
  { name: 'Automate', blurb: 'Let flows do the work' },
  { name: 'Grow', blurb: 'Sell, advertise and measure' },
];

export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p])) as Record<string, Product>;
export const getProduct = (slug: string) => productBySlug[slug];

/* ---------- channels ---------- */

export type Channel = {
  id: string;
  name: string;
  status: 'Live' | 'Soon';
  brand?: BrandSlug;
  icon: LucideIcon;
  body: string;
  features: string[];
  href?: string;
};

export const channels: Channel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    status: 'Live',
    brand: 'whatsapp',
    icon: MessageCircle,
    body: 'Broadcast templates, automate conversations, collect payments and run click-to-WhatsApp ads on the official WhatsApp Business API.',
    features: ['Template broadcasting', 'AI chatbot & flow builder', 'WhatsApp Pay', 'Green tick verification', 'Click-to-WhatsApp ads', 'Multi-agent shared inbox'],
    href: '/products/whatsapp-business-api',
  },
  {
    id: 'email',
    name: 'Email',
    status: 'Live',
    icon: Mail,
    body: 'Transactional email from your verified domain. 300 free emails per day on every plan, then ₹0.125 per email.',
    features: ['300 free emails / day', 'Your own verified domain', 'DKIM, SPF & DMARC', 'Delivery & bounce webhooks', 'Attachments', 'Idempotency keys'],
    href: '/products/email-api',
  },
  {
    id: 'sms',
    name: 'SMS',
    status: 'Soon',
    icon: MessageSquareText,
    body: 'SMS that reaches every phone — no internet needed. For OTPs, alerts and time-sensitive promotions.',
    features: ['OTP & verification', 'Transactional alerts', 'DLT compliance (India)', 'Delivery receipts', 'Unicode support'],
  },
  {
    id: 'rcs',
    name: 'RCS',
    status: 'Soon',
    brand: 'android',
    icon: MessageSquareText,
    body: 'Rich Communication Services — branded, interactive messages in the default Android messaging app.',
    features: ['Rich cards & carousels', 'Verified business sender', 'Suggested replies', 'Read receipts'],
  },
  {
    id: 'instagram',
    name: 'Instagram DM',
    status: 'Soon',
    brand: 'instagram',
    icon: MessageSquareText,
    body: 'Automate Instagram DMs — reply to messages, comments and story mentions, and capture leads.',
    features: ['Auto-reply to DMs & comments', 'Story mention triggers', 'Keyword flows', 'Handoff to a live agent'],
  },
];

/* ---------- integrations ---------- */

export type IntegrationEntry = { name: string; category: string; body: string; brand?: BrandSlug; icon?: LucideIcon; /** Detail page under /integrations, or an external docs link. */ href?: string };

export const integrations: IntegrationEntry[] = [
  { name: 'Shopify', href: '/integrations/shopify', category: 'E-commerce', brand: 'shopify', body: 'Order confirmations, cart recovery and COD verification from store events.' },
  { name: 'WooCommerce', href: '/integrations/woocommerce', category: 'E-commerce', brand: 'woocommerce', body: 'Trigger WhatsApp messages from WooCommerce orders and carts.' },
  { name: 'Google Sheets', href: '/integrations/google-sheets', category: 'Data', brand: 'googlesheets', body: 'Push leads, form answers and contacts into a sheet automatically.' },
  { name: 'Meta Ads', href: '/integrations/meta-ads', category: 'Advertising', brand: 'meta', body: 'Click-to-WhatsApp ads on Facebook and Instagram, with Conversions API.' },
  { name: 'WhatsApp Pay', href: '/integrations/whatsapp-pay', category: 'Payments', brand: 'whatsapp', body: 'Collect UPI payments inside the chat.' },
  { name: 'Razorpay', href: '/integrations/razorpay', category: 'Payments', brand: 'razorpay', body: 'Send payment links and confirm orders automatically.' },
  { name: 'REST API', href: 'https://docs.bigbrosai.com', category: 'Developers', icon: Braces, body: 'Send templates, manage contacts and campaigns from your code.' },
  { name: 'Webhooks', href: 'https://docs.bigbrosai.com', category: 'Developers', icon: Webhook, body: 'Real-time message, status and event notifications to your endpoint.' },
];
