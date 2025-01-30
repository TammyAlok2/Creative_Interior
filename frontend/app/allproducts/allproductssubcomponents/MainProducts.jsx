'use client';

import ProductCard from "@/components/Card/ProductCard";
import { useCartStore } from "@/stores/cartStore";
import { useProductDataStore } from "@/stores/productStore";
import { useEffect, useMemo } from "react";

export default function MainProducts({
  category,
  ribbon = false,
  showSliderButton = false,
}) {
  // Filter products based on category

  const { product ,allProduct } = useProductDataStore();

const fetchProduct = async ()=>{
  await allProduct()
}

useEffect(()=>{
  fetchProduct()
},[])

  // console.log("products: ", product)

  const filteredProducts = useMemo(() => {
      // Add null/undefined checks     
      if (!category || !category._id) return [];
      return product.filter((prod) => prod?.category?._id == category._id);
    }, [product, category]);

    // console.log(filteredProducts,'filtered products')

    const addItemToCart = useCartStore((state) => state.addItem);
    
      const handleAddToCart = (product) => {
        addItemToCart(product);
      };

  return (
    <div className="relative flex flex-wrap gap-6 my-6 bg-white justify-center">
      {/* Swiper Navigation Buttons */}
        {filteredProducts.map((prod) => (
            <ProductCard
            key={prod._id}
            product={prod}
            ribbon={ribbon}
            // onAddToCart={() => handleAddToCart(prod)}
             />
        ))}
    </div>
  );
}
