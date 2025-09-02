import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';
import { getSnippetById } from '../api/snippets';
import { SnippetCard } from '../components/SnippetCard';
import { CommentCard } from '../components/CommentCard';
import { CommentForm } from '../components/CommentForm';
import { CommentInfo } from '../types';
import { useAuthStore } from '@shared/store/authStore';
import { Loader } from '@shared/ui/Loader';

export const SnippetCardDetails = () => {
  const { isAuthenticated } = useAuthStore();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['snippet', id],
    queryFn: () => getSnippetById(id!),
    enabled: !!id,
  });

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
