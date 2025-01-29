import React from "react";
import Head from "next/head";
import HeroSection from "../components/HomePage/Hero";

import ProductCategories from "../components/HomePage/Category";
import WallpaperGrid from "../components/HomePage/WallPaper";
import BlogSection from "../components/HomePage/Blog";
import AboutSection from "../components/HomePage/About";
import Features from "../components/HomePage/Features";
import WallpaperDesign from "../components/HomePage/Consulantation";

const page = () => {
  return (
    <>
      <Head>
        <title>Creative Interiors - Your Creative Interior Solution</title>
        <meta
          name="description"
          content="Transform your space with Creative Interiors"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen ">
        <HeroSection />
        <ProductCategories />
        <WallpaperGrid />
        <AboutSection />
        <Features />
        {/* <WallpaperDesign/> */}
        <BlogSection />
     
      </main>
    </>
  );
};

export default page;
