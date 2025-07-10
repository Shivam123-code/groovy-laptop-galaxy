import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash2, MoreHorizontal, Search, RefreshCw } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Product = Tables<'laptops'>;

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onRefresh: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getStockBadge = (inStock: boolean) => {
    return (
      <Badge variant={inStock ? 'default' : 'destructive'}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </Badge>
    );
  };

  const getStatusBadges = (product: Product) => {
    const badges = [];
    if (product.is_new) badges.push(<Badge key="new" variant="secondary">New</Badge>);
    if (product.is_featured) badges.push(<Badge key="featured" variant="outline">Featured</Badge>);
    if (product.is_trending) badges.push(<Badge key="trending" variant="outline">Trending</Badge>);
    return badges;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Button variant="outline" onClick={onRefresh} size="icon">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {searchTerm || filterCategory ? 'No products match your search criteria.' : 'No products found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-medium">{product.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {product.short_description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatPrice(product.price)}</div>
                          {product.original_price && product.original_price > product.price && (
                            <div className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.original_price)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStockBadge(product.in_stock)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {getStatusBadges(product)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">
                            ({product.review_count})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(product)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDelete(product.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductList;