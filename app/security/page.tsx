"use client";

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield,
  Lock,
  Eye,
  Server,
  FileCheck,
  Users2,
  AlertTriangle,
  CheckCircle,
  Download
} from 'lucide-react';
import Link from 'next/link';

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All messages are encrypted in transit and at rest using industry-standard AES-256 encryption."
  },
  {
    icon: Shield,
    title: "SOC 2 Type II Compliant",
    description: "We maintain the highest security standards with regular third-party audits and compliance certifications."
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Our infrastructure is hosted on AWS with multi-region redundancy and 99.9% uptime SLA."
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description: "We collect only the minimum data required and never share personal information with third parties."
  },
  {
    icon: Users2,
    title: "Access Controls",
    description: "Role-based permissions and multi-factor authentication to protect your account."
  },
  {
    icon: FileCheck,
    title: "Regular Audits",
    description: "Continuous security monitoring and regular penetration testing by certified security firms."
  }
];

const certifications = [
  {
    name: "SOC 2 Type II",
    description: "Security, availability, and confidentiality",
    status: "Certified",
    date: "Valid until Dec 2025"
  },
  {
    name: "ISO 27001",
    description: "Information security management",
    status: "In Progress",
    date: "Expected Q2 2025"
  },
  {
    name: "GDPR Compliant",
    description: "European data protection regulation",
    status: "Certified",
    date: "Ongoing compliance"
  },
  {
    name: "WhatsApp Business API",
    description: "Official WhatsApp partner certification",
    status: "Certified",
    date: "Valid until Dec 2025"
  }
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Security & Compliance
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your data is{' '}
              <span className="text-primary">safe with us</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We take security seriously. Our platform is built with enterprise-grade 
              security measures to protect your business and customer data.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Features</h2>
              <p className="text-xl text-muted-foreground">
                Built with security at every layer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature) => (
                <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Compliance</h2>
              <p className="text-xl text-muted-foreground">
                We meet the highest industry standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{cert.name}</h3>
                      <div className="flex items-center gap-2">
                        {cert.status === 'Certified' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                        )}
                        <Badge 
                          variant={cert.status === 'Certified' ? 'secondary' : 'outline'}
                          className={cert.status === 'Certified' ? 'text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300' : ''}
                        >
                          {cert.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{cert.description}</p>
                    <p className="text-sm text-muted-foreground">{cert.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Our Security Practices</CardTitle>
                <CardDescription>
                  How we protect your data and maintain security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Data Protection</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        All data encrypted at rest and in transit
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Regular automated backups with point-in-time recovery
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Data residency controls for compliance requirements
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Access Security</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Multi-factor authentication required
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Role-based access controls (RBAC)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Session management and automatic timeouts
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Download Security Whitepaper
                    </Button>
                    <Link href="/contact">
                      <Button variant="outline">
                        Contact Security Team
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}