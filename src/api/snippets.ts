import axios from 'axios';
import { CommentInfo, Snippet, SnippetModel } from '../types/snippet';
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

export const getSnippetById = async (id: string): Promise<{ snippet: SnippetModel; comments: CommentInfo[] }> => {
  const response = await axios.get(`/api/snippets/${id}`);
  const snippetData = response.data.data;

  return { snippet: mapSnippet(snippetData), comments: snippetData.comments };
};
