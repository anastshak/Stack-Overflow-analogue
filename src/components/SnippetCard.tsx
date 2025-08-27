import React from 'react';
import { Card } from 'antd';
import { CodeOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SnippetModel } from '../types/snippet';
import { useLocation, useNavigate } from 'react-router-dom';
import { MarksSnap } from './Marks';

interface SnippetCardProps {
  snippet: SnippetModel;
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const navigate = useNavigate();

  const location = useLocation();
  const hoverComments = location.pathname === '/' ? 'hover:cursor-pointer' : '';

  const handleCommentsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/posts/${snippet.id}`);
  };

  return (
    <div className="mb-4">
      <Card className={'shadow-md rounded-lg'}>
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
          {/* marks */}
          <MarksSnap snippet={snippet} />
          {/* comments */}
          <span onClick={location.pathname === '/' ? handleCommentsClick : undefined} className={hoverComments}>
            <CommentOutlined className="mr-1" /> {snippet.commentsCount}
          </span>
        </div>
      </Card>
    </div>
  );
};
