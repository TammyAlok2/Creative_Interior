import { create } from 'zustand';
import axiosInstance from './axiosInstance';

interface Coupon {
  code: string;
  discount: number;
  discountType: string;
  startDate: Date;
  endDate: Date;
  startHour: number;
  endHour: number;
  minimumPrice: number;
  maximumOrder: number;
  status: boolean;
  usageLimit: number;
  usedCount: number;
}

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  fetchCoupons: () => void;
  applyCoupon: (code: string) => Promise<void>;
}

export const useCouponStore = create<CouponState>((set) => ({
  coupons: [],
  loading: false,
  error: null,

  fetchCoupons: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('user/allCoupons');
      set({ coupons: response.data.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch coupons', loading: false });
    }
  },
// @ts-ignore
  applyCoupon: async (code: any) => {
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
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to apply coupon', loading: false });

    }
  },
}));