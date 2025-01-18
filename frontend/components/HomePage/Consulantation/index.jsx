'use client'
import React from 'react';

const WallpaperDesign = () => {
  return (
    <main className="w-full min-h-screen bg-neutral-100">
      {/* Top Section */}
      <section className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="relative w-full bg-neutral-200 rounded-lg overflow-hidden">
          {/* Main Image and Content */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left Side - Wallpaper Display */}
            <div className="w-full h-[400px] md:h-[500px] relative">
              <div className="absolute inset-0 bg-neutral-100">
                {/* Geometric Pattern Background */}
                <div className="w-full h-full p-8" style={{ background: 'linear-gradient(to right, #f5f5f5, #e5e5e5)' }}>
                  <div className="w-full h-full relative">
                    {/* Floating Shelf */}
                    <div className="absolute bottom-16 left-0 right-0">
                      <div className="bg-wood h-12 w-3/4 mx-auto shadow-md"></div>
                      {/* Plants and Decorations */}
                      <div className="flex justify-center -mt-12 space-x-4">
                        <div className="w-8 h-16 bg-green-600"></div>
                        <div className="w-6 h-8 bg-white rounded-full"></div>
                        <div className="w-6 h-8 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="p-6 md:p-8 bg-white rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-semibold mb-3">
                Customized Wallpapers for Your Signature Style!
              </h1>
              <p className="text-gray-600 mb-6">Your interiors, Your images.</p>
              <button className="w-full bg-red-800 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-all">
                Upload your design
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-8">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg p-8 shadow-lg">
          {/* Left Side - Form Content */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Wallpaper Consultation at Your Home
            </h2>
            <p className="text-gray-600 mb-6">
              Revamp Your Space: Personalized Wallpaper Consultation Delivered to Your Doorstep
            </p>
            <div className="space-y-4 mb-8">
              {['Design Consultation', 'Measurement', 'Material Exploration'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <button className="bg-red-800 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-all">
              Book Now
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block">
            <img 
              src="/images/HomePage/Consulantant/Consulatant.jpg" 
              alt="Consultation" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Fixed Contact Buttons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        <button className="bg-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="bg-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button className="bg-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .bg-wood {
          background: linear-gradient(to bottom, #deb887, #cd853f);
        }
      `}</style>
    </main>
  );
};

export default WallpaperDesign;