import React, { useState } from 'react';

const ProductGallery = () => {
    const productData = {
        title: "Vibrant Tropical Trees Wallpaper",
        rating: 4.5,
        reviews: 84,
        originalPrice: 999.0,
        salePrice: 990.0,
        images: [
          "/images/SingleProduct/WallPaper/Product/ram1.png",
          "/images/SingleProduct/WallPaper/Product/ram2.png",
          "/images/SingleProduct/WallPaper/Product/ram3.png",
          "/images/SingleProduct/WallPaper/Product/ram4.png",
          "/images/SingleProduct/WallPaper/Product/ram5.png",
          "/images/SingleProduct/WallPaper/Product/ram6.png",
        ]
      };
    
  // State to track the currently displayed image
  const [currentImage, setCurrentImage] = useState(productData.images[0]);

 
  // Function to handle thumbnail click
  const handleThumbnailClick = (imgSrc) => {
    setCurrentImage(imgSrc);
  };

  return (
    <div className="space-y-4 ">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={currentImage}
          alt={productData.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-2">
        {productData.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(img)}
            className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden ${
              currentImage === img 
                ? "ring-2 ring-red-500" 
                : "hover:ring-2 hover:ring-gray-300"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover cursor-pointer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;