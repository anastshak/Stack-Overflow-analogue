import axios from 'axios';
import { ApiQuestionsResponse } from '../types/api';
import { Question } from '../types/question';

export const getQuestions = async (
  page: number,
  limit: number = 5,
): Promise<{ questions: ApiQuestionsResponse['data']; meta: ApiQuestionsResponse['meta'] }> => {
  const response = await axios.get(`/api/questions`, { params: { page, limit } });
  const serverData = response.data.data;

  return { questions: serverData.data, meta: serverData.meta };
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await axios.get(`/api/questions/${id}`);
  return response.data.data;
};
