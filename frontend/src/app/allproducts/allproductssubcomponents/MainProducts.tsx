'use client';

import ProductCard from "@/components/Card/ProductCard";
import { products } from "@/data/ProductData";
import { useCartStore } from "@/stores/cartStore";
import { useProductDataStore } from "@/stores/productStore";
import { useEffect, useMemo } from "react";

interface SingleProductsProps {
  category?: {_id?: string};
  ribbon?: boolean;
  showSliderButton?: boolean; // Prop to control slider button visibility
}

export default function MainProducts({
  category,
  ribbon = false,
  showSliderButton = false,
}: SingleProductsProps) {
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
    
      const handleAddToCart = (product: {
        _id: string;
        id: string;
        image: string;
        name: string;
        price: number;
        description: string;
        rating: number;
      }) => {
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
