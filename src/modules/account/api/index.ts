import { api } from '@shared/api/api';
import { UpdatedUser } from '../types';
import { API_ENDPOINTS } from '@shared/constants/endpoints';

export const updateUsername = async (newUsername: string): Promise<UpdatedUser> => {
  const response = await api.patch(API_ENDPOINTS.ACCOUNT.ME, { username: newUsername });
  return response.data.data;
};

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  const response = await api.patch(API_ENDPOINTS.ACCOUNT.ME_PASSWORD, { oldPassword, newPassword });
  return response.data.data;
};

export const deleteAccount = async (): Promise<void> => {
  await api.delete(API_ENDPOINTS.ACCOUNT.ME);
};
