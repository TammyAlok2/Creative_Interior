import React from 'react'
import Head from 'next/head'
import HeroSection from '@/components/HomePage/Hero'
import Footer from '@/components/Footer'
import ProductCategories from '@/components/HomePage/Category'
import WallpaperGrid from '@/components/HomePage/WallPaper'
import BlogSection from '@/components/HomePage/Blog'

const page = () => {
  return (
<>
<Head>
        <title>Creative Interiors - Your Creative Interior Solution</title>
        <meta name="description" content="Transform your space with Creative Interiors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <HeroSection />
        <ProductCategories/>
        <WallpaperGrid/>
        <BlogSection/>
        <Footer/>
      </main>
</>
  )
}

export default page