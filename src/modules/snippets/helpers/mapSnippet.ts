import { useAuthStore } from '@shared/store/authStore';
import { MarkInfo, Snippet, SnippetModel } from '../types';

export const mapSnippet = (snippet: Snippet): SnippetModel => {
  const { user } = useAuthStore.getState();

  const userMark = user ? (snippet.marks.find((m: MarkInfo) => m.user.id === user.id)?.type ?? null) : null;

  return {
    id: snippet.id,
    code: snippet.code,
    language: snippet.language,
    creator: snippet.user.username,
    likes: snippet.marks.filter((m) => m.type === 'like').length,
    dislikes: snippet.marks.filter((m) => m.type === 'dislike').length,
    commentsCount: snippet.comments.length,
    userMark,
  };
};
