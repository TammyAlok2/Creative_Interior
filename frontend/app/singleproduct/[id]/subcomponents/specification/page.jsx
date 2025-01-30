'use client';

import React, { useState } from 'react';

const ProductSpecifications = ({ SingleProduct }) => {
  const [showAll, setShowAll] = useState(false);

  const handleReadMoreClick = () => {
    setShowAll(!showAll);
  };

  // Show either all rows or a limited number based on `showAll`
  const rowsToShow = showAll
    ? SingleProduct?.specifications
    : SingleProduct?.specifications?.slice(0, 4);

  return (
    <div className="bg-white rounded-lg p-4">
   
      <table className="w-full text-left">
        <tbody>
          {rowsToShow?.map((spec, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 font-medium text-gray-600 w-1/3">{spec?.key}</td>
              <td className="py-2 text-gray-600">{spec?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Toggle button to show more or less */}
      {SingleProduct?.specifications.length > 4 && (
        <div
          className="mt-4 text-blue-500 cursor-pointer"
          onClick={handleReadMoreClick}
        >
          {showAll ? 'Read Less' : 'Read More'}
        </div>
      )}
    </div>
  );
};

export default ProductSpecifications;
