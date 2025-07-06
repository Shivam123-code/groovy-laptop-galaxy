import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Truck, Shield } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Laptops Sold", value: "25K+", icon: Award },
    { label: "Countries Served", value: "30+", icon: Truck },
    { label: "Years Experience", value: "8+", icon: Shield },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Tech enthusiast with 15+ years in the laptop industry"
    },
    {
      name: "Sarah Johnson", 
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c108?w=300&h=300&fit=crop&crop=face",
      description: "Expert in laptop technology and customer experience"
    },
    {
      name: "Marcus Williams",
      role: "Tech Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", 
      description: "Gaming and performance laptop specialist"
    },
    {
      name: "Emma Davis",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Ensuring every customer finds their perfect laptop"
    }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We only partner with trusted brands and rigorously test every laptop before it reaches you.",
      icon: Award
    },
    {
      title: "Customer Obsessed", 
      description: "Your satisfaction is our priority. We provide expert guidance and support every step of the way.",
      icon: Users
    },
    {
      title: "Innovation Driven",
      description: "We stay ahead of tech trends to bring you the latest and greatest in laptop technology.",
      icon: Shield
    },
    {
      title: "Fast & Reliable",
      description: "Quick delivery, hassle-free returns, and responsive customer service you can count on.",
      icon: Truck
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 gradient-primary text-white font-medium text-lg px-4 py-2">
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-white">
            Powering Your
            <span className="block bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent">
              Digital Dreams
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Since 2016, we've been helping tech enthusiasts, professionals, and creators 
            find the perfect laptop to unleash their potential. From gaming beasts to 
            ultra-portable workstations, we've got you covered.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass-card p-6 rounded-2xl glow-hover">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold font-space-grotesk text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 gradient-secondary text-white font-medium">
                  Our Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6">
                  Making Premium Laptops Accessible to Everyone
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We believe everyone deserves access to cutting-edge technology. That's why we've 
                  created a curated marketplace where you can find premium laptops at competitive 
                  prices, backed by expert advice and exceptional service.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you're a student on a budget, a creative professional, or a hardcore gamer, 
                  we're here to help you find the perfect laptop that fits your needs and lifestyle.
                </p>
                <Button size="lg" className="gradient-primary hover:opacity-90 text-white font-semibold">
                  Shop Laptops
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl glass-card overflow-hidden glow-primary">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop"
                    alt="Team working on laptops"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 gradient-secondary rounded-2xl flex items-center justify-center animate-float">
                  <Award className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-electric text-electric-foreground font-medium">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values shape everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center glow-hover">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold font-space-grotesk mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-6 gradient-primary text-white font-medium">
              Meet the Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6">
              The Faces Behind Lovable Laptops
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of tech experts is here to help you find your perfect laptop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center glow-hover">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold font-space-grotesk mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-white">
            Ready to Find Your Perfect Laptop?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've found their ideal laptop with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-background hover:bg-gray-100 font-semibold px-8">
              Browse Laptops
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="glass-button border-white/20 text-white hover:bg-white/10 px-8">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;