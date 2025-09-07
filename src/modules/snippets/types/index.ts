import { ApiResponseBase, UserInfo } from '@shared/types';

export interface CommentInfo {
  id: string;
  content: string;
  user: UserInfo;
}

export interface MarkInfo {
  id: string;
  type: 'like' | 'dislike' | null;
  user: UserInfo;
}

export interface Snippet {
  id: string;
  code: string;
  language: string;
  user: UserInfo;
  comments: CommentInfo[];
  marks: MarkInfo[];
}

export interface SnippetModel {
  id: string;
  code: string;
  language: string;
  creator: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
  userMark?: 'like' | 'dislike' | null;
}

export interface ApiModifySnippet {
  language: string;
  code: string;
}

export type ApiSnippetsResponse = ApiResponseBase<SnippetModel>;
