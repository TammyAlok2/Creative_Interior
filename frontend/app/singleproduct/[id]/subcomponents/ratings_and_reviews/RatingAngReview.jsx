'use client';

import React, { useEffect, useState } from 'react';
import { useReviewStore } from "@/stores/reviewStore";
import RatingHeader from "./ratingreview_components/RatingHeader";
import StarBreakdown from "./ratingreview_components/StarBreakdown";
import SingleReview from "./ratingreview_components/SingleReview";

const RatingsAndReviews = ({ SingleProduct }) => {
  const productId = SingleProduct?._id;
  const { reviews, loading, error, fetchReviewsByProduct } = useReviewStore();
  
  const [metrics, setMetrics] = useState({
    averageRating: 0,
    totalReviews: 0,
    starBreakdown: [0, 0, 0, 0, 0],
    categories: {
      soundQuality: 0,
      bass: 0,
      design: 0,
      battery: 0,
    }
  });

  useEffect(() => {
    const loadReviews = async () => {
      if (!productId) return;
      
      try {
        await fetchReviewsByProduct(productId);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

    loadReviews();
  }, [productId]);

  useEffect(() => {
    if (!reviews || reviews?.length === 0) {
      setMetrics(prev => ({
        ...prev,
        averageRating: 0,
        totalReviews: 0,
        starBreakdown: [0, 0, 0, 0, 0]
      }));
      return;
    }

    // Calculate average rating
    const totalRating = reviews?.reduce((acc, review) => {
      // Ensure rating is a number between 1 and 5
      const rating = Math.min(Math.max(parseInt(review?.rating), 1), 5);
      return acc + rating;
    }, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);

    // Calculate star breakdown (5 stars to 1 star)
    const starCounts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      // Convert rating to 0-4 index (5 star = index 4, 1 star = index 0)
      const ratingIndex = Math.min(Math.max(Math.floor(review?.rating) - 1, 0), 4);
      starCounts[4 - ratingIndex]++; // Reverse the index for 5 to 1 order
    });

    // console.log('Star counts:', starCounts); // Debugging log

    setMetrics({
      averageRating: parseFloat(avgRating),
      totalReviews: reviews.length,
      starBreakdown: starCounts,
      categories: {
        soundQuality: parseFloat(avgRating),
        bass: parseFloat(avgRating),
        design: parseFloat(avgRating),
        battery: parseFloat(avgRating),
      }
    });
  }, [reviews]);

  // Add debugging logs
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // console.log('Sample review ratings:', reviews.map(r => r.rating));
      // console.log('Current metrics:', metrics);
    }
  }, [reviews, metrics]);

  if (!SingleProduct) return null;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (error) return <div className="text-red-500 p-4 rounded-lg">{error}</div>;

  const getUserDisplayName = (user) => {
    if (typeof user === 'string') return user;
    if (typeof user === 'object') {
      return user?.name || user?.username || user?.email || 'Anonymous User';
    }
    return 'Anonymous User';
  };

  return (
    <div className="bg-white rounded-lg max-w-4xl p-6">
      <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
      
      <div className="mt-4">
        <RatingHeader
          averageRating={metrics?.averageRating}
          totalRatings={metrics?.totalReviews}
          reviewsCount={metrics?.totalReviews}
        />
      </div>

      <div className="mt-4">
        <StarBreakdown 
          stars={metrics?.starBreakdown}
          totalRatings={metrics?.totalReviews}
        />
      </div>

      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <SingleReview
            key={review?._id}
            review={{
              rating: review?.rating,
              title: review?.rating >= 4 ? "Excellent" :
                     review?.rating >= 3 ? "Good" :
                     review?.rating >= 2 ? "Fair" : "Poor",
              text: review?.comment,
              author: getUserDisplayName(review?.user),
              date: new Date(review?.createdAt).toLocaleDateString(),
            }}
          />
        ))}
      </div>

      {(!reviews || reviews.length === 0) && !loading && (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this product!
        </div>
      )}
    </div>
  );
};

export default RatingsAndReviews;