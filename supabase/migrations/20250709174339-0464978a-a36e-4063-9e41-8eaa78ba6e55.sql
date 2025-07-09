-- Add foreign key constraints to establish relationships
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_laptop_id_fkey 
FOREIGN KEY (laptop_id) REFERENCES public.laptops(id) ON DELETE CASCADE;

ALTER TABLE public.wishlist_items 
ADD CONSTRAINT wishlist_items_laptop_id_fkey 
FOREIGN KEY (laptop_id) REFERENCES public.laptops(id) ON DELETE CASCADE;