'use client';

import React, { useEffect } from "react";
import ProductItem from "../dashboard/wishlist/wishlistcomponents/ProductItem";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useProductDataStore } from "@/stores/productStore";

interface WishlistTitleProps {
  wishlistTitle: {
    title: string;
  };
}

interface WishlistItem {
  _id: string;
  image: string;
  name: string;
  price?: number;
  description?: string;
  rating?: number;
}

const Wishlist: React.FC<WishlistTitleProps> = ({ wishlistTitle }) => {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const { product } = useProductDataStore();
  const [processedProducts, setProcessedProducts] = React.useState<WishlistItem[]>([]);

  const handleDelete = (id: string) => {
    removeFromWishlist(id);
  };

  useEffect(() => {
    if (!wishlist?.products || !product || !Array.isArray(product)) {
      setProcessedProducts([]);
      return;
    }

    const processed = wishlist.products
      .map((wishlistItem: any) => {
        if (!wishlistItem) return null;

        const matchingProduct = product.find((p: any) => {
          if (!p || !p._id) return false;
          return p._id === wishlistItem;
        });

        if (matchingProduct) {
          return {
            _id: matchingProduct._id || '',
            image: matchingProduct.images?.[0] || '',
            name: matchingProduct.name || '',
            // price: matchingProduct.price || 0,
            description: matchingProduct.description || '',
            rating: matchingProduct.rating || 0
          };
        }
        return null;
      })
      .filter(Boolean);

    setProcessedProducts(processed);
  }, [wishlist, product]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{wishlistTitle?.title}</h1>
      <div className="space-y-4">
        {processedProducts?.length === 0 ? (
          <p>Your wishlist is empty!</p>
        ) : (
          processedProducts?.map((item: WishlistItem, index: number) => (
            <ProductItem
              key={item}
              product={item}
              onDelete={() => handleDelete(item)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;