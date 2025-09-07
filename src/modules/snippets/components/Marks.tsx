import { DislikeOutlined, DislikeTwoTone, LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { message, Spin } from 'antd';

import { queryClient } from '@app/providers/queryClient';
import { useAuthStore } from '@shared/store/authStore';

import { markPost } from '../api/mark';
import { SnippetModel } from '../types';

interface MarksSnapProps {
  snippet: SnippetModel;
}

export const MarksSnap = ({ snippet }: MarksSnapProps) => {
  const { isAuthenticated } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (mark: 'like' | 'dislike') => markPost(snippet.id, mark),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      queryClient.invalidateQueries({ queryKey: ['snippet', snippet.id] });
    },
    onError: () => {
      message.error('Failed to mark post');
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      message.warning('Please login to like post');
      return;
    }
    if (snippet.userMark !== 'like') mutation.mutate('like');
  };

  const handleDislike = () => {
    if (!isAuthenticated) {
      message.warning('Please login to dislike post');
      return;
    }
    if (snippet.userMark !== 'dislike') mutation.mutate('dislike');
  };

  return (
    <span className="flex gap-4 items-center">
      {/* like */}
      <span onClick={handleLike} className="hover:cursor-pointer flex items-center gap-1">
        {snippet.userMark === 'like' ? <LikeTwoTone twoToneColor="#52c41a" /> : <LikeOutlined />}
        {mutation.isPending && mutation.variables === 'like' ? <Spin size="small" /> : snippet.likes}
      </span>

      {/* dislike */}
      <span onClick={handleDislike} className="hover:cursor-pointer flex items-center gap-1">
        {snippet.userMark === 'dislike' ? <DislikeTwoTone twoToneColor="#ff4d4f" /> : <DislikeOutlined />}
        {mutation.isPending && mutation.variables === 'dislike' ? <Spin size="small" /> : snippet.dislikes}
      </span>
    </span>
  );
};
