import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { laptops } from "@/data/laptops";

const LaptopDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const laptop = laptops.find(l => l.id === id);
  
  if (!laptop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Laptop not found</h1>
          <Link to="/laptops">
            <Button className="gradient-primary text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Laptops
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedLaptops = laptops
    .filter(l => l.id !== laptop.id && (l.brand === laptop.brand || l.category === laptop.category))
    .slice(0, 4);

  const discountPercentage = laptop.originalPrice 
    ? Math.round(((laptop.originalPrice - laptop.price) / laptop.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-card-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/laptops" className="text-muted-foreground hover:text-primary">Laptops</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{laptop.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/laptops">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Laptops
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl glass-card">
              <img
                src={laptop.images[selectedImage]}
                alt={laptop.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {laptop.images.length > 1 && (
              <div className="flex gap-4">
                {laptop.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-card-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${laptop.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {laptop.isNew && (
                <Badge className="gradient-primary text-white">New</Badge>
              )}
              {laptop.isFeatured && (
                <Badge className="gradient-secondary text-white">Featured</Badge>
              )}
              {laptop.isTrending && (
                <Badge className="bg-electric text-electric-foreground">Trending</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">-{discountPercentage}% OFF</Badge>
              )}
            </div>

            {/* Title & Brand */}
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">{laptop.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                {laptop.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {laptop.shortDescription}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(laptop.rating)
                        ? "text-electric fill-electric"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{laptop.rating}</span>
              <span className="text-muted-foreground">
                ({laptop.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-foreground">
                  ${laptop.price.toLocaleString()}
                </span>
                {laptop.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${laptop.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-sm text-green-500">
                  You save ${(laptop.originalPrice! - laptop.price).toLocaleString()}!
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {laptop.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center glass-button border border-card-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {laptop.inStock ? "Only 12 left in stock!" : "Notify when available"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg"
                  disabled={!laptop.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="glass-button border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Wishlist
                </Button>
              </div>
            </div>

            {/* Quick Features */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {laptop.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {laptop.description}
                </p>
                
                <h4 className="text-lg font-semibold mb-4">What's in the Box</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    {laptop.title}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Power Adapter
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    User Manual
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Warranty Card
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(laptop.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-card-border last:border-b-0">
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(laptop.rating)
                              ? "text-electric fill-electric"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{laptop.rating}</span>
                    <span className="text-muted-foreground">
                      ({laptop.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Reviews feature coming soon! Connect to Supabase to enable user reviews.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedLaptops.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-8">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedLaptops.map((laptop) => (
                <ProductCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaptopDetailsPage;