import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectedAddressStore {
  selectedAddressId: string | null;
  setSelectedAddressId: (addressId: string | null) => void;
  clearSelectedAddress: () => void;
}

export const useSelectedAddressStore = create<SelectedAddressStore>()(
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