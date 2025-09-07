import { api } from '@shared/api/api';
import { API_ENDPOINTS } from '@shared/constants/endpoints';

import { ApiModifyQuestion, ApiQuestionsResponse, Question } from '../types';

export const getQuestions = async (
  page: number,
  limit: number = 5,
): Promise<{ questions: ApiQuestionsResponse['data']; meta: ApiQuestionsResponse['meta'] }> => {
  const response = await api.get(API_ENDPOINTS.QUESTIONS.WITH_SORT, {
    params: { page, limit },
    withCredentials: false,
  });
  const serverData = response?.data?.data;
  return { questions: serverData.data, meta: serverData.meta };
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await api.get(API_ENDPOINTS.QUESTIONS.BY_ID(id), { withCredentials: false });
  const questData = response?.data?.data;
  return questData;
};

export const createQuestion = async (values: ApiModifyQuestion) => {
  const response = await api.post(API_ENDPOINTS.QUESTIONS.BASE, values);
  const questData = response?.data?.data;
  return questData;
};

export const editQuestion = async (id: string, values: Partial<ApiModifyQuestion>) => {
  const response = await api.patch(API_ENDPOINTS.QUESTIONS.BY_ID(id), values);
  const questData = response?.data?.data;
  return questData;
};

export const deleteQuestion = async (id: string) => {
  const response = await api.delete(API_ENDPOINTS.QUESTIONS.BY_ID(id));
  const questData = response?.data?.data;
  return questData;
};
