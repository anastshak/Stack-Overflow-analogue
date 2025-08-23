import axios from 'axios';
import { CommentInfo } from '../types';

export const addComment = async (content: string, snippetId: string): Promise<CommentInfo> => {
  const response = await axios.post(`/api/comments/`, { content, snippetId });
  const { data: comment } = response.data;

  return comment;
};
