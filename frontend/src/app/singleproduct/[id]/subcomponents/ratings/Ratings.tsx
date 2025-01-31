"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useReviewStore } from "@/stores/reviewStore";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function RatingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const productId = id;

  const { isLoggedIn } = useAuthStore();
  const { addReview, loading } = useReviewStore();

  const onSubmit = async (data:any) => {
    if (!isLoggedIn) {
      toast.error("Please login to submit a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      // Combine rating with form data
      const reviewData = { ...data, rating, productId };
      // console.log(reviewData);

      // Submit review using store action
      await addReview(reviewData);

      // Show success message
      toast.success("Review submitted successfully!");

      // Reset form
      setRating(0);
      reset();
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-dark mb-4">
          Rate & Review Product
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Rating */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-4xl ${
                    star <= rating ? "text-yellow" : "text-gray-200"
                  }`}
                >
                  ★
                </motion.button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              {...register("comment", {
                required: "Review is required",
                minLength: {
                  value: 10,
                  message: "Review must be at least 10 characters",
                },
              })}
              placeholder="Write your review here..."
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              rows={4}
            />
            {errors.comment && (
              <span className="text-red-500 text-sm">
                {errors.comment.message as string}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-medium_primary"
            } focus:outline-none`}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}