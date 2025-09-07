import { API_ENDPOINTS } from '@shared/constants/endpoints';
import { api } from './api';

export const logoutUser = async (): Promise<void> => {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT);
};
