'use client';
import { useState, useEffect } from 'react';
import { SingleProductCardProps } from '@/types/ProductCard';
import Image from 'next/image';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ProductCardButton from './ProductCardButton';
import { useProductStore } from '@/stores/productStore';
import { useWishlistStore } from '@/stores/wishlistStore'
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

const ProductCard: React.FC<SingleProductCardProps> = ({ product, ribbon }) => {

  const { addToWishlist, removeFromWishlist } = useWishlistStore();
  const setProduct = useProductStore((state) => state.setProduct);

  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);

  const [isLiked, setIsLiked] = useState<any>(0);

  const toggleLike = () => {
    if (!isLiked) {
      // If not currently liked, add to wishlist
      addToWishlist(product);
      toast.success("Product added to wishlist");
    } else {
      // If currently liked, remove from wishlist
      removeFromWishlist(product._id);
      toast.success("Product removed from wishlist");
    }

    // Toggle the liked state
    setIsLiked(!isLiked);
  };

  // Safely handle image


  return (
    <>
      {/* <Toaster /> */}
      <div className="relative bg-white [box-shadow:0_0_0.5rem_0_lightgray] hover:[box-shadow:0_0_1rem_0_lightgray] rounded-lg border md:w-[19rem] max-[991px]:w-[19rem] lg:w-[19rem] mr-0 overflow-hidden">
        {/* Product Image */}
        <div className="relative w-full h-[15rem]">
          <Link href={`/singleproduct/${product?._id}`}>
          <Image
            src={product?.images[0]?.secure_url}
            alt={product?.name || "Product Image"}
            width={300}
            height={200}
            className="rounded-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105 select-none"
          />
          </Link>
          {/* Heart Icon */}
          <button
            onClick={toggleLike}
            className={`absolute top-3 right-3 text-2xl ${isLiked ? 'text-red' : 'text-pink'} z-[5]`}
          >
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart className='text-red' />}
          </button>
        </div>


        {/* Ribbon 
    {
      ribbon ? (
        <>
          <div className={`absolute top-2 left-2 bg-medium_primary ${product?.ribbon?.color} text-white text-xs font-bold py-1 px-3 rounded`}>
            {product?.ribbon?.text}
          </div>
        </>
      ) : <div></div>
    }
      */}

        {/* Product Details */}
        <div className="p-4">
        <Link href={`/singleproduct/${product?._id}`}>
            <h3 className="text-lg font-semibold truncate text-gray-dark text-center leading-[1.5rem]">{product?.name || 'Product Name'}</h3>

          {/* Price and Discount */}
          <div className="flex items-center justify-between gap-3 mt-3">
            <span className="bg-green-100 text-primary text-xs px-2 py-1 rounded font-bold">
              ⭐ {product?.ratings}
            </span>
            <div className='flex justify-between items-center gap-2 mr-[0.2rem]'>
              <span className="text-lg font-bold text-gray-dark">₹{product?.price || '500'}</span>
              <span className="text-sm text-medium_primary">({product?.discount || '10'}% OFF)</span>
            </div>
          </div>
        </Link>
          <ProductCardButton product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;