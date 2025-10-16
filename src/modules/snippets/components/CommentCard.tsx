import { UserOutlined } from '@ant-design/icons';

type CommentCardProps = {
  comment: {
    id: string;
    content: string;
    username: string;
  };
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="bg-white shadow rounded-md p-3 border border-gray-200">
      <div className="text-sm text-gray-500 mb-1">
        <UserOutlined /> {comment.username}
      </div>
      <p className="text-gray-800">{comment.content}</p>
    </div>
  );
};
