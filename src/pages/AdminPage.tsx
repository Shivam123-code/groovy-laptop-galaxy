import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Package } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';
import { Navigate } from 'react-router-dom';

export type Product = Tables<'laptops'>;

const AdminPage = () => {
  const { isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const { data, error } = await supabase
        .from('laptops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setProductsLoading(false);
    }
  };

  const handleProductSubmit = async (productData: TablesInsert<'laptops'> | TablesUpdate<'laptops'>) => {
    try {
      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('laptops')
          .update(productData as TablesUpdate<'laptops'>)
          .eq('id', editingProduct.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('laptops')
          .insert(productData as TablesInsert<'laptops'>);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }

      setShowProductForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('laptops')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (showProductForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h1>
            <Button
              variant="outline"
              onClick={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </Button>
          </div>
          <ProductForm
            product={editingProduct}
            onSubmit={handleProductSubmit}
            onCancel={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">
              Manage your products and website content
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              {products.length} Products
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-1 w-auto">
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Add, edit, and manage all products in your store
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowProductForm(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ProductList
                  products={products}
                  loading={productsLoading}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onRefresh={fetchProducts}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;