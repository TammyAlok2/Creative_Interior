import { create } from 'zustand';
import axiosInstance from './axiosInstance';

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('user/allWishListItems', {
        withCredentials: true
      });
      
      set({
        wishlist: response.data.data || [],
        loading: false
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch wishlist'
      });
    }
  },

  addToWishlist: async (product) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `user/addItemsToWishList/${product._id}`, 
        {},
        { withCredentials: true }
      );
// alert('added to wishlist')
      set({
        wishlist: response.data.data || [],
        loading: false
      });
    } catch (error) {
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
    } catch (error) {
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
    isInWishlist: (productId) => 
      store.wishlist.some(item => item._id === productId)
  };
};