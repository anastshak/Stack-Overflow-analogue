import axios from 'axios';
import { BASE_URL } from '../constants';
import { ApiResponse, ApiSnippet, SnippetModel } from '../types';

export const getPosts = async (
  page: number,
  limit: number = 5,
): Promise<{ snippets: SnippetModel[]; meta: ApiResponse['meta'] }> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/snippets`, { params: { page, limit } });

    // console.log('Fetched snippets:', data.data.data);

    const snippets: SnippetModel[] = data.data.data.map((elem: ApiSnippet) => ({
      id: elem.id,
      code: elem.code,
      language: elem.language,
      creator: elem.user.username,
      likes: elem.marks.filter((m) => m.type === 'like').length,
      dislikes: elem.marks.filter((m) => m.type === 'dislike').length,
      commentsCount: elem.comments.length,
    }));

    return { snippets, meta: data.data.meta };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
