import { create } from 'zustand';
import axiosInstance from './axiosInstance';
import { WishList } from "@/types/WishList";

// Define API response types
interface WishlistResponse {
  data: WishList[];
  message?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface WishlistState {
  wishlist: WishList[];
  loading: boolean;
  error: string | null;
  
  fetchWishlist: () => Promise<void>;
  addToWishlist: (product: WishList) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  
  wishlistCount: () => number;
  clearError: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get<WishlistResponse>('user/allWishListItems', {
        withCredentials: true
      });
      
      set({
        wishlist: response.data.data || [],
        loading: false
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch wishlist'
      });
    }
  },

  addToWishlist: async (product) => {
    set({ loading: true, error: null });
    try {
      console.log("my wishlist: ", product)
      const response = await axiosInstance.post(
        `user/addItemsToWishList/${product._id}`, 
        { productId: product._id },
        { withCredentials: true }
      );
// alert('added to wishlist')
      set({
        wishlist: response.data.data || [],
        loading: false
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to add to wishlist'
      });
    }
  },

  removeFromWishlist: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete(
        `user/deleteItemsFromWishList/${id}`,
        { withCredentials: true }
      );
// alert('removed from wishist')
      set({
        wishlist: response.data.data || [],
        loading: false
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to remove from wishlist'
      });
    }
  },

  wishlistCount: () => {
    const state = get();
    return state.wishlist?.products?.length;
  },

  clearError: () => set({ error: null })
}));

// Optional utility hook
export const useWishlist = () => {
  const store = useWishlistStore();
  
  return {
    ...store,
    isInWishlist: (productId: string) => 
      store.wishlist.some(item => item._id === productId)
  };
};