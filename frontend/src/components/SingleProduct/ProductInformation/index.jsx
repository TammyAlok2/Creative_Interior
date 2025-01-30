"use client";

import React, { useEffect, useState } from "react";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import MaterialSlider from "./MaterialSlider";
import ProductGallery from "./ProductGalleryImage";
import { useParams } from "next/navigation";
import { useProductDataStore } from "../../../stores/productStore"
// import { productData } from "@/data/productData";

const ProductDetail = () => {
  const [width, setWidth] = useState("10");
  const [height, setHeight] = useState("10");

  const [products, setProducts] = useState(null);

  const { product } = useProductDataStore();
  
  // Get the ID from URL
  const params = useParams();
  const id = params?.id;
  
  console.log("product_id: ", id)

  // Find the product from productCategories when component mounts
  useEffect(() => {
    if (id) {
      // Assuming productCategories is an array of products
      const foundProduct = product.find(
        product => product._id === id || product.id === id
      );
      setProducts(foundProduct);
    }
  }, [id]);
  console.log("products hai:", products)

  // Add loading state
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-red-50 mt-[5rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Image Gallery */}
        <ProductGallery />

        {/* Right Section - Product Details */}
        <div className="space-y-6">
          <div className="border-b bg-white p-4 rounded-lg ">
            <div className="inline-block bg-red-600 text-white px-2 py-1 text-sm rounded-md">
              Seamless
            </div>
            {/* <h1 className="text-2xl font-bold mt-2">{productData.title}</h1> */}
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              {/* <span className="ml-2 text-gray-600">
                ({productData.reviews})
              </span> */}
            </div>
            {/* <div className="mt-2">
              <span className="text-gray-500 line-through">
                ₹{productData.originalPrice}
              </span>
              <span className="ml-2 text-xl font-bold">
                ₹{productData.salePrice}
              </span>
            </div> */}
          </div>

          {/* Material Selection */}
          <MaterialSlider />
          {/* Wall Size */}
          <div className="space-y-4 bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Wall Size</h2>
            <hr />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Width</label>
                <div className="relative">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">
                    ft
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Height</label>
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">
                    ft
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">
                  Total Area
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={(width * height).toFixed(2)}
                    className="w-full p-2 border rounded-lg"
                    readOnly
                  />
                  <span className="absolute right-3 top-2 text-gray-500">
                    sq.ft
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold ">Final Total : </h2>
            <span className="text-lg  mt-2">
              {" "}
              {/* Rs {productData?.salePrice * height * width}{" "} */}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-red-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="p-3 border border-gray-200 rounded-lg bg-white">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border border-gray-200 rounded-lg bg-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4  p-4 rounded-lg">
            {/* {productData.features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full mb-2">
                  <img
                    src={feature.image}
                    alt={feature.text}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <span className="text-xs">{feature.text}</span>
              </div>
            ))} */}
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              lobortis, sapien in consectetur ultricies, elit nunc auctor
              turpis, vel lacinia dui purus sit amet nunc. Nunc nec nisl
              ultrices, ultricies purus nec, tincidunt urna. Nullam nec
              ullamcorper nunc. Nullam nec ullamcorper nunc. Nullam nec
              ullamcorper nunc. Nullam nec ullamcorper nunc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
