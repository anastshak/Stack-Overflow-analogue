import axios from 'axios';
import { ApiModifySnippet, CommentInfo, Snippet, SnippetModel } from '../types/snippet';
import { ApiSnippetsResponse } from '../types/api';
import { mapSnippet } from '../utils/mapSnippet';

export const getSnippets = async (
  page: number,
  limit: number = 5,
): Promise<{ snippets: ApiSnippetsResponse['data']; meta: ApiSnippetsResponse['meta'] }> => {
  const response = await axios.get(`/api/snippets`, { params: { page, limit } });
  const serverData = response.data.data;

  const snippetsUpdated: SnippetModel[] = serverData.data.map((elem: Snippet) => mapSnippet(elem));

  return { snippets: snippetsUpdated, meta: serverData.meta };
};

export const getSnippetsByUserID = async (
  userId: string,
  page: number,
  limit: number = 5,
): Promise<{ snippets: ApiSnippetsResponse['data']; meta: ApiSnippetsResponse['meta'] }> => {
  const response = await axios.get(`/api/snippets`, { params: { userId, page, limit } });
  const serverData = response.data.data;

  const snippetsUpdated: SnippetModel[] = serverData.data.map((elem: Snippet) => mapSnippet(elem));

  return { snippets: snippetsUpdated, meta: serverData.meta };
};

export const getSnippetById = async (id: string): Promise<{ snippet: SnippetModel; comments: CommentInfo[] }> => {
  const response = await axios.get(`/api/snippets/${id}`);
  const snippetData = response.data.data;

  return { snippet: mapSnippet(snippetData), comments: snippetData.comments };
};

export const getLanguages = async (): Promise<string[]> => {
  const response = await axios.get(`/api/snippets/languages`);
  const languagesData = response.data.data;

  return languagesData;
};

export const createSnippet = async (values: ApiModifySnippet) => {
  const response = await axios.post(`/api/snippets`, values, { withCredentials: true });
  const snippetData = response.data.data;

  return snippetData;
};

export const editSnippet = async (id: string, values: Partial<ApiModifySnippet>) => {
  const response = await axios.patch(`/api/snippets/${id}`, values, { withCredentials: true });
  const snippetData = response.data.data;

  return snippetData;
};

export const deleteSnippet = async (id: string) => {
  const response = await axios.delete(`/api/snippets/${id}`, { withCredentials: true });
  const snippetData = response.data.data;

  return snippetData;
};
