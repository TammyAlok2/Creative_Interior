'use client';

import React from 'react';
import CustomRadioButton from './checkout-subcomponents/CustomRadioButton';
import { useAddressStore } from '@/stores/addressStore';
import toast from 'react-hot-toast';

interface AddressCardProps {
  id: string;
  name: string;
  address: string;
  mobileNumber: string;
  isDefault: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  handleSelectPage: (page: string, addressId: any) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  id,
  name,
  address,
  mobileNumber,
  isDefault,
  isSelected,
  onSelect,
  handleSelectPage
}) => {

const {deleteAddress}= useAddressStore()

const DeleteAddress = async (id: string)=>{
 await deleteAddress(id)
 toast.success("Address deleted successfully");
}

  return (
    <div className={`border ${isSelected && 'border-medium_primary'} rounded-xl box-shadow ${isSelected && `bg-thin_primary`} p-4 relative flex gap-4`}>
      <CustomRadioButton 
        selected={isSelected} 
        onChange={() => onSelect(id)}
      />
      <div className="flex justify-between w-full">
        <div className="w-[87%]">
          <p className="font-bold text-gray-dark mb-2 text-xl max-[524px]:text-[1rem] tracking-[.05px]">{name}</p>
          <p className="text-gray-medium text-md max-xs:text-[.9rem] max-[524px]:text-[.8rem] tracking-[.02rem]">{address}</p>
          <p className="text-gray-dark max-[524px]:text-[1rem] font-semibold mt-4 text-[1.2rem] tracking-[.5px]">{mobileNumber}</p>
        </div>
        <div>
          <div className="flex flex-col justify-between h-full">
            <button className="border border-gray-mediumLight hover:border-dim_primary rounded px-3 py-1 text-sm text-gray-medium hover:bg-dim_primary font-semibold" onClick={()=> handleSelectPage("edit-address", id)}>
              Edit
            </button>
            <button onClick={()=>{DeleteAddress(id)}} className="border border-gray-mediumLight rounded px-3 py-1 text-sm text-gray-medium hover:bg-red hover:border-red hover:text-white font-semibold">
              Delete
            </button> 
            {/* {/* <div>
              {isDefault && <span className="text-gray-mediumLight mr-[.5rem] text-sm">Default</span>}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;