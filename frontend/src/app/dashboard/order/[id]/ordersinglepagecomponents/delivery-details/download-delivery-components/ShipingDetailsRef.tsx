import React from "react";

interface ShipingDetailsRefProps{
    name: any;
    address: any;
    phoneNumber: any;
    pincode: any; 
}

const ShippingDetailsRef:React.FC<ShipingDetailsRefProps> = ({ name, address, phoneNumber,pincode }) => {
  return (
    <div className="mb-4 space-y-2">
      <h2 className="text-[2rem] opacity-[0.8] font-light">Shipping Details</h2>
      <div className="text-[2rem]">
      <p className="opacity-[0.8] text-[3rem] font-semibold">{name}</p>
      <p className="text-gray-medium opacity-[.8]">{address}</p>
      <p className="text-gray-dark opacity-[.8]">Phone Number: {phoneNumber}</p>
      <p className="text-gray-dark opacity-[.8]">Pincode : {pincode}</p>
      </div>
    </div>
  );
};

export default ShippingDetailsRef;
