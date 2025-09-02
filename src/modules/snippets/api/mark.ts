import { api } from '@shared/api/api';
import { MarkInfo } from '../types';

export const markPost = async (id: string, mark: MarkInfo['type']) => {
  const response = await api.post(`/snippets/${id}/mark`, { mark });
  return response.data.data;
};
