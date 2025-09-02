import { api } from '@shared/api/api';
import { UpdatedUser } from '../types';

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
