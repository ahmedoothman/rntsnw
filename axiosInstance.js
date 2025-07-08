import axios from 'axios';
import asyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY, API_URL} from '@env';
import NetInfo from '@react-native-community/netinfo';
import {NotificationService} from './src/utils/NotificationService';
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    'Accept-Language': 'en',
    'api-key': API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await asyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        NotificationService.error(
          'Please check your internet connection and try again.',
          'No Internet Connection',
        );
      } else {
        NotificationService.error(
          'Unable to reach the server. Please try again later.',
          'Connection Error',
        );
      }
      throw error; // Still throw for component-level handling
    }

    // Handle 401 Unauthorized (Token refresh logic)
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the token
        const refreshToken = await asyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshResponse = await axios.get(
            `${API_URL}clients/auth/refresh`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                'Accept-Language': 'en',
                'api-key': API_KEY,
              },
            },
          );

          const newToken = refreshResponse.data.data.token;
          await asyncStorage.setItem('token', newToken);

          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance.request(error.config);
        } else {
          // No refresh token available
          NotificationService.error(
            'Please log in again to continue.',
            'Session Expired',
          );
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and notify user
        await asyncStorage.removeItem('token');
        await asyncStorage.removeItem('refreshToken');

        NotificationService.error(
          'Your session has expired. Please log in again.',
          'Authentication Required',
        );

        throw refreshError;
      }
    }

    // Handle 4xx client errors (validation, bad request, etc.)
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500 &&
      error.response.status !== 401
    ) {
      // Handle structured validation errors
      if (
        error.response.data?.errors &&
        typeof error.response.data.errors === 'object'
      ) {
        const errorMessages = [];

        // Process nested errors structure
        Object.entries(error.response.data.errors).forEach(
          ([field, fieldErrors]) => {
            if (Array.isArray(fieldErrors)) {
              fieldErrors.forEach(fieldError => {
                errorMessages.push(fieldError);
              });
            } else if (typeof fieldErrors === 'object') {
              // Handle deeper nested errors
              Object.entries(fieldErrors).forEach(([key, message]) => {
                errorMessages.push(`${field}.${key}: ${message}`);
              });
            } else {
              errorMessages.push(`${field}: ${fieldErrors}`);
            }
          },
        );

        // Show validation errors (usually for forms - don't show toast for these)
        // Let the form components handle these errors
        throw {
          type: 'validation',
          errors: errorMessages,
          originalError: error,
        };
      } else {
        // Handle single error messages
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          'The request could not be completed.';

        // Only show toast for non-form related errors
        const isFormSubmission =
          error.config?.headers['Content-Type']?.includes(
            'multipart/form-data',
          ) || error.config?.data;

        if (!isFormSubmission) {
          NotificationService.error(errorMessage, 'Request Failed');
        }

        throw errorMessage;
      }
    }

    // Handle 5xx server errors
    else if (error.response && error.response.status >= 500) {
      const isProfileRequest = error.config?.url?.includes(
        'clients/auth/profile',
      );

      if (!isProfileRequest) {
        NotificationService.error(
          'Something went wrong on our end. Please try again later.',
          'Server Error',
        );
      }

      throw error.message || 'Server error occurred';
    }

    // Handle other errors
    throw error;
  },
);

export default axiosInstance;
