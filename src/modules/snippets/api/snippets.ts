import { api } from '@shared/api/api';
import { ApiModifySnippet, ApiSnippetsResponse, CommentInfo, Snippet, SnippetModel } from '../types';
import { mapSnippet } from '../helpers/mapSnippet';
import { API_ENDPOINTS } from '@shared/constants/endpoints';

export const getSnippets = async (
  page: number,
  limit: number = 5,
): Promise<{ snippets: ApiSnippetsResponse['data']; meta: ApiSnippetsResponse['meta'] }> => {
  const response = await api.get('/snippets', { params: { page, limit }, withCredentials: false });
  const serverData = response?.data?.data;

  const snippetsUpdated: SnippetModel[] = serverData.data.map((elem: Snippet) => mapSnippet(elem));
  return { snippets: snippetsUpdated, meta: serverData.meta };
};

export const getSnippetsByUserID = async (
  userId: string,
  page: number,
  limit: number = 5,
): Promise<{ snippets: ApiSnippetsResponse['data']; meta: ApiSnippetsResponse['meta'] }> => {
  const response = await api.get(API_ENDPOINTS.SNIPPETS.BASE, { params: { userId, page, limit } });
  const serverData = response?.data?.data;

  const snippetsUpdated: SnippetModel[] = serverData.data.map((elem: Snippet) => mapSnippet(elem));
  return { snippets: snippetsUpdated, meta: serverData.meta };
};

export const getSnippetById = async (id: string): Promise<{ snippet: SnippetModel; comments: CommentInfo[] }> => {
  const response = await api.get(API_ENDPOINTS.SNIPPETS.BY_ID(id), { withCredentials: false });
  const snippetData = response?.data?.data;

  return { snippet: mapSnippet(snippetData), comments: snippetData.comments };
};

export const getLanguages = async (): Promise<string[]> => {
  const response = await api.get(API_ENDPOINTS.SNIPPETS.LANGUAGES, { withCredentials: false });
  const snippetData = response.data.data;
  return snippetData;
};

export const createSnippet = async (values: ApiModifySnippet) => {
  const response = await api.post(API_ENDPOINTS.SNIPPETS.BASE, values);
  const snippetData = response?.data?.data;
  return snippetData;
};

export const editSnippet = async (id: string, values: Partial<ApiModifySnippet>) => {
  const response = await api.patch(API_ENDPOINTS.SNIPPETS.BY_ID(id), values);
  const snippetData = response?.data?.data;
  return snippetData;
};

export const deleteSnippet = async (id: string) => {
  const response = await api.delete(API_ENDPOINTS.SNIPPETS.BY_ID(id));
  const snippetData = response?.data?.data;
  return snippetData;
};
