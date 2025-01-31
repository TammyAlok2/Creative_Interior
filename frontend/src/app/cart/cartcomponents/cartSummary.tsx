import React, { useState } from 'react';
import Link from 'next/link';
import { AiFillSafetyCertificate } from "react-icons/ai";
import OrderDetailsFooterIcons from '../checkout/checkout-components/orderdetails/components/OrderDetailsIcons';
import { toast } from 'react-toastify';

interface CartSummaryProps {
  subtotal: number;
  salesTax: number;
  // onApplyCoupon: (coupon: string) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  salesTax,
  // onApplyCoupon,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const total = subtotal + salesTax;

  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (total <= 0) {
      e.preventDefault();
      toast.info('Please add products to your cart before checking out.');
    }
  };

  return (
    <>
      <div className="bg-white p-6 shadow-md border rounded-xl mt-7">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax:</span>
            <span>₹{salesTax.toFixed(2)}</span>
          </div>
          {/* <div className="flex justify-between">
            <span>Coupon Code:</span>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <button
            className="w-full bg-black text-white py-2 rounded mt-2 hover:bg-gray-800 transition-colors"
            // onClick={() => onApplyCoupon(couponCode)}
          >
            Apply Coupon
          </button> */}
          <div className="flex justify-between text-xl font-semibold mt-4">
            <span>Grand Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          {total > 0 && (
            <AiFillSafetyCertificate className="text-orange-orange500 text-3xl mx-auto mb-2" />
          )}
          <Link 
            href={total > 0 ? "/cart/checkout/?page=address-section" : "#"}
            onClick={handleCheckoutClick}
            className={`inline-block w-full ${total <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <button 
              className={`bg-orange-orange500 hover:opacity-[0.9] text-white py-2 px-4 rounded-full w-full
                ${total > 0 ? 'hover:opacity-[.9]' : 'opacity-50 cursor-not-allowed'}
                transition-colors`}
              disabled={total <= 0}
            >
              Check out
            </button>
          </Link>
        </div>
      </div>
      <OrderDetailsFooterIcons />
    </>
  );
};

export default CartSummary;