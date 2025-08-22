import axios from 'axios';
import { UserInfo } from '../types';

export const registerUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await axios.post('/api/register', { username, password });
  const { data: userData } = response.data;
  return userData;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post('/api/auth/login', { username, password });
  const { data: userData } = response.data;
  return userData;
};
