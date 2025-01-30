'use client';

import { productCategories } from "@/data/ProductData";

import {useCartStore} from '@/stores/cartStore';
import Link from "next/link";
import React from "react";
import { MdShoppingCart } from "react-icons/md";
import {Toaster, toast} from 'react-hot-toast';

const CardButton = ({ product }:any) => {
  const { addItem, removeItem, items } = useCartStore();
  // console.log("item: ", items)

  // Check if the product is already in the cart
  const isProductInCart = items.some(item => item?.product?.id === product?.id || item?.product?._id === product?._id);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="flex justify-between mt-5">
      <Link href={`/singleproduct/${product?._id || product?.id}`}>
        <button
          type="button"
          className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-light_primary font-small rounded-lg text-sm max-xs:px-5 max-xs:py-2 sm:px-2 sm:py-2 md:px-6 xs:px-5 xs:py-2 max-[1365px]:px-2 lg:px-4 xl:px-5 2xl:px-3 3xl:px-5 lg:py-2.5 text-center mb-2 dark:border-medium_primary dark:text-medium_primary dark:hover:text-white dark:hover:bg-medium_primary dark:focus:ring-primary"
        >
          View Detail
        </button>
      </Link>
      {isProductInCart ? (
        <Link href="/cart">
          <button
            type="button"
            className="text-white bg-primary hover:bg-gradient-to-r from-light_primary via-medium_primary to-primary
                 focus:ring-4 focus:outline-none focus:ring-light_primary dark:focus:dim-primary shadow-lg shadow-dim_primary dark:shadow-lg dark:shadow-dim_primary font-small rounded-lg text-sm max-xs:px-5 max-xs:py-2 sm:px-3 sm:py-2 md:px-3 xs:px-3 xs:py-2 lg:px-3 xl:px-3 2xl:px-3 3xl:px-3 lg:py-2.5 text-center mb-2 flex gap-[.3rem] items-center"
          >
            <MdShoppingCart className="text-[1.2rem]"/> Go to Cart
          </button>
        </Link>
      ) : (
        <button
        onClick={handleAddToCart}
          type="button"
          className="text-white bg-primary hover:bg-gradient-to-r from-light_primary via-medium_primary to-primary
               focus:ring-4 focus:outline-none focus:ring-light_primary dark:focus:dim-primary shadow-lg shadow-dim_primary dark:shadow-lg dark:shadow-dim_primary font-small rounded-lg text-sm max-xs:px-5 max-xs:py-2 sm:px-2 sm:py-2 md:px-6 xs:px-5 xs:py-2 lg:px-4 xl:px-5 2xl:px-3 3xl:px-5 lg:py-2.5 text-center mb-2"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default CardButton;