'use client';

import React, { useEffect, useState } from 'react';

const ProductGallery = ({ products }) => {

  // Initialize state with null instead of accessing potentially undefined values
  const [currentImage, setCurrentImage] = useState(null);
  
  // Use useEffect to update currentImage when products data loads
  useEffect(() => {
    if (products?.images?.[0]?.secure_url) {
      setCurrentImage(products?.images[0]?.secure_url);
    }
  }, [products]); // Dependencies array includes products

  // Handle cases where products is undefined/null
  if (!products || !products?.images) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading product images...</p>
      </div>
    );
  }

  // Function to handle thumbnail click
  const handleThumbnailClick = (imgSrc) => {
    setCurrentImage(imgSrc?.secure_url);
  };

  return (
    <div className="space-y-4 ">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={currentImage || products?.images[0]?.secure_url}
          alt="Product main view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-2">
        {products?.images?.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(img)}
            onMouseEnter={() => handleThumbnailClick(img)}
            className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden ${currentImage === img.secure_url
                ? "ring-2 ring-red-500"
                : "hover:ring-2 hover:ring-gray-300"
              }`}
          >
            <img
              src={img.secure_url}
              alt={`Product view ${idx + 1}`}
              className="w-full h-full object-cover cursor-pointer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;