import axios from 'axios';
import { ApiResponse, ApiSnippet, SnippetModel } from '../types';
import { useAuthStore } from '../store/authStore';

export const getPosts = async (
  page: number,
  limit: number = 5,
): Promise<{ snippets: SnippetModel[]; meta: ApiResponse['meta'] }> => {
  const response = await axios.get(`/api/snippets`, { params: { page, limit } });
  const serverData = response.data.data;

  const { user } = useAuthStore.getState();

  const snippets: SnippetModel[] = serverData.data.map((elem: ApiSnippet) => {
    const userMark = user ? (elem.marks.find((m) => m.user.id === user.id)?.type ?? null) : null;

    return {
      id: elem.id,
      code: elem.code,
      language: elem.language,
      creator: elem.user.username,
      likes: elem.marks.filter((m) => m.type === 'like').length,
      dislikes: elem.marks.filter((m) => m.type === 'dislike').length,
      commentsCount: elem.comments.length,
      userMark,
    };
  });

  return { snippets, meta: serverData.meta };
};
