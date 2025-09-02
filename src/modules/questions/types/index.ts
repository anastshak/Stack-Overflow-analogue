import { ApiResponseBase, UserInfo } from '@shared/types';

export interface Question {
  id: string;
  title: string;
  description: string;
  attachedCode: string;
  answers: Answer[];
  user: UserInfo;
  isResolved: boolean;
}

export interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
  user: UserInfo;
}

export interface ApiModifyQuestion {
  title: string;
  description: string;
  attachedCode: string;
}

export type ApiQuestionsResponse = ApiResponseBase<Question>;
