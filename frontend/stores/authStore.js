'use client';

import { create } from 'zustand';
import axios from 'axios';
import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';

export const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,

    signup: async (email, password, role, name) => {
        try {
            const response = await axiosInstance.post(`auth/register`, {
                email,
                password,
                role,
                name
            });

            if (response?.data?.success) {
                toast.success('Signup Successfully Please Verify Your Email');
                return response;
            }
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || "Email Exists || Something Went Wrong"
                : "Something Went Wrong";
            toast.error(errorMessage);
            return null;
        }
    },

    login: async (email, password) => {
        try {
            const response = await axiosInstance.post(`auth/login`,
                { email, password },
                { withCredentials: true }
            );

            if (response?.data?.success) {
                set({
                    user: response.data.data.user,
                    isLoggedIn: true
                });
                toast.success('Login Successfully');
                return response;
            }
        } catch (error) {
            toast.error('Email Not Verified || Wrong Credentials');
        }
    },

    fetchUserDetails: async () => {
        try {
            const response = await axiosInstance.get(`auth/getUserDetails`,
                { withCredentials: true }
            );

            if (response?.data?.success) {
                set({
                    user: response.data.data,
                    isLoggedIn: true
                });
                return response;
            }
        } catch (error) {
            // Silent error handling as per original code
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post(`auth/logout`);

            if (response?.data?.success) {
                set({ user: null });
                localStorage.clear();
                toast.success('logout successful');
                return response;
            }
        } catch (error) {
            toast.error(
                axios.isAxiosError(error)
                    ? error.response?.data?.message || 'Logout failed'
                    : 'An unexpected error occurred during login'
            );
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await axiosInstance.post(`auth/forget`, { email });
            return response;
        } catch (error) {
            toast.error(
                axios.isAxiosError(error)
                    ? error.response?.data?.message || 'Failed to send password reset email'
                    : 'An unexpected error occurred during password reset'
            );
        }
    },

    googleSignIn: async (data) => {
        try {
            const response = await axiosInstance.post(`auth/google-signin`, data);
            set({
                user: response.data.data.user,
                isLoggedIn: true
            });
            return response;
        } catch (error) {
            // Silent error handling as per original code
        }
    },

    updateUserProfile: async (data) => {
        try {
            const response = await axiosInstance.post(`auth/update-user`, data);

            set((state) => ({
                user: {
                    ...state.user,
                    ...data,
                },
            }));

            return response;
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || 'Failed to update user profile'
                : 'An unexpected error occurred during user profile update';

            toast.error(errorMessage);
            console.error('Profile update error:', error);
            throw error;
        }
    },
}));