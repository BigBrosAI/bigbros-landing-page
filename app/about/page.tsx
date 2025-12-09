import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Users2, 
  Target, 
  Lightbulb, 
  Award,
  MapPin,
  Calendar,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';
import Link from 'next/link';

const team = [
  {
    name: "Manju Sharma",
    role: "Director & Co-founder",
    // image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    // bio: "Former WhatsApp engineer with 10+ years in messaging platforms",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Ranu Sharma",
    role: "Director & Co-founder", 
    // image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    // bio: "AI/ML expert, previously at Google and Microsoft",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Rumi Devi",
    role: "Director & Co-founder",
    // image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    // bio: "Product leader with experience scaling B2B SaaS platforms",
    linkedin: "#",
    twitter: "#"
  }
];

const milestones = [
  {
    year: "2023",
    title: "Company Founded",
    description: "Started with a vision to democratize WhatsApp marketing for Indian businesses"
  },
  {
    year: "2024",
    title: "AI Integration",
    description: "Launched AI-powered template generation and campaign optimization"
  },
  {
    year: "2024",
    title: "10M+ Messages",
    description: "Crossed 10 million messages delivered across 1000+ businesses"
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Expanding to serve businesses across Southeast Asia and beyond"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Users2 className="w-4 h-4 mr-2" />
              About BIGBROS AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building the future of{' '}
              <span className="text-primary">business messaging</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're on a mission to help businesses connect with their customers through 
              intelligent, automated WhatsApp campaigns that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize WhatsApp marketing by making it accessible, 
                  intelligent, and effective for businesses of all sizes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the leading AI-powered messaging platform that 
                  transforms how businesses communicate with their customers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-500" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Innovation, transparency, customer success, and building 
                  technology that makes a meaningful impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet our team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're a passionate team of engineers, designers, and marketers 
              building the future of business messaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
                    {/* <AvatarImage src={member?.image || ''} alt={member.name} /> */}
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  {/* <p className="text-muted-foreground text-sm mb-4">{member?.bio}</p> */}
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="sm" className="w-9 px-0">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-9 px-0">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our journey</h2>
              <p className="text-xl text-muted-foreground">
                From startup to scale - here's how we've grown
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-16 bg-border mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Location */}
      <section className="py-16 section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card>
              <CardContent className="pt-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Proudly based in India</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Headquartered in Bangalore, we're building world-class technology 
                  with a deep understanding of the Indian market and global ambitions.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/contact">
                    <Button>Get in touch</Button>
                  </Link>
                  <Link href="/careers">
                    <Button variant="outline">Join our team</Button>
                  </Link>
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