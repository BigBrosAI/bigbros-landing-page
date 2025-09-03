"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical,
  Check,
  CheckCheck,
  Smartphone,
  Archive,
  Star
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const conversations = [
  {
    id: 'conv_001',
    contact: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    lastMessage: 'Thanks for the quick response!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unread: 2,
    status: 'active'
  },
  {
    id: 'conv_002',
    contact: {
      name: 'Michael Chen',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    lastMessage: 'When will my order be shipped?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: 1,
    status: 'active'
  },
  {
    id: 'conv_003',
    contact: {
      name: 'Emily Rodriguez',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    lastMessage: 'Perfect, I\'ll take it!',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    unread: 0,
    status: 'closed'
  }
];

const messages = [
  {
    id: 'msg_001',
    sender: 'contact',
    content: 'Hi, I\'m interested in your product. Can you tell me more about pricing?',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    status: 'read'
  },
  {
    id: 'msg_002',
    sender: 'agent',
    content: 'Hello! I\'d be happy to help you with pricing information. Our starter plan begins at $49/month and includes up to 5,000 messages.',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    status: 'delivered'
  },
  {
    id: 'msg_003',
    sender: 'contact',
    content: 'That sounds reasonable. Do you offer any discounts for annual plans?',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    status: 'read'
  },
  {
    id: 'msg_004',
    sender: 'agent',
    content: 'Yes! Annual plans come with a 20% discount. So the Growth plan would be $39/month when billed annually.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    status: 'delivered'
  },
  {
    id: 'msg_005',
    sender: 'contact',
    content: 'Thanks for the quick response!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: 'read'
  }
];

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contact.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inbox</h1>
          <p className="text-muted-foreground">
            Manage conversations with your contacts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 whatsapp-card">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full border-[#25D366]/20 focus:border-[#25D366]"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-[#25D366]/5 transition-colors ${
                    selectedConversation.id === conversation.id ? 'bg-[#25D366]/10 border-l-4 border-l-[#25D366]' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-[#25D366]/20">
                      <AvatarImage src={conversation.contact.avatar || undefined} />
                      <AvatarFallback>
                        {conversation.contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 status-indicator status-online"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.contact.name}</p>
                        {conversation.unread > 0 && (
                          <Badge className="text-xs bg-[#25D366] text-white rounded-full min-w-[20px] h-5 flex items-center justify-center">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(conversation.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2 flex flex-col whatsapp-card">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-[#25D366]/20">
                  <AvatarImage src={selectedConversation.contact.avatar || undefined} />
                  <AvatarFallback>
                    {selectedConversation.contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 status-indicator status-online"></div>
                </div>
                <div>
                  <CardTitle className="text-lg">{selectedConversation.contact.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    {selectedConversation.contact.phone}
                    <span className="ml-2 text-[#25D366] text-xs">● online</span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hover:bg-[#25D366]/10">
                  <Star className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-[#25D366]/10">
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-[#25D366]/10">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <Separator />
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background to-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`message-bubble ${
                    message.sender === 'agent'
                      ? 'sent'
                      : 'received'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70 text-right">
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </span>
                    {message.sender === 'agent' && (
                      <div className="text-xs opacity-70 ml-1">
                        {message.status === 'delivered' ? (
                          <CheckCheck className="w-3 h-3 text-blue-400" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          
          <Separator />
          
          {/* Message Input */}
          <div className="p-6 bg-muted/20">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hover:bg-[#25D366]/10 rounded-full">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 chat-input border-[#25D366]/20 focus:border-[#25D366]"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    // Handle send message
                    setNewMessage('');
                  }
                }}
              />
              <Button 
                size="sm" 
                disabled={!newMessage.trim()}
                className="rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white w-10 h-10 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}