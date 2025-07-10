import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Laptop = Database['public']['Tables']['laptops']['Row'] & {
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
    weight: string;
    os: string;
  };
  shortDescription: string;
  isNew: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  reviewCount: number;
  inStock: boolean;
  originalPrice?: number;
};

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch laptops from database
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const { data, error } = await supabase
          .from('laptops')
          .select('*');
        
        if (error) throw error;
        
        // Transform database data to include missing properties
        const transformedData: Laptop[] = data.map(laptop => ({
          ...laptop,
          price: Number(laptop.price),
          rating: Number(laptop.rating),
          specs: {
            processor: laptop.processor,
            ram: laptop.ram,
            storage: laptop.storage,
            display: laptop.display,
            graphics: laptop.graphics,
            battery: laptop.battery,
            weight: laptop.weight,
            os: laptop.os
          },
          shortDescription: laptop.short_description || '',
          isNew: laptop.is_new || false,
          isFeatured: laptop.is_featured || false,
          isTrending: laptop.is_trending || false,
          reviewCount: laptop.review_count || 0,
          inStock: laptop.in_stock,
          originalPrice: laptop.original_price ? Number(laptop.original_price) : undefined
        }));
        
        setLaptops(transformedData);
      } catch (error) {
        console.error('Error fetching laptops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  const heroSlides = laptops.length > 0 ? [
    {
      title: laptops.find(l => l.isFeatured)?.title || "Premium Laptops",
      subtitle: "Unleash Your Creative Potential",
      description: "Experience ultimate performance with cutting-edge technology",
      image: laptops.find(l => l.isFeatured)?.images?.[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop",
      cta: "Shop Now",
      laptop: laptops.find(l => l.isFeatured) || laptops[0]
    },
    {
      title: "Gaming Excellence",
      subtitle: "Performance Unleashed",
      description: "High-refresh displays and powerful graphics for the ultimate gaming experience",
      image: laptops.find(l => l.category === "Gaming")?.images?.[0] || "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&h=600&fit=crop",
      cta: "Level Up",
      laptop: laptops.find(l => l.category === "Gaming") || laptops[1]
    },
    {
      title: "Business Excellence",
      subtitle: "Professional Grade",
      description: "Enterprise-level security and reliability for professional success",
      image: laptops.find(l => l.category === "Business")?.images?.[0] || "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=600&fit=crop",
      cta: "Explore",
      laptop: laptops.find(l => l.category === "Business") || laptops[2]
    }
  ] : [];

  const featuredLaptops = laptops.filter(laptop => laptop.isFeatured);
  const trendingLaptops = laptops.filter(laptop => laptop.isTrending);
  const newLaptops = laptops.filter(laptop => laptop.isNew);

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading amazing laptops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Hero Slides */}
        {heroSlides.length > 0 && heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="animate-slide-up">
              <Badge className="mb-4 gradient-primary text-white font-medium">
                {heroSlides.length > 0 && heroSlides[currentSlide]?.laptop?.isNew ? "New Arrival" : "Featured"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-4 leading-tight">
                {heroSlides.length > 0 ? heroSlides[currentSlide]?.title : "Premium Laptops"}
              </h1>
              <h2 className="text-xl md:text-2xl text-secondary-glow mb-6">
                {heroSlides.length > 0 ? heroSlides[currentSlide]?.subtitle : "Professional Excellence"}
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
                {heroSlides.length > 0 ? heroSlides[currentSlide]?.description : "Discover premium laptops for every need"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroSlides.length > 0 && heroSlides[currentSlide]?.laptop && (
                  <Link to={`/laptop/${heroSlides[currentSlide].laptop.id}`}>
                    <Button 
                      size="lg" 
                      className="gradient-primary hover:opacity-90 text-white font-semibold px-8 py-6 text-lg glow-primary"
                    >
                      {heroSlides[currentSlide].cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                )}
                <Link to="/laptops">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="glass-button border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  >
                    View All Laptops
                    <ShoppingCart className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-primary scale-125" 
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-secondary text-white font-medium">
              Handpicked for You
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
              Featured Laptops
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of premium laptops designed for every lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {featuredLaptops.map((laptop) => (
              <ProductCard key={laptop.id} laptop={laptop} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/laptops">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-button border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View All Laptops
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending & New Arrivals */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Trending */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 bg-electric text-electric-foreground font-medium">
                  🔥 Hot Right Now
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-4">
                  Trending Laptops
                </h3>
                <p className="text-muted-foreground">
                  What everyone's talking about this month
                </p>
              </div>
              
              <div className="space-y-6">
                {trendingLaptops.slice(0, 3).map((laptop, index) => (
                  <div key={laptop.id} className="flex items-center space-x-4 glass-card p-4 rounded-xl">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{laptop.title}</h4>
                      <p className="text-sm text-muted-foreground">{laptop.shortDescription || laptop.short_description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-electric fill-electric" />
                          <span className="text-sm ml-1">{laptop.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({laptop.reviewCount || laptop.review_count || 0} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${Number(laptop.price).toLocaleString()}</p>
                      <Link to={`/laptop/${laptop.id}`}>
                        <Button size="sm" variant="ghost" className="text-primary">
                          View <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Arrivals */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 gradient-primary text-white font-medium">
                  ✨ Just Landed
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-4">
                  New Arrivals
                </h3>
                <p className="text-muted-foreground">
                  Fresh tech straight from the manufacturers
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {newLaptops.slice(0, 2).map((laptop) => (
                  <ProductCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4 text-white">
              Stay in the Loop
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Get exclusive deals, tech insights, and early access to new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg glass-button border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
              <Button 
                size="lg" 
                className="gradient-primary hover:opacity-90 text-white font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;