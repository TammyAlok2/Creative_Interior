import React from "react";

const TotalOrderPrice = ({ totalPrice }) => {
  return (
    <div className="flex justify-between items-center mb-2 border-b pb-3 opacity-[.8]">
      <p className="font-semibold">Total Order Price</p>
      <p className="font-semibold">₹{totalPrice}</p>
    </div>
  );
};

export default TotalOrderPrice;
