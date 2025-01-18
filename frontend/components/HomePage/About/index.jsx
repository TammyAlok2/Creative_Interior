'use client'
import React from 'react';
import { UserCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[url('/images/HomePage/About/About.jpg')] bg-cover bg-center">
      {/* Background Letters */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-[40vw] font-bold text-gray-200">UI</span>
      </div>

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 text-gray-500 uppercase tracking-wider">OUR STORIES</span>
            
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-sky-400 leading-tight">
              We design <br />
              everything we make.
            </h1>
            
            <p className="mb-8 text-gray-600 max-w-lg">
              Sed cursus turpis vitae tortor. Curabitur ligula sapien, tincidunt non, euismod posuere 
              imperdiet, leo. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam cursus 
              lacinia erat. Nulla sit amet est.
            </p>
            
            <div>
              <button className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors">
                <UserCircle className="w-5 h-5" />
                ABOUT US
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          {/* <div className="relative">
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 rotate-90 text-gray-200">
              <span className="uppercase tracking-[1em] text-sm">DAVICI FURNITURE</span>
            </div>
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
              <img
                 src="/images/HomePage/About/About.jpg"
                alt="Modern wooden lamp"
                className="h-full w-full object-contain"
              />
            </div>
          </div> */}
        </div>
        
        {/* Decorative Leaves */}
        <div className="absolute top-0 right-0 -z-10">
          <img
            src="/images/HomePage/About/About.jpg"
            alt="Decorative leaf"
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 -z-10">
          <img
            src="/api/placeholder/200/200"
            alt="Decorative leaf"
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;