import React from "react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: "/images/SingleProduct/WhyChooseUs/Easy-To-Install.png",
      title: "Easy to install",
    },
    {
      icon: "/images/SingleProduct/WhyChooseUs/Eco-Friendly.png",
      title: "Eco-friendly",
    },
    {
      icon: "/images/SingleProduct/WhyChooseUs/Material-Choices.png",
      title: "Material choices",
    },
    {
      icon: "/images/SingleProduct/WhyChooseUs/Free-Installation.png",
      title: "Free Installation kit",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          Why Choose #Creative-Interior ?
        </h2>
        <p className="max-w-4xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          Our products are made from high-quality materials, ensuring durability
          and longevity. Additionally, our designs are unique and eye-catching,
          adding a touch of elegance and sophistication to any space. We offer a
          wide range of products, including wallpapers, canvas, customised
          wallpapers, murals, and blinds, allowing you to customise your home
          entirely—our exceptional customer service, with experts always ready
          to assist with any inquiries or concerns. Choosing Creative-Interior is a
          surefire way to elevate your home decor game.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-red-50 rounded-xl p-6 flex flex-col items-center text-center border border-b-[.5rem] border-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:border-b-orange-orange500"
          >
            <div className="w-16 h-16 mb-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
          aria-label="Contact on WhatsApp"
        >
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            1
          </span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.91 5.83L2 22l4.17-1.09C7.81 21.91 9.83 22.6 12 22.6c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.74 0-3.41-.47-4.87-1.35l-.35-.16-3.63.95.95-3.63-.16-.35A7.925 7.925 0 012.4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WhyChooseSection;
