import { api } from '@shared/api/api';
import { ApiModifySnippet, ApiSnippetsResponse, CommentInfo, Snippet, SnippetModel } from '../types';
import { mapSnippet } from '../helpers/mapSnippet';

export const getSnippets = async (
  page: number,
  limit: number = 5,
): Promise<{ snippets: ApiSnippetsResponse['data']; meta: ApiSnippetsResponse['meta'] }> => {
  const response = await api.get('/snippets', { params: { page, limit }, withCredentials: false });
  const serverData = response.data.data;

  const snippetsUpdated: SnippetModel[] = serverData.data.map((elem: Snippet) => mapSnippet(elem));
  return { snippets: snippetsUpdated, meta: serverData.meta };
};

export const getSnippetsByUserID = async (
  userId: string,
  page: number,
  limit: number = 5,
): Promise<{ snippets: ApiSnippetsResponse['data']; meta: ApiSnippetsResponse['meta'] }> => {
  const response = await api.get('/snippets', { params: { userId, page, limit } });
  const serverData = response.data.data;

  const snippetsUpdated: SnippetModel[] = serverData.data.map((elem: Snippet) => mapSnippet(elem));
  return { snippets: snippetsUpdated, meta: serverData.meta };
};

export const getSnippetById = async (id: string): Promise<{ snippet: SnippetModel; comments: CommentInfo[] }> => {
  const response = await api.get(`/snippets/${id}`, { withCredentials: false });
  const snippetData = response.data.data;

  return { snippet: mapSnippet(snippetData), comments: snippetData.comments };
};

export const getLanguages = async (): Promise<string[]> => {
  const response = await api.get('/snippets/languages', { withCredentials: false });
  return response.data.data;
};

export const createSnippet = async (values: ApiModifySnippet) => {
  const response = await api.post('/snippets', values);
  return response.data.data;
};

export const editSnippet = async (id: string, values: Partial<ApiModifySnippet>) => {
  const response = await api.patch(`/snippets/${id}`, values);
  return response.data.data;
};

export const deleteSnippet = async (id: string) => {
  const response = await api.delete(`/snippets/${id}`);
  return response.data.data;
};
