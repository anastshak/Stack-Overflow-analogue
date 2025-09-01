// api/auth.ts
import { api } from './api';
import { UpdatedUser, UserInfo } from '../types/user';

export const registerUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await api.post('/register', { username, password });
  return response.data.data;
};

export const loginUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const updateUsername = async (newUsername: string): Promise<UpdatedUser> => {
  const response = await api.patch('/me', { username: newUsername });
  return response.data.data;
};

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  const response = await api.patch('/me/password', { oldPassword, newPassword });
  return response.data.data;
};

export const deleteAccount = async (): Promise<void> => {
  await api.delete('/me');
};
