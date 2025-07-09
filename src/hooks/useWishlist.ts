import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface WishlistItem {
  id: string;
  laptop_id: string;
  laptop: {
    id: string;
    title: string;
    price: number;
    original_price: number | null;
    images: string[];
    brand: string;
    short_description: string;
    rating: number;
    in_stock: boolean;
  };
}

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchWishlistItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          id,
          laptop_id,
          laptop:laptops (
            id,
            title,
            price,
            original_price,
            images,
            brand,
            short_description,
            rating,
            in_stock
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch wishlist items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (laptopId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to wishlist",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          laptop_id: laptopId
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already in wishlist",
            description: "This item is already in your wishlist",
            variant: "destructive",
          });
          return false;
        }
        throw error;
      }

      await fetchWishlistItems();
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      });
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeFromWishlist = async (laptopId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('laptop_id', laptopId);

      if (error) throw error;
      
      await fetchWishlistItems();
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  const isInWishlist = (laptopId: string) => {
    return wishlistItems.some(item => item.laptop_id === laptopId);
  };

  const toggleWishlist = async (laptopId: string) => {
    if (isInWishlist(laptopId)) {
      return await removeFromWishlist(laptopId);
    } else {
      return await addToWishlist(laptopId);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlistItems();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    refreshWishlist: fetchWishlistItems
  };
};