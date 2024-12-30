import axios from 'axios';

// Create an Axios instance with a base configuration
const api = axios.create({
  baseURL: 'http://40.66.46.87:5000', // Base URL for API requests
  headers: {
    'Content-Type': 'application/json', // Default request content type
  },
});

/**
 * Request Interceptor
 * - Attaches the Authorization header with the Bearer token (from localStorage) to every request.
 */
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Add the Authorization header if the token exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Return the modified config
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Processes successful responses.
 * - Handles unauthorized responses (401 errors) globally.
 */
api.interceptors.response.use(
  (response) => {
    // Return the response data directly for successful requests
    return response;
  },
  (error) => {
    // Check if the response has a 401 Unauthorized status
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access - possible token issue.');

      // Optionally: Clear the token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/auth'; // Redirect to login page
    }
    return Promise.reject(error); // Propagate the error for further handling
  }
);

export default api;
