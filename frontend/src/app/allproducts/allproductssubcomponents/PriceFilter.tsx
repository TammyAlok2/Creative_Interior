import React from 'react';

const PriceFilter: React.FC = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold">Price</h2>
      <input type="range" min="800" max="10800" className="w-full mt-4" />
      <p className="text-sm text-gray-dark mt-2">₹800 - ₹10,800+</p>
    </div>
  );
};

export default PriceFilter;
