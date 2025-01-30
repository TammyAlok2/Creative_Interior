import React from 'react'
import RatingsAndReviews from './RatingAngReview'
import { Product } from '@/types/ProductCard'

const RatingReviewContainer = ({SingleProduct}: Product | any) => {
  return (
    <div>
      <RatingsAndReviews SingleProduct = {SingleProduct} />
    </div>
  )
}

export default RatingReviewContainer
