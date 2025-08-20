import { Card } from 'antd';
import { CodeOutlined, CommentOutlined, DislikeOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SnippetModel } from '../types';

export const PostCard = ({ snippet }: { snippet: SnippetModel }) => {
  return (
    <div className="mb-4">
      <Card className="shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-2 text-gray-500">
          <span className="font-medium">
            <UserOutlined /> {snippet.creator}
          </span>
          <span className="text-sm">
            <CodeOutlined className="mr-1" />
            {snippet.language}
          </span>
        </div>

        <SyntaxHighlighter language={snippet.language} style={duotoneDark}>
          {snippet.code}
        </SyntaxHighlighter>

        <div className="flex justify-between mt-3 text-base text-gray-600">
          <span>
            <LikeOutlined /> {snippet.likes} | <DislikeOutlined /> {snippet.dislikes}
          </span>
          <span>
            <CommentOutlined className="mr-1" /> {snippet.commentsCount}
          </span>
        </div>
      </Card>
    </div>
  );
};
