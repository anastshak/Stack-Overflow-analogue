import axios from 'axios';
import { ApiQuestionsResponse } from '../types/api';
import { ApiModifyQuestion, Question } from '../types/question';

export const getQuestions = async (
  page: number,
  limit: number = 5,
): Promise<{ questions: ApiQuestionsResponse['data']; meta: ApiQuestionsResponse['meta'] }> => {
  const response = await axios.get(`/api/questions?sortBy=id:DESC`, { params: { page, limit } });
  const serverData = response.data.data;

  return { questions: serverData.data, meta: serverData.meta };
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await axios.get(`/api/questions/${id}`);
  return response.data.data;
};

export const createQuestion = async (values: ApiModifyQuestion) => {
  const response = await axios.post(`/api/questions/`, values);
  const questionData = response.data.data;

  return questionData;
};

export const editQuestion = async (id: string, values: Partial<ApiModifyQuestion>) => {
  const response = await axios.patch(`/api/questions/${id}`, values);
  const questionData = response.data.data;

  return questionData;
};

export const deleteQuestion = async (id: string) => {
  const response = await axios.delete(`/api/questions/${id}`);
  const questionData = response.data.data;

  return questionData;
};
