'use client'
import React from "react";
import WallpaperCard from "@/components/HomePage/WallPaper/WallpaperCard";
import Wallpapers from "@/data/Wallpaper";
import Link from "next/link";
import { useProductDataStore } from "@/stores/productStore";

const SimilarProducts = () => {

  const {product} = useProductDataStore();
  console.log(product)
  return (
    <section className="py-8 px-4 bg-white">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 text-center mb-8">
        Related Products
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {product.slice(0, 6)?.map((wallpaper) => (
            <Link href = {`/wallpaper/multiple/${wallpaper._id}`} key={wallpaper.id}> 
         <WallpaperCard
         key={wallpaper._id}
    data={wallpaper}
         />
         </Link>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
