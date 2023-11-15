import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default instance;
