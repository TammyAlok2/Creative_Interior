'use client'
import { useState } from 'react';
const WallpaperCard = ({ primary, hover, title }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
  
    const handleLikeClick = (e) => {
      e.preventDefault();
      setIsLiked(!isLiked);
    };
  
    return (
      <div
        className="relative group rounded-lg overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          width: '100%',
          aspectRatio: '16 / 9', // Maintain consistent aspect ratio
        }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <img
            src={isHovering ? hover : primary}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
        <button
          onClick={handleLikeClick}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isLiked ? 'bg-red-500 hover:bg-red-600' : 'bg-black/30 hover:bg-black/50'
          }`}
        >
          <svg
            className={`w-6 h-6 transition-colors ${
              isLiked ? 'text-white' : 'text-white'
            }`}
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    );
  };
  
  export default WallpaperCard