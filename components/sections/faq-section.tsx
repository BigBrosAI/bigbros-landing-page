"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "How quickly can I start sending WhatsApp campaigns?",
    answer: "You can start sending campaigns within 5 minutes of signing up. Simply connect your WhatsApp Business API, import your contacts, and create your first campaign using our drag-and-drop builder."
  },
  {
    question: "Do I need WhatsApp Business API approval?",
    answer: "Yes, you'll need WhatsApp Business API approval to send marketing messages. We provide step-by-step guidance and can help expedite the approval process. For existing approved accounts, integration takes just minutes."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 100 messages per month, basic templates, campaign analytics, and email support. Perfect for small businesses getting started with WhatsApp marketing."
  },
  {
    question: "Can I integrate BIGBROS AI with my existing tools?",
    answer: "Absolutely! We offer integrations with popular CRMs, e-commerce platforms, and marketing tools. Our REST API and webhooks make it easy to connect with any system."
  },
  {
    question: "How does the AI template assistant work?",
    answer: "Our AI analyzes your business type, target audience, and campaign goals to generate personalized message templates. It learns from successful campaigns to improve suggestions over time."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer 24/7 email support for all plans, with priority support and dedicated account managers for Enterprise customers. Our knowledge base and video tutorials help you get the most out of the platform."
  }
];

export function FaqSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about BIGBROS AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}