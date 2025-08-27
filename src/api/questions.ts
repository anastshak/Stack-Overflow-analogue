import axios from 'axios';
import { ApiQuestionsResponse } from '../types/api';

export const getQuestions = async (
  page: number,
  limit: number = 5,
): Promise<{ questions: ApiQuestionsResponse['data']; meta: ApiQuestionsResponse['meta'] }> => {
  const response = await axios.get(`/api/questions`, { params: { page, limit } });
  const serverData = response.data.data;

  return { questions: serverData.data, meta: serverData.meta };
};
