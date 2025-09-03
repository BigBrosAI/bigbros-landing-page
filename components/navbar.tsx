"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, LayoutDashboard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/components/auth-provider';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-muted-foreground hover:text-[#25D366] transition-colors font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-[#25D366] transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-[#25D366] transition-colors font-medium">
              About
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-[#25D366] transition-colors font-medium">
              Blog
            </Link>
            <Link href="/docs" className="text-muted-foreground hover:text-[#25D366] transition-colors font-medium">
              Docs
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-9 px-0 hover:bg-[#25D366]/10"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              {user ? (
                <Link href="/dashboard">
                  <Button className="gap-2 rounded-full px-6">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/sign-in">
                    <Button variant="ghost">Sign in</Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button className="rounded-full px-6">Start free</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="/#features"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/docs"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              
              <div className="pt-4 space-y-2">
                {user ? (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/sign-in" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Sign in</Button>
                    </Link>
                    <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Start free</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}