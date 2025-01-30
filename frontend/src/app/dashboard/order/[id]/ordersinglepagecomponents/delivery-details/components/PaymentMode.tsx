import React from "react";
import { FaWallet } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiWallet3Fill } from "react-icons/ri";

const PaymentMode = ({ allOrders }) => {
  // console.log("allOrders: ", allOrders);
  return (
    <div className="flex justify-between items-center mb-4 opacity-[.8]">
      <p className="font-semibold">Payment Mode</p>
      <p className={`font-semibold bg-gray-light py-1 text-sm flex text-primary items-center gap-1 px-2 rounded-md ${allOrders.PaymentMode === "ONLINE" ? "opacity-[.9]" : "opacity-[.9]"}`}>
        {/* <FaWallet /> */}
        {/* <RiWallet3Fill /> */}
        <MdOutlineAccountBalanceWallet className="text-xl" /> 
        {allOrders.paymentMethod}
      </p>
    </div>
  );
};

export default PaymentMode;
