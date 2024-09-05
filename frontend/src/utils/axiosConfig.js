import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

export const unauthenticatedAxios = axios.create({
  baseURL: baseURL,
});



export const authenticatedAxios = axios.create({
    baseURL: baseURL,
  });
  
  authenticatedAxios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
