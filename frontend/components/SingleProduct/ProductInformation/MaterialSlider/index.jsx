"use client";
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MaterialSlider = () => {
  const [selectedMaterial, setSelectedMaterial] = useState("Quick Fix Paste");
  const sliderRef = useRef(null);

  const productData = {
    materials: [
      {
        id:1,
        image: "/images/SingleProduct/WallPaper/Material/material1.png",
        label: "Quick Fix Paste",
        price: 990.0,
        ribbon: "200",
        isNew: true
      },
    
      {
        id:3,
        image: "/images/SingleProduct/WallPaper/Material/material3.png",
        label: "Peel & Stick",
        price: 990.0,
        ribbon: "41"
      },
      {
        id:4,
        image: "/images/SingleProduct/WallPaper/Material/material4.png",
        label: "Premium Canvas Texture",
        price: 990.0,
        ribbon: "70"
      },
      {
        id:5,
        image: "/images/SingleProduct/WallPaper/Material/material5.png",
        label: "Peel & Stick",
        price: 990.0,
        ribbon: "42"
      },
     
    ]
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 280; // Adjust based on card width + gap
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Choose a material</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded-full border hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1 rounded-full border hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {productData.materials.map((material, idx) => (
          <div
            key={idx}
            className="min-w-[120px] snap-start"
          >
            <button
              onClick={() => setSelectedMaterial(material.id)}
              className={`relative w-full border rounded-lg overflow-hidden ${
                selectedMaterial === material.id
                  ? "border-red-500 ring-2 ring-red-500"
                  : "border-gray-200"
              }`}
            >
              {/* New Label */}
              {material.isNew && (
                <div className="absolute top-0  left-0 bg-gray-600 text-white px-4 py-1 -rotate-45 -translate-x-6 translate-y-2">
                  NEW
                </div>
              )}
              
              {/* Price Ribbon */}
              {material.ribbon !== "0" && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
                  +₹{material.ribbon}
                </div>
              )}
              
              {/* Material Image */}
              <div className="aspect-square w-full bg-gray-50">
                <img
                  src={material.image}
                  alt={material.label}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Material Label */}
              <div className="p-2 text-center">
                <div className="text-sm font-medium">{material.label}</div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MaterialSlider;