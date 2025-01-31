import { create } from 'zustand'
import axios from 'axios';
import axiosInstance from './axiosInstance';


interface CategoryState {
    category: any[]; // Adjust type if categories have a specific structure
    allCategory: () => Promise<void>;
}
export const useCategoryStore = create<CategoryState>((set) => ({
    category: [],
    allCategory: async () => {
        try {
            const response = await axiosInstance.get(`admin/allCategory`);
            set({ category: response.data.data })
           // console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
}));