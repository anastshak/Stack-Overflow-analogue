import { api } from '@shared/api/api';
import { CommentInfo } from '../types';

export const addComment = async (content: string, snippetId: string): Promise<CommentInfo> => {
  const response = await api.post('/comments', { content, snippetId });
  return response.data.data;
};
