import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spin, Alert, Empty } from 'antd';
import { getSnippetById } from '../api/snippets';
import { SnippetCard } from './SnippetCard';
import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';
import { CommentInfo } from '../types/snippet';
import { useAuthStore } from '../store/authStore';

export const SnippetCardDetails = () => {
  const { isAuthenticated } = useAuthStore();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['snippet', id],
    queryFn: () => getSnippetById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description={error instanceof Error ? error.message : 'Failed to load post'}
        type="error"
        showIcon
      />
    );
  }

  if (!data) {
    return <Empty description="Post not found" />;
  }

  return (
    <div className="p-6">
      <SnippetCard snippet={data.snippet} />

      {data.comments.length > 0 ? (
        <>
          <h2 className="text-lg font-bold mt-6 mb-3">Comments</h2>
          <div className="flex flex-col gap-3">
            {data.comments.map((comment: CommentInfo) => (
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
