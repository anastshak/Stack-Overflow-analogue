import { api } from '@shared/api/api';
import { API_ENDPOINTS } from '@shared/constants/endpoints';
import { UserInfo } from '@shared/types';

export const registerUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { username, password });
  const userData = response?.data?.data;
  return userData;
};

export const loginUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
  const userData = response?.data?.data;
  return userData;
};
