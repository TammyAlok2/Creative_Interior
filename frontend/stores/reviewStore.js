import { create } from 'zustand';
import axiosInstance from './axiosInstance';

export const useReviewStore = create((set) => ({
  reviews: [],
  loading: false,
  error: null,

  fetchReviewsByProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`user/getReviewByProduct/${productId}`);
     
      set({ reviews: response.data.data, loading: false });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch reviews';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  fetchReviewsByUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('user/your-reviews');
      set({ reviews: response.data.data, loading: false });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch reviews';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  addReview: async (reviewData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('user/add-review/', reviewData);
      set((state) => ({ reviews: [...state.reviews, response.data.data], loading: false }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add review';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteReview: async (reviewId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      set((state) => ({ reviews: state.reviews.filter((review) => review._id !== reviewId), loading: false }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete review';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateReview: async (reviewId, reviewData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
      set((state) => ({
        reviews: state.reviews.map((review) => (review._id === reviewId ? response.data.data : review)),
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update review';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));