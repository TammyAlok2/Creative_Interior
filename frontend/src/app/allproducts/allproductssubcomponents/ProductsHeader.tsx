import React from 'react';

const ProductsHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b p-4">
      <div className="text-lg font-semibold">
        <span>Home / Bamboo / Eco-Friendly Products</span>
        <h1 className="text-2xl font-bold mt-1">Eco-Friendly Products</h1>
      </div>
      <div className="mt-4 md:mt-0">
        <select className="border px-4 py-2 rounded-lg">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
