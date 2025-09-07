import { api } from '@shared/api/api';
import { CommentInfo } from '../types';
import { API_ENDPOINTS } from '@shared/constants/endpoints';

export const addComment = async (content: string, snippetId: string): Promise<CommentInfo> => {
  const response = await api.post(API_ENDPOINTS.COMMENTS.BASE, { content, snippetId });
  const serverData = response?.data?.data;
  return serverData;
};
