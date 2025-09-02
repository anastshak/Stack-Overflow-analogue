import { api } from '@shared/api/api';
import { ApiModifyQuestion, ApiQuestionsResponse, Question } from '../types';

export const getQuestions = async (
  page: number,
  limit: number = 5,
): Promise<{ questions: ApiQuestionsResponse['data']; meta: ApiQuestionsResponse['meta'] }> => {
  const response = await api.get('/questions?sortBy=id:DESC', { params: { page, limit } });
  const serverData = response.data.data;
  return { questions: serverData.data, meta: serverData.meta };
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await api.get(`/questions/${id}`);
  return response.data.data;
};

export const createQuestion = async (values: ApiModifyQuestion) => {
  const response = await api.post('/questions', values);
  return response.data.data;
};

export const editQuestion = async (id: string, values: Partial<ApiModifyQuestion>) => {
  const response = await api.patch(`/questions/${id}`, values);
  return response.data.data;
};

export const deleteQuestion = async (id: string) => {
  const response = await api.delete(`/questions/${id}`);
  return response.data.data;
};
