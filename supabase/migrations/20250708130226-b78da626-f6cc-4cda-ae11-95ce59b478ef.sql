-- Create laptops table for e-commerce site
CREATE TABLE public.laptops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  processor TEXT NOT NULL,
  ram TEXT NOT NULL,
  storage TEXT NOT NULL,
  display TEXT NOT NULL,
  graphics TEXT NOT NULL,
  battery TEXT NOT NULL,
  weight TEXT NOT NULL,
  os TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  rating DECIMAL(2,1) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_trending BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create price ranges table
CREATE TABLE public.price_ranges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  min_price DECIMAL(10,2) NOT NULL,
  max_price DECIMAL(10,2),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.laptops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_ranges ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is an e-commerce site)
CREATE POLICY "Anyone can view laptops" 
ON public.laptops 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view categories" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view price ranges" 
ON public.price_ranges 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_laptops_updated_at
  BEFORE UPDATE ON public.laptops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, display_order) VALUES
  ('All', 0),
  ('Premium', 1),
  ('Gaming', 2),
  ('Business', 3),
  ('Ultrabook', 4),
  ('2-in-1', 5);

-- Insert default price ranges
INSERT INTO public.price_ranges (label, min_price, max_price, display_order) VALUES
  ('Under $1,000', 0, 999, 1),
  ('$1,000 - $1,500', 1000, 1499, 2),
  ('$1,500 - $2,000', 1500, 1999, 3),
  ('Over $2,000', 2000, NULL, 4);

-- Insert sample laptop data
INSERT INTO public.laptops (
  title, brand, price, original_price, description, short_description, images,
  processor, ram, storage, display, graphics, battery, weight, os,
  features, rating, review_count, category, in_stock, is_new, is_featured, is_trending
) VALUES
  (
    'MacBook Pro 16-inch M3 Max',
    'Apple',
    2499,
    2799,
    'The most powerful MacBook Pro ever built. Perfect for creators, developers, and professionals who demand the ultimate performance.',
    'Ultimate performance for professionals',
    ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop'],
    'Apple M3 Max chip',
    '32GB Unified Memory',
    '1TB SSD',
    '16.2-inch Liquid Retina XDR',
    '38-core GPU',
    'Up to 22 hours',
    '4.7 lbs',
    'macOS Sonoma',
    ARRAY['Liquid Retina XDR Display', 'M3 Max Performance', 'All-Day Battery', 'Studio-Quality Mics'],
    4.8,
    1247,
    'Premium',
    true,
    true,
    true,
    true
  ),
  (
    'Dell XPS 13 Plus',
    'Dell',
    1299,
    1499,
    'Ultra-thin laptop with stunning InfinityEdge display and premium materials for the modern professional.',
    'Ultra-thin design meets premium performance',
    ARRAY['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop'],
    'Intel Core i7-1360P',
    '16GB LPDDR5',
    '512GB SSD',
    '13.4-inch 3.5K OLED',
    'Intel Iris Xe',
    'Up to 12 hours',
    '2.73 lbs',
    'Windows 11',
    ARRAY['OLED InfinityEdge Display', 'Premium Materials', 'Fast Charging', 'Thunderbolt 4'],
    4.6,
    892,
    'Ultrabook',
    true,
    false,
    true,
    false
  ),
  (
    'ASUS ROG Strix G15',
    'ASUS',
    1199,
    NULL,
    'Gaming powerhouse with RGB lighting and top-tier performance for serious gamers.',
    'Gaming beast with RGB aesthetics',
    ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop'],
    'AMD Ryzen 7 5800H',
    '16GB DDR4',
    '1TB SSD',
    '15.6-inch 144Hz FHD',
    'NVIDIA RTX 3070',
    'Up to 8 hours',
    '5.07 lbs',
    'Windows 11',
    ARRAY['144Hz Display', 'RGB Keyboard', 'Advanced Cooling', 'Dolby Atmos Audio'],
    4.7,
    634,
    'Gaming',
    true,
    false,
    false,
    true
  ),
  (
    'Lenovo ThinkPad X1 Carbon',
    'Lenovo',
    1599,
    NULL,
    'Business laptop with military-grade durability and enterprise security features.',
    'Business-grade reliability and security',
    ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop'],
    'Intel Core i7-1260P',
    '16GB LPDDR5',
    '512GB SSD',
    '14-inch 2.8K OLED',
    'Intel Iris Xe',
    'Up to 15 hours',
    '2.48 lbs',
    'Windows 11 Pro',
    ARRAY['Military-Grade Durability', 'OLED Display', 'ThinkShield Security', 'Rapid Charge'],
    4.5,
    445,
    'Business',
    true,
    false,
    true,
    false
  ),
  (
    'HP Spectre x360 14',
    'HP',
    1149,
    1299,
    'Convertible laptop with stunning design and versatile 2-in-1 functionality.',
    'Versatile 2-in-1 with premium design',
    ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop'],
    'Intel Core i7-1255U',
    '16GB LPDDR4x',
    '512GB SSD',
    '13.5-inch 3K2K OLED',
    'Intel Iris Xe',
    'Up to 17 hours',
    '2.95 lbs',
    'Windows 11',
    ARRAY['360° Convertible', 'OLED Touchscreen', 'Bang & Olufsen Audio', 'Privacy Camera'],
    4.4,
    321,
    '2-in-1',
    true,
    true,
    false,
    false
  ),
  (
    'Microsoft Surface Laptop 5',
    'Microsoft',
    999,
    NULL,
    'Sleek laptop with premium Alcantara keyboard and vibrant PixelSense display.',
    'Premium materials meet modern design',
    ARRAY['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop'],
    'Intel Core i5-1235U',
    '8GB LPDDR5x',
    '256GB SSD',
    '13.5-inch PixelSense',
    'Intel Iris Xe',
    'Up to 18 hours',
    '2.8 lbs',
    'Windows 11',
    ARRAY['Alcantara Fabric', 'PixelSense Display', 'Studio Mics', 'Instant On'],
    4.3,
    567,
    'Ultrabook',
    true,
    false,
    false,
    true
  );