"use client";

import React, { useEffect, useState } from "react";
import NoReviewsSection from "./components/NoReviewsSection";
import ProductSuggestions from "./components/ProductSuggestions";
import { useReviewStore } from "@/stores/reviewStore";
import { useProductDataStore } from "@/stores/productStore";
import { useOrderStore } from "@/stores/orderStore";
import StarRating from "./components/StarRating";
import Image from "next/image";

const Reviews = () => {
  const { fetchReviewsByUser } = useReviewStore();
  const [reviews, setReviews] = useState([]); // Initialize as an empty array

  const {orders} = useOrderStore();
  

  //console.log("fetchOrders getting: ", orders)

  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response:any = await fetchReviewsByUser();
     

        // Ensure the data is an array before setting state
        if (Array.isArray(response?.data?.data)) {
          setReviews(response?.data?.data);
        } else {
          console.error("Unexpected response format:", response);
          setReviews([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]); // Set an empty array on error
      }
    };

    fetchReview();
  }, []);

  const data = {
    ratings: [
      { label: "Poor", color: "text-red-500" },
      { label: "Fair", color: "text-orange-500" },
      { label: "Good", color: "text-yellow-500" },
      { label: "Very Good", color: "text-green-500" },
      { label: "Excellent", color: "text-blue-500" },
    ],
    noReviewsSection: {
      title: "No Reviews & Ratings",
      description: "You have not rated or reviewed any product yet!",
      imageSrc:
        "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myReviewsEmpty_343559.png", // Replace with an appropriate image path
    },
    suggestions: [
      {
        id: 1,
        title: "Fitoda Fashion Men Casual White, Black Shirt",
        imageSrc: "/images/ProductsImage/Bottol.jpg", // Replace with an appropriate product image path
        reviewLink: "#",
      },
      {
        id: 2,
        title: "Selvia Solid Men Black, White Track Pants",
        imageSrc: "/images/ProductsImage/CupOpen.jpg", // Replace with an appropriate product image path
        reviewLink: "#",
      },
    ],
  };
 // console.log(reviews)

  return (
    <div className="box-shadow border rounded-xl p-6 w-[80%] max-[991px]:w-full">
      {/* Render No Reviews Section or Reviews List */}
      {reviews.length === 0 ? (
        <NoReviewsSection data={data.noReviewsSection} />
      ) : (
        <div className="reviews-list">
          <h2 className="text-xl font-bold mb-4">Your Reviews</h2>
          <ul className="space-y-4 rounded-lg flex flex-col justify-between max-[510px]:flex-col">
            {reviews.map((review :any, index) => (
              <>
              <li
                key={review._id || index}
                className="flex max-[600px]:flex-col max-[600px]:items-start items-center max-[600px]:justify-start justify-between gap-2 border p-4 rounded-lg"
              >
                <div className="gap-2 flex flex-col">
                <div className="flex items-center gap-2">
                  <Image
                  width={70}
                  height={70}
                    src={review?.product?.images[0]?.secure_url || ""}
                    alt={review.productName || "Product"}
                    className="object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{review?.product?.name}</h3>
                    {/* <p className="text-sm text-gray-600">
                      {review.productCategory || "Category not specified"}
                    </p> */}
                  </div>
                </div>
                <div className="flex-1">
                    {/* <h3 className="font-medium text-lg mb-1">{review?.product?.name}</h3> */}
                    <div className="flex items-center gap-3">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-gray-600">
                        {review.rating}/5
                      </span>
                    </div>
                    <p className="mt-2 font-light text-primary">{review.comment}</p>
                  </div>
                </div>
              <h1 className="font-bold text-medium_primary text-[1.2rem] mr-[1rem]">{"₹"}{review?.product?.price}</h1>
              </li>
              </>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions Section */}
      {/* <ProductSuggestions
        suggestions={data.suggestions}
        ratings={data.ratings}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
      /> */}
    </div>
  );
};

export default Reviews;
