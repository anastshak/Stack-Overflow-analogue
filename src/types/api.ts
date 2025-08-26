import { SnippetModel } from './snippet';
import { ApiResponseBase } from './common';
import { UserWithStatistic } from './user';

export type ApiSnippetsResponse = ApiResponseBase<SnippetModel>;
export type ApiUsersResponse = ApiResponseBase<UserWithStatistic>;
