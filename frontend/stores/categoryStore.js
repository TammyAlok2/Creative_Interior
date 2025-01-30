import { create } from 'zustand'
import axios from 'axios';
import axiosInstance from './axiosInstance';

export const useCategoryStore = create((set) => ({
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