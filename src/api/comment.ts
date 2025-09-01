import { api } from './api';
import { CommentInfo } from '../types/snippet';

export const addComment = async (content: string, snippetId: string): Promise<CommentInfo> => {
  const response = await api.post('/comments', { content, snippetId });
  return response.data.data;
};
