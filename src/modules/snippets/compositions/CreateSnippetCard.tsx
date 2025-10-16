import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card, message } from 'antd';

import { queryClient } from '@app/providers/queryClient';

import { createSnippet } from '../api/snippets';
import { PostSnippetForm } from '../components/PostSnippetForm';
import { SnippetFormData } from '../helpers/validationSnippetSchema';

export const CreateSnippetCard = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: SnippetFormData) => createSnippet(values),
    onSuccess: (data) => {
      message.success('Snippet created!');
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      navigate(`/posts/${data.id}`);
    },
    onError: () => {
      message.error('Failed to create snippet');
    },
  });

  return (
    <div className="max-w-3xl mx-auto my-8">
      <Card className="shadow-md">
        <PostSnippetForm mode="create" onSubmit={mutation.mutate} loading={mutation.isPending} />
      </Card>
    </div>
  );
};
