import { create } from 'zustand';
import axiosInstance from './axiosInstance';

interface Material {
  _id: string;
  name: string;
  image: string;
  label: string;
  price: number;
  ribbon: string;
  isNew?: boolean;
}

interface MaterialState {
  materials: Material[];
  totalMaterials: number;
  getAllMaterials: () => Promise<void>;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  materials: [],
  totalMaterials: 0,
  getAllMaterials: async () => {
    try {
      const response = await axiosInstance.get("admin/allMaterials", {
        withCredentials: true,
      });
      set({ 
        materials: response?.data?.data,
        totalMaterials: response?.data?.data?.length 
      });
    } catch (error) {
      console.error('Failed to fetch materials:', error);
      set({ materials: [], totalMaterials: 0 });
      throw error;
    }
  }
}));