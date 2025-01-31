import {create} from 'zustand';
import axiosInstance from './axiosInstance';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';


interface Address {
  _id: string;
  name: string;
  mobileNumber: number;
  address: string;
  locality: string;
  isDefault: boolean;
  landmark?: string;
  city: string;
  state: string;
  pinCode: number;
  user: string;
}

interface AddressStore {
  addresses: Address[];
  addAddress: (address: Partial<Address>) => Promise<Address | undefined>;
  editAddress: (addressId: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  fetchAddresses: () => Promise<void>;
}

export const useAddressStore = create<AddressStore>((set, get) => ({
  addresses: [],

  addAddress: async (address) => {
    try {
      const response: AxiosResponse<{ data: Address }> = await axiosInstance.post('user/add-address', address);
      const newAddress = response.data.data;
      set((state) => ({
        addresses: [...state.addresses, newAddress],
      }));
      // toast.success("Address added successfully");
      return newAddress;
    } catch (error) {
      toast.error("Failed to add address");
      console.error('Failed to add address:', error);
      return undefined;
    }
  },

  editAddress: async (addressId, address) => {
    try {
      const response = await axiosInstance.put(`user/edit-address/${addressId}`, address);
      set((state) => ({
        addresses: state.addresses.map((a) => (a._id === addressId ? response.data.data : a)),
      }));
      return response;
    } catch (error) {
      toast.error("Failed to update address");
      console.error('Failed to edit address:', error);
    }
  },



  deleteAddress: async (addressId) => {
    try {
      await axiosInstance.delete(`user/delete-address/${addressId}`);
      set((state) => ({
        addresses: state.addresses.filter((a) => a._id !== addressId),
      }));
      // toast.success("Address deleted successfully");
    } catch (error) {
      toast.error("Failed to delete address");
      console.error('Failed to delete address:', error);
    }
  },



  fetchAddresses: async () => {
    try {
      const response = await axiosInstance.get('user/all-address');
      // console.log(response)
      set({ addresses: response.data.data });
      // toast.success("Address fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch address");
      console.error('Failed to fetch addresses:', error);
    }
  },

  



}));