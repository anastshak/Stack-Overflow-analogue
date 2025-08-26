import axios from 'axios';
import { MarkInfo } from '../types/snippet';

export const markPost = async (id: string, mark: MarkInfo['type']) => {
  const response = await axios.post(`/api/snippets/${id}/mark`, {
    mark,
  });
  const markData = response.data.data;

  return markData;
};
