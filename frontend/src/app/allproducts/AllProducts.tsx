'use client'
import React, { useEffect, useState } from 'react';
import { useProductDataStore } from '@/stores/productStore';
import { useCategoryStore } from '@/stores/categoryStore';
import ProductCard from "@/components/Card/ProductCard";
import { useCartStore } from "@/stores/cartStore";
import { Star } from 'lucide-react';
import Pagination from './Pagintation';


// Type definitions
interface Category {
  _id: string;
  name: string;
  ribbon?: boolean;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  rating: number;
}

interface ActiveFilter {
  type: 'category' | 'rating' | 'price';
  value: string;
  label: string;
}

const AllProducts:React.FC = () => {
  const { product, allProduct } = useProductDataStore();
  const { category, allCategory } = useCategoryStore();
  const addItemToCart = useCartStore((state) => state.addItem);
  
  // State for filters and sorting
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 3000 });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'recommended' | 'lowToHigh' | 'highToLow'>('recommended');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);



   // Calculate pagination values
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

   
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get max price for slider
  const maxProductPrice = Math.max(...product.map(p => p.price), 3000);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([allProduct(), allCategory()]);
    };
    fetchData();
  }, []);

  // Update active filters
  useEffect(() => {
    const newFilters: ActiveFilter[] = [
      ...selectedCategories.map(catId => ({
        type: 'category' as const,
        value: catId,
        label: category?.find(c => c._id === catId)?.name || ''
      })),
      ...selectedRatings.map(rating => ({
        type: 'rating' as const,
        value: rating.toString(),
        label: `${rating} Stars`
      }))
    ];

    if (priceRange.min > 0 || priceRange.max < maxProductPrice) {
      newFilters.push({
        type: 'price' as const,
        value: 'price-range',
        label: `Rs ${priceRange.min} - Rs${priceRange.max}`
      });
    }
    setCurrentPage(1);

    setActiveFilters(newFilters);
  }, [selectedCategories, selectedRatings, priceRange, category]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...product];

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(prod => 
        prod.category && selectedCategories.includes(prod.category._id)
      );
    }

    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(prod => 
        selectedRatings.includes(Math.floor(prod?.ratings))
      );
    }

    // Apply price filter
    filtered = filtered.filter(prod => 
      prod.price >= priceRange.min && prod.price <= priceRange.max
    );

    // Apply sorting
    switch (sortOrder) {
      case 'lowToHigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered as any);
  }, [product, selectedCategories, selectedRatings, priceRange, sortOrder]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      }
      return [...prev, rating];
    });
  };

  const handleRemoveFilter = (filter: ActiveFilter) => {
    switch (filter.type) {
      case 'category':
        setSelectedCategories(prev => prev.filter(id => id !== filter.value));
        break;
      case 'rating':
        setSelectedRatings(prev => prev.filter(r => r.toString() !== filter.value));
        break;
      case 'price':
        setPriceRange({ min: 0, max: maxProductPrice });
        break;
    }
  };

  // const handleAddToCart = (product: Product) => {
  //   addItemToCart(product);
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Shop Products</h1>
              <div className="mt-4 md:mt-0">
                <select 
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span
                    key={`${filter.type}-${filter.value}-${index}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {filter.label}
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {category?.map((cat) => (
                    <label key={cat._id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat._id)}
                        onChange={() => handleCategoryChange(cat._id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-yello-500"
                      />
                      <span className="ml-2 flex items-center">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <Star
                            key={i + rating}
                            className="w-4 h-4 text-gray-300"
                          />
                        ))}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="100"
                    max={maxProductPrice}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-6">
              {/* {filteredProducts && filteredProducts?.slice(0,9)?.(currentPage,productsPerPage+currentPage)?.map((prod) => ( */}
              {currentProducts.map((prod) => (
                <ProductCard
                  key={prod._id}
                  product={prod}
                  ribbon={false}
                  // onAddToCart={() => handleAddToCart(prod)}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products match your filters</p>
              </div>
            )}
          </div>


       
        </div>
        {filteredProducts.length > 0 && (
        <Pagination 
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={handlePageChange}
         />
        )}
      </div>
    </div>
  );
};

export default AllProducts;