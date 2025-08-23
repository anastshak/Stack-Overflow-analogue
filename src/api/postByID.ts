import axios from 'axios';
import { CommentInfo, MarkInfo, SnippetModel } from '../types';
import { useAuthStore } from '../store/authStore';

export const getPostById = async (id: string): Promise<{ snippet: SnippetModel; comments: CommentInfo[] }> => {
  const response = await axios.get(`/api/snippets/${id}`);
  const { data: snippetData } = response.data;

  const { user } = useAuthStore.getState();
  const userMark = user ? (snippetData.marks.find((m: MarkInfo) => m.user.id === user.id)?.type ?? null) : null;

  const snippet: SnippetModel = {
    id: snippetData.id,
    code: snippetData.code,
    language: snippetData.language,
    creator: snippetData.user.username,
    likes: snippetData.marks.filter((m: MarkInfo) => m.type === 'like').length,
    dislikes: snippetData.marks.filter((m: MarkInfo) => m.type === 'dislike').length,
    commentsCount: snippetData.comments.length,
    userMark,
  };

  return { snippet, comments: snippetData.comments };
};
