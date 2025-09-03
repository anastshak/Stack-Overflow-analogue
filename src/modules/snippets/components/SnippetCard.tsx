import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { CodeOutlined, CommentOutlined, EditTwoTone, UserOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SnippetModel } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { MarksSnap } from './Marks';
import { useAuthStore } from '@shared/store/authStore';
import { EditSnippetModal } from './EditSnippetModal';

interface SnippetCardProps {
  snippet: SnippetModel;
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const isOwner = user?.username === snippet.creator;

  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const hoverComments = location.pathname === '/' || location.pathname === '/mysnippets' ? 'hover:cursor-pointer' : '';

  const handleCommentsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/posts/${snippet.id}`);
  };

  const handleEditSnippet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="mb-4">
      <Card className={'shadow-md rounded-lg'}>
        <div className="flex justify-between items-center mb-2 text-gray-500">
          <div>
            <span className="font-medium mr-2.5">
              <UserOutlined /> {snippet.creator}
            </span>
            {isOwner && (
              <Button
                color="lime"
                variant="solid"
                size="small"
                onClick={handleEditSnippet}
                icon={<EditTwoTone twoToneColor="white" />}
                className="text-sm"
              >
                Edit
              </Button>
            )}
          </div>
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
          <span
            onClick={location.pathname === '/' || location.pathname === '/mysnippets' ? handleCommentsClick : undefined}
            className={hoverComments}
          >
            <CommentOutlined className="mr-1" /> {snippet.commentsCount}
          </span>
        </div>
      </Card>

      <EditSnippetModal open={modalOpen} onClose={handleModalClose} snippet={snippet} />
    </div>
  );
};
