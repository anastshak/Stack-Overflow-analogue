import { api } from './api';
import { MarkInfo } from '../types/snippet';

export const markPost = async (id: string, mark: MarkInfo['type']) => {
  const response = await api.post(`/snippets/${id}/mark`, { mark });
  return response.data.data;
};
