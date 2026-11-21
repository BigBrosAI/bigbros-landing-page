import type { LucideIcon } from 'lucide-react';
import { Calculator, Code2, FileCheck2, Link2, ListChecks, MessagesSquare, QrCode, TrendingUp, Type, Users } from 'lucide-react';

export type Tool = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  seo: { title: string; description: string };
  intro: string;
  how: string[];
  faqs: { q: string; a: string }[];
};

export const tools: Tool[] = [
  {
    slug: 'whatsapp-link-generator',
    name: 'WhatsApp Link Generator',
    short: 'Create a wa.me click-to-chat link with a pre-filled message.',
    icon: Link2,
    seo: {
      title: 'Free WhatsApp Link Generator (wa.me) with Message',
      description: 'Create a free WhatsApp click-to-chat link with a pre-filled message. Copy the wa.me link or download it as a QR code — no signup needed.',
    },
    intro: 'Turn your WhatsApp number into a link customers can tap to start a chat — with your message already typed.',
    how: ['Pick your country code and enter your WhatsApp number.', 'Type the message you want customers to send.', 'Copy the link, open it to test, or download the QR code.'],
    faqs: [
      { q: 'What is a wa.me link?', a: 'It is WhatsApp’s official click-to-chat link. Anyone who taps it opens a chat with your number, even if they haven’t saved it.' },
      { q: 'Does the number need to be on WhatsApp?', a: 'Yes. The link works for any number registered on WhatsApp, WhatsApp Business or the WhatsApp Business API.' },
      { q: 'Where can I use the link?', a: 'On your website, Instagram bio, Google Business Profile, ads, emails, invoices and printed QR codes.' },
    ],
  },
  {
    slug: 'whatsapp-qr-code-generator',
    name: 'WhatsApp QR Code Generator',
    short: 'Make a scannable QR that opens a chat with your business.',
    icon: QrCode,
    seo: {
      title: 'Free WhatsApp QR Code Generator',
      description: 'Generate a free WhatsApp QR code that opens a chat with your business and a pre-filled message. Pick colours and download PNG or SVG.',
    },
    intro: 'Print it on menus, packaging, receipts or posters — one scan opens a WhatsApp chat with your business.',
    how: ['Enter your WhatsApp number and an optional message.', 'Choose the QR colour and size.', 'Download it as PNG for print or SVG for design tools.'],
    faqs: [
      { q: 'Do these QR codes expire?', a: 'No. The QR code simply contains your wa.me link, so it works for as long as your number is on WhatsApp.' },
      { q: 'Can I track scans?', a: 'Plain QR codes can’t be tracked. BigBrosAI QR campaigns can start a chatbot flow and tag every contact who scans.' },
      { q: 'PNG or SVG?', a: 'PNG works everywhere. SVG stays sharp at any size, which is best for large prints and design tools.' },
    ],
  },
  {
    slug: 'whatsapp-text-formatter',
    name: 'WhatsApp Text Formatter',
    short: 'Bold, italic, strikethrough and monospace with a live preview.',
    icon: Type,
    seo: {
      title: 'WhatsApp Text Formatter — Bold, Italic, Strikethrough',
      description: 'Format WhatsApp messages with bold, italic, strikethrough, monospace, lists and quotes. See a live WhatsApp preview and copy the text.',
    },
    intro: 'Write your message, select text and apply WhatsApp formatting — then copy it straight into WhatsApp or a template.',
    how: ['Type or paste your message.', 'Select text and click Bold, Italic, Strike or Mono.', 'Check the live preview, then copy the formatted text.'],
    faqs: [
      { q: 'How does WhatsApp formatting work?', a: 'Wrap text in symbols: *bold*, _italic_, ~strikethrough~ and ```monospace```. WhatsApp shows the styling and hides the symbols.' },
      { q: 'Does it work in templates?', a: 'Yes. WhatsApp Business API templates support the same bold, italic, strikethrough and monospace formatting.' },
      { q: 'Can I add lists and quotes?', a: 'Yes. Start a line with “- ” or “* ” for a bullet, “1. ” for a numbered list and “> ” for a quote.' },
    ],
  },
  {
    slug: 'whatsapp-pricing-calculator',
    name: 'WhatsApp API Pricing Calculator',
    short: 'Estimate your monthly WhatsApp message cost by country.',
    icon: Calculator,
    seo: {
      title: 'WhatsApp Business API Pricing Calculator (India & Global)',
      description: 'Estimate your monthly WhatsApp Business API cost. Choose a country, enter marketing, utility and authentication messages and add your BigBrosAI plan.',
    },
    intro: 'See what your WhatsApp campaigns will cost before you send them — using Meta’s per-message rates by country.',
    how: ['Choose the country your customers are in.', 'Enter how many marketing, utility and authentication messages you send a month.', 'Add a plan to see your total monthly estimate.'],
    faqs: [
      { q: 'Are customer-service replies charged?', a: 'No. Replies inside the 24-hour customer service window are free, and so are utility templates sent inside that window.' },
      { q: 'Which rates does this use?', a: 'The same per-message rates shown on our pricing page. Final charges follow Meta’s rates at the time of sending.' },
      { q: 'Is there a markup?', a: 'No. BigBrosAI passes Meta’s message charges through without markup; you pay your plan separately.' },
    ],
  },
  {
    slug: 'whatsapp-chat-button',
    name: 'WhatsApp Chat Button for Websites',
    short: 'Copy-paste code for a floating WhatsApp button on your site.',
    icon: Code2,
    seo: {
      title: 'Free WhatsApp Chat Button Generator for Websites',
      description: 'Add a floating WhatsApp chat button to any website. Set your number, message, colour and position, preview it and copy the code.',
    },
    intro: 'Let website visitors message you on WhatsApp in one tap. Works on WordPress, Shopify, Wix, Webflow or plain HTML.',
    how: ['Enter your number and the greeting customers will send.', 'Pick the label, colour and corner.', 'Copy the snippet and paste it before </body> on your site.'],
    faqs: [
      { q: 'Does it slow my website down?', a: 'No. It’s a few lines of HTML and CSS with no external scripts or tracking.' },
      { q: 'Where do I paste it on Shopify or WordPress?', a: 'Shopify: Online Store → Themes → Edit code → theme.liquid, before </body>. WordPress: use a header/footer code plugin or your theme’s footer.' },
      { q: 'Can chats go to my whole team?', a: 'With the BigBrosAI shared inbox, chats from the button reach every agent on one number.' },
    ],
  },
  {
    slug: 'whatsapp-template-builder',
    name: 'WhatsApp Template Builder & Checker',
    short: 'Build a template, preview it and catch rejection reasons before you submit.',
    icon: FileCheck2,
    seo: {
      title: 'WhatsApp Template Builder & Approval Checker (Free)',
      description: 'Build WhatsApp Business API message templates with header, variables, footer and buttons. Live preview, character limits and checks for common Meta rejection reasons.',
    },
    intro: 'Write your template, see exactly how customers will see it, and fix the usual reasons Meta rejects templates — before you submit.',
    how: ['Pick a category and write your header, body and footer.', 'Add variables like {{1}} with sample values, and up to three buttons.', 'Fix anything the checker flags, then copy the body or the API JSON.'],
    faqs: [
      { q: 'What are the character limits?', a: 'Header 60, body 1,024, footer 60 and 25 characters per button. The builder counts each one as you type.' },
      { q: 'Why do templates get rejected?', a: 'Common reasons are variables at the start or end of the body, variables out of order or side by side, too many variables for the text, and the wrong category.' },
      { q: 'Can I submit it from here?', a: 'This tool helps you get it right. In BigBrosAI you can submit templates for approval directly — with an AI assistant that writes them for you.' },
    ],
  },
  {
    slug: 'bulk-whatsapp-link-generator',
    name: 'Bulk WhatsApp Link Generator',
    short: 'Turn a contact list into personalised wa.me links and download a CSV.',
    icon: ListChecks,
    seo: {
      title: 'Bulk WhatsApp Link Generator — Personalised wa.me Links (CSV)',
      description: 'Paste a list of names and numbers and get a personalised WhatsApp click-to-chat link for each one. Copy them all or download a CSV. Free, no signup.',
    },
    intro: 'Paste names and numbers, write one message with {name}, and get a ready-to-send WhatsApp link for every contact.',
    how: ['Paste one contact per line as “name, number”.', 'Write your message — {name} is replaced for each contact.', 'Copy all links or download them as a CSV.'],
    faqs: [
      { q: 'Does this send messages for me?', a: 'No. Each link opens a chat with the message ready; you tap send. To send to thousands at once, use WhatsApp broadcasts on the Business API.' },
      { q: 'Which formats can I paste?', a: 'Comma, tab or semicolon separated — straight from Excel or Google Sheets. Numbers can have spaces, dashes, brackets or a leading 0.' },
      { q: 'Is my contact list uploaded anywhere?', a: 'No. Everything runs in your browser; your contacts never leave your device.' },
    ],
  },
  {
    slug: 'whatsapp-number-formatter',
    name: 'WhatsApp Contact List Cleaner',
    short: 'Format numbers with country codes, remove duplicates and export a CSV.',
    icon: Users,
    seo: {
      title: 'WhatsApp Number Formatter & Contact List Cleaner',
      description: 'Clean a phone number list for WhatsApp broadcasts: add country codes, strip spaces and leading zeros, remove duplicates and invalid numbers, export CSV.',
    },
    intro: 'Paste a messy list of phone numbers and get a clean, de-duplicated list in international format — ready to import for a WhatsApp broadcast.',
    how: ['Paste numbers in any format, one per line or comma-separated.', 'Choose the default country code for numbers without one.', 'Copy the cleaned list or download it as a CSV.'],
    faqs: [
      { q: 'What format does WhatsApp need?', a: 'International format: country code + number, with no spaces, dashes or leading zero — for India, 91 followed by the 10-digit mobile number.' },
      { q: 'Why are some numbers marked invalid?', a: 'They are too short or too long, or (for India) don’t start with 6, 7, 8 or 9 like a mobile number. Landlines can’t receive WhatsApp messages unless they’re on WhatsApp Business.' },
      { q: 'Is my list stored?', a: 'No. Cleaning happens entirely in your browser.' },
    ],
  },
  {
    slug: 'whatsapp-broadcast-roi-calculator',
    name: 'WhatsApp Broadcast ROI Calculator',
    short: 'Estimate revenue and return from a WhatsApp marketing campaign.',
    icon: TrendingUp,
    seo: {
      title: 'WhatsApp Marketing ROI Calculator for Broadcast Campaigns',
      description: 'Estimate the revenue and ROI of a WhatsApp broadcast. Enter contacts, delivery, read, click and conversion rates and order value — with Meta’s per-message cost by country.',
    },
    intro: 'See what a WhatsApp broadcast could earn you — from delivered messages to orders — against the real per-message cost.',
    how: ['Pick your customers’ country and how many contacts you’ll message.', 'Adjust delivery, read, click and conversion rates.', 'Enter your average order value to see revenue, cost and ROI.'],
    faqs: [
      { q: 'What rates should I use?', a: 'WhatsApp messages are typically delivered to over 90% of valid numbers and read by most recipients. Start with the defaults, then use your own campaign data.' },
      { q: 'Is the message cost accurate?', a: 'It uses Meta’s marketing message rate for the selected country, charged per delivered message. Your BigBrosAI plan is separate.' },
      { q: 'How can I improve ROI?', a: 'Segment your audience, personalise with variables, add a clear button and follow up with a chatbot. BigBrosAI tracks conversions per campaign.' },
    ],
  },
  {
    slug: 'whatsapp-business-message-templates',
    name: 'Greeting & Away Message Templates',
    short: 'Ready-to-use greeting, away, quick reply and follow-up messages.',
    icon: MessagesSquare,
    seo: {
      title: 'WhatsApp Business Greeting & Away Message Templates',
      description: 'Free WhatsApp Business message templates: greeting messages, away messages, quick replies and follow-ups for retail, clinics, coaching, real estate and restaurants.',
    },
    intro: 'Copy professional WhatsApp Business messages for greetings, after hours, quick replies and follow-ups — personalised with your business name.',
    how: ['Enter your business name, hours and website.', 'Filter by message type or industry.', 'Copy a message into WhatsApp Business settings or your BigBrosAI inbox.'],
    faqs: [
      { q: 'Where do I set a greeting message?', a: 'In the WhatsApp Business app: Settings → Business tools → Greeting message (or Away message). On BigBrosAI, set them in the inbox automation settings.' },
      { q: 'When is an away message sent?', a: 'Outside the hours you set. Customers get it automatically so they know when to expect a reply.' },
      { q: 'Can these be automated further?', a: 'Yes. With BigBrosAI, a chatbot flow or AI agent can answer the question, not just acknowledge it.' },
    ],
  },
];

export const toolBySlug = Object.fromEntries(tools.map((t) => [t.slug, t])) as Record<string, Tool>;

export const countryCodes = [
  { code: '91', label: 'India (+91)' },
  { code: '971', label: 'UAE (+971)' },
  { code: '966', label: 'Saudi Arabia (+966)' },
  { code: '1', label: 'USA / Canada (+1)' },
  { code: '44', label: 'UK (+44)' },
  { code: '65', label: 'Singapore (+65)' },
  { code: '60', label: 'Malaysia (+60)' },
  { code: '62', label: 'Indonesia (+62)' },
  { code: '977', label: 'Nepal (+977)' },
  { code: '880', label: 'Bangladesh (+880)' },
  { code: '94', label: 'Sri Lanka (+94)' },
  { code: '61', label: 'Australia (+61)' },
];

/** wa.me link from a country code, local number and optional message. */
export function waLink(cc: string, number: string, message: string) {
  const digits = number.replace(/\D/g, '').replace(/^0+/, '');
  const full = digits.startsWith(cc) && digits.length > 10 ? digits : `${cc}${digits}`;
  return `https://wa.me/${full}${message.trim() ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/** Digits-only international number (no +), or '' if it can't be a valid number. */
export function normalizeNumber(raw: string, cc: string) {
  const hasPlus = raw.trim().startsWith('+');
  let d = raw.replace(/\D/g, '');
  if (!d) return '';
  if (hasPlus) return d.length >= 8 && d.length <= 15 ? d : '';
  if (d.startsWith('00')) d = d.slice(2);
  else if (cc === '91' && d.length === 12 && d.startsWith('91')) return /^91[6-9]/.test(d) ? d : '';
  else if (d.length > 10 && d.startsWith(cc)) {
    /* already has country code */
  } else {
    d = cc + d.replace(/^0+/, '');
  }
  if (cc === '91' && d.startsWith('91') && !/^91[6-9]\d{9}$/.test(d)) return '';
  return d.length >= 8 && d.length <= 15 ? d : '';
}
