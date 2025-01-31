import React from 'react';
// import { AddressSectionProps } from '../../checkout-components/AddressSection';

const CancelButton = ({ handleSelectPage }) => {
  const baseStyle = 'px-6 py-2 max-[524px]:px-3 rounded-lg font-medium';
  const variantStyle ='bg-white text-medium_primary border border-medium_primary hover:bg-black hover:opacity-[0.9] hover:text-white hover:border-black font-semibold';

  return (
    <button onClick={()=>handleSelectPage("address-section")} className={`${baseStyle} ${variantStyle}`}>
      {"Cancel"}
    </button>
  );
};

export default CancelButton;
