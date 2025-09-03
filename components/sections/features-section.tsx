"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  GitBranch, 
  Bot, 
  Users2, 
  FileText, 
  TrendingUp,
  Zap,
  Shield,
  Globe2
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Send,
    title: "Campaign Builder",
    description: "Create powerful WhatsApp broadcasts with advanced segmentation and targeting options.",
    badge: "Popular",
    color: "text-primary"
  },
  {
    icon: GitBranch,
    title: "Flows & Automation",
    description: "Set up drip campaigns, welcome sequences, and abandoned cart recovery flows automatically.",
    badge: "New",
    color: "text-accent"
  },
  {
    icon: Bot,
    title: "AI Template Assistant",
    description: "Generate engaging message templates instantly with our AI-powered content creation tool.",
    badge: "AI",
    color: "text-blue-500"
  },
  {
    icon: Users2,
    title: "Inbox & Team Collaboration",
    description: "Manage conversations seamlessly with team assignments, shared inboxes, and quick replies.",
    badge: null,
    color: "text-green-500"
  },
  {
    icon: FileText,
    title: "Templates & Approvals",
    description: "Submit WhatsApp business templates for approval with our streamlined review process.",
    badge: null,
    color: "text-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Analytics & Conversion Tracking",
    description: "Track performance with detailed metrics, conversion funnels, and ROI analytics.",
    badge: null,
    color: "text-purple-500"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything you need to scale your{' '}
              <span className="text-primary">
                WhatsApp marketing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From campaign creation to performance tracking, we've got all the tools to make your WhatsApp marketing successful.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group whatsapp-card hover:border-[#25D366]/30">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {feature.badge && (
                      <Badge variant={feature.badge === 'AI' ? 'default' : 'secondary'} className="rounded-full">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional features grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4 p-8 rounded-2xl bg-card/50 backdrop-blur border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Enterprise Security</h3>
              <p className="text-muted-foreground">
                SOC 2 compliant with end-to-end encryption and data protection.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4 p-8 rounded-2xl bg-card/50 backdrop-blur border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Globe2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Global Reach</h3>
              <p className="text-muted-foreground">
                Send messages to 180+ countries with multi-language support.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4 p-8 rounded-2xl bg-card/50 backdrop-blur border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Send thousands of messages per minute with our optimized infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}