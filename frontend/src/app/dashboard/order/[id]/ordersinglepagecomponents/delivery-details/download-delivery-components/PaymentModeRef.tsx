import React from "react";
import { FaWallet } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiWallet3Fill } from "react-icons/ri";

interface PaymentModeRefProps{
    allOrders: any;
}

const PaymentModeRef:React.FC<PaymentModeRefProps> = ({ allOrders }) => {
  console.log("allOrders: ", allOrders);
  return (
    <div className="flex justify-between items-center mb-4 opacity-[.8]">
      <p className="font-semibold">Payment Mode</p>
      <p className={`font-semibold text-sm flex text-primary items-center gap-1 p-2 rounded-md ${allOrders.PaymentMode === "ONLINE" ? "opacity-[.9]" : "opacity-[.9]"}`}>
        {/* <FaWallet /> */}
        {/* <RiWallet3Fill /> */}
        <MdOutlineAccountBalanceWallet className="text-xl" />
        <span className="mt-[-1rem]">
        {allOrders.paymentMethod}
          </span> 
      </p>
    </div>
  );
};

export default PaymentModeRef;
