import { create } from 'zustand';
import axiosInstance from './axiosInstance';

interface OrderItem {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
  orderStatus?: string;
  paymentStatus?: string;
}

interface Order {
  _id: string;
  address: string;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: 'COD' | 'ONLINE';
  orderItems: OrderItem[];
  razorpay?: {
    orderId: string;
    paymentId?: string;
    signature?: string;
  };
}

interface OrderResponse {
  success: boolean;
  data: {
    order: Order;
    razorpayOrderId?: string;
    razorpayKeyId?: string;
  };
  message: string;
}

interface OrderStore {
  orders: Order[];
  loading: boolean;
  error: string | null;
  addOrder: (order: Partial<Order>) => Promise<OrderResponse | undefined>;
  editOrder: (orderId: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  fetchOrders: (status?: string) => Promise<Order[] | undefined>;
  fetchOrderById: (orderId: string) => Promise<Order | undefined>;
  fetchProductsByOrders: (orderId: string, productItemId: any) => Promise<Order | undefined>;
  verifyPayment: (paymentData: any) => Promise<OrderResponse | undefined>;
  clearError: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  // Initialize with empty array instead of undefined
  orders: [] as Order[],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  addOrder: async (order) => {
    set({ loading: true, error: null });
    const response = await axiosInstance.post<OrderResponse>('user/add-order', order);

    // Ensure we have the current state of orders before updating

    return response?.data;
  },

  verifyPayment: async (paymentData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post<OrderResponse>(
        'user/verify-payment',
        paymentData
      );
      set({ loading: false, error: null });
      return response.data;
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete order';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  fetchOrders: async (status?: string) => {
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch product item';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },


}));