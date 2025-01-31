'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ProductCardProps {
  product: {
    title: string;
    imageSrc: string;
    reviewLink: string;
  };
  ratings: {
    label: string;
    color: string;
  }[];
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const RatingProductCard: React.FC<ProductCardProps> = ({
  product,
  ratings,
  hoveredIndex,
  setHoveredIndex,
}) => {
  // State to track the selected rating index
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="flex items-start space-x-4 p-4 bg-white border rounded-lg shadow-sm">
      <Image
        width={90}
        height={90}
        src={product.imageSrc}
        alt="Product"
        className="object-cover border rounded-xl"
      />
      <div>
        <h4 className="text-[.98rem] tracking-[.02rem] font-medium text-gray-dark">
          {product.title}
        </h4>
        <div className="flex items-center mt-2">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className={`text-4xl cursor-pointer ${
                selectedIndex === index || hoveredIndex === index
                  ? rating.color
                  : "text-gray-thin"
              }`}
              onClick={() => setSelectedIndex(index)} // Set the selected rating on click
            >
              ★
            </div>
          ))}
          {(hoveredIndex !== null || selectedIndex !== null) && (
            <span
              className={`ml-2 text-xl font-medium ${
                ratings[hoveredIndex ?? selectedIndex!]?.color
              }`}
            >
              {ratings[hoveredIndex ?? selectedIndex!]?.label}
            </span>
          )}
        </div>
        <Link
          href={"/dashboard/reviews/write-review"}
          className="text-md underline hover:no-underline text-blue-Light hover:text-blue-dark mt-2 block"
        >
          Write a Review
        </Link>
      </div>
    </div>
  );
};

export default RatingProductCard;
