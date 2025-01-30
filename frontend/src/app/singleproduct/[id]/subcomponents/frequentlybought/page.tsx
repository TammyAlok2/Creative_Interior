'use client';

import ProductCard from "@/components/Card/ProductCard";

import { products } from "@/data/ProductData";

interface SingleProductsProps {
  category?: string;
  ribbon?: boolean;
}

export default function SingleProducts({
  category,
  ribbon = false,
}: SingleProductsProps) {
  // Filter products based on category
  const filteredProducts = category
    ? products.filter((product) => product.category === category).slice(0, 3)
    : products.slice(0, 2);

  return (
    <div className="relative flex flex-wrap gap-6 my-6 bg-white">
      {/* Swiper Navigation Buttons */}

        {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} ribbon={ribbon} />
        ))}
    </div>
  );
}
