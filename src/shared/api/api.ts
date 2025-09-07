import { API_BASE_URL } from '@shared/constants/env';
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
