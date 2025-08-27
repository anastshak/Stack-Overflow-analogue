import { SnippetModel } from './snippet';
import { ApiResponseBase } from './common';
import { UserWithStatistic } from './user';
import { Question } from './question';

export type ApiSnippetsResponse = ApiResponseBase<SnippetModel>;
export type ApiUsersResponse = ApiResponseBase<UserWithStatistic>;
export type ApiQuestionsResponse = ApiResponseBase<Question>;
