'use client';

import { useCouponStore } from "@/stores/couponStore";
import React, { useState } from "react";

const MyCoupons = () => {
const {coupouns } = useCouponStore()

  // State to manage how many coupons to display
  const [visibleCount, setVisibleCount] = useState(5);

  // Show all coupons when "View More" is clicked
  const handleViewMore = () => {
    setVisibleCount(coupons.length);
  };

  return (
    <div className="box-shadow rounded-xl border p-6">
      <h1 className="text-2xl font-semibold mb-6">No Coupons Yet!</h1>
      {/* <div className="space-y-4">
        {coupons.slice(0, visibleCount).map((coupon, index) => (
          <div
            key={index}
            className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-medium text-blue-dark">{coupon.code}</h2>
              <p className="text-sm text-gray-medium">{coupon.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Valid till {coupon.endDate}</p>
              <a
                href="#"
                className="text-blue-dark text-sm underline hover:text-blue-dark"
              >
                View T&C
              </a>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < coupons.length && (
        <button
          onClick={handleViewMore}
          className="mt-6 block mx-auto px-6 py-2 text-blue-Light border rounded hover:text-blue-dark hover:bg-gray-light font-semibold opacity-[.8] transition-all duration-500 ease-in-out hover:opacity-[1]"
        >
          View More
        </button>
      )} */}
    </div>
  );
};

export default MyCoupons;
