import axios from 'axios';
import { CommentInfo } from '../types/snippet';

export const addComment = async (content: string, snippetId: string): Promise<CommentInfo> => {
  const response = await axios.post(`/api/comments/`, { content, snippetId });
  const commentData = response.data.data;

  return commentData;
};
