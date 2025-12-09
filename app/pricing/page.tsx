"use client";

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Send, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const plans = {
  monthly: [
    {
      name: "Starter",
      price: "₹0",
      originalPrice: null,
      description: "Perfect for small businesses getting started",
      icon: Send,
      features: [
        "100 messages/month",
        "1 team member",
        "Basic templates",
        "Email support",
        "Campaign analytics",
        "Contact management"
      ],
      limitations: [
        "No automation",
        "No AI assistant",
        "Basic reporting"
      ],
      cta: "Start free",
      href: "/auth/sign-up",
      popular: false
    },
    {
      name: "Growth",
      price: "₹1500",
      originalPrice: null,
      description: "For growing businesses with advanced needs",
      icon: Zap,
      features: [
        "5,000 messages/month",
        "5 team members",
        "AI template assistant",
        "Basic automations",
        "Priority support",
        "Advanced analytics",
        "Custom fields",
        "Segmentation",
        "A/B testing"
      ],
      limitations: [],
      cta: "Start free trial",
      href: "/auth/sign-up",
      popular: true
    },
    {
      name: "Scale",
      price: "₹3200",
      originalPrice: null,
      description: "For enterprises with high-volume campaigns",
      icon: Crown,
      features: [
        "25,000 messages/month",
        "Unlimited team members",
        "Advanced automations",
        "White-label options",
        "Dedicated support",
        "Custom integrations",
        "Advanced flows",
        "Multi-workspace",
        "SSO & SAML",
        "API access"
      ],
      limitations: [],
      cta: "Talk to sales",
      href: "/contact",
      popular: false
    }
  ],
  yearly: [
    {
      name: "Starter",
      price: "₹0",
      originalPrice: null,
      description: "Perfect for small businesses getting started",
      icon: Send,
      features: [
        "100 messages/month",
        "1 team member",
        "Basic templates",
        "Email support",
        "Campaign analytics",
        "Contact management"
      ],
      limitations: [
        "No automation",
        "No AI assistant",
        "Basic reporting"
      ],
      cta: "Start free",
      href: "/auth/sign-up",
      popular: false
    },
    {
      name: "Growth",
      price: "₹1350",
      originalPrice: "₹1500",
      description: "For growing businesses with advanced needs",
      icon: Zap,
      features: [
        "5,000 messages/month",
        "5 team members",
        "AI template assistant",
        "Basic automations",
        "Priority support",
        "Advanced analytics",
        "Custom fields",
        "Segmentation",
        "A/B testing"
      ],
      limitations: [],
      cta: "Start free trial",
      href: "/auth/sign-up",
      popular: true
    },
    {
      name: "Scale",
      price: "₹2880",
      originalPrice: "₹3200",
      description: "For enterprises with high-volume campaigns",
      icon: Crown,
      features: [
        "25,000 messages/month",
        "Unlimited team members",
        "Advanced automations",
        "White-label options",
        "Dedicated support",
        "Custom integrations",
        "Advanced flows",
        "Multi-workspace",
        "SSO & SAML",
        "API access"
      ],
      limitations: [],
      cta: "Talk to sales",
      href: "/contact",
      popular: false
    }
  ]
};

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const currentPlans = isYearly ? plans.yearly : plans.monthly;

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Simple, transparent{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  pricing
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Choose the perfect plan for your business. Upgrade or downgrade at any time.
              </p>

              <div className="flex items-center justify-center gap-4 mb-2">
                <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Monthly
                </span>
                <Switch
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Yearly
                </span>
                <Badge variant="secondary" className="ml-2">
                  Save 10%
                </Badge>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full relative ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#25D366] text-white rounded-full px-4 py-1">
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${plan.popular ? 'bg-[#25D366]/10' : 'bg-muted/50'}`}>
                      <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-[#25D366]' : 'text-muted-foreground'}`} />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>

                    <div className="mt-6">
                      <div className="flex items-baseline justify-center gap-1">
                        {plan.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            {plan.originalPrice}
                          </span>
                        )}
                        <span className={`text-5xl font-bold ${plan.popular ? 'text-primary' : ''}`}>
                          {plan.price === '₹0' ? 'Free' : plan.price}
                        </span>
                        {plan.price !== '₹0' && (
                          <span className="text-muted-foreground">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      {plan.originalPrice && (
                        <p className="text-sm text-[#25D366] mt-1 font-medium">
                          Save ₹{parseInt(plan.originalPrice.replace('₹', '').replace(',', '')) - parseInt(plan.price.replace('₹', '').replace(',', ''))} per month
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Link href={plan.href}>
                      <Button
                        className={`w-full rounded-full ${plan.popular ? 'shadow-lg' : ''}`}
                        variant={plan.popular ? "default" : "outline"}
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </Link>

                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Feature comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Compare all features</CardTitle>
                <CardDescription>
                  See what's included in each plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 pr-4">Features</th>
                        <th className="text-center py-3 px-4">Starter</th>
                        <th className="text-center py-3 px-4">Growth</th>
                        <th className="text-center py-3 px-4">Scale</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 pr-4">Monthly messages</td>
                        <td className="text-center py-3 px-4">100</td>
                        <td className="text-center py-3 px-4">5,000</td>
                        <td className="text-center py-3 px-4">25,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4">Team members</td>
                        <td className="text-center py-3 px-4">1</td>
                        <td className="text-center py-3 px-4">5</td>
                        <td className="text-center py-3 px-4">Unlimited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4">AI template assistant</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                        <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4">Automation flows</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4">Basic</td>
                        <td className="text-center py-3 px-4">Advanced</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4">API access</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}