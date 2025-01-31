'use client';

import React, { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import AddressCard from './AddressCard';
import AddDeliveryAddressContainer from '../add-address/page';
import { useAddressStore } from '@/stores/addressStore';
import { useSelectedAddressStore } from '@/stores/selectedAddressStore';
import AddAddress from './AddAddress';
 
// export interface AddressSectionProps{
//   handleSelectPage: (page: string, addressId?: string | undefined) => void;
//   deliveryAddressId?: any;
// }

export const AddressSection = ({handleSelectPage}) => {

  const [addDeliveryAddress, setAddDeliveryAddress] = useState(false);
  const { addresses, fetchAddresses } = useAddressStore();
  const { selectedAddressId, setSelectedAddressId } = useSelectedAddressStore();

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Set the default address as selected by default when addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((address) => address?.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
      } else {
        setSelectedAddressId(addresses[0]._id);
      }
    }
  }, [addresses, selectedAddressId, setSelectedAddressId]);

  const handleDeliveryAddress = () => {
    setAddDeliveryAddress((prev) => !prev);
  };

  const handleAddressSelection = (addressId) => {
    setSelectedAddressId(addressId);
  };

  return (
    <>
      <div className="flex justify-center items-start rounded-lg">
        <div className="w-full bg-white rounded-lg">
          <ProgressIndicator />
          <>
              <AddAddress handleSelectPage={handleSelectPage}/>
              <div className="space-y-4">
                {addresses.length === 0 && (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">No addresses found please add a new address...</p>
                    </div>
                    )}
                {addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    id={address._id}
                    name={address.name}
                    address={`${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pinCode}`}
                    mobileNumber={`+91 - ${address.mobileNumber}`}
                    isDefault={address?.isDefault}
                    isSelected={selectedAddressId === address._id}
                    onSelect={() => handleAddressSelection(address._id)}
                    handleSelectPage={handleSelectPage}
                  />
                ))}
              </div>
            </>
        </div>
      </div>
    </>
  );
}