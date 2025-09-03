"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, MessageCircle, Zap, BarChart3 } from 'lucide-react';
import { Send, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="text-sm px-6 py-3 rounded-full">
              <Zap className="w-4 h-4 mr-2" />
              Now with AI-powered templates
            </Badge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
          >
            <span className="text-primary">
              WhatsApp campaigns
            </span>
            <br />
            <span className="text-foreground">Supercharged by AI</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Create, automate, and analyze WhatsApp broadcasts in minutes—no code, no hassle.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <Link href="/auth/sign-up">
              <Button size="lg" className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
                Start free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-12 py-6 rounded-full border-2 group">
              <Play className="mr-2 w-5 h-5" />
              Watch demo
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-medium">99.9% delivery rate</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-medium">5 min setup</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-medium">Real-time analytics</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}