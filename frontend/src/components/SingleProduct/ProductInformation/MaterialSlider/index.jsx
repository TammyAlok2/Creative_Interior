"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductDataStore } from "@/stores/productStore";
import { useMaterialStore } from "@/stores/materialStore";

const MaterialSlider = ({ setMaterialPrice }) => {
  const [selectedMaterial, setSelectedMaterial] = useState("Quick Fix Paste");
  const sliderRef = useRef(null);

  const { product } = useProductDataStore();
  const { materials, getAllMaterials } = useMaterialStore();

  useEffect(() => {
    getAllMaterials();
  }, []);

  useEffect(() => {
    if (materials && materials?.length > 0) {
      // Set the first material as default
      const firstMaterial = materials[0];
      setMaterialPrice(firstMaterial?.price);
    }
  }, [materials, setMaterialPrice]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 280; // Adjust based on card width + gap
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Choose a material</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-full border hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-full border hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {materials.map((material, idx) => {
          return (
            <div key={material._id} className="w-[8rem] snap-start">
              <button
                onClick={() =>
                  setSelectedMaterial(material?._id) ||
                  setMaterialPrice(material?.price)
                }
                className={`relative w-full border rounded-lg overflow-hidden ${
                  selectedMaterial === material._id
                    ? "border-red-500 ring-2 ring-red-500"
                    : "border-gray-200"
                }`}
              >
                <div className="absolute top-0 left-0 bg-gray-600 text-white px-4 py-1 -rotate-45 -translate-x-6 translate-y-2">
                  NEW
                </div>

                <div className="absolute top-2 right-2 bg-red-600 shadow-sm px-2 py-1 text-xs border font-bold rounded bg-white">
                  +₹{material.price}
                </div>
                <div className="aspect-square w-full border-b rounded-b-md overflow-hidden bg-gray-50">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-in-out"
                  />
                </div>
                <div className="p-2 text-center">
                  <div className="text-sm font-bold leading-4 tracking-[.01rem] truncate">
                    {material.name}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
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
