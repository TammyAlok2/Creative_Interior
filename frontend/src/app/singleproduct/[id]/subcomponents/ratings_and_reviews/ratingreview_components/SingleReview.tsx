'use client';

const SingleReview = ({ review }: any) => {

  return (
    <div className="mt-6 rounded-lg border-t pt-5">
      {/* Rating and Title */}
      <div className="flex items-center space-x-4">
        <div className="text-lg font-semibold">{review.rating} ★</div>
        <div className="text-sm text-gray-500">{review.title}</div>
      </div>

      {/* Review Text */}
      <p className="text-gray-600 mt-2">{review.text}</p>

      {/* Author and Location */}
      <div className="text-sm text-gray-400 mt-2">
        {review.author} - {review.date}
      </div>

      {/* Like and Dislike Section */}
      
    </div>
  );
};

export default SingleReview;
