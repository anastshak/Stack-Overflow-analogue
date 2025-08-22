import axios from 'axios';
import { MarkInfo } from '../types';

export const markPost = async (id: string, mark: MarkInfo['type']) => {
  const response = await axios.post(`/api/snippets/${id}/mark`, {
    mark,
  });
  const { data: userData } = response.data;

  return userData;
};
