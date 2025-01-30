import React from 'react'
import { RiDiscountPercentFill } from 'react-icons/ri'

const CouponSection = ({toggleCouponSidebar}:any) => {
  return (
    <div>

      <div className="w-full rounded-xl overflow-hidden">
          <div className="flex justify-between bg-gray-extrathin p-4">
            <input
              type="text"
              className="w-[80%] bg-transparent outline-0 placeholder:font-semibold"
              placeholder="Have a Coupon Code?"
            />
            <button
              className="font-semibold opacity-[0.8] text-medium_primary"
              onClick={toggleCouponSidebar}
            >
              SELECT
            </button>
          </div>
          <div className="flex gap-3 items-center justify-center bg-low_primary p-2">
            <RiDiscountPercentFill className="text-medium_primary text-[1.4rem]" />
            <span className="border-b-[0.1rem] border-gray-dark text-[0.8rem] cursor-pointer">
              You have 0 coupon
            </span>
          </div>
        </div>

    </div>
  )
}

export default CouponSection