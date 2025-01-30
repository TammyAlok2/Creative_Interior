import React from 'react';

const StarBreakdown = ({ stars, totalRatings }) => (
  <div className="space-y-2">
    {stars.map((count, index) => (
      <div key={index} className="flex items-center">
        <span className="w-10">{5 - index} ★</span>
        <div className="flex-grow bg-gray-light h-2 rounded-lg overflow-hidden">
          {count > 0 && (
            <div
              className="bg-medium_primary h-2"
              style={{ width: `${(count / totalRatings) * 100}%` }}
            ></div>
          )}
        </div>
        <span className="ml-4">{count}</span>
      </div>
    ))}
  </div>
);

export default StarBreakdown;