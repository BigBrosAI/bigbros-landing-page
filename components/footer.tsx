import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
          <img src="https://raw.githubusercontent.com/shashank026/trip_planner/refs/heads/main/bbai_logo_main.png" alt="BigBros AI" width={150} height={150} />
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered WhatsApp campaigns that convert. Scale your business with intelligent messaging.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              <li><Link href="/docs" className="hover:text-foreground transition-colors">API Docs</Link></li>
              <li><Link href="/changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 BIGBROS AI Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Send className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Powered by WhatsApp Business API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}