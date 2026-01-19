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
    price: 3499,
    originalPrice: 3799,
    description: "The most powerful MacBook Pro ever built. Perfect for creators, developers, and professionals who demand the ultimate performance.",
    shortDescription: "Ultimate performance for professionals",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Apple M3 Max chip (16-core CPU)",
      ram: "64GB Unified Memory",
      storage: "2TB SSD",
      display: "16.2-inch Liquid Retina XDR (3456x2234)",
      graphics: "40-core GPU",
      battery: "Up to 22 hours",
      weight: "4.7 lbs (2.14 kg)",
      os: "macOS Sonoma"
    },
    features: ["Liquid Retina XDR Display", "M3 Max Performance", "All-Day Battery", "Studio-Quality Mics", "ProMotion 120Hz"],
    rating: 4.9,
    reviewCount: 2847,
    category: "Premium",
    inStock: true,
    isNew: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: "2",
    title: "Dell XPS 17 9730",
    brand: "Dell",
    price: 2899,
    originalPrice: 3199,
    description: "Ultimate 17-inch powerhouse with stunning 4K+ display and top-tier Intel performance for creative professionals.",
    shortDescription: "17-inch creative powerhouse",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i9-13900H (14-core)",
      ram: "64GB DDR5",
      storage: "2TB NVMe SSD",
      display: "17-inch 4K+ UHD+ (3840x2400) Touch",
      graphics: "NVIDIA RTX 4080 12GB",
      battery: "Up to 13 hours",
      weight: "4.81 lbs (2.18 kg)",
      os: "Windows 11 Pro"
    },
    features: ["4K+ InfinityEdge Display", "RTX 4080 Graphics", "Thunderbolt 4", "CNC Aluminum Chassis"],
    rating: 4.7,
    reviewCount: 1892,
    category: "Premium",
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: "3",
    title: "ASUS ROG Zephyrus G16",
    brand: "ASUS",
    price: 2499,
    originalPrice: 2799,
    description: "Ultra-slim gaming laptop with incredible performance packed into a stunning design. Perfect for gamers who want portability.",
    shortDescription: "Premium thin gaming powerhouse",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i9-14900HX (24-core)",
      ram: "32GB DDR5-5600",
      storage: "2TB PCIe 4.0 NVMe SSD",
      display: "16-inch ROG Nebula OLED (2560x1600) 240Hz",
      graphics: "NVIDIA RTX 4090 16GB",
      battery: "Up to 10 hours",
      weight: "4.19 lbs (1.9 kg)",
      os: "Windows 11 Pro"
    },
    features: ["240Hz OLED Display", "RTX 4090 Graphics", "ROG Intelligent Cooling", "Dolby Vision & Atmos"],
    rating: 4.8,
    reviewCount: 1634,
    category: "Gaming",
    inStock: true,
    isNew: true,
    isTrending: true
  },
  {
    id: "4",
    title: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    price: 2199,
    originalPrice: 2499,
    description: "The ultimate business ultrabook with military-grade durability, enterprise security, and exceptional performance.",
    shortDescription: "Business-grade reliability and security",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i7-1365U vPro (10-core)",
      ram: "32GB LPDDR5-6400",
      storage: "1TB PCIe Gen4 SSD",
      display: "14-inch 2.8K OLED (2880x1800) HDR",
      graphics: "Intel Iris Xe Graphics",
      battery: "Up to 15 hours",
      weight: "2.48 lbs (1.12 kg)",
      os: "Windows 11 Pro"
    },
    features: ["MIL-STD-810H Certified", "ThinkShield Security", "OLED HDR Display", "Rapid Charge Pro"],
    rating: 4.6,
    reviewCount: 945,
    category: "Business",
    inStock: true,
    isFeatured: true
  },
  {
    id: "5",
    title: "HP Spectre x360 16",
    brand: "HP",
    price: 1899,
    originalPrice: 2199,
    description: "Premium 2-in-1 convertible with stunning OLED display and exceptional build quality for creative professionals.",
    shortDescription: "Premium 2-in-1 convertible",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i7-13700H (14-core)",
      ram: "32GB LPDDR5",
      storage: "2TB PCIe NVMe SSD",
      display: "16-inch 4K OLED (3840x2400) Touch",
      graphics: "Intel Arc A370M 4GB",
      battery: "Up to 17 hours",
      weight: "4.45 lbs (2.02 kg)",
      os: "Windows 11 Pro"
    },
    features: ["4K OLED Touchscreen", "360° Convertible", "Bang & Olufsen Audio", "HP Tilt Pen Included"],
    rating: 4.5,
    reviewCount: 821,
    category: "2-in-1",
    inStock: true,
    isNew: true
  },
  {
    id: "6",
    title: "Microsoft Surface Laptop Studio 2",
    brand: "Microsoft",
    price: 2799,
    originalPrice: 3099,
    description: "Revolutionary form factor with the most powerful Surface ever. Perfect for creators who need versatility.",
    shortDescription: "Revolutionary creative workstation",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i7-13700H (14-core)",
      ram: "64GB LPDDR5x",
      storage: "2TB Removable SSD",
      display: "14.4-inch PixelSense Flow (2400x1600) 120Hz",
      graphics: "NVIDIA RTX 4060 8GB",
      battery: "Up to 18 hours",
      weight: "4.37 lbs (1.98 kg)",
      os: "Windows 11 Pro"
    },
    features: ["Dynamic Woven Hinge", "RTX 4060 Graphics", "Studio Mics", "Haptic Touchpad"],
    rating: 4.4,
    reviewCount: 567,
    category: "Premium",
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: "7",
    title: "Razer Blade 18",
    brand: "Razer",
    price: 3999,
    originalPrice: 4299,
    description: "The ultimate desktop replacement gaming laptop with an 18-inch display and uncompromising performance.",
    shortDescription: "Ultimate desktop replacement",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i9-14900HX (24-core)",
      ram: "64GB DDR5-5600",
      storage: "4TB NVMe SSD (2x2TB)",
      display: "18-inch QHD+ (2560x1600) 240Hz IPS",
      graphics: "NVIDIA RTX 4090 16GB",
      battery: "Up to 6 hours",
      weight: "6.0 lbs (2.72 kg)",
      os: "Windows 11 Pro"
    },
    features: ["Per-Key RGB Chroma", "Vapor Chamber Cooling", "THX Spatial Audio", "2.5G Ethernet"],
    rating: 4.7,
    reviewCount: 734,
    category: "Gaming",
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: "8",
    title: "LG Gram 17 Pro",
    brand: "LG",
    price: 1799,
    originalPrice: 1999,
    description: "Incredibly lightweight 17-inch laptop that defies physics. All-day battery and stunning display.",
    shortDescription: "Featherlight 17-inch powerhouse",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i7-1360P (12-core)",
      ram: "32GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: "17-inch WQXGA (2560x1600) IPS",
      graphics: "Intel Iris Xe Graphics",
      battery: "Up to 21 hours",
      weight: "2.98 lbs (1.35 kg)",
      os: "Windows 11 Pro"
    },
    features: ["MIL-STD-810H Certified", "Ultra-Lightweight", "All-Day Battery", "Thunderbolt 4"],
    rating: 4.5,
    reviewCount: 423,
    category: "Ultrabook",
    inStock: true,
    isTrending: true
  },
  {
    id: "9",
    title: "MSI Creator Z17 HX Studio",
    brand: "MSI",
    price: 3299,
    originalPrice: 3599,
    description: "Professional-grade creative workstation with color-accurate display and workstation-class performance.",
    shortDescription: "Professional creator workstation",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i9-13980HX (24-core)",
      ram: "64GB DDR5-5200",
      storage: "2TB NVMe SSD",
      display: "17-inch Mini LED QHD+ (2560x1600) 165Hz",
      graphics: "NVIDIA RTX 4080 12GB",
      battery: "Up to 9 hours",
      weight: "5.29 lbs (2.4 kg)",
      os: "Windows 11 Pro"
    },
    features: ["Mini LED Display", "Calman Verified Colors", "True Pixel Display", "Cooler Boost Trinity+"],
    rating: 4.6,
    reviewCount: 312,
    category: "Premium",
    inStock: true,
    isFeatured: true
  },
  {
    id: "10",
    title: "Alienware m18 R2",
    brand: "Alienware",
    price: 3799,
    originalPrice: 4199,
    description: "Massive 18-inch gaming beast with desktop-class components and legendary Alienware design.",
    shortDescription: "18-inch gaming beast",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i9-14900HX (24-core)",
      ram: "64GB DDR5-5600",
      storage: "4TB NVMe SSD (RAID 0)",
      display: "18-inch QHD+ (2560x1600) 480Hz IPS",
      graphics: "NVIDIA RTX 4090 16GB",
      battery: "Up to 5 hours",
      weight: "8.9 lbs (4.04 kg)",
      os: "Windows 11 Pro"
    },
    features: ["480Hz Display", "Cryo-Tech Cooling", "AlienFX RGB", "Cherry MX Keys"],
    rating: 4.8,
    reviewCount: 567,
    category: "Gaming",
    inStock: true,
    isNew: true,
    isTrending: true
  },
  {
    id: "11",
    title: "Samsung Galaxy Book4 Ultra",
    brand: "Samsung",
    price: 2599,
    originalPrice: 2899,
    description: "Premium ultrabook with stunning AMOLED display and seamless Galaxy ecosystem integration.",
    shortDescription: "Galaxy ecosystem premium laptop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core Ultra 9 185H (16-core)",
      ram: "32GB LPDDR5X",
      storage: "1TB NVMe SSD",
      display: "16-inch 3K AMOLED (2880x1800) 120Hz",
      graphics: "NVIDIA RTX 4070 8GB",
      battery: "Up to 14 hours",
      weight: "3.97 lbs (1.8 kg)",
      os: "Windows 11 Pro"
    },
    features: ["3K AMOLED Display", "Galaxy AI Features", "Intel AI Engine", "Quick Share"],
    rating: 4.5,
    reviewCount: 389,
    category: "Premium",
    inStock: true,
    isNew: true
  },
  {
    id: "12",
    title: "Acer Predator Helios 18",
    brand: "Acer",
    price: 2299,
    originalPrice: 2599,
    description: "High-performance gaming laptop with advanced cooling technology and immersive 18-inch display.",
    shortDescription: "High-performance gaming beast",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    ],
    specs: {
      processor: "Intel Core i9-14900HX (24-core)",
      ram: "32GB DDR5-5200",
      storage: "2TB PCIe Gen4 SSD",
      display: "18-inch WQXGA (2560x1600) 250Hz Mini LED",
      graphics: "NVIDIA RTX 4080 12GB",
      battery: "Up to 7 hours",
      weight: "7.05 lbs (3.2 kg)",
      os: "Windows 11 Pro"
    },
    features: ["Mini LED Display", "5th Gen AeroBlade 3D Fan", "MagKey 4.0 Keyboard", "Killer WiFi 7"],
    rating: 4.6,
    reviewCount: 456,
    category: "Gaming",
    inStock: true,
    isFeatured: true
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
  { label: "Under $2,000", min: 0, max: 1999 },
  { label: "$2,000 - $2,500", min: 2000, max: 2499 },
  { label: "$2,500 - $3,000", min: 2500, max: 2999 },
  { label: "Over $3,000", min: 3000, max: Infinity }
];