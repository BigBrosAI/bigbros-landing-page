/*
 * Long-form guides (/guides/[slug]). Written for Indian small and mid-size businesses
 * searching how WhatsApp for business works. Keep facts general and current; BigBrosAI
 * prices come from lib/plans.ts. Review `updated` whenever WhatsApp or Meta pricing changes.
 */

export type GuideSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: 'Pricing' | 'Getting started' | 'Automation' | 'Marketing' | 'E-commerce';
  readMins: number;
  updated: string;
  intro: string;
  /** Two to four one-line answers shown at the top; the part AI search quotes. */
  takeaways: string[];
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  /** Internal links shown at the end: [label, href]. */
  related: [string, string][];
};

const UPDATED = '27 November 2026';

export const guides: Guide[] = [
  {
    slug: 'whatsapp-business-api-pricing-india',
    title: 'WhatsApp Business API pricing in India (2026): what you actually pay',
    description:
      'How WhatsApp Business API pricing works in India: Meta’s per-message charges for marketing, utility and authentication, free service conversations, platform fees and how to estimate your monthly bill.',
    category: 'Pricing',
    readMins: 7,
    updated: UPDATED,
    intro:
      'WhatsApp Business API pricing confuses a lot of businesses because there are two separate costs: what Meta charges for messages, and what your provider charges for the platform. Once you separate the two, estimating your monthly bill is simple.',
    takeaways: [
      'Your bill has two parts: Meta’s per-message charge and your provider’s platform fee.',
      'In India on BigBrosAI, marketing messages cost ₹0.9999, utility and authentication ₹0.145, and service replies are free.',
      'Replying inside the 24-hour customer service window keeps conversations free, so fast replies save money.',
    ],
    sections: [
      {
        heading: 'The two parts of your bill',
        paragraphs: [
          'Every WhatsApp Business API bill has two layers. The first is the message charge, set per message by Meta and passed on by your provider. The second is the platform fee, which your provider charges for the software: the inbox, campaigns, chatbots, integrations and support.',
          'Comparing providers only on the platform fee, or only on the per-message rate, gives you half the picture. A cheap plan with a high message rate can cost more than a pricier plan if you send a lot, and the reverse is true for smaller senders.',
        ],
      },
      {
        heading: 'Message categories and what they cost',
        paragraphs: [
          'Meta groups the template messages businesses send into categories, and each category has its own price per delivered message in each country. On BigBrosAI, the India rates are:',
        ],
        bullets: [
          'Marketing: ₹0.9999 per message. Promotions, offers, product launches and re-engagement.',
          'Utility: ₹0.145 per message. Order confirmations, delivery updates, receipts and reminders.',
          'Authentication: ₹0.145 per message. One-time passwords for sign-up and login.',
          'Service: free. Replies to customers who message you, inside the 24-hour window.',
        ],
      },
      {
        heading: 'The 24-hour customer service window',
        paragraphs: [
          'When a customer messages your business, a 24-hour customer service window opens, and it resets every time they send another message. Inside that window you can reply with any kind of message, including free-form text, media and buttons, and those service replies are free.',
          'Utility templates sent inside an open window are also free. This is why chatbots and fast human replies save money: if you answer while the window is open, you don’t pay for the conversation at all. Once the window closes, you can only start a new conversation with an approved template, which is charged by category.',
        ],
      },
      {
        heading: 'Platform fees',
        paragraphs: [
          'Platform fees vary widely between providers in India, from free plans to plans costing several thousand rupees a month. Look at what each plan includes: how many team members, whether chatbots are included or an add-on, how many campaigns you can send and which integrations are available.',
          'BigBrosAI has a free Starter plan with the WhatsApp Business API, live chat, templates and unlimited free service conversations, plus a ₹50 signup bonus. Basic is ₹999 a month and Pro is ₹2,199 a month, with 10% off when billed yearly. Prices exclude GST.',
        ],
      },
      {
        heading: 'A worked example',
        paragraphs: [
          'Say a clinic sends 2,000 appointment reminders (utility) and 1,000 promotional messages (marketing) in a month, and handles all patient questions inside the service window.',
        ],
        bullets: [
          'Utility: 2,000 × ₹0.145 = ₹290',
          'Marketing: 1,000 × ₹0.9999 = about ₹1,000',
          'Service replies: free',
          'Platform: ₹999 on Basic',
          'Total: about ₹2,289 a month before GST',
        ],
      },
      {
        heading: 'How to keep costs down',
        paragraphs: ['A few habits make a big difference to your monthly bill:'],
        bullets: [
          'Reply quickly. Answering inside the 24-hour window keeps conversations free.',
          'Use the right category. Order and delivery updates belong in utility, which costs far less than marketing.',
          'Segment your broadcasts. Sending offers only to interested customers costs less and gets fewer blocks.',
          'Let a chatbot handle routine questions so customers get answers inside the window, any time of day.',
        ],
      },
    ],
    faqs: [
      { q: 'Is the WhatsApp Business API free?', a: 'Access can be free: BigBrosAI’s Starter plan has no platform fee, and service conversations are free. You pay Meta’s per-message charges when you send template messages like marketing or utility messages.' },
      { q: 'Do I pay for messages customers send me?', a: 'No. Incoming messages and your replies inside the 24-hour service window are free.' },
      { q: 'Is GST charged on top?', a: 'Yes. BigBrosAI prices exclude GST, which is added to your invoice.' },
    ],
    related: [
      ['WhatsApp pricing calculator', '/tools/whatsapp-pricing-calculator'],
      ['BigBrosAI pricing', '/pricing'],
      ['Broadcast ROI calculator', '/tools/whatsapp-broadcast-roi-calculator'],
    ],
  },
  {
    slug: 'whatsapp-business-app-vs-api',
    title: 'WhatsApp Business app vs WhatsApp Business API: which do you need?',
    description:
      'The differences between the free WhatsApp Business app and the WhatsApp Business API: team access, broadcasts, chatbots, integrations and cost, and when to switch.',
    category: 'Getting started',
    readMins: 6,
    updated: UPDATED,
    intro:
      'Most businesses start on the free WhatsApp Business app, and it works well until messages start piling up. The WhatsApp Business API is built for the next stage: more people answering, more customers to reach and more of the work automated.',
    takeaways: [
      'The WhatsApp Business app is free but built for one person on a few devices.',
      'The WhatsApp Business API adds a shared team inbox, opted-in broadcasts, chatbots, integrations and reports.',
      'Switch when several people answer chats, you message hundreds of customers or you repeat the same replies daily.',
    ],
    sections: [
      {
        heading: 'The WhatsApp Business app',
        paragraphs: [
          'The WhatsApp Business app is free and installs like regular WhatsApp. You get a business profile, a product catalogue, quick replies, labels, and basic greeting and away messages. For a shop owner answering customers personally, it is often all you need.',
          'Its limits show up as you grow. Only a handful of devices can use the account, so a team can’t easily share the load. Broadcast lists only reach people who have saved your number. There’s no proper chatbot, no reporting on campaigns and no way to connect it to your store, CRM or spreadsheets.',
        ],
      },
      {
        heading: 'The WhatsApp Business API',
        paragraphs: [
          'The WhatsApp Business API is Meta’s platform for businesses that message customers at scale. You don’t use it through a phone app; you use it through a provider like BigBrosAI, which gives you a dashboard, a team inbox, campaigns, chatbots and integrations on top.',
        ],
        bullets: [
          'A shared inbox where your whole team can reply from one number',
          'Broadcasts to any customer who has opted in, not only those who saved your number',
          'Chatbots and automated flows that reply instantly, 24/7',
          'Integrations with Shopify, WooCommerce, Google Sheets, payments and your own systems',
          'Delivery, read and click reports for every campaign',
          'Interactive messages with buttons, lists and payment requests',
        ],
      },
      {
        heading: 'Cost',
        paragraphs: [
          'The app is free. The API has per-message charges from Meta for template messages, and usually a platform fee from your provider. Replies inside the 24-hour customer service window are free on the API, and on BigBrosAI you can start without a platform fee on the Starter plan.',
        ],
      },
      {
        heading: 'Signs it’s time to switch',
        paragraphs: ['Consider moving to the API when any of these sound familiar:'],
        bullets: [
          'More than one person needs to answer customer messages',
          'You miss messages at night or during busy hours',
          'You want to send offers to hundreds or thousands of customers',
          'You send the same answers and updates again and again',
          'You want order or booking updates to go out automatically',
        ],
      },
      {
        heading: 'Can I keep my number?',
        paragraphs: [
          'Usually, a number connected to the API can’t also be used in the regular WhatsApp Business app at the same time. Many businesses use a new number for the API, while others move their existing number over. Book a call with our team and we’ll help you choose.',
        ],
      },
    ],
    faqs: [
      { q: 'Do I need a website to use the WhatsApp Business API?', a: 'You need a Meta business account and a phone number. A website helps with verification and trust, but BigBrosAI guides you through onboarding either way.' },
      { q: 'Can I use the API without coding?', a: 'Yes. BigBrosAI gives you a dashboard for the inbox, campaigns and no-code chatbots. Developers can use the REST API and webhooks if they want to.' },
      { q: 'Is the API only for big companies?', a: 'No. Free and low-cost plans make it practical for small clinics, shops, coaching centres and agencies.' },
    ],
    related: [
      ['WhatsApp Business API on BigBrosAI', '/products/whatsapp-business-api'],
      ['API pricing explained', '/guides/whatsapp-business-api-pricing-india'],
      ['Shared team inbox', '/products/live-chat'],
    ],
  },
  {
    slug: 'how-to-build-a-whatsapp-chatbot',
    title: 'How to build a WhatsApp chatbot without code (step by step)',
    description:
      'A practical guide to building a WhatsApp chatbot with a no-code flow builder: triggers, buttons, questions, AI replies, human handoff and testing before you go live.',
    category: 'Automation',
    readMins: 8,
    updated: UPDATED,
    intro:
      'A good WhatsApp chatbot doesn’t try to replace your team. It handles the repetitive questions instantly, collects the details you need and hands over to a person when it matters. Here’s how to build one without writing code, using BigBrosAI’s flow builder.',
    takeaways: [
      'Start with your top three or four customer questions and build one path for each.',
      'Build visually with blocks, or describe your business and let AI create an editable flow in about a minute.',
      'Always add a human handoff, and test on up to three numbers before going live.',
    ],
    sections: [
      {
        heading: '1. Decide what the bot should do',
        paragraphs: [
          'Start with the three or four questions customers ask most. For a clinic that’s booking, timings, fees and location. For a store it’s order status, product availability and returns. Each of these becomes a path in your flow. Keep the first version small; you can always add more.',
        ],
      },
      {
        heading: '2. Choose how the flow starts',
        paragraphs: ['Every flow begins with a trigger. In BigBrosAI you can start a flow from:'],
        bullets: [
          'Keywords, such as “hi”, “book” or “price”',
          'A regex pattern for more flexible matching',
          'A template message button',
          'A QR code campaign',
          'Any message, for a catch-all welcome',
          'AI routing, which starts the flow from a plain description of when it should run, even if customers don’t type an exact keyword',
        ],
      },
      {
        heading: '3. Build the conversation',
        paragraphs: [
          'Drag blocks from the library onto the canvas and connect them. A typical flow uses a few kinds of blocks:',
        ],
        bullets: [
          'Text and buttons: a greeting with up to three quick replies',
          'Ask question: save the customer’s answer, like a preferred date, into a variable',
          'List menu: offer more options, like available time slots',
          'Add tag: label the contact so you can follow up or segment later',
          'Notify team: email your staff when something needs attention',
          'AI chatbot: answer open questions from your knowledge bank',
          'Human handoff: pass the chat to a person in the shared inbox',
        ],
      },
      {
        heading: '4. Or let AI build it for you',
        paragraphs: [
          'If you’d rather not drag blocks, open Build with AI and describe your business in plain words. Enhance turns a short idea into a detailed brief, and in about a minute you get a complete, editable flow with its trigger keywords ready. Already have a flow? Edit with AI changes it from a single sentence.',
        ],
      },
      {
        heading: '5. Add your knowledge bank',
        paragraphs: [
          'The AI chatbot block answers from your Knowledge Bank: FAQs, text, PDFs or website content you add. The better your knowledge bank, the better the answers. Include timings, prices, policies and anything customers commonly ask, and always give the bot a way to hand over to a person.',
        ],
      },
      {
        heading: '6. Test before going live',
        paragraphs: [
          'The flow check tells you in real time if anything will break, such as an unconnected button. Before switching the flow live, add up to three test numbers and turn on test mode, so only you receive it. Message your business on WhatsApp and run through every path end to end.',
        ],
      },
      {
        heading: 'Tips for a bot customers like',
        paragraphs: [],
        bullets: [
          'Use buttons instead of asking customers to type, wherever you can',
          'Keep each message short; one question at a time',
          'Always offer a way to reach a person',
          'Review conversations weekly and fix the places where people get stuck',
        ],
      },
    ],
    faqs: [
      { q: 'Do chatbot replies cost money?', a: 'Replies inside the 24-hour customer service window are free. Chatbots usually reply inside that window, because the customer has just messaged you.' },
      { q: 'Can the bot answer in Hindi?', a: 'You can write your flow messages in any language, including Hindi, and add Hindi content to your knowledge bank.' },
      { q: 'What happens when the bot can’t answer?', a: 'Add a human handoff block. The chat moves to your team in the shared inbox with the full conversation so far.' },
    ],
    related: [
      ['AI Chatbot Builder', '/products/chatbot-builder'],
      ['Clinic appointment bot example', '/solutions/clinics'],
      ['Free greeting message templates', '/tools/whatsapp-business-message-templates'],
    ],
  },
  {
    slug: 'whatsapp-template-approval',
    title: 'How to get WhatsApp template messages approved (and why they get rejected)',
    description:
      'What WhatsApp message templates are, the three categories, how approval works and the most common reasons Meta rejects templates, with tips to get approved first time.',
    category: 'Getting started',
    readMins: 6,
    updated: UPDATED,
    intro:
      'To start a conversation on the WhatsApp Business API, or to message a customer after the 24-hour window closes, you need an approved template. Getting templates approved quickly is mostly about avoiding a handful of common mistakes.',
    takeaways: [
      'Templates are needed to start conversations or message after the 24-hour window closes.',
      'Pick the right category: marketing, utility or authentication.',
      'Most rejections come from wrong categories, variables at the start or end, missing samples and shortened links.',
    ],
    sections: [
      {
        heading: 'What a template is',
        paragraphs: [
          'A template is a pre-approved message format. It can have a header (text, image, video or document), a body with variables like {{1}} for the customer’s name, an optional footer and up to a few buttons, such as quick replies, a link or a phone number. When you send it, you fill the variables for each customer.',
        ],
      },
      {
        heading: 'Choose the right category',
        paragraphs: ['Every template has a category, which affects both approval and price:'],
        bullets: [
          'Marketing: offers, promotions, announcements and anything meant to sell',
          'Utility: updates about something the customer did or asked for, such as an order, booking or payment',
          'Authentication: one-time passwords for verification',
        ],
      },
      {
        heading: 'Common reasons templates get rejected',
        paragraphs: [],
        bullets: [
          'The wrong category, such as a promotion submitted as utility',
          'A variable at the very start or very end of the message',
          'Two variables next to each other with no text between them',
          'Missing or unclear sample values for variables',
          'Shortened links that hide where they go',
          'Content that breaks WhatsApp’s commerce or business policies',
          'Spelling and formatting errors, or messages that are vague about who is sending them',
        ],
      },
      {
        heading: 'Tips to get approved first time',
        paragraphs: [],
        bullets: [
          'Say who you are and why you’re messaging in the first line',
          'Give realistic sample values for every variable',
          'Use your full domain for links instead of a shortener',
          'Keep utility templates strictly about the customer’s order, booking or account',
          'Check formatting and character limits before submitting',
        ],
      },
      {
        heading: 'Check your template for free',
        paragraphs: [
          'Our free template builder shows a live WhatsApp preview, counts characters and flags common rejection reasons before you submit. When you’re ready, create the template in BigBrosAI, submit it to Meta and track its approval status from the dashboard.',
        ],
      },
    ],
    faqs: [
      { q: 'How long does template approval take?', a: 'Many templates are reviewed within minutes, though some take longer. Your dashboard shows the status as it changes.' },
      { q: 'Can I edit an approved template?', a: 'Editing is limited and an edited template goes back for review. Often it’s easier to create a new version.' },
      { q: 'Do I need a template to reply to a customer?', a: 'Not inside the 24-hour customer service window. There you can reply freely. Templates are needed to start a conversation or message after the window closes.' },
    ],
    related: [
      ['Free template builder & checker', '/tools/whatsapp-template-builder'],
      ['WhatsApp text formatter', '/tools/whatsapp-text-formatter'],
      ['Broadcast & Retargeting', '/products/whatsapp-broadcast'],
    ],
  },
  {
    slug: 'whatsapp-broadcast-best-practices',
    title: 'WhatsApp broadcast best practices: more replies, fewer blocks',
    description:
      'How to run WhatsApp marketing broadcasts that customers read and act on: getting opt-in, segmenting, timing, writing templates and measuring results.',
    category: 'Marketing',
    readMins: 7,
    updated: UPDATED,
    intro:
      'WhatsApp messages get opened far more often than email, which makes broadcasts one of the most effective ways to reach customers. It also means a careless campaign is noticed quickly. These practices help you get results without annoying people or risking your number’s quality.',
    takeaways: [
      'Only message customers who opted in, and make opting out easy.',
      'Segment your audience; relevant small broadcasts beat generic big ones.',
      'Measure delivered, read and clicked, and protect your number’s quality rating.',
    ],
    sections: [
      {
        heading: 'Start with opt-in',
        paragraphs: [
          'Only send marketing messages to people who have agreed to hear from you on WhatsApp. Collect opt-in where it’s natural: at checkout, on a website form, with a QR code in your shop, or when someone first messages you. Make it clear what they’ll receive and how often.',
        ],
      },
      {
        heading: 'Segment instead of blasting',
        paragraphs: [
          'Sending the same offer to everyone is the fastest way to get blocked. Use tags and attributes to group customers by what they bought, what they asked about, where they live or how recently they engaged. A smaller, relevant broadcast usually earns more replies and sales than a big generic one, and costs less.',
        ],
      },
      {
        heading: 'Write messages people want to read',
        paragraphs: [],
        bullets: [
          'Lead with the value: what’s in it for the customer',
          'Use their name and relevant details with variables',
          'Keep it short, with one clear action',
          'Add a button for the next step: shop now, book, reply',
          'Use an image or video header when it helps',
          'Always make it easy to stop receiving messages',
        ],
      },
      {
        heading: 'Pick the right time and frequency',
        paragraphs: [
          'Send when your customers are likely to be free, usually not early morning or late night. Watch how your audience responds rather than following a fixed rule. Keep marketing broadcasts to a sensible frequency; for most small businesses, a few relevant messages a month work better than daily offers.',
        ],
      },
      {
        heading: 'Measure and improve',
        paragraphs: [
          'Track delivered, read and clicked for every campaign. Compare different offers, images and times on smaller segments before sending to everyone. On BigBrosAI Pro, campaign budget analytics show what each campaign costs against the results it drives.',
        ],
      },
      {
        heading: 'Protect your number’s quality',
        paragraphs: [
          'WhatsApp watches how customers react to your messages. If many people block or report you, your quality rating drops and your sending can be limited. Opt-in, segmentation and relevant content are the best protection.',
        ],
      },
    ],
    faqs: [
      { q: 'How many people can I send a broadcast to?', a: 'On the API, your daily sending limit grows as you send good-quality messages. BigBrosAI supports up to 2,400 messages a minute on Basic and 5,000 on Pro.' },
      { q: 'How much does a broadcast cost?', a: 'Marketing messages to Indian numbers are ₹0.9999 each on BigBrosAI, plus your plan. Use the ROI calculator to estimate returns.' },
      { q: 'Can I schedule broadcasts?', a: 'Yes. Schedule campaigns in advance, and on Pro use the CSV campaign scheduler for personalised sends.' },
    ],
    related: [
      ['Broadcast & Retargeting', '/products/whatsapp-broadcast'],
      ['Broadcast ROI calculator', '/tools/whatsapp-broadcast-roi-calculator'],
      ['Contact list cleaner', '/tools/whatsapp-number-formatter'],
    ],
  },
  {
    slug: 'whatsapp-abandoned-cart-recovery',
    title: 'Abandoned cart recovery on WhatsApp: a guide for Indian online stores',
    description:
      'How to recover abandoned carts with WhatsApp reminders, confirm COD orders and send order updates automatically from Shopify or WooCommerce.',
    category: 'E-commerce',
    readMins: 6,
    updated: UPDATED,
    intro:
      'Most online shoppers leave without paying, and email reminders are easy to ignore. WhatsApp reminders reach shoppers where they actually read messages, and they can ask a question and complete the order in the same chat.',
    takeaways: [
      'WhatsApp cart reminders reach shoppers where they actually read messages.',
      'Connect Shopify or WooCommerce, pick a template and set the delay after checkout starts.',
      'Add COD confirmation and shipping updates to cut returns and “where is my order?” chats.',
    ],
    sections: [
      {
        heading: 'Why WhatsApp works for cart recovery',
        paragraphs: [
          'Shoppers abandon carts for ordinary reasons: they got distracted, wanted to compare prices, had a question about delivery or weren’t sure about cash on delivery. A friendly WhatsApp reminder with a direct link back to their cart handles the distraction, and because it’s a chat, it gives them an easy way to ask the question that stopped them.',
        ],
      },
      {
        heading: 'Setting it up',
        paragraphs: [
          'Connect your Shopify or WooCommerce store to BigBrosAI, choose an approved WhatsApp template for the abandoned cart reminder, and set how long after the checkout started it should be sent. Fill the template’s variables with the customer’s name, product and cart link, send yourself a test, and switch it on.',
        ],
      },
      {
        heading: 'Writing a reminder that converts',
        paragraphs: [],
        bullets: [
          'Mention the product by name so it feels personal',
          'Include a one-tap link straight back to the cart',
          'Answer common worries up front: delivery time, returns, COD',
          'Offer help: “Reply here if you have a question”',
          'Use a small incentive sparingly, not on every cart',
        ],
      },
      {
        heading: 'Don’t forget COD confirmation',
        paragraphs: [
          'Cash-on-delivery orders are popular in India but can lead to costly returns when buyers change their minds. A COD confirmation message asks the customer to confirm before you ship. It can also offer a small discount to pay online instead, turning a risky COD order into a prepaid one.',
        ],
      },
      {
        heading: 'Complete the post-purchase journey',
        paragraphs: [
          'Recovery is only the start. Order confirmations and shipping updates with tracking links cut down “where is my order?” messages, and receipts can go by email with BigBrosAI’s 300 free emails a day. Happy customers who opted in can then hear about new launches through broadcasts.',
        ],
      },
    ],
    faqs: [
      { q: 'Are cart reminders marketing messages?', a: 'Usually, yes. Abandoned cart reminders are typically categorised as marketing, while order and shipping updates are utility messages.' },
      { q: 'Does it work with WooCommerce?', a: 'Yes. Connect WooCommerce through its REST API and the same messages are available.' },
      { q: 'When should the reminder go out?', a: 'Many stores send the first reminder within an hour or two while the purchase is still on the shopper’s mind. Test different timings for your store.' },
    ],
    related: [
      ['Shopify integration', '/integrations/shopify'],
      ['WooCommerce integration', '/integrations/woocommerce'],
      ['WhatsApp for e-commerce', '/solutions/ecommerce'],
    ],
  },
];

export const guideBySlug: Record<string, Guide> = Object.fromEntries(guides.map((g) => [g.slug, g]));
