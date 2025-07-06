export interface Laptop {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
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
  features: string[];
  rating: number;
  reviewCount: number;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export const laptops: Laptop[] = [
  {
    id: "1",
    title: "MacBook Pro 16-inch M3 Max",
    brand: "Apple",
    price: 2499,
    originalPrice: 2799,
    description: "The most powerful MacBook Pro ever built. Perfect for creators, developers, and professionals who demand the ultimate performance.",
    shortDescription: "Ultimate performance for professionals",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Apple M3 Max chip",
      ram: "32GB Unified Memory",
      storage: "1TB SSD",
      display: "16.2-inch Liquid Retina XDR",
      graphics: "38-core GPU",
      battery: "Up to 22 hours",
      weight: "4.7 lbs",
      os: "macOS Sonoma"
    },
    features: ["Liquid Retina XDR Display", "M3 Max Performance", "All-Day Battery", "Studio-Quality Mics"],
    rating: 4.8,
    reviewCount: 1247,
    category: "Premium",
    inStock: true,
    isNew: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: "2", 
    title: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 1299,
    originalPrice: 1499,
    description: "Ultra-thin laptop with stunning InfinityEdge display and premium materials for the modern professional.",
    shortDescription: "Ultra-thin design meets premium performance",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i7-1360P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      display: "13.4-inch 3.5K OLED",
      graphics: "Intel Iris Xe",
      battery: "Up to 12 hours",
      weight: "2.73 lbs",
      os: "Windows 11"
    },
    features: ["OLED InfinityEdge Display", "Premium Materials", "Fast Charging", "Thunderbolt 4"],
    rating: 4.6,
    reviewCount: 892,
    category: "Ultrabook",
    inStock: true,
    isFeatured: true
  },
  {
    id: "3",
    title: "ASUS ROG Strix G15",
    brand: "ASUS",
    price: 1199,
    description: "Gaming powerhouse with RGB lighting and top-tier performance for serious gamers.",
    shortDescription: "Gaming beast with RGB aesthetics",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "AMD Ryzen 7 5800H",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      display: "15.6-inch 144Hz FHD",
      graphics: "NVIDIA RTX 3070",
      battery: "Up to 8 hours",
      weight: "5.07 lbs",
      os: "Windows 11"
    },
    features: ["144Hz Display", "RGB Keyboard", "Advanced Cooling", "Dolby Atmos Audio"],
    rating: 4.7,
    reviewCount: 634,
    category: "Gaming",
    inStock: true,
    isTrending: true
  },
  {
    id: "4",
    title: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 1599,
    description: "Business laptop with military-grade durability and enterprise security features.",
    shortDescription: "Business-grade reliability and security",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i7-1260P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      display: "14-inch 2.8K OLED",
      graphics: "Intel Iris Xe",
      battery: "Up to 15 hours",
      weight: "2.48 lbs",
      os: "Windows 11 Pro"
    },
    features: ["Military-Grade Durability", "OLED Display", "ThinkShield Security", "Rapid Charge"],
    rating: 4.5,
    reviewCount: 445,
    category: "Business",
    inStock: true,
    isFeatured: true
  },
  {
    id: "5",
    title: "HP Spectre x360 14",
    brand: "HP",
    price: 1149,
    originalPrice: 1299,
    description: "Convertible laptop with stunning design and versatile 2-in-1 functionality.",
    shortDescription: "Versatile 2-in-1 with premium design",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i7-1255U",
      ram: "16GB LPDDR4x",
      storage: "512GB SSD",
      display: "13.5-inch 3K2K OLED",
      graphics: "Intel Iris Xe",
      battery: "Up to 17 hours",
      weight: "2.95 lbs",
      os: "Windows 11"
    },
    features: ["360° Convertible", "OLED Touchscreen", "Bang & Olufsen Audio", "Privacy Camera"],
    rating: 4.4,
    reviewCount: 321,
    category: "2-in-1",
    inStock: true,
    isNew: true
  },
  {
    id: "6",
    title: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    price: 999,
    description: "Sleek laptop with premium Alcantara keyboard and vibrant PixelSense display.",
    shortDescription: "Premium materials meet modern design",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i5-1235U",
      ram: "8GB LPDDR5x",
      storage: "256GB SSD",
      display: "13.5-inch PixelSense",
      graphics: "Intel Iris Xe",
      battery: "Up to 18 hours",
      weight: "2.8 lbs",
      os: "Windows 11"
    },
    features: ["Alcantara Fabric", "PixelSense Display", "Studio Mics", "Instant On"],
    rating: 4.3,
    reviewCount: 567,
    category: "Ultrabook",
    inStock: true,
    isTrending: true
  }
];

export const categories = [
  "All",
  "Premium",
  "Gaming", 
  "Business",
  "Ultrabook",
  "2-in-1"
];

export const priceRanges = [
  { label: "Under $1,000", min: 0, max: 999 },
  { label: "$1,000 - $1,500", min: 1000, max: 1499 },
  { label: "$1,500 - $2,000", min: 1500, max: 1999 },
  { label: "Over $2,000", min: 2000, max: Infinity }
];