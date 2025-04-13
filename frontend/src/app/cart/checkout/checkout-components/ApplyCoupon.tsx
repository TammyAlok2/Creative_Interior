import { useCouponStore } from "@/stores/couponStore";
import React, { useEffect ,useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { PiSealPercentDuotone } from "react-icons/pi";
import CouponAppliedPopup from "./CouponAppliedPopup";
import { FcExpired } from "react-icons/fc";

interface ApplyCouponProps {
  isCouponSidebarOpen: boolean;
  toggleCouponSidebar: () => void;
  onCouponApplied: (couponDetails: any) => void;
  handleCouponPopup: (condition: boolean) => void;
  handleUpdateInputText: (condition:boolean)=> void;
  couponCode: any;
  handleCouponCode: (code: any) => void;
  handleSetApplyCouponFunction: (func: any) => void;
}

// Utility function to format the date and time
const formatDateTime = (dateString: string) => {
  if (!dateString) return ""; // Handle null or undefined dates
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formatted = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formatted.replace(/(am|pm)$/i, (match) => match.toUpperCase()).replace(", ", " at ");
};

const ApplyCoupon: React.FC<ApplyCouponProps> = ({
  isCouponSidebarOpen,
  toggleCouponSidebar,
  onCouponApplied,
  handleCouponPopup,
  handleUpdateInputText,
  couponCode,
  handleCouponCode,
  handleSetApplyCouponFunction
}) => {
  const { fetchCoupons, applyCoupon, coupons } = useCouponStore();
  

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleApplyCoupon = async (code: string) => {
    try {
      const response:any = await applyCoupon(code);
      const discountAmount = response.data.data.discount;
      
      onCouponApplied({
        code: code,
        discount: discountAmount
      });

      handleCouponPopup(true);
      handleCouponCode("")
      handleUpdateInputText(true)

      // setTimeout(() => setPopupVisible(false), 3000);
      toggleCouponSidebar(); // Close sidebar after applying
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  useEffect(()=>{
    handleSetApplyCouponFunction(handleCouponCode(couponCode));
  },[])



  return (
    <div className="">
      
      <div
        className={`fixed top-0 right-0 w-[27rem] h-full max-sm:w-[100%] bg-white shadow-lg transform transition-transform z-[10000] ${
          isCouponSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleCouponSidebar}
            >
              <IoCloseOutline className="text-3xl" />
            </button>
          </div>
          <div className="flex justify-between px-4 py-[1rem] rounded-lg mt-3 border">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => handleCouponCode(e.target.value)}
              className="w-[80%] bg-transparent outline-0 placeholder:font-semibold placeholder:opacity-[.8]"
              placeholder="Have a Coupon Code?"
            />
            <button 
              onClick={() => handleApplyCoupon(couponCode)}
              className="font-semibold opacity-[0.8] text-medium_primary text-[.95rem]"
            >
              APPLY
            </button>
          </div>
          <div>
            <h1 className="mt-5 mb-2 text-sm opacity-[.4] font-semibold">Available Coupons</h1>
            <div>
            {coupons.length > 0 ? (
              coupons.map((coupon:any) => (
                <div className="px-4 py-4 mb-3 box-shadow flex flex-col border border-low rounded-xl">
                <div
                  key={coupon.code}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex flex-col">
                  <div className="">
                    <h3 className="font-semibold text-lg">{coupon.code}</h3>
                    <p className="text-sm text-gray-mediumLight">
                      {coupon?.description}
                    </p>
                  </div>
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(coupon.code)}
                    className="text-medium_primary text-[.9rem] tracking-[.01rem] font-semibold rounded-md"
                    >
                    APPLY
                  </button>
                </div>
                <h1 className="pt-2 text-sm text-orange flex items-center gap-[.2rem]"><FcExpired className="text-lg" /> Coupon expires on{" "} {formatDateTime(coupon?.endDate)}</h1>
                </div>
              ))
            ) : (
              <>
                <div className="bg-black flex items-center justify-center w-[6rem] h-[6rem] border-dashed border-white border-[0.1rem] rounded-full mt-[8rem] mx-auto">
                  <PiSealPercentDuotone className="z-[10] bg-white rounded-full text-2xl" />
                </div>
                <h1 className="text-center mt-[1rem] font-semibold opacity-[0.8] text-2xl">
                  No Coupons!
                </h1>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
      {isCouponSidebarOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-30"
          onClick={toggleCouponSidebar}
        ></div>
      )}
    </div>
  );
};

export default ApplyCoupon;
