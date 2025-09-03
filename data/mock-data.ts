export const mockCampaigns = [
  {
    id: 'camp_001',
    name: 'Welcome Series',
    status: 'active',
    type: 'automation',
    scheduled: new Date(Date.now() - 2 * 60 * 60 * 1000),
    sent: 1247,
    delivered: 1235,
    read: 892,
    clicked: 267,
    conversions: 45,
    templateId: 'tpl_001',
    audienceSize: 1500
  },
  {
    id: 'camp_002',
    name: 'Product Launch',
    status: 'sent',
    type: 'broadcast',
    scheduled: new Date(Date.now() - 24 * 60 * 60 * 1000),
    sent: 3421,
    delivered: 3398,
    read: 2156,
    clicked: 542,
    conversions: 89,
    templateId: 'tpl_002',
    audienceSize: 3500
  },
  {
    id: 'camp_003',
    name: 'Cart Abandonment',
    status: 'draft',
    type: 'automation',
    scheduled: null,
    sent: 0,
    delivered: 0,
    read: 0,
    clicked: 0,
    conversions: 0,
    templateId: 'tpl_003',
    audienceSize: 2000
  },
  {
    id: 'camp_004',
    name: 'Black Friday Sale',
    status: 'scheduled',
    type: 'broadcast',
    scheduled: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    sent: 0,
    delivered: 0,
    read: 0,
    clicked: 0,
    conversions: 0,
    templateId: 'tpl_004',
    audienceSize: 5000
  }
];

export const mockTemplates = [
  {
    id: 'tpl_001',
    name: 'Welcome Message',
    category: 'marketing',
    status: 'approved',
    language: 'en',
    placeholders: ['name', 'company'],
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    content: 'Hi {{name}}, welcome to {{company}}! 🎉 We\'re excited to have you on board.',
    headerType: 'text',
    buttonType: 'call_to_action',
    buttonText: 'Get Started'
  },
  {
    id: 'tpl_002',
    name: 'Order Confirmation',
    category: 'utility',
    status: 'approved',
    language: 'en',
    placeholders: ['order_id', 'amount', 'delivery_date'],
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    content: 'Your order #{{order_id}} for {{amount}} has been confirmed! Expected delivery: {{delivery_date}}',
    headerType: 'text',
    buttonType: 'quick_reply',
    buttonText: 'Track Order'
  }
];

export const mockContacts = [
  {
    id: 'con_001',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    tags: ['vip', 'customer'],
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    optedIn: true,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    customFields: {
      company: 'TechCorp',
      position: 'Marketing Director'
    }
  },
  {
    id: 'con_002',
    name: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    email: 'michael.chen@email.com',
    tags: ['lead'],
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    optedIn: true,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    customFields: {
      company: 'StartupXYZ',
      position: 'CEO'
    }
  }
];

export const mockAnalytics = {
  overview: {
    totalMessages: 12847,
    deliveryRate: 98.4,
    clickRate: 24.8,
    conversionRate: 5.2,
    totalRevenue: 47853
  },
  chartData: [
    { date: '2025-01-01', sent: 1200, delivered: 1180, read: 850, clicked: 267 },
    { date: '2025-01-02', sent: 980, delivered: 965, read: 720, clicked: 189 },
    { date: '2025-01-03', sent: 1450, delivered: 1420, read: 1050, clicked: 342 }
  ]
};