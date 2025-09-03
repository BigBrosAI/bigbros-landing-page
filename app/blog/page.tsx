"use client";

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Users2,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const blogPosts = [
  {
    id: 'post_001',
    title: "10 WhatsApp Marketing Strategies That Actually Work in 2025",
    excerpt: "Discover the latest tactics that top Indian businesses are using to drive engagement and conversions through WhatsApp.",
    author: {
      name: "Priya Sharma",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      role: "Marketing Expert"
    },
    category: "Strategy",
    readTime: "8 min read",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    featured: true
  },
  {
    id: 'post_002',
    title: "How AI is Revolutionizing Customer Communication",
    excerpt: "Explore how artificial intelligence is transforming the way businesses communicate with their customers through messaging platforms.",
    author: {
      name: "Rajesh Kumar",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      role: "CEO"
    },
    category: "Technology",
    readTime: "6 min read",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 'post_003',
    title: "Building Trust Through Personalized Messaging",
    excerpt: "Learn how to create authentic, personalized WhatsApp campaigns that build lasting relationships with your customers.",
    author: {
      name: "Arjun Patel",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      role: "Product Manager"
    },
    category: "Best Practices",
    readTime: "5 min read",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 'post_004',
    title: "WhatsApp Business API: Complete Setup Guide",
    excerpt: "Step-by-step guide to setting up WhatsApp Business API for your business, including approval process and best practices.",
    author: {
      name: "Sneha Reddy",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      role: "Technical Writer"
    },
    category: "Tutorial",
    readTime: "12 min read",
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    featured: false
  }
];

const categories = ["All", "Strategy", "Technology", "Best Practices", "Tutorial"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              BIGBROS AI Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Insights & Updates
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay updated with the latest WhatsApp marketing strategies, 
              platform updates, and industry insights.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-lg rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <Badge className="mb-4">Featured Article</Badge>
                <h2 className="text-2xl font-bold">Editor's Pick</h2>
              </div>
              
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge variant="secondary" className="mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={featuredPost.author.avatar} />
                          <AvatarFallback>
                            {featuredPost.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{featuredPost.author.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDistanceToNow(featuredPost.publishedAt, { addSuffix: true })}
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            {featuredPost.readTime}
                          </div>
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.id}`}>
                        <Button className="group">
                          Read more
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(post.publishedAt, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="group/btn">
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}