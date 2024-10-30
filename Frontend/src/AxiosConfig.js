// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Your backend base URL
});

export default axiosInstance;
