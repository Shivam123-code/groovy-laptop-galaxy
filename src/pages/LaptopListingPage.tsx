import { useState, useMemo, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
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

const LaptopListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch laptops from database
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        console.log('LaptopListingPage: Attempting to fetch laptops...');
        const { data, error } = await supabase
          .from('laptops')
          .select('*');
        
        console.log('LaptopListingPage: Fetch result - data:', data, 'error:', error);
        
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
        console.log('LaptopListingPage: Successfully transformed and set laptops:', transformedData.length, 'items');
      } catch (error) {
        console.error('LaptopListingPage: Error fetching laptops:', error);
      } finally {
        setLoading(false);
        console.log('LaptopListingPage: Loading finished');
      }
    };

    fetchLaptops();
  }, []);

  // Get unique brands and categories
  const brands = Array.from(new Set(laptops.map(laptop => laptop.brand))).sort();
  const categories = ["All", ...Array.from(new Set(laptops.map(laptop => laptop.category))).sort()];

  // Filter and sort laptops
  const filteredLaptops = useMemo(() => {
    let filtered = laptops.filter(laptop => {
      // Search query
      if (searchQuery && !laptop.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !laptop.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Categories
      if (selectedCategories.length > 0 && selectedCategories[0] !== "All" && 
          !selectedCategories.includes(laptop.category)) {
        return false;
      }

      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(laptop.brand)) {
        return false;
      }

      // Price range
      if (Number(laptop.price) < priceRange[0] || Number(laptop.price) > priceRange[1]) {
        return false;
      }

      return true;
    });

      // Sort
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => Number(a.price) - Number(b.price));
      case "price-high":
        return filtered.sort((a, b) => Number(b.price) - Number(a.price));
      case "rating":
        return filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
      case "newest":
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "featured":
      default:
        return filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy]);

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 3000]);
    setSortBy("featured");
  };

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + 
    (priceRange[0] > 0 || priceRange[1] < 3000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-card-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-2">
                Explore Laptops
              </h1>
              <p className="text-muted-foreground">
                Find your perfect laptop from {laptops.length} premium options
              </p>
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 lg:min-w-96">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search laptops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-button border-card-border"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg glass-button border-card-border text-foreground bg-card"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between mt-6 lg:hidden">
            <p className="text-sm text-muted-foreground">
              {filteredLaptops.length} laptops found
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="glass-button"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 w-5 h-5 p-0 bg-primary text-primary-foreground text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="glass-card p-6 rounded-2xl sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-primary"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h4 className="font-semibold mb-4">Category</h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={category === "All" ? selectedCategories.length === 0 : selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-semibold mb-4">Brand</h4>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold mb-4">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={3000}
                      min={0}
                      step={100}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Price Filters */}
                <div>
                  <h4 className="font-semibold mb-4">Quick Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([0, 999])}
                      className="text-xs glass-button"
                    >
                      Under $1,000
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([1000, 1499])}
                      className="text-xs glass-button"
                    >
                      $1,000 - $1,500
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([1500, 1999])}
                      className="text-xs glass-button"
                    >
                      $1,500 - $2,000
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([2000, 3000])}
                      className="text-xs glass-button"
                    >
                      Over $2,000
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredLaptops.length} of {laptops.length} laptops
              </p>
              
              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedBrands.map((brand) => (
                    <Badge 
                      key={brand} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => handleBrandChange(brand)}
                    >
                      {brand} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {(priceRange[0] > 0 || priceRange[1] < 3000) && (
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => setPriceRange([0, 3000])}
                    >
                      ${priceRange[0]}-${priceRange[1]} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading laptops...</p>
              </div>
            ) : filteredLaptops.length > 0 ? (
              (() => {
                console.log('LaptopListingPage: Rendering products grid with', filteredLaptops.length, 'laptops');
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredLaptops.map((laptop) => (
                      <ProductCard key={laptop.id} laptop={laptop} />
                    ))}
                  </div>
                );
              })()
              
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                  <Search className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No laptops found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearFilters} className="gradient-primary text-white">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopListingPage;