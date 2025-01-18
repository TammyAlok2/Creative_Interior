'use client'
import React from 'react';
import { Truck, CreditCard, RotateCcw, Palette } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Truck className="w-12 h-12 text-sky-400" />,
      title: "Free Shipping",
      description: "Capped at $39 per order"
    },
    {
      icon: <CreditCard className="w-12 h-12 text-sky-400" />,
      title: "Securety Payments",
      description: "Up to 12 months installments"
    },
    {
      icon: <RotateCcw className="w-12 h-12 text-sky-400" />,
      title: "14-Day Returns",
      description: "Shop with confidence"
    },
    {
      icon: <Palette className="w-12 h-12 text-sky-400" />,
      title: "Free Fabric Swatches",
      description: "Delivered to your door"
    }
  ];

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl text-sky-400 font-medium mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;