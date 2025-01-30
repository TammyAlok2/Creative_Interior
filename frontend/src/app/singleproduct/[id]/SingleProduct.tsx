"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams } from "next/navigation";
import { Product } from "@/types/ProductCard";
import SingleCardImages from "./subcomponents/SingleCardImages";
import { ImLocation2 } from "react-icons/im";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useProductDataStore } from "@/stores/productStore";
import SingleCardDescription from "./subcomponents/productdescription/page";

const SingleProduct: React.FC = () => {
  const [singleProduct, setSingleProduct] = useState<Product | null | any>(null);
  const { id } = useParams();
  const { product, allProduct }:any = useProductDataStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToWishlist, removeFromWishlist } = useWishlistStore();
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    allProduct();
  }, [allProduct]);

  useEffect(() => {
    const filteredProduct = product.find((p: Product) => p?._id === id);
    setSingleProduct(filteredProduct || null);
  }, [id, product]);

  //console.log("allProduct getting: ", allProduct)
 // console.log("products getting: ", product)

  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      addToWishlist(singleProduct);
    } else {
      removeFromWishlist(singleProduct?._id);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= (singleProduct?.stock || 0)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (singleProduct?.stock || 0)) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleThumbnailClick = (img: string) => {
    setSingleProduct((prevProduct:any) => prevProduct ? { ...prevProduct, image: img } : null);
  };

  useEffect(() => {
    const rightSection = rightSectionRef?.current;
    const leftSection = leftSectionRef?.current;

    if (!rightSection || !leftSection) return;

    const handleScroll = () => {
      const maxScroll = rightSection.scrollHeight - rightSection.clientHeight;
      const rightScrolledToEnd = rightSection.scrollTop >= maxScroll;

      if (rightScrolledToEnd) {
        leftSection.scrollTop = rightSection.scrollTop - maxScroll;
      }
    };

    rightSection.addEventListener("scroll", handleScroll);

    return () => {
      rightSection.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="max-xs:p-0 min-xs:p-6 min-h-screen">
      <div className="xs:max-w-[100%] 2xl:max-w-[90%] 3xl:max-w-[80%] mx-auto bg-white rounded-lg">
        <div className="flex flex-col items-start lg:flex-row overflow-y-auto scrollbar-hide scroll-smooth h-[90vh]">
          
          <SingleCardImages
            SingleProduct={singleProduct}
            leftSectionRef={leftSectionRef}
            productQuantity = {quantity}
          />

          <div className="flex-1 px-4 space-y-4 max-lg:mt-[2rem]" ref={rightSectionRef}>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-dark">
                {singleProduct?.name || "Product Name"}
              </h1>
              <button
                onClick={toggleLike}
                className={`right-4 text-3xl ${isLiked ? "text-red" : "text-gray-dark"}`}
              >
                {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            </div>
            <p className="text-gray-600">
              {singleProduct?.description || "No description available."}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-gray-dark">
                ₹{singleProduct?.price || "0"}
              </span>
              <span className="text-sm text-medium_primary">
                {singleProduct?.discount || "0"}% OFF
              </span>
              <span className="text-sm text-gray-medium line-through">
              ₹{singleProduct?.price + 500  || "599"}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="bg-low_primary text-medium_primary text-sm px-2 py-1 rounded">
                ⭐ {singleProduct?.ratings || "0"}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-gray-medium">
                Quantity:
              </label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="px-2 py-1 bg-gray-200 text-gray-dark font-bold rounded hover:bg-gray-light focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center w-[2rem] justify-center"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="text-center w-[3rem] py-1 rounded focus:outline-none font-light text-[1rem] ml-3"
                  readOnly
                />
                <button
                  onClick={incrementQuantity}
                  className="px-2 py-1 bg-gray-200 text-gray-dark font-bold rounded hover:bg-gray-light focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center w-[2rem] justify-center"
                >
                  +
                </button>
              </div>
            </div>
{/* 
            <div className="border-t pt-5">
              <h2 className="text-lg font-semibold text-gray-dark">
                Check Delivery Availability
              </h2>
              <div className="flex items-center mt-2 space-x-2 mb-[2rem]">
                <div className="flex items-center space-x-2 border-b-[0.2rem] border-primary">
                  <ImLocation2 className="text-primary text-[1.4rem]" />
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    className="w-48 px-3 py-2 outline-none"
                  />
                </div>
                <button className="px-4 py-2 bg-primary text-white font-bold rounded hover:bg-medium_primary focus:outline-none focus:ring-2 focus:ring-primary">
                  Check
                </button>
              </div>
            </div> */}
            <SingleCardDescription SingleProduct={singleProduct} />
            {/* Add other components or sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;