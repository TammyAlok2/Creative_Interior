import React from "react";
import { TbPointFilled } from "react-icons/tb";

const PriceBreakup = ({ orderDetails }) => {
  // console.log("hamara data: ", orderDetails)
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold opacity-[.8]">Price Breakup</h2>
      <div className="bg-gray-low p-[1rem] rounded-lg my-4">
      {/* {orderDetails?.map((item, index) => ( */}
        <div className="flex justify-between items-start">
          <p className="text-sm leading-6 text-gray-medium border-b pb-3">{orderDetails?.productId?.description?.substring(0,100) + '...'}</p>
          {/* <p className="font-medium text-sm">₹{item.price}</p> */}
        </div>
      {/* ))} */}
      <div className="flex items-center mt-1 justify-between opacity-[.8] pt-2">
        <h1 className="font-semibold">Total</h1>
        <p className="font-semibold ml-2">₹{orderDetails?.productId?.price}</p>
      </div>
      </div>
    </div>
  );
};

export default PriceBreakup;
