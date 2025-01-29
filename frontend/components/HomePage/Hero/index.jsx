'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    title: "All in One Place",
    subtitle: "EVERYTHING YOU NEED",
    description: "Welcome to Creative Interiors",
    image: "/images/HomePage/hero/hero1.jpg",
    bgColor: "bg-pink-50"
  },
  {
    id: 2,
    title: "Truly Special",
    subtitle: "MAKING YOUR HOME",
    description: "Your Dream Home, Our Design",
    image: "/images/HomePage/hero/hero2.jpg",
    bgColor: "bg-green-50"
  },
  {
    id: 3,
    title: "All in One Place",
    subtitle: "EVERYTHING YOU NEED",
    description: "Welcome to Creative Interiors",
    image: "/images/HomePage/hero/hero1.jpg",
    bgColor: "bg-cyan-100"
  },
  {
    id: 4,
    title: "Truly Special",
    subtitle: "MAKING YOUR HOME",
    description: "Your Dream Home, Our Design",
    image: "/images/HomePage/hero/hero2.jpg",
    bgColor: "bg-rose-100"
  },
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className={`min-h-screen pt-16 md:pt-20 transition-all duration-700 ${slides[currentSlide].bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          {/* Animated Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 md:space-y-6 z-10 text-center md:text-left"
            >
              <div className="h-0.5 w-12 bg-black mx-auto md:mx-0"></div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-sm md:text-base"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs md:text-sm tracking-wider"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-orange-orange500 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-orange-orange600 transition-colors flex items-center space-x-2 mx-auto md:mx-0"
              >
                <span>Shop now</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Circular Image Container with Zoom Effect */}
          <div className="relative mt-8 md:mt-0">
            <motion.div
              className="aspect-square rounded-full overflow-hidden relative max-w-[300px] md:max-w-full mx-auto"
              style={{
                clipPath: 'circle(50% at 50% 50%)',
                filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1))'
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                <Image
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt="Interior Design"
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Decorative Circle Background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.05) 60.1%)',
                transform: 'scale(1.1)'
              }}
            />
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection

