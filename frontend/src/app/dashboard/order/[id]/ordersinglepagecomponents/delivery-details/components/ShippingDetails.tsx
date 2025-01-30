import React from "react";

const ShippingDetails = ({ name, address, phoneNumber,pincode }) => {
  return (
    <div className="mb-4 space-y-2">
      <h2 className="text-md opacity-[0.8] font-light">Shipping Details</h2>
      <p className="opacity-[0.8] text-lg font-semibold">{name}</p>
      <p className="text-sm text-gray-medium opacity-[.8]">{address}</p>
      <p className="text-sm text-gray-dark opacity-[.8]">Phone Number: {phoneNumber}</p>
      <p className="text-sm text-gray-dark opacity-[.8]">Pincode : {pincode}</p>
    </div>
  );
};

export default ShippingDetails;
