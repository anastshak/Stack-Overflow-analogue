import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spin, Alert, Empty } from 'antd';
import { getPostById } from '../api/postByID';
import { PostCard } from '../components/PostCard';
import { CommentCard } from '../components/CommentCard';
import { CommentInfo } from '../types';

export const CommentCardsList = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id!),
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
      <PostCard snippet={data.snippet} />

      {data.comments.length > 0 ? (
        <>
          <h2 className="text-lg font-bold mt-6 mb-3">Comments</h2>
          <div className="flex flex-col gap-3">
            {data.comments.map((comment: CommentInfo) => (
              <CommentCard key={comment.id} comment={{ ...comment, ...{ username: data.snippet.creator } }} />
            ))}
          </div>
        </>
      ) : (
        <Empty className="mt-[10%]" description="No comments yet" />
      )}
    </div>
  );
};
