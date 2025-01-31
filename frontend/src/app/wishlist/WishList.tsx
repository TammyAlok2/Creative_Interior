'use client';

import React from "react";
import ProductItem from "../dashboard/wishlist/wishlistcomponents/ProductItem";
import { useWishlistStore } from "@/stores/wishlistStore";


interface WishlistTitleProps {
  wishlistTitle: {
    title: string;
  };
}
 // update some thing 1 
interface WishlistItem {
  id: string;
  image: string;
  name: string;
  price?: number; // Optional if WishList doesn't include price
  description?: string; // Optional if WishList doesn't include description
  rating?: number; // Optional if WishList doesn't include rating
}

const Wishlist: React.FC<WishlistTitleProps> = ({ wishlistTitle }) => {

  const { wishlist, removeFromWishlist } = useWishlistStore();
  // console.log(wishlist)

  const handleDelete = (id: string) => {
    removeFromWishlist(id); // Update Zustand store directly
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{wishlistTitle.title as any}</h1>
      <div className="space-y-4">
        {/* {wishlistProducts.map((product, index) => ( */}
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty!</p>
        ) : (
          wishlist.map((item:any, index:number) => (

            //@ts-ignore
            <ProductItem
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}
              rating={item.rating}
              onDelete={() => handleDelete(item.id)}
            />
            // ))}
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
