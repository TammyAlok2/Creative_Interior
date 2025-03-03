// In a separate file like axiosConfig.ts
import axios from 'axios';
export const API_URL = 'http://localhost:5000/api/v1/' // 'http://localhost:5000/api/v1/'; //https://api.bombooworld.com/api/v1/ //https://api.creativeinteriorssatna.com/api/v1/
// updated base url
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Add request/response interceptors for global error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Global error handling logic
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Then in your store, use this instance
