'use client';
import React, { useEffect, useState } from "react";
import ProductItem from "./wishlistcomponents/ProductItem";
import { useWishlistStore } from "@/stores/wishlistStore";

// Define the title prop interface
interface WishlistTitleProps {
  wishlistTitle: {
    title: string;
  };
}

// Define the wishlist item interface
export interface WishlistItem {
  _id: string;
  images: string;
  name: string;
  price?: number;
  description?: string;
  rating?: number;
}

// Define the wishlist state interface to match your actual store structure
interface WishlistState {
  wishlist: WishlistItem[];  // Changed from { products: WishlistItem[] }
  removeFromWishlist: (id: string) => Promise<void>;
  fetchWishlist: () => Promise<any>;
}

const Wishlist: React.FC<WishlistTitleProps> = ({ wishlistTitle }) => {
  const { wishlist, removeFromWishlist, fetchWishlist } = useWishlistStore() as WishlistState;
  const [isLoading, setIsLoading] = useState(true);

  const loadWishList = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWishlist();
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWishList();
  }, []); // Empty dependency array means this runs once on mount

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await removeFromWishlist(id);
      await loadWishList();
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debug logging
  console.log("Wishlist items:", wishlist);

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="xs:w-[100%] bg-white p-[1rem]">
      <h1 className="text-3xl font-bold mb-4">{wishlistTitle.title}</h1>
      <div className="space-y-4">
        {isLoading ? (
          <Loader />
        ) : wishlist?.products?.length === 0 ? (
          <p>Your wishlist is empty!</p>
        ) : (
          wishlist?.products?.map((item: WishlistItem) => (
            <ProductItem
              key={item._id}
              product={item}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;