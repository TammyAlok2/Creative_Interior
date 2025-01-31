import { create } from 'zustand';
import axiosInstance from './axiosInstance';

interface Material {
  _id: string;
  name: string;
  // Add other material properties as needed
}

interface MaterialState {
  materials: Material[];
  totalMaterials?: number;
  getAllMaterials: (queryParams?: Record<string, string>) => Promise<{
    materials: Material[];
    totalMaterials: number;
  }>;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  materials: [],
  getAllMaterials: async () => {
    try {
      const response = await axiosInstance.get('admin/allMaterials');
      
      set({ 
        materials: response?.data?.data,
        totalMaterials: materials.length 
      });

      return {
        materials,
        totalMaterials: materials.length
      };
    } catch (error) {
      console.error('Failed to fetch materials:', error);
      set({ materials: [], totalMaterials: 0 });
      throw error;
    }
  }
}));