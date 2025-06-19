import api from './api';
import { jwtDecode } from 'jwt-decode';

const AUTH_TOKEN_KEY = 'auth_token';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  checkAuth: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      throw new Error('No token found');
    }

    try {
      // Check if token is expired
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        throw new Error('Token expired');
      }

      // Validate token with server
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      throw error;
    }
  },

  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
};

export default authService;