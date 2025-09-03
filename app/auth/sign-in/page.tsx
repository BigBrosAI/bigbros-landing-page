"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/logo';
import { Github, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { toast } from 'sonner';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center whatsapp-chat-bg px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#25D366] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        <Card className="whatsapp-card">
          <CardHeader className="text-center space-y-4">
            <Logo className="justify-center" />
            <div>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-[#25D366]/20 focus:border-[#25D366]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-[#25D366]/20 focus:border-[#25D366]"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl py-3" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
            
            <div className="space-y-4">
              <Separator />
              
              <Button variant="outline" className="w-full rounded-xl border-[#25D366]/20 hover:border-[#25D366] hover:bg-[#25D366]/5" type="button">
                <Github className="w-4 h-4 mr-2" />
                Continue with GitHub
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/auth/sign-up" className="text-[#25D366] hover:underline font-medium">
                  Sign up
                </Link>
              </div>
              
              <div className="text-center">
                <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-[#25D366]">
                  Forgot your password?
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}