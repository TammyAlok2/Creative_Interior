"use client";
import { useState } from "react";
import WallpaperCard from "./WallpaperCard";
import { Loader2 } from "lucide-react";
import Wallpapers from "@/data/Wallpaper";
import Link from "next/link";

const WallpaperGrid = () => {
  const [activeCategory, setActiveCategory] = useState("Premium Wallpapers");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Premium Wallpapers",
    "Wallpaper Rolls",
    "Blinds",
    "Canvas",
  ];

  // Sample data - replace with your backend data

  const handleCategoryChange = async (category) => {
    setIsLoading(true);
    setActiveCategory(category);

    // Simulate API call - replace with actual backend call
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsLoading(false);
  };

  // Filter wallpapers based on active category
  const filteredWallpapers = Wallpapers.filter(
    (wallpaper) => wallpaper.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Navigation */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-1 min-w-max bg-gray-100 p-1 rounded-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${
                  activeCategory === category
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Title and Description */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">{activeCategory}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Redefine luxury with our {activeCategory.toLowerCase()} — where walls
          become works of art.
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
            <p className="text-gray-600">Loading {activeCategory}...</p>
          </div>
        </div>
      ) : (
        /* Wallpaper Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWallpapers.map((wallpaper,index) => (
            <Link href="/wallpaper/multiple">
              <WallpaperCard
                key={index}
                primary={wallpaper.primary}
                hover={wallpaper.hover}
                title={wallpaper.title}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WallpaperGrid;

// You can also create a separate Categories component for better organization:
const Categories = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-1 min-w-max bg-gray-100 p-1 rounded-lg">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${
                activeCategory === category
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
