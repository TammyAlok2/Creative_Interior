import React, { useState } from 'react';

const ProductGallery = ({ product }) => {

  // State to track the currently displayed image
  const [currentImage, setCurrentImage] = useState(
    product?.images?.[0]?.secure_url || ''
  );
  // console.log("hello: ", currentImage)


  // Function to handle thumbnail click
  const handleThumbnailClick = (imgSrc) => {
    setCurrentImage(imgSrc.secure_url);
  };

  return (
    <div className="space-y-4 ">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={currentImage || product?.images[0]?.secure_url}
          alt="Product main view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-2">
        {product?.images?.map((img, idx) => (
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