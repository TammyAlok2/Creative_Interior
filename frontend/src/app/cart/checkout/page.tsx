'use client'

import React, { useEffect,Suspense } from 'react'
import Checkout from './layout'

const CheckoutContainer = () => {


 

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <Checkout />
      </Suspense>
     
    </div>
  )
}

export default CheckoutContainer
