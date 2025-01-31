import React from 'react';

const ProgressIndicator: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <span className="text-gray-800 font-medium">Address</span>
      </div>
      <div className="w-full h-0.5 bg-gray-300"></div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <span className="text-gray-400">Payment Details</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
