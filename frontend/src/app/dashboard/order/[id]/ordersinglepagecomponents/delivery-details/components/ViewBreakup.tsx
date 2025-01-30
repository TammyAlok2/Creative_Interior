'use client';

import React from 'react';

interface ViewBreakupProps {
  handleBreakupVisible: (props: boolean) => void;
  allOrders: any;
}

const ViewBreakup: React.FC<ViewBreakupProps> = ({ handleBreakupVisible, allOrders }) => {
 // console.log("awagaman: ", allOrders)

  return (
    <div className="max-w-md bg-white box-shadow rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-[1.5rem] font-bold text-gray-dark">Total Order Price Breakup</h2>
        <button
          className="text-gray-mediumLight hover:text-gray-medium bg-gray-light rounded-full p-[.4rem] mt-[-.02rem]"
          onClick={() => handleBreakupVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Price Details */}
      <div className="space-y-4">
        {allOrders?.orderItems?.map((item:any, index:any) => (
          <div className="flex justify-between gap-6" key={index}>
            <p className="text-[.96rem] font-medium leading-6 text-gray-medium">{item?.productId?.description?.substring(0,90)+'...'}</p>
            <p className="font-semibold text-gray-dark">₹{item?.price}*{item?.quantity}
            </p>
          </div>
        ))}
        {/* ))} */}

        {/* {priceBreakup.charges.map((charge, index) => ( */}
          {/* <div className="flex justify-between">
            <p className="text-[.96rem] text-gray-medium">{charge.description}</p>
            <p className="font-semibold text-gray-dark">{charge.price}</p>
          </div> */}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Shiping Charge */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-gray-dark">Shiping Charges</p>
        <p className="text-lg font-bold text-gray-dark">₹{allOrders?.shippingCharges}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-gray-dark">Tax</p>
        <p className="text-lg font-bold text-gray-dark">₹{parseInt(allOrders?.tax)}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-gray-dark">Coupon Discount </p>
        <p className="text-lg font-bold text-gray-dark">₹{allOrders?.couponDiscount}</p>
      </div>

      {/* Total Paid */}
      <div className="flex justify-between items-center">
      <p className="text-lg font-bold text-gray-dark">Total paid</p>
      <p className="text-lg font-bold text-gray-dark">₹{parseInt(allOrders?.total)} </p>
      </div>
    </div>
  );
};

export default ViewBreakup;
