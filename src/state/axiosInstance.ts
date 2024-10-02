import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { store } from './store'; // Import your Redux store
import { refreshSession, revokeSession } from './slices/session'; // Adjust based on your session slice

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Extend the AxiosRequestConfig to include the _retry property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean; // Optional property
  }

// Request interceptor to attach the JWT token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.session.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh the token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Ensure originalRequest is defined and check for 401
    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      const state = store.getState();
      const refreshToken = state.session.refreshToken;

      try {
        const response = await axiosInstance.post('/auth/refresh', {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        // Save the new token to the Redux state
        store.dispatch(refreshSession({ accessToken: newAccessToken }));

        // Set the new token in the original request
        originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        // If refreshing the token fails, log out the user
        store.dispatch(revokeSession());
        window.location.href = '/login';
      }
    }

    return Promise.reject(error); // Forward other errors
  }
);

export default axiosInstance;
