"use client";

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin,
  Clock,
  Users2,
  Briefcase,
  Heart,
  Coffee,
  Gamepad2,
  GraduationCap,
  ArrowRight,
  Building
} from 'lucide-react';
import Link from 'next/link';

const openPositions = [
  {
    id: 'job_001',
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "4-6 years",
    description: "Build beautiful, responsive user interfaces for our WhatsApp marketing platform using React, TypeScript, and modern web technologies.",
    requirements: [
      "4+ years of React/TypeScript experience",
      "Experience with Next.js and modern CSS frameworks",
      "Strong understanding of web performance optimization",
      "Experience with testing frameworks (Jest, Cypress)"
    ]
  },
  {
    id: 'job_002',
    title: "Backend Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "3-5 years",
    description: "Design and build scalable APIs and microservices to power our WhatsApp messaging infrastructure.",
    requirements: [
      "3+ years of Node.js/Python experience",
      "Experience with databases (PostgreSQL, Redis)",
      "Knowledge of cloud platforms (AWS, GCP)",
      "Understanding of messaging systems and APIs"
    ]
  },
  {
    id: 'job_003',
    title: "Product Designer",
    department: "Design",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "3-5 years",
    description: "Create intuitive, user-centered designs for our platform that help businesses succeed with WhatsApp marketing.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma and design systems",
      "Experience with B2B SaaS products",
      "Strong understanding of user research methods"
    ]
  },
  {
    id: 'job_004',
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "4-7 years",
    description: "Build and maintain our cloud infrastructure to ensure 99.9% uptime for millions of WhatsApp messages.",
    requirements: [
      "4+ years of DevOps/SRE experience",
      "Expertise in Kubernetes and Docker",
      "Experience with CI/CD pipelines",
      "Knowledge of monitoring and observability tools"
    ]
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance for you and your family"
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "₹50,000 annual learning budget and conference attendance"
  },
  {
    icon: Coffee,
    title: "Flexible Work",
    description: "Hybrid work model with flexible hours and unlimited PTO"
  },
  {
    icon: Gamepad2,
    title: "Fun & Recreation",
    description: "Team outings, game nights, and recreational activities"
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Users2 className="w-4 h-4 mr-2" />
              Join Our Team
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build the future of{' '}
              <span className="text-primary">business messaging</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join a passionate team that's revolutionizing how businesses connect 
              with their customers through AI-powered WhatsApp marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full">
                <Briefcase className="w-5 h-5 mr-2" />
                View Open Positions
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why join BIGBROS AI?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're building something special, and we want you to be part of it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-xl text-muted-foreground">
                Find your next opportunity with us
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge variant="secondary">{job.department}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.experience}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{job.description}</p>
                        
                        <div className="space-y-2">
                          <p className="font-medium text-sm">Key Requirements:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {job.requirements.slice(0, 2).map((req, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 lg:w-48">
                        <Link href={`/careers/${job.id}`}>
                          <Button className="w-full group">
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card>
              <CardContent className="pt-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Ready to join us?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Don't see a position that fits? We're always looking for talented 
                  individuals who share our passion for innovation.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/contact">
                    <Button>
                      Get in Touch
                    </Button>
                  </Link>
                  <Button variant="outline">
                    View All Benefits
                  </Button>
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