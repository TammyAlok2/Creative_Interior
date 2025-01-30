
  
  const RatingHeader = ({ averageRating, totalRatings, reviewsCount }) => (
    <div className="flex items-center space-x-4">
      <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
      <div className="text-gray-500">{totalRatings} Ratings & {reviewsCount} Reviews</div>
    </div>
  );
  
  export default RatingHeader;
  