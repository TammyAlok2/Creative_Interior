import HomeDecorSection from '@/components/SingleProduct/DecorHomeSection'
import ProductDetail from '@/components/SingleProduct/ProductInformation'
import SimilarProducts from '@/components/SingleProduct/SimilarProducts'
import UserReviews from '@/components/SingleProduct/UserReview'
import WallpaperInfoTabs from '@/components/SingleProduct/WallPaperInfoTabs'
import WhyChooseSection from '@/components/SingleProduct/WhyChooseUs'
import React from 'react'

const page = () => {
  return (
    <div>

        <ProductDetail/>
        <WallpaperInfoTabs/>
        <WhyChooseSection/>
        <UserReviews/>
        <SimilarProducts/>
        <HomeDecorSection/>
        
    </div>
  )
}

export default page