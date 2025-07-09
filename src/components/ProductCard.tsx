import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Laptop } from "@/data/laptops";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  laptop: Laptop;
}

const ProductCard = ({ laptop }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addToCart(laptop.id);
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleWishlist(laptop.id);
  };
  const {
    id,
    title,
    brand,
    price,
    originalPrice,
    shortDescription,
    images,
    rating,
    reviewCount,
    isNew,
    isFeatured,
    isTrending,
    inStock
  } = laptop;

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group glass-card p-4 rounded-2xl hover:shadow-2xl glow-hover transition-all duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="gradient-primary text-white font-medium">
              New
            </Badge>
          )}
          {isFeatured && (
            <Badge className="gradient-secondary text-white font-medium">
              Featured
            </Badge>
          )}
          {isTrending && (
            <Badge className="bg-electric text-electric-foreground font-medium">
              Trending
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="font-medium">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            variant="secondary" 
            className="w-8 h-8 p-0 glass-button"
            onClick={handleToggleWishlist}
            disabled={!user}
          >
            <Heart className={`w-4 h-4 ${isInWishlist(laptop.id) ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button 
            size="sm" 
            className="w-full gradient-primary hover:opacity-90 text-white font-medium"
            onClick={handleAddToCart}
            disabled={!inStock || !user}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {!user ? 'Sign in to buy' : !inStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Brand & Title */}
        <div>
          <p className="text-sm text-muted-foreground font-medium">{brand}</p>
          <Link 
            to={`/laptop/${id}`}
            className="font-semibold text-foreground hover:text-primary transition-colors duration-200 line-clamp-2"
          >
            {title}
          </Link>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {shortDescription}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-electric fill-electric"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              ${price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {inStock ? (
              <Badge variant="outline" className="text-xs text-primary border-primary">
                In Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs text-destructive border-destructive">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;