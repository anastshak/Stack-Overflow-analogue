import { useAuthStore } from '@shared/store/authStore';
import { MarkInfo, Snippet, SnippetModel } from '../types';

export const mapSnippet = (snippet: Snippet): SnippetModel => {
  const { user } = useAuthStore.getState();

  let userMark: SnippetModel['userMark'] = null;

  if (user) {
    const mark = snippet.marks.find((m: MarkInfo) => m.user.id === user.id);
    userMark = mark ? mark.type : null;
  }

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
