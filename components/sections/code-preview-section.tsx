"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const codeExamples = {
  react: `import { BigbrosAI } from '@bigbros-ai/sdk';

const client = new BigbrosAI({
  apiKey: process.env.BIGBROS_API_KEY
});

// Send a campaign
const campaign = await client.campaigns.create({
  name: "Welcome Series",
  template: "welcome_template",
  audience: "new_customers",
  schedule: "2024-01-15T10:00:00Z"
});

// Track results
const analytics = await client.analytics.getCampaign(
  campaign.id
);`,
  
  curl: `# Create a new campaign
curl -X POST "https://api.bigbros.ai/v1/campaigns" \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Welcome Series",
    "template": "welcome_template",
    "audience": "new_customers",
    "schedule": "2024-01-15T10:00:00Z"
  }'`,
  
  cli: `# Install the CLI
npm install -g @bigbros-ai/cli

# Authenticate
bigbros auth login

# Create and send a campaign
bigbros campaigns create \\
  --name "Welcome Series" \\
  --template welcome_template \\
  --audience new_customers \\
  --schedule "2024-01-15T10:00:00Z"

# View analytics
bigbros analytics campaigns --campaign-id cam_123`
};

export function CodePreviewSection() {
  const [activeTab, setActiveTab] = useState('react');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExamples[activeTab as keyof typeof codeExamples]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start sending campaigns in{' '}
                <span className="text-primary">minutes</span>, not hours
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our developer-friendly API and intuitive dashboard make it easy to integrate 
                WhatsApp marketing into your existing workflow.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg">Setup in under 5 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg">RESTful API with SDKs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg">Real-time webhooks</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - Code preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between p-4 border-b">
                      <TabsList className="grid w-full max-w-md grid-cols-3">
                        <TabsTrigger value="react">React</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                        <TabsTrigger value="cli">CLI</TabsTrigger>
                      </TabsList>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                        className="ml-2"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    {Object.entries(codeExamples).map(([key, code]) => (
                      <TabsContent key={key} value={key} className="m-0">
                        <pre className="p-6 text-sm overflow-x-auto">
                          <code className="text-foreground/90">{code}</code>
                        </pre>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}