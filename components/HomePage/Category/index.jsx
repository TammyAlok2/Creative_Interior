'use client'
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProductCategories = () => {
  const products = [
    {
      title: 'Decking',
      image: '/images/Category/category1.jpg',
      alt: 'Wooden decking with planters'
    },
    {
      title: 'HPL Cladding',
      image: '/images/Category/category2.jpg',
      alt: 'Building with modern cladding'
    },
    {
      title: 'Instafix Mouldings',
      image: '/images/Category/category3.jpg',
      alt: 'Decorative wall mouldings'
    },
     {
      title: 'Decking',
      image: '/images/Category/category1.jpg',
      alt: 'Wooden decking with planters'
    },
    {
      title: 'HPL Cladding',
      image: '/images/Category/category2.jpg',
      alt: 'Building with modern cladding'
    },
    {
      title: 'Instafix Mouldings',
      image: '/images/Category/category3.jpg',
      alt: 'Decorative wall mouldings'
    }
  ];

  const scrollLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 300;
  };

  const scrollRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12">
            <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400">
              <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h2 className="text-blue-400 text-2xl font-medium">Product</h2>
            <p className="text-blue-400">by categories</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">200 +</span>
            <span className="text-gray-500">Unique products</span>
          </div>
        </div>
        <button className="mt-4 text-gray-900 font-medium flex items-center">
          ALL CATEGORIES
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="relative">
      
        
        <div 
          id="slider" 
          className="flex overflow-x-auto gap-6 scroll-smooth hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product, index) => (
            
            <Card key={index} className="min-w-[300px] bg-white">
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium">{product.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

     
      </div>
    </div>
  );
};

export default ProductCategories;