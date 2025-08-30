import axios from 'axios';
import { UpdatedUser, UserInfo } from '../types/user';

export const registerUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await axios.post('/api/register', { username, password }, { withCredentials: true });
  const userData = response.data.data;
  return userData;
};

export const loginUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
  const userData = response.data.data;
  return userData;
};

export const logoutUser = async (): Promise<void> => {
  await axios.post('/api/auth/logout', { withCredentials: true });
};

export const updateUsername = async (newUsername: string): Promise<UpdatedUser> => {
  const response = await axios.patch(`/api/me`, { username: newUsername }, { withCredentials: true });
  const userData = response.data.data;
  return userData;
};

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  const response = await axios.patch(`/api/me/password`, { oldPassword, newPassword }, { withCredentials: true });
  const userData = response.data.data;
  return userData;
};

export const deleteAccount = async (): Promise<void> => {
  await axios.delete('/api/me', { withCredentials: true });
};
