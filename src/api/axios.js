import axios from 'axios';
const BASE_URL = "https://aichatbackend-ulkv.onrender.com/api";
//const BASE_URL="http://localhost:4000/api";
const API = axios.create({
  baseURL: BASE_URL, // replace with deployed URL if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
