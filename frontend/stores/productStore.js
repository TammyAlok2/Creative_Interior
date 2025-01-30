import { create } from 'zustand'

import axiosInstance from './axiosInstance';

export const useProductStore = create((set) => ({

    product: [], // Initially no product data
    setProduct: (product) => set({ product }),

    // Function to set product data
}));

export const useProductDataStore = create((set) => ({

    product: [], // Initially no product data
    setProduct: (product) => set({ product }),
    allProduct: async (queryParams = {}) => {
        try {
            // Build query string only if queryParams exist
            const queryString = Object.entries(queryParams)
                .filter(([_, value]) => value !== undefined && value !== '')
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');
                const url = `admin/allProducts${queryString ? `?${queryString}` : ''}`;
                const response = await axiosInstance.get(url);
            console.log(response.data.data.totalProducts);
            set({ product: response.data.data.products });
            
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    // Function to set product data
}));