"use client";

import React, { useEffect, useState } from "react";
// import { Heart, Share2, ShoppingCart } from "lucide-react";
import MaterialSlider from "./MaterialSlider";
import ProductGallery from "./ProductGalleryImage";
import { useParams } from "next/navigation";
import { useProductDataStore } from "../../../stores/productStore"
import { Heart, Share2, ShoppingCart, Star, StarHalf } from "lucide-react";
import { useCartStore } from "../../../stores/cartStore"
import { useWishlistStore } from "../../../stores/wishlistStore"
import Link from "next/link";
import { productData } from "@/data/productData";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [width, setWidth] = useState("10");
  const [height, setHeight] = useState("10");

  const [products, setProducts] = useState(null);

  const { product } = useProductDataStore();

  // Get the ID from URL
  const params = useParams();
  const id = params?.id;

  console.log("product_data: ", products)

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
  // console.log("products hai:", products)

  // Add loading state
  if (!product) {
    return <div>Loading...</div>;
  }

  // ratings

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-star-${i}`}
          className="w-5 h-5 text-gray-300"
        />
      );
    }

    return stars;
  };

  // add to cart 

  const { items, addItem } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  console.log("wishlist hai yaar: ", wishlist)

  // Check if the product is already in the cart
  const isProductInCart = items.some(item => item?.product?._id === products?._id);

  const handleAddToCart = () => {
    addItem(products);
  };

  // toggle like

  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      addToWishlist(products);
    } else {
      removeFromWishlist(products?._id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-red-50 mt-[5rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Image Gallery */}
        <ProductGallery product={products} />

        {/* Right Section - Product Details */}
        <div className="space-y-6">
          <div className="border-b bg-white p-4 rounded-lg ">
            <div className="inline-block bg-red-600 py-1 font-bold text-lg text-gray-600 rounded-md">
              {products?.name}
            </div>
            {/* <h1 className="text-2xl font-bold mt-2">{productData.title}</h1> */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {renderStars(products?.ratings || 0)}
                </div>
                <span className="text-sm text-gray-600">
                  ({products?.numOfReviews || 0} Reviews)
                </span>
              </div>

              {/* Add average rating display */}
              <div className="mt-1 text-sm text-gray-600">
                Average Rating: {products?.ratings?.toFixed(1) || "0.0"} out of 5
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-500 line-through">
                ₹{products?.price + 100}
              </span>
              <span className="ml-2 text-xl font-bold">
                ₹{products?.price}
              </span>
            </div>
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
                    className="w-full p-2 no-spinner border rounded-lg"
                  />
                  <span className="absolute right-1 top-2 text-gray-500">
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
                  <span className="absolute right-1 top-2 text-gray-500">
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
              Rs {parseInt(products?.price || 1) * height * width}{" "}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {
              !isProductInCart ? (
                <button className="flex-1 bg-red-600 py-3 rounded-lg flex items-center justify-center space-x-2 bg-orange-orange500 hover:opacity-[0.9] text-white" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <Link href="/cart" className="flex-1 flex">
                  <button className="flex-1 bg-red-600 py-3 rounded-lg flex items-center justify-center space-x-2 bg-orange-orange500 hover:opacity-[0.9] text-white" onClick={handleAddToCart}>
                    <ShoppingCart className="w-5 h-5" /><span>Go to Cart</span>
                  </button>
                </Link>
              )
            }


            {/* <button className="p-3 border border-gray-200 rounded-lg bg-white">
              <Heart className="w-5 h-5" />
            </button> */}

            <button
                onClick={toggleLike}
                className={`right-4 text-3xl ${isLiked ? "text-red" : "text-gray-dark"}`}
              >
                {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>

            <button className="p-3 border border-gray-200 rounded-lg bg-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4  p-4 rounded-lg">
            {productData.features.map((feature, idx) => (
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
            ))}
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-600 mt-2">
              {products?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
