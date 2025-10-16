import { api } from '@shared/api/api';
import { API_ENDPOINTS } from '@shared/constants/endpoints';

import { MarkInfo } from '../types';

export const markPost = async (id: string, mark: MarkInfo['type']) => {
  const response = await api.post(API_ENDPOINTS.SNIPPETS.MARK(id), { mark });
  const serverData = response?.data?.data;
  return serverData;
};
