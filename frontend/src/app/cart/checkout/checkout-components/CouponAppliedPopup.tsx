"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { FaTimes } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";

interface CouponAppliedPopupProps {
  handleCouponPopup: (condition: boolean) => void;
  appliedCoupon?: { discount?: any } | any;
}

const CouponAppliedPopup: React.FC<CouponAppliedPopupProps> = ({
  handleCouponPopup,
  appliedCoupon,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };
  
  useEffect(() => {
    const confettiInterval = setInterval(triggerConfetti, 1000); // Trigger every second
    
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
        canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      }
    };
    
    // Resize the canvas on load and window resize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Cleanup the resize event listener
    // return () => window.removeEventListener("resize", resizeCanvas);
    
    return () => clearInterval(confettiInterval); // Cleanup interval on unmount
    
  }, []);

  return (
    <div className="fixed w-screen top-0 left-0 h-screen flex items-center justify-center bg-black bg-opacity-10 z-[10000] px-4">
      <div className="relative box-shadow border rounded-lg shadow-lg p-6 max-w-lg w-full bg-white max-md:p-4">
        {/* Close Icon */}
        <button
          className="absolute top-2 right-2 hover:text-gray-500 text-black bg-gray-100 p-2 rounded-full border max-md:top-1 max-md:right-1"
          aria-label="Close"
          onClick={() => handleCouponPopup(false)}
        >
          <FaTimes size={20} />
        </button>

        {/* Percentage Icon */}
        <div className="flex justify-center items-center mb-4 mt-[-3.5rem] max-md:mt-[-2rem]">
          <div className="rounded-full">
            <RiDiscountPercentFill
              className="text-medium_primary max-md:text-[2.5rem]"
              size={60}
            />
          </div>
        </div>

        {/* Coupon Code */}
        <h2 className="text-center text-xl tracking-[.01] font-semibold text-gray-700 mb-2 max-md:text-lg">
          'HAPPY' Applied
        </h2>

        {/* Decorative Confetti */}
        <canvas
      id="confetti-canvas"
      ref={canvasRef}
      className="absolute inset-0 z-[10000] pointer-events-none"
    />

        {/* Savings Amount */}
        <p className="text-center text-[4rem] tracking-[.01] font-bold text-black mb-2 max-md:text-[3rem]">
          ₹{appliedCoupon?.discount}
        </p>
        <p className="text-center text-gray-500 tracking-[.01] text-[1.2rem] max-md:text-base">
          savings with this coupon
        </p>
      </div>
    </div>
  );
};

export default CouponAppliedPopup;
