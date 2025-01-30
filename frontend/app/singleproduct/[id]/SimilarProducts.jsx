"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useProductDataStore } from "../../../stores/productStore";
import ProductCard from "../../../components/Card/ProductCard";

export default function SingleProducts({
    category,
    ribbon = false,
}) {

    const {product} = useProductDataStore()

    // Filter products based on category
    const filteredProducts = category
        ? product.filter((product) => product?.category?._id === category?._id)
        : product;

    const [responsiveProducts, setResponsiveProducts] = useState(filteredProducts?.slice(0, 2));

    return (
        <div className="relative flex flex-col my-6 bg-white mx-auto w-[90%]">
            {/* Section Header */}

            <h1 className="text-2xl font-semibold mb-6 text-left">Similar Products</h1>
            {/* Single Row Container */}
            <div className="relative flex flex-wrap justify-center gap-6 my-6 bg-white">
            {filteredProducts?.length > 0 ? (
                <Swiper
              spaceBetween={20}
              slidesPerView={4}
            //   navigation={true}
              autoplay={{
                delay: 4000, // Auto-slide every 2 seconds
                disableOnInteraction: false, // Continue autoplay after user interaction
              }}
              modules={[Autoplay, Pagination, Navigation]}
              breakpoints={{
                280: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            997: { slidesPerView: 3 },
            1373: {slidesPerView: 4},
            1480: { slidesPerView: 4 },
            1580: { slidesPerView: 5 },
              }}
              className="custom-width"
            >
                {filteredProducts?.map((product, index) => (
                    <SwiperSlide
                    key={index}
                    style={{
                      display: "flex", marginRight: ".1rem", gap: '4rem',
                      flex: "0 0 auto", width: "20rem",
                    }}
                    className="swiperSlide"
                  >
                    <ProductCard key={product?._id} product={product} ribbon={ribbon} />
                    </SwiperSlide>
                ))}
                </Swiper>
            ) : (
                <div className="w-full text-center py-10 text-gray-500">
                  No products yet in this category
                </div>
              )}
            </div>
        </div>
    );
}
