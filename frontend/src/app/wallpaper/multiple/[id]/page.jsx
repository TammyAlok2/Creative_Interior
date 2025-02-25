'use client'
import HomeDecorSection from "../../../../components/SingleProduct/DecorHomeSection";
import SimilarProducts from "../../../../components/SingleProduct/SimilarProducts";
import UserReviews from "../../../../components/SingleProduct/UserReview";
import WallpaperInfoTabs from "../../../../components/SingleProduct/WallPaperInfoTabs";
import WhyChooseSection from "../../../../components/SingleProduct/WhyChooseUs";
import React from "react";
import ProductDetail from "../../../../components/SingleProduct/ProductInformation";

const page = () => {
  return (
    <div>
      <ProductDetail />
      <WallpaperInfoTabs />
      <WhyChooseSection />
      <UserReviews />
      <SimilarProducts />
      <HomeDecorSection />
    </div>
  );
};

export default page;
