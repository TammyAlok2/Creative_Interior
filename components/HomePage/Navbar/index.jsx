'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = {
    shop: {
      label: 'Shop',
      items: [
        { title: 'Customized Wallpaper', items: ['Wallpaper'] },
        { title: ' Wallpaper', items: ['Wallpaper'] },
     
      ]
    },
    products: {
      label: 'Products',
      items: [
        'Indian Ethnic',
        'Religious',
        'Geometric',
        'Botanical',
        'Nature',
        'Sports',
        'Healthcare',
        'Abstract'
      ]
    },
    more: {
      label: 'More',
      items: [
        'About Us',
        'Services',
        'Portfolio',
        'Blog',
        'FAQ',
        'Career'
      ]
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50 px-4 lg:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo/Creative-Interior.png"
            alt="Creative Interiors Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="text-orange-500">Home</Link>
          
          {/* Shop Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-800 group-hover:text-orange-500 space-x-1">
              <span>Shop</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-64 transition-all duration-300">
              {menuItems?.shop.items?.map((item, index) => (
                <div key={index} className="relative group/sub px-4 py-2">
                  <div className="flex items-center justify-between hover:text-orange-500 cursor-pointer">
                    <span>{item.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="invisible group-hover/sub:visible opacity-0 group-hover/sub:opacity-100 absolute left-full top-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300">
                    {item.items.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex}
                        href={`/shop/${subItem.toLowerCase()}`}
                        className="block px-4 py-2 hover:text-orange-500"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/contact" className="text-gray-800 hover:text-orange-500">Contact</Link>

          {/* Products Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-800 group-hover:text-orange-500 space-x-1">
              <span>Products</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300">
              {menuItems.products.items.map((item, index) => (
                <Link 
                  key={index}
                  href={`/products/${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-4 py-2 hover:text-orange-500"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-800 group-hover:text-orange-500 space-x-1">
              <span>More</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300">
              {menuItems.more.items.map((item, index) => (
                <Link 
                  key={index}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-4 py-2 hover:text-orange-500"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 border rounded-lg"
            />
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              <Search />
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/login" className="hover:text-orange-500">
            <span className="flex items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden lg:inline ml-1">Login</span>
            </span>
          </Link>
          <Link href="/wishlist" className="hover:text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
          <Link href="/cart" className="relative hover:text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Keeps click behavior for mobile */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
          <div className="flex flex-col space-y-4 px-4">
            <Link href="/" className="text-orange-500">Home</Link>
            <Link href="/shop" className="text-gray-800">Shop</Link>
            <Link href="/contact" className="text-gray-800">Contact</Link>
            <Link href="/products" className="text-gray-800">Products</Link>
            <Link href="/more" className="text-gray-800">More</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;