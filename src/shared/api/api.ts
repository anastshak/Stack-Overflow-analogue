// axios instance
import axios from 'axios';

const isDev = import.meta.env.DEV;

export const api = axios.create({
  baseURL: isDev ? '/api' : 'https://codelang.vercel.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
