import { create } from 'zustand';
import axiosInstance from './axiosInstance';

export const useOrderStore = create((set, get) => ({
  // Initialize with empty array instead of undefined
  orders: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  addOrder: async (order) => {
    set({ loading: true, error: null });
    const response = await axiosInstance.post('user/add-order', order);

    // Ensure we have the current state of orders before updating

    return response;
  },

  verifyPayment: async (paymentData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        'user/verify-payment',
        paymentData
      );
      set({ loading: false, error: null });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Payment verification failed';
      set({
        error: errorMessage,
        loading: false
      });
      throw new Error(errorMessage);
    }
  },

  editOrder: async (orderId, order) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`user/edit-order/${orderId}`, order);
      const currentOrders = get().orders || [];
      set({
        orders: currentOrders.map((o) => (o._id === orderId ? response.data.data : o)),
        loading: false,
        error: null
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to edit order';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteOrder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`user/delete-order/${orderId}`);
      const currentOrders = get().orders || [];
      set({
        orders: currentOrders.filter((o) => o._id !== orderId),
        loading: false,
        error: null
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete order';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  fetchOrders: async (status) => {
    set({ loading: true, error: null });
    try {
      const url = status ? `user/all-orders?orderStatus=${status}` : 'user/all-orders';
      const response = await axiosInstance.get(url);
      set({
        orders: response.data.data || [],
        loading: false,
        error: null
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  fetchOrderById: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`user/getOrder/${orderId}`);
      set({ loading: false, error: null });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch order';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  fetchProductsByOrders: async (orderId, productItemId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`user/getOrderItem/${orderId}/${productItemId}`);
      set({ loading: false, error: null });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch product item';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));