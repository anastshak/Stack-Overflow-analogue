import { api } from '@shared/api/api';
import { UserInfo } from '@shared/types';

export const registerUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await api.post('/register', { username, password });
  return response.data.data;
};

export const loginUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data.data;
};
