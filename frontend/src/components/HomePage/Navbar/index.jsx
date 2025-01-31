"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import LargeDeviceSearch from "./components/largedevicesearch/page";
import SmallDeviceSearch from "./components/smalldevicesearch/page";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = {
    shop: {
      label: "Shop",
      items: [
        { title: "Customized Wallpaper", items: ["Wallpaper"] },
        { title: "Wallpaper", items: ["Wallpaper"] },
      ],
    },
    products: {
      label: "Products",
      items: [
        "Indian Ethnic",
        "Religious",
        "Geometric",
        "Botanical",
        "Nature",
        "Sports",
        "Healthcare",
        "Abstract",
      ],
    },
    more: {
      label: "More",
      items: ["About Us", "Services", "Portfolio", "Blog", "FAQ", "Career"],
    },
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const { wishlist } = useWishlistStore();

  const { items } = useCartStore();

  // Wishlist count state
  const [wishlistCount, setWishlistCount] = useState("");
  const [cartCount, setCartCount] = useState("");

  useEffect(() => {
    setCartCount(items.length > 0 ? items.length : "");
  }, [items]);

  // console.log(wishlist.products.length)
  // console.log(wishlist.products)

  useEffect(() => {
    setWishlistCount(
      wishlist?.products?.length > 0 ? wishlist?.products?.length : ""
    );
  }, [wishlist]);

  const { user } = useAuthStore();

  console.log("wishlistdata: ", wishlistCount);
  console.log("cartCount: ", cartCount);

  return (
    <nav className="fixed top-0 w-full bg-white z-50 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo/Creative-Interior.png"
            alt="Creative Interiors Logo"
            width={80}
            height={80}
            className="w-16 sm:w-20 lg:w-24 h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <Link href="/" className="text-orange-orange500 whitespace-nowrap">
            Home
          </Link>

          {/* Shop Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-800 group-hover:text-orange-orange500 space-x-1">
              <span>Shop</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-64 transition-all duration-300">
              {menuItems.shop.items.map((item, index) => (
                <div key={index} className="relative group/sub px-4 py-2">
                  <div className="flex items-center justify-between hover:text-orange-orange500 cursor-pointer">
                    <span>{item.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="invisible group-hover/sub:visible opacity-0 group-hover/sub:opacity-100 absolute left-full top-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300">
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/shop/${subItem.toLowerCase()}`}
                        className="block px-4 py-2 hover:text-orange-orange500"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="text-gray-800 hover:text-orange-orange500 whitespace-nowrap"
          >
            Contact
          </Link>

          {/* Products Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-800 group-hover:text-orange-orange500 space-x-1">
              <span>Products</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300">
              {menuItems.products.items.map((item, index) => (
                <Link
                  key={index}
                  href={`/products/${item.toLowerCase().replace(" ", "-")}`}
                  className="block px-4 py-2 hover:text-orange-orange500 whitespace-nowrap"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-800 group-hover:text-orange-orange500 space-x-1">
              <span>More</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300">
              {menuItems.more.items.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block px-4 py-2 hover:text-orange-orange500 whitespace-nowrap"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar - Only visible on desktop/large screens */}

        {/* Right Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <LargeDeviceSearch />

          <SmallDeviceSearch setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen}/>

          {user ? (
            <Link href="/dashboard/profilesection" className="hover:text-orange-orange500">
              <span className="flex items-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden lg:inline ml-1">User</span>
              </span>
            </Link>
          ) : (
            <>
              <Link href="/signin" className="hover:text-orange-orange500">
                <span className="flex items-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="hidden lg:inline ml-1">Login</span>
                </span>
              </Link>
            </>
          )}
          <Link
            href="/dashboard/wishlist"
            className="relative hover:text-orange-orange500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
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
            <span className="absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          </Link>
          <Link href="/cart" className="relative hover:text-orange-orange500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>


        </div>
      </div>



      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 px-4">
            <Link href="/" className="py-2 text-orange-orange500">
              Home
            </Link>

            {/* Mobile Shop Dropdown */}
            <div>
              <button
                className="w-full flex items-center justify-between py-2 text-gray-800"
                onClick={() => toggleDropdown("shop")}
              >
                <span>Shop</span>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${activeDropdown === "shop" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {activeDropdown === "shop" && (
                <div className="pl-4 py-2 space-y-2">
                  {menuItems.shop.items.map((item, index) => (
                    <div key={index}>
                      <button
                        className="w-full flex items-center justify-between py-2 text-gray-800"
                        onClick={() => toggleDropdown(`shop-${index}`)}
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 transform transition-transform ${activeDropdown === `shop-${index}`
                            ? "rotate-180"
                            : ""
                            }`}
                        />
                      </button>
                      {activeDropdown === `shop-${index}` && (
                        <div className="pl-4 py-2 space-y-2">
                          {item.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={`/shop/${subItem.toLowerCase()}`}
                              className="block py-2 text-gray-800"
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="py-2 text-gray-800">
              Contact
            </Link>

            {/* Mobile Products Dropdown */}
            <div>
              <button
                className="w-full flex items-center justify-between py-2 text-gray-800"
                onClick={() => toggleDropdown("products")}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${activeDropdown === "products" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {activeDropdown === "products" && (
                <div className="pl-4 py-2 space-y-2">
                  {menuItems.products.items.map((item, index) => (
                    <Link
                      key={index}
                      href={`/products/${item.toLowerCase().replace(" ", "-")}`}
                      className="block py-2 text-gray-800"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile More Dropdown */}
            <div>
              <button
                className="w-full flex items-center justify-between py-2 text-gray-800"
                onClick={() => toggleDropdown("more")}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${activeDropdown === "more" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {activeDropdown === "more" && (
                <div className="pl-4 py-2 space-y-2">
                  {menuItems.more.items.map((item, index) => (
                    <Link
                      key={index}
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="block py-2 text-gray-800"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
