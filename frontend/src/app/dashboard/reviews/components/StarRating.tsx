import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= rating ? "#FACC15" : "#E5E7EB"}
          className={`${
            star <= rating
              ? 'text-yellow'
              : 'text-gray-thin'
          }`}
          strokeWidth={1}
        />
      ))}
    </div>
  );
};

export default StarRating;