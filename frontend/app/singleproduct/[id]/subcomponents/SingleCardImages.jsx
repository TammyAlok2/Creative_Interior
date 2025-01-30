'use client';

import { useCartStore } from '../../../../stores/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { RefObject, useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';

const SingleCardImages = ({ SingleProduct, leftSectionRef ,productQuantity}) => {

  // console.log(SingleProduct,'single product')

  // console.log(productQuantity)
  const { addItem, items,allCartItems } = useCartStore();
  // console.log(items)


  
  //console.log(SingleProduct?.images)

  // State to manage the main image
  const [mainImage, setMainImage] = useState(
    SingleProduct?.images[0]?.secure_url || ""
  );

  useEffect(() => {
    // Update main image if SingleProduct changes
    if (SingleProduct?.images?.[0]?.secure_url) {
      setMainImage(SingleProduct?.images[0]?.secure_url);
    }
  }, [SingleProduct]);

  const handleThumbnailHover = (img) => {
    if (img) setMainImage(img); // Update main image on thumbnail hover
  };

  // Check if the product is already in the cart
  const isProductInCart = items?.some(item => item?.product?._id == SingleProduct?._id);
  // console.log(isProductInCart)

  return (
    <div className='sticky top-0 max-lg:relative'>
      <div className="px-4 flex gap-[1rem] 2xl:w-[33rem]" ref={leftSectionRef}>
        <div className="flex flex-col space-y-2">
          {SingleProduct?.images?.map((img, index) => (
            <Image
              key={index}
              width="100"
              height="100"
              src={img?.secure_url || "/placeholder-thumbnail.png"}
              alt={`Product thumbnail ${index + 1}`}
              style={{ width: "6rem", height: "4.5rem" }}
              className="cursor-pointer rounded border hover:border-primary object-cover"
              onMouseEnter={() => handleThumbnailHover(img?.secure_url)} // Update main image on hover
            />
          ))}
        </div>

        <div className="relative w-full flex gap-[1rem] flex-col">
          <div className='overflow-hidden rounded-xl'>
            {mainImage && ( // Ensure mainImage is valid before rendering
              <Image
                width="380"
                height="120"
                src={mainImage || ""} // Use the mainImage state
                alt="Product Image"
                className="mr-[1rem] w-full h-[21rem] border rounded-xl object-cover hover:scale-[1.2] transition duration-300"
              />
            )}
          </div>
          <div className="flex space-x-4 justify-between">
            {SingleProduct?.stock > 0 ? (
              <>
                {!isProductInCart ? (
                  <button
                    className="max-xs:px-[4%] max-xs:text-[0.9rem] w-full max-sm:px-[8%] sm:px-[3rem] py-3 bg-gray-light text-gray-dark font-bold rounded hover:opacity-[0.9] active:bg-gray-light"
                    onClick={() => addItem(SingleProduct,productQuantity)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <Link href="/cart" className='w-full'>
                    <button
                      type="button"
                      className="max-xs:text-[0.9rem] w-full justify-center sm:px-[3rem] max-[575px]:px-[1.5rem] max-[391px]:px-[1rem] py-3 bg-primary text-white font-bold rounded hover:bg-medium_primary flex gap-[.3rem] items-center"
                    >
                      <MdShoppingCart className="text-[1.2rem]" /> Go to Cart
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <button
                className="max-xs:px-[4%] max-xs:text-[0.9rem] max-sm:px-[8%] sm:px-[3rem] py-3 bg-red-500 w-[100%] rounded-xl font-bold bg-red text-white opacity-50 cursor-not-allowed"
                disabled
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCardImages;