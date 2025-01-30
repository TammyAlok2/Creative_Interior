'use client'
import React, { useEffect } from 'react'
import SingleProduct from './SingleProduct'
import SimilarProducts from './SimilarProducts'
import { useCartStore } from '@/stores/cartStore'

const ProductPageComponent = () => {

  return (
    <div className='mt-[8rem] mb-[4rem]'>
      <SingleProduct />
      <SimilarProducts />
    </div>
  )
}

export default ProductPageComponent
