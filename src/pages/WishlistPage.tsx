import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-muted-foreground mb-4">You need to be signed in to view your wishlist</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-4">Save laptops you like to view them later</p>
          <Button onClick={() => navigate('/laptops')}>Browse Laptops</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (laptopId: string) => {
    await addToCart(laptopId);
  };

  const handleRemoveFromWishlist = async (laptopId: string) => {
    await removeFromWishlist(laptopId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={item.laptop.images[0] || '/placeholder.svg'}
                  alt={item.laptop.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromWishlist(item.laptop.id)}
                >
                  <Heart className="w-4 h-4 fill-current text-red-500" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.laptop.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{item.laptop.brand}</p>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {item.laptop.short_description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-primary">
                      ${item.laptop.price.toLocaleString()}
                    </span>
                    {item.laptop.original_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.laptop.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">★</span>
                    <span className="text-sm font-medium">{item.laptop.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleAddToCart(item.laptop.id)}
                    disabled={!item.laptop.in_stock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.laptop.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/laptop/${item.laptop.id}`)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;