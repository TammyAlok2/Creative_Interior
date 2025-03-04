// import Login from '@/components/Login'
'use client'
import ProductCategory from '@/components/HomePage/Category/ProductCategory'
import Testimonials from '@/components/HomePage/Testimonials'
import Blog from '@/components/HomePage/Blog'
import React, { useEffect } from 'react'
import HeroSection from '@/components/HomePage/Hero/index'
import ProductCategories from '@/components/HomePage/Category/index'
import WallpaperGrid from '@/components/HomePage/WallPaper/index'
import AboutSection from '@/components/HomePage/About/index'
import Features from '@/components/HomePage/Features/index'
import BlogSection from '@/components/HomePage/Blog/index'

import { useProductDataStore } from '@/stores/productStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useAuthStore } from '@/stores/authStore'
import 'react-toastify/dist/ReactToastify.css';
// import ProductPage from '@/app/singleproduct/SingleProduct'
// import SingleProducts from '@/components/HomePage/Product-Card/SingleProducts'


const Home = () => {

  // calling all the category and products here 
  const { allCategory } = useCategoryStore()
  const { allProduct }: any = useProductDataStore()



  useEffect(() => {
    allCategory()
    allProduct()
  }, [])

  return (

    <>
      <div className="min-h-screen ">
        <HeroSection />
        <ProductCategories />
        <WallpaperGrid />
        <AboutSection />
        <Features />
        {/* <WallpaperDesign/> */}
        <BlogSection />
      </div>
    </>
  )
}

export default Home
