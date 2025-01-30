import { create } from 'zustand';
import axiosInstance from './axiosInstance';

export const useCouponStore = create((set) => ({
  coupons: [],
  loading: false,
  error: null,

  fetchCoupons: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('user/allCoupons');
      set({ coupons: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch coupons', loading: false });
    }
  },
// @ts-ignore
  applyCoupon: async (code) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('user/applyCoupon', { code });
      console.log(response)
      set((state) => ({
        coupons: state.coupons.map((coupon) =>
          coupon.code === code ? { ...coupon, ...response.data.data } : coupon
        ),
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to apply coupon', loading: false });

    }
  },
}));