'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const ProductCategories = () => {
  const products = [
    {
      title: 'Wallpaper',
      image: '/images/Category/category1.jpg',
      alt: 'Modern living room with decorative wallpaper',
    },
    {
      title: 'Wooden Flooring',
      image: '/images/Category/category2.jpg',
      alt: 'Wooden flooring in room',
    },
    {
      title: 'WPC Wall Cladding',
      image: '/images/Category/category3.jpg',
      alt: 'Building with WPC wall cladding',
    },
    {
      title: 'Wallpaper',
      image: '/images/Category/category1.jpg',
      alt: 'Modern living room with decorative wallpaper',
    },
    {
      title: 'Wooden Flooring',
      image: '/images/Category/category2.jpg',
      alt: 'Wooden flooring in room',
    },
    {
      title: 'WPC Wall Cladding',
      image: '/images/Category/category3.jpg',
      alt: 'Building with WPC wall cladding',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side - Header Section */}
        <div className="lg:w-1/4 lg:sticky lg:top-4">
          <div className="flex items-start gap-6 mb-4">
            {/* Icon */}
            <div className="w-12 h-12 flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-full h-full text-sky-400">
                <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" />
              </svg>
            </div>
            {/* Title */}
            <div>
              <h2 className="text-sky-400 text-4xl font-bold mb-1">Product</h2>
              <p className="text-sky-400 text-xl font-light">by categories</p>
            </div>
          </div>

          {/* Product Count */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-900 font-semibold">200 +</span>
            <span className="text-gray-500">Unique products</span>
          </div>

          {/* Categories Link */}
          <button className="text-gray-900 font-medium border-b-2 border-orange-500 pb-1 inline-flex items-center hover:text-orange-500 transition-colors group">
            ALL CATEGORIES
            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Side - Swiper */}
        <div className="w-3/4 max-lg:w-full relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              280: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              997: { slidesPerView: 4 },
              1373: { slidesPerView: 4 },
              1480: { slidesPerView: 4 },
              1580: { slidesPerView: 5 },
            }}
            className="!px-1"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="bg-red-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl group/card cursor-pointer">
                  {/* Card Image */}
                  <div className="w-full aspect-[4/3] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full mt-[0.5rem] h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>
                  {/* Card Content */}
                  <div className="p-6 h-24 flex items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-600 group-hover/card:text-orange-500 transition-colors text-center">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons */}
       {/* Custom Navigation Buttons */}
<button className="swiper-button-prev opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-1/2 -left-2 transform -translate-y-1/2 z-10 w-6 h-6 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-md hover:scale-105">
  <ChevronLeft className="w-3 h-3 text-white" />
</button>
<button className="swiper-button-next opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 w-6 h-6 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-md hover:scale-105">
  <ChevronRight className="w-3 h-3 text-white" />
</button>

          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
