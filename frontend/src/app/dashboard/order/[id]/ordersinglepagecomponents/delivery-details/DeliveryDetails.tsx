'use client';

import React, { useEffect, useState, useRef } from "react";
import ShippingDetails from "./components/ShippingDetails";
import { useAddressStore } from "@/stores/addressStore";
import PriceBreakup from "./components/PriceBreakup";
import PaymentMode from "./components/PaymentMode";

import ShippingDetailsRef from "./download-delivery-components/ShipingDetailsRef";
import PriceBreakupRef from "./download-delivery-components/PriceBreakupRef";
import PaymentModeRef from "./download-delivery-components/PaymentModeRef";

interface OrderDetailsProps {
  allOrders: {
    address: string;
  }; // Assuming orderDetails contains the address ID
  handleBreakupVisible: (visibility: boolean) => void;
  // isBreakupVisible: boolean;
  orderDetails: any;
  // handleDownload: () => void;
  printRef: React.RefObject<HTMLDivElement>;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ allOrders, handleBreakupVisible, orderDetails, //handleDownload, //printRef
 }) => {
  const { addresses, fetchAddresses } = useAddressStore();

  // Ref to detect clicks outside the ViewBreakup component
  const modalRef = useRef<HTMLDivElement | null>(null);



  // Find the matching address
  const selectedAddress = addresses.find((address) => address._id === allOrders?.address);

  // Close the ViewBreakup modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleBreakupVisible(false);
      }
    };

    // Add event listener to close modal on click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <>
    {/* download pdf */}

    {/* {selectedAddress && (
      <div ref={printRef} className="absolute left-[-40rem] w-[100%] p-3 rounded-lg bg-white z-[1000]">
        <ShippingDetailsRef
          name={selectedAddress.name || "No Name Available"}
          address={`${selectedAddress.address || ""} ${selectedAddress.locality || ""} ${selectedAddress.state || ""}`}
          phoneNumber={selectedAddress.mobileNumber || "No Mobile Number"}
          pincode={selectedAddress.pinCode || "No Pincode"}
        />
        <PriceBreakupRef orderDetails={orderDetails} />
        <PaymentModeRef allOrders={allOrders} />
      </div>
    )} */}

{/* end download */}

      <div className="w-full p-3 rounded-lg bg-white relative">
        {selectedAddress ? (
          <>
            <div>
              <ShippingDetails
                name={selectedAddress.name || "No Name Available"}
                address={`${selectedAddress.address || ""} ${selectedAddress.locality || ""} ${selectedAddress.state || ""}`}
                phoneNumber={selectedAddress.mobileNumber || "No Mobile Number"}
                pincode={selectedAddress.pinCode || "No Pincode"}
              />
              <PriceBreakup orderDetails={orderDetails} />
              <PaymentMode allOrders={allOrders} />
            </div>

            {/* download order details */}


            {/* end download */}


            {/* Button to toggle visibility of the breakup */}
            <div className="flex items-end justify-between">
              <button onClick={handleBreakupVisible(true)} className="font-bold flex items-end justify-end border p-2 rounded-xl opacity-[.8] hover:bg-low_primary">View Receipt</button>
              {/* <button className="font-bold flex items-end justify-end border p-2 rounded-xl opacity-[.8] hover:bg-red hover:text-white"
              //  onClick={handleDownload}
               >Download Receipt</button> */}
            </div>
          </>
        ) : (
          <p className="text-red-500">Address not found or not available.</p>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
