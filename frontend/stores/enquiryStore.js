// routes/enquiry.routes.js
import express from 'express';
// store/useEnquiryStore.ts
import { create } from 'zustand';
import axiosInstance from './axiosInstance';
import toast from 'react-hot-toast';

export const useEnquiryStore = create((set, get) => ({
    enquiries: [],

    addEnquiry: async (data) => {
        try {
            const response = await axiosInstance.post('admin/add-enquiry', data);
            console.log("add enquiry response: ", response)
            const newEnquiry = response.data.data;
            set((state) => ({
                enquiries: [...state.enquiries, newEnquiry],
            }));
            toast.success("Enquiry submitted successfully");
            return newEnquiry;
        } catch (error) {
            toast.error("Failed to submit enquiry");
            console.error('Failed to add enquiry:', error);
            return undefined;
        }
    },

    editEnquiry: async (enquiryId, data) => {
        try {
            const response = await axiosInstance.put(`admin/edit-enquiry/${enquiryId}`, data);
            set((state) => ({
                enquiries: state.enquiries.map((e) => 
                    e._id === enquiryId ? response.data.data : e
                ),
            }));
            toast.success("Enquiry updated successfully");
        } catch (error) {
            toast.error("Failed to update enquiry");
            console.error('Failed to edit enquiry:', error);
        }
    },

    deleteEnquiry: async (enquiryId) => {
        try {
            await axiosInstance.delete(`admin/delete-enquiry/${enquiryId}`);
            set((state) => ({
                enquiries: state.enquiries.filter((e) => e._id !== enquiryId),
            }));
            toast.success("Enquiry deleted successfully");
        } catch (error) {
            toast.error("Failed to delete enquiry");
            console.error('Failed to delete enquiry:', error);
        }
    },

    fetchEnquiries: async () => {
        try {
            const response = await axiosInstance.get('admin/all-enquiries');
            set({ enquiries: response.data.data });
            toast.success("Enquiries fetched successfully");
        } catch (error) {
            toast.error("Failed to fetch enquiries");
            console.error('Failed to fetch enquiries:', error);
        }
    },
}));