import { api } from '@shared/api/api';
import { MarkInfo } from '../types';
import { API_ENDPOINTS } from '@shared/constants/endpoints';

export const markPost = async (id: string, mark: MarkInfo['type']) => {
  const response = await api.post(API_ENDPOINTS.SNIPPETS.MARK(id), { mark });
  const serverData = response?.data?.data;
  return serverData;
};
