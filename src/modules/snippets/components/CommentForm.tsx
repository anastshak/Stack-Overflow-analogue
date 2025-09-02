import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { addComment } from '../api/comment';
import { queryClient } from '@app/providers/queryClient';
import { SendOutlined } from '@ant-design/icons';

interface CommentFormProps {
  snippetId: string;
}

export const CommentForm = ({ snippetId }: CommentFormProps) => {
  const [value, setValue] = useState('');

  const mutation = useMutation({
    mutationFn: (content: string) => addComment(content, snippetId),
    onSuccess: () => {
      message.success('Comment added!');
      setValue('');
      queryClient.invalidateQueries({ queryKey: ['snippet', snippetId] });
    },
    onError: () => {
      message.error('Failed to add comment');
    },
  });

  const handleSubmit = () => {
    if (!value.trim()) {
      message.warning('Please write something first');
      return;
    }
    mutation.mutate(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="my-6 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-600 mb-3 font-medium">Add your comment</p>

      <Input.TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What are your thoughts?"
        autoSize={{ minRows: 3, maxRows: 5 }}
        className="rounded-xl border-gray-200 text-base"
        style={{ resize: 'vertical' }}
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">Ctrl + Enter to post</span>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={mutation.isPending}
          icon={<SendOutlined />}
          size="middle"
          className="min-w-[100px] h-10 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
          disabled={!value.trim()}
        >
          {mutation.isPending ? '' : 'Post'}
        </Button>
      </div>
    </div>
  );
};
