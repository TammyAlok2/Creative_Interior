'use client'

import WallpaperCard from './WallpaperCard';


// WallpaperGrid Component
const WallpaperGrid = () => {
  const wallpapers = [
    {
      id: 1,
      title: 'Vibrant Tropical Trees',
      primary: '/images/HomePage/WallPaper/Wall1.jpg',
      hover: '/images/HomePage/WallPaper/Wall1-Hover.jpg',
    },
    {
      id: 2,
      title: 'Tropical Trees and Plants',
      primary: '/images/HomePage/WallPaper/Wall2.jpg',
      hover: '/images/HomePage/WallPaper/Wall2-Hover.jpg',
    },
    {
      id: 3,
      title: 'Explorer, 3D Landscape',
      primary: '/images/HomePage/WallPaper/Wall3.jpg',
      hover: '/images/HomePage/WallPaper/Wall3-Hover.jpg',
    },
    {
        id: 4,
        title: 'Explorer, 3D Landscape',
        primary: '/images/HomePage/WallPaper/Wall4.jpg',
        hover: '/images/HomePage/WallPaper/Wall4-Hover.jpg',
      },
      {
        id: 5,
        title: 'Explorer, 3D Landscape',
        primary: '/images/HomePage/WallPaper/Wall5.jpg',
        hover: '/images/HomePage/WallPaper/Wall5-Hover.jpg',
      },
      {
        id: 6,
        title: 'Explorer, 3D Landscape',
        primary: '/images/HomePage/WallPaper/Wall6.jpg',
        hover: '/images/HomePage/WallPaper/Wall6-Hover.jpg',
      },
      {
        id: 7,
        title: 'Kamdhenu Sacred Cow Pichwai Wallpaper, Customized',
        primary: '/images/HomePage/WallPaper/Wall7.jpg',
        hover: '/images/HomePage/WallPaper/Wall7-Hover.jpg',
      },
      {
        id: 8,
        title: 'Explorer, 3D Landscape',
        primary: '/images/HomePage/WallPaper/Wall8.jpg',
        hover: '/images/HomePage/WallPaper/Wall8-Hover.jpg',
      },
      {
        id: 9,
        title: 'Explorer, 3D Landscape',
        primary: '/images/HomePage/WallPaper/Wall9.jpg',
        hover: '/images/HomePage/WallPaper/Wall9-Hover.jpg',
      },

  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Premium Wallpapers for Walls
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Redefine luxury with our premium wallpapers — where walls become works of art.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.id}
            primary={wallpaper.primary}
            hover={wallpaper.hover}
            title={wallpaper.title}
          />
        ))}
      </div>
    </div>
  );
};

export default WallpaperGrid;
