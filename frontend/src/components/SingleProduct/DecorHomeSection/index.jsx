import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function HomeDecorSection() {
  const socialIcons = [
    { icon: FaYoutube, link: "#" },
    { icon: FaInstagram, link: "#" },
    { icon: FaTwitter, link: "#" },
    { icon: FaLinkedin, link: "#" },
    { icon: FaFacebook, link: "#" },
  ];

  const images = [
    "/images/SingleProduct/HomeDecor/home1.png",
    "/images/SingleProduct/HomeDecor/home2.png",
    "/images/SingleProduct/HomeDecor/home3.png",
    "/images/SingleProduct/HomeDecor/home4.png",
    "/images/SingleProduct/HomeDecor/home5.png",
    "/images/SingleProduct/HomeDecor/home6.png",
  ];

  return (
    <section className="flex flex-col items-center bg-white py-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Share your home with <span className="text-red-600">#CreativeInterior</span>
      </h2>
      <div className="flex items-center space-x-4 mt-4">
        {socialIcons.map(({ icon: Icon, link }, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            <Icon />
          </a>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`Magic Decor ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
