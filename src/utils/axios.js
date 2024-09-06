import axios from "axios";
import { BACKEND_URI } from "/constants";

// Axios instance
export const apiClient = axios.create({
  baseURL: BACKEND_URI,
});

// Set up Axios interceptor
export const setupAxiosInterceptors = (getAccessTokenSilently) => {
  apiClient.interceptors.request.use(
    async (config) => {
      try {
        const token = await getAccessTokenSilently();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to get Auth0 token", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
