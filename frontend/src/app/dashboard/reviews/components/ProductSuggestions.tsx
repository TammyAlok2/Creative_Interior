import React from "react";
import RatingProductCard from "./RatingProductCard";

interface ProductSuggestionsProps {
  suggestions: {
    id: number;
    title: string;
    imageSrc: string;
    reviewLink: string;
  }[];
  ratings: {
    label: string;
    color: string;
  }[];
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({
  suggestions,
  ratings,
  hoveredIndex,
  setHoveredIndex,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">
        Orders you might be interested reviewing
      </h3>
      <div className="space-y-4">
        {suggestions.map((product) => (
          <RatingProductCard
            key={product.id}
            product={product}
            ratings={ratings}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;
