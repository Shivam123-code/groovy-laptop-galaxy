import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Product = Tables<'laptops'>;

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (productData: TablesInsert<'laptops'>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    original_price: '',
    description: '',
    short_description: '',
    images: [''],
    processor: '',
    ram: '',
    storage: '',
    display: '',
    graphics: '',
    battery: '',
    weight: '',
    os: '',
    features: [''],
    rating: '0',
    review_count: '0',
    category: '',
    in_stock: true,
    is_new: false,
    is_featured: false,
    is_trending: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        brand: product.brand || '',
        price: product.price?.toString() || '',
        original_price: product.original_price?.toString() || '',
        description: product.description || '',
        short_description: product.short_description || '',
        images: product.images?.length ? product.images : [''],
        processor: product.processor || '',
        ram: product.ram || '',
        storage: product.storage || '',
        display: product.display || '',
        graphics: product.graphics || '',
        battery: product.battery || '',
        weight: product.weight || '',
        os: product.os || '',
        features: product.features?.length ? product.features : [''],
        rating: product.rating?.toString() || '0',
        review_count: product.review_count?.toString() || '0',
        category: product.category || '',
        in_stock: product.in_stock ?? true,
        is_new: product.is_new ?? false,
        is_featured: product.is_featured ?? false,
        is_trending: product.is_trending ?? false,
      });
    }
  }, [product]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleArrayChange = (field: 'images' | 'features', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'images' | 'features') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'images' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      title: formData.title,
      brand: formData.brand,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      description: formData.description,
      short_description: formData.short_description,
      images: formData.images.filter(img => img.trim() !== ''),
      processor: formData.processor,
      ram: formData.ram,
      storage: formData.storage,
      display: formData.display,
      graphics: formData.graphics,
      battery: formData.battery,
      weight: formData.weight,
      os: formData.os,
      features: formData.features.filter(feature => feature.trim() !== ''),
      rating: parseFloat(formData.rating),
      review_count: parseInt(formData.review_count),
      category: formData.category,
      in_stock: formData.in_stock,
      is_new: formData.is_new,
      is_featured: formData.is_featured,
      is_trending: formData.is_trending,
    };

    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="original_price">Original Price</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={(e) => handleInputChange('original_price', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="short_description">Short Description *</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => handleInputChange('short_description', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="processor">Processor *</Label>
              <Input
                id="processor"
                value={formData.processor}
                onChange={(e) => handleInputChange('processor', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="ram">RAM *</Label>
              <Input
                id="ram"
                value={formData.ram}
                onChange={(e) => handleInputChange('ram', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="storage">Storage *</Label>
              <Input
                id="storage"
                value={formData.storage}
                onChange={(e) => handleInputChange('storage', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="display">Display *</Label>
              <Input
                id="display"
                value={formData.display}
                onChange={(e) => handleInputChange('display', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="graphics">Graphics *</Label>
              <Input
                id="graphics"
                value={formData.graphics}
                onChange={(e) => handleInputChange('graphics', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="battery">Battery *</Label>
              <Input
                id="battery"
                value={formData.battery}
                onChange={(e) => handleInputChange('battery', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight *</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="os">Operating System *</Label>
              <Input
                id="os"
                value={formData.os}
                onChange={(e) => handleInputChange('os', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                />
                {formData.images.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayField('images', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayField('images')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Product Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Feature description"
                  value={feature}
                  onChange={(e) => handleArrayChange('features', index, e.target.value)}
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayField('features', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayField('features')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings & Status */}
      <Card>
        <CardHeader>
          <CardTitle>Product Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="review_count">Review Count</Label>
              <Input
                id="review_count"
                type="number"
                min="0"
                value={formData.review_count}
                onChange={(e) => handleInputChange('review_count', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in_stock"
                checked={formData.in_stock}
                onCheckedChange={(checked) => handleCheckboxChange('in_stock', checked as boolean)}
              />
              <Label htmlFor="in_stock">In Stock</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_new"
                checked={formData.is_new}
                onCheckedChange={(checked) => handleCheckboxChange('is_new', checked as boolean)}
              />
              <Label htmlFor="is_new">New Product</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleCheckboxChange('is_featured', checked as boolean)}
              />
              <Label htmlFor="is_featured">Featured</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_trending"
                checked={formData.is_trending}
                onCheckedChange={(checked) => handleCheckboxChange('is_trending', checked as boolean)}
              />
              <Label htmlFor="is_trending">Trending</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;