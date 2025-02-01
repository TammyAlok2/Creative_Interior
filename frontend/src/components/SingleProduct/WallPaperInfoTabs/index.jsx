'use client'
import React, { useState } from 'react';

const WallpaperInfoTabs = () => {
  const [activeTab, setActiveTab] = useState('guides');

  const tabs = [
    { id: 'guides', label: 'Guides' },
    { id: 'product', label: 'Product Information' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'sustainability', label: 'Sustainability' },
  ];

  const guides = [
    {
      title: "HOW TO MEASURE",
      image: "/images/SingleProduct/Guide/how-to-measure.png",
      description: "Not sure on how to measure your walls? Our measuring guide has got you covered on how to measure standard walls, sloped walls, and walls with doors and windows.",
      buttonText: "Full measuring guide"
    },
    {
      title: "HOW TO ORDER",
      image: "/images/SingleProduct/Guide/how-to-order.png",
      description: "Ordering a wallpaper has never been easier. Simply enter the measurements of your wall, resize / adjust your print preview and add to cart. We take care of the rest.",
      buttonText: "Detailed ordering guide"
    },
    {
      title: "HOW TO INSTALL",
      image: "/images/SingleProduct/Guide/how-to-install.png",
      description: "Browse our detailed installation guides on how to install wallpapers. Your order will also contain a complete instructions book as well as all the necessary tools required.",
      buttonText: "Detailed installation guide"
    }
  ];

  const GuidesContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      {guides.map((guide, index) => (
        <div key={index} className="flex flex-col items-center text-center p-8 m-8 border border-l-[.5rem] border-gray-200 rounded-xl hover:border-l-orange-orange500 shadow-sm transition-all duration-500 ease-in-out">
          <h2 className="text-red-800 font-bold text-xl mb-6">{guide.title}</h2>
          <div className="w-24 h-24 mb-6">
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mb-8 text-gray-700">{guide.description}</p>
          <button className="border border-red-800 text-red-800 px-6 py-2 hover:bg-gray-100 hover:font-bold hover:text-gray-700 transition-all rounded duration-500 ease-in-out">
            {guide.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
  const ProductContent = () => (
    <div className="p-6 m-[5em]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Krishna Pichwai Wallpaper: Magical Design Combined with Divine Artistry</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <table className="w-full border-collapse text-sm tracking-[.7] border border-gray-200">
            <tbody>
              <tr>
                <td className="border border-gray-200 p-1 bg-gray-50 font-medium">Price</td>
                <td className="border border-gray-200 p-1">Rs. 99/sq.ft.</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-1 bg-gray-50 font-medium">Shipping</td>
                <td className="border border-gray-200 p-1">Free</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-collapse text-sm tracking-[.7] border border-gray-200">
            <tbody>
              <tr>
                <td className="border border-gray-200 p-1 bg-gray-50 font-medium">Country of Origin</td>
                <td className="border border-gray-200 p-1">India</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-1 bg-gray-50 font-medium">Brand / Manufacturer</td>
                <td className="border border-gray-200 p-1">Creative Interior</td>
              </tr>
            </tbody>
          </table>

        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Material Options</h2>
            <p>Your wallpaper can be manufactured on any material of your choice, including premium textured, peel and stick(Self Adhesive), non-woven, mural textured, and roadies glitter.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">VOC Free and Non-Toxic</h2>
            <p>We use environmentally friendly, VOC-free materials that provide clean, breathable air for your loved ones.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Installation and Warranty</h2>
            <p>We provide installation service across all major metro cities in India. 3-year warranty included.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ShippingContent = () => (
    <div className="p-6 max-w-4xl mx-auto space-y-4 m-[5em]">
      <div>
        <p>Once your order has been placed, our design team will send you a <span className="text-red-800 underline">digital proof</span> for approval within 24hours.</p>
      </div>
      <div>
        <p>After approval, we will produce your wallpaper on priority within 48 hours.</p>
      </div>
      <div>
        <p>Average delivery time is 3-6 work days. If you are not satisfied with your wallpaper, please contact us as soon as possible after you have received your order. After due verification we will either replace or refund your order which ever necessary. <span className="text-red-800 underline">Shipping policy</span></p>
      </div>
    </div>
  );

  const sustainability = [
    {
      title: "Nordic Ecolabel Ecolabeled wallpaper",
      image: "/images/SingleProduct/Sustainability/Nordic.png",
    },
    {
      title: "Odurless Water Based Inks",
      image: "/images/SingleProduct/Sustainability/Odurless.png",
    },
    {
      title: "Nordic Ecolabel Ecolabeled wallpaper",
      image: "/images/SingleProduct/Sustainability/Smart.png",
    },
    {
      title: "Nordic Ecolabel Ecolabeled wallpaper",
      image: "/images/SingleProduct/Sustainability/Greenguard.png",
    }
  ]

  const SustainabilityContent = () => (
    <div className="p-6 m-[5em]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sustainability.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="relative w-32 h-32 mb-6">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover relative z-10"
              />
            </div>
            {/* <h3 className="text-sm font-medium text-gray-800 max-w-[200px]">
              {item.title}
            </h3> */}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'guides':
        return <GuidesContent />;
      case 'product':
        return <ProductContent />;
      case 'shipping':
        return <ShippingContent />;
      case 'sustainability':
        return <SustainabilityContent />;
      default:
        return <GuidesContent />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto m-[2em] ">
      <div className="grid grid-cols-1 md:grid-cols-4 border m-[2em] ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 text-center transition-colors ${activeTab === tab.id
              ? 'bg-gray-100  text-gray-700 font-bold'
              : 'bg-red-50 text-gray-700 border-x hover:bg-gray-100'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="border-t border-gray-200 ">
        {renderContent()}
      </div>
    </div>
  );
};

export default WallpaperInfoTabs;