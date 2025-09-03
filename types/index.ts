export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'sent' | 'paused';
  type: 'broadcast' | 'automation';
  scheduled?: Date | null;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  conversions: number;
  templateId: string;
  audienceSize: number;
  createdAt?: Date;
}

export interface Template {
  id: string;
  name: string;
  category: 'marketing' | 'utility' | 'authentication';
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  language: string;
  placeholders: string[];
  lastModified: Date;
  content: string;
  headerType?: 'text' | 'image' | 'video';
  buttonType?: 'call_to_action' | 'quick_reply' | 'url';
  buttonText?: string;
  createdAt?: Date;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  tags: string[];
  lastActive: Date;
  optedIn: boolean;
  avatar?: string;
  customFields?: Record<string, any>;
  createdAt?: Date;
}

export interface Conversation {
  id: string;
  contact: {
    name: string;
    phone: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: Date;
  unread: number;
  status: 'active' | 'closed' | 'pending';
}

export interface Message {
  id: string;
  sender: 'contact' | 'agent';
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'document';
}

export interface Analytics {
  overview: {
    totalMessages: number;
    deliveryRate: number;
    clickRate: number;
    conversionRate: number;
    totalRevenue: number;
  };
  chartData: Array<{
    date: string;
    sent: number;
    delivered: number;
    read: number;
    clicked: number;
  }>;
}