import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSelectedAddressStore = create()(
  persist(
    (set) => ({
      selectedAddressId: null,
      setSelectedAddressId: (addressId) => set({ selectedAddressId: addressId }),
      clearSelectedAddress: () => set({ selectedAddressId: null }),
    }),
    {
      name: 'selected-address-storage',
    }
  )
);