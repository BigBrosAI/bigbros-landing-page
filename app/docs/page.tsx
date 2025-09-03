"use client";

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  BookOpen,
  Code,
  Zap,
  Shield,
  ArrowRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const quickStart = [
  {
    step: 1,
    title: "Get your API key",
    description: "Sign up and get your API key from the dashboard",
    code: `const client = new BigbrosAI({
  apiKey: 'your_api_key_here'
});`
  },
  {
    step: 2,
    title: "Install the SDK",
    description: "Install our JavaScript SDK via npm",
    code: `npm install @bigbros-ai/sdk`
  },
  {
    step: 3,
    title: "Send your first message",
    description: "Create and send a WhatsApp campaign",
    code: `const campaign = await client.campaigns.create({
  name: "Welcome Campaign",
  template: "welcome_template",
  audience: "new_customers"
});`
  }
];

const apiEndpoints = [
  {
    method: "POST",
    endpoint: "/v1/campaigns",
    description: "Create a new WhatsApp campaign",
    category: "Campaigns"
  },
  {
    method: "GET",
    endpoint: "/v1/campaigns/{id}",
    description: "Get campaign details and analytics",
    category: "Campaigns"
  },
  {
    method: "POST",
    endpoint: "/v1/templates",
    description: "Create a new message template",
    category: "Templates"
  },
  {
    method: "GET",
    endpoint: "/v1/contacts",
    description: "List all contacts with filtering",
    category: "Contacts"
  },
  {
    method: "POST",
    endpoint: "/v1/automations",
    description: "Create automation flows",
    category: "Automations"
  },
  {
    method: "GET",
    endpoint: "/v1/analytics",
    description: "Get detailed analytics and reports",
    category: "Analytics"
  }
];

const resources = [
  {
    title: "API Reference",
    description: "Complete API documentation with examples",
    icon: Code,
    href: "/docs/api",
    badge: "Popular"
  },
  {
    title: "Quick Start Guide",
    description: "Get up and running in 5 minutes",
    icon: Zap,
    href: "/docs/quickstart",
    badge: "New"
  },
  {
    title: "Authentication",
    description: "Learn how to authenticate API requests",
    icon: Shield,
    href: "/docs/auth",
    badge: null
  },
  {
    title: "Webhooks",
    description: "Set up real-time event notifications",
    icon: BookOpen,
    href: "/docs/webhooks",
    badge: null
  }
];

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build with{' '}
              <span className="text-primary">BIGBROS AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Everything you need to integrate WhatsApp marketing into your applications. 
              From quick start guides to detailed API references.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-lg rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
              <p className="text-xl text-muted-foreground">
                Get started with BIGBROS AI in just 3 steps
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {quickStart.map((item, index) => (
                <Card key={item.step} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{item.code}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyCode(item.code, index)}
                      >
                        {copiedCode === index ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">API Endpoints</h2>
              <p className="text-xl text-muted-foreground">
                Explore our RESTful API endpoints
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge 
                            variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                            className="font-mono"
                          >
                            {endpoint.method}
                          </Badge>
                          <div>
                            <code className="text-sm font-mono">{endpoint.endpoint}</code>
                            <p className="text-muted-foreground text-sm mt-1">
                              {endpoint.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{endpoint.category}</Badge>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Resources</h2>
              <p className="text-xl text-muted-foreground">
                Guides, tutorials, and references to help you succeed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <Link key={resource.title} href={resource.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <resource.icon className="w-6 h-6 text-primary" />
                        </div>
                        {resource.badge && (
                          <Badge variant="secondary">{resource.badge}</Badge>
                        )}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {resource.description}
                      </CardDescription>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}