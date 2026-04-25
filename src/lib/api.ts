import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};

export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data.data;
};

export const getBlogs = async () => {
  const res = await api.get('/blogs');
  return res.data.data;
};

export const getFAQs = async () => {
  const res = await api.get('/faqs');
  return res.data.data;
};

export const createInquiry = async (data: any) => {
  const res = await api.post('/inquiries', data);
  return res.data.data;
};

export const getSettings = async () => {
  const res = await api.get('/settings');
  return res.data.data[0]; // Assuming only one setting record
};
