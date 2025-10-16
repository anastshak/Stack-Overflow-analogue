import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';

import { socket } from '@shared/api/socket';
import { useAuthStore } from '@shared/store/authStore';
import { Loader } from '@shared/ui/Loader';

import { getSnippetById } from '../api/snippets';
import { CommentCard } from '../components/CommentCard';
import { CommentForm } from '../components/CommentForm';
import { SnippetCard } from '../components/SnippetCard';
import { CommentInfo } from '../types';

export const SnippetCardDetails = () => {
  const { isAuthenticated } = useAuthStore();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['snippet', id],
    queryFn: () => getSnippetById(id!),
    enabled: !!id,
  });

  const [comments, setComments] = useState<CommentInfo[]>([]);

  useEffect(() => {
    if (data?.comments) {
      setComments(data.comments);
    }
  }, [data]);

  useEffect(() => {
    if (!id) return;

    socket.emit('joinPost', id);

    socket.on('comment:new', (newComment: CommentInfo) => {
      setComments((prev) => [...prev, newComment]);
    });

    return () => {
      socket.emit('leavePost', id);
      socket.off('comment:new');
    };
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    throw error;
  }

  if (!data) {
    return <Empty description="Post not found" />;
  }

  return (
    <div className="p-6">
      <SnippetCard snippet={data.snippet} />

      {comments.length > 0 ? (
        <>
          <h2 className="text-lg font-bold mt-6 mb-3">Comments</h2>
          <div className="flex flex-col gap-3">
            {comments.map((comment: CommentInfo) => (
              <CommentCard key={comment.id} comment={{ ...comment, ...{ username: comment.user.username } }} />
            ))}
          </div>
        </>
      ) : (
        <Empty className="my-[10%]" description="No comments yet" />
      )}

      {isAuthenticated && <CommentForm snippetId={id!} />}
    </div>
  );
};
