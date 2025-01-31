import { create } from 'zustand'
import axios from 'axios';
import { WishList } from '@/types/WishList';

import axiosInstance from './axiosInstance';

export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface ProductStoreState {
    product: WishList[];
    setProduct: (product: WishList[]) => void;
}

interface ProductDataStoreState {
    product: WishList[];
    setProduct: (product: WishList[]) => void;
    allProduct: () => Promise<void>;
}

export const useProductStore = create<ProductStoreState>((set) => ({

    product: [], // Initially no product data
    setProduct: (product) => set({ product }),

    // Function to set product data
}));

export const useProductDataStore = create<ProductDataStoreState>((set) => ({

    product: [], // Initially no product data
    setProduct: (product) => set({ product }),
    allProduct: async (queryParams = {}) => {
        try {
            // Build query string only if queryParams exist
            const queryString = Object.entries(queryParams)
                .filter(([_, value]) => value !== undefined && value !== '')
                .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
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