'use client';

import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          className={`text-2xl transform transition-transform duration-200 ${
            star <= rating ? 'text-yellow scale-150' : 'text-gray-thin scale-125'
          } hover:scale-150`}
        >
          ★
        </button>
      ))}
      {rating === 1 && <span className="text-red font-bold ml-2 text-xl">Very Bad</span>}
      {rating === 2 && <span className="text-black font-bold ml-2 text-xl">Bad</span>}
      {rating === 3 && <span className="text-blue-dark font-bold ml-2 text-xl">Good</span>}
      {rating === 4 && <span className="text-primary font-bold ml-2 text-xl">Very Good</span>}
      {rating === 5 && <span className="text-green-600 font-bold ml-2 text-xl">Excellent</span>}
    </div>
  );
};

const ReviewGuidelines = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md border">
      <div>
        <h3 className="text-lg font-semibold">What makes a good review</h3>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Have you used this product?</h3>
        <p className="text-gray-600">Your review should be about your experience with the product.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Why review a product?</h3>
        <p className="text-gray-600">Your valuable feedback will help fellow shoppers decide!</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">How to review a product?</h3>
        <p className="text-gray-600">
          Your review should include facts. An honest opinion is always appreciated. If you have an issue with the
          product or service please
          <a href="#" className="text-blue-500 hover:underline ml-1">
            contact us
          </a>{' '}
          from the help centre.
        </p>
      </div>
    </div>
  );
};

const ReviewForm = () => {
  const [rating, setRating] = React.useState(0);

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md border">
      <div>
        <h2 className="text-xl font-semibold mb-4">Rate this product</h2>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Review this product</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-medium mb-1">Description</label>
            <textarea
              className="w-full min-h-[120px] p-3 border rounded-md focus:ring-2 focus:ring-medium_primary focus:border-medium_primary outline-none"
              placeholder="Description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-medium mb-1">Title (optional)</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-medium_primary focus:border-medium_primary outline-none"
              placeholder="Review title..."
            />
          </div>
        </div>
      </div>
      <button className="w-full py-3 px-4 bg-orange-500 border font-semibold rounded-lg hover:bg-orange hover:text-white transition-colors">
        SUBMIT
      </button>
    </div>
  );
};

const ProductReview = () => {
  return (
    <div className="max-w-6xl mx-auto grid mb-[7rem] md:grid-cols-[300px,1fr] gap-6 mt-[8rem] border p-[1rem] shadow-md rounded-xl">
      <ReviewGuidelines />
      <ReviewForm />
    </div>
  );
};

export default ProductReview;
