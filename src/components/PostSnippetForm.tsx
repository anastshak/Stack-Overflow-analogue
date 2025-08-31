import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Form, Input, Select, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { snippetSchema, SnippetFormData } from '../utils/validationSnippetSchema';
import { createSnippet, getLanguages } from '../api/snippets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../utils/queryClient';
import { Loader } from './Loader';

export const PostSnippetForm = () => {
  const navigate = useNavigate();

  const { data: languages, isLoading: isLoadingLanguages } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SnippetFormData>({
    resolver: zodResolver(snippetSchema),
    defaultValues: { language: '', code: '' },
  });

  const mutation = useMutation({
    mutationFn: (values: SnippetFormData) => createSnippet(values.language, values.code),
    onSuccess: (data) => {
      message.success('Snippet created!');
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      reset();
      navigate(`/posts/${data.id}`);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || 'Error creating snippet');
      } else {
        message.error('Failed to create snippet');
      }
    },
  });

  const onSubmit = (values: SnippetFormData) => {
    mutation.mutate(values);
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      {isLoadingLanguages ? (
        <Loader />
      ) : (
        <Card className="shadow-md">
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            {/* Language select */}
            <Form.Item
              label="Language of your snippet"
              validateStatus={errors.language ? 'error' : ''}
              help={errors.language?.message}
            >
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || undefined}
                    onChange={(value) => field.onChange(value || '')}
                    placeholder="Choose a programming language..."
                    options={languages?.map((lang) => ({ value: lang, label: <span>{lang}</span> }))}
                  />
                )}
              />
            </Form.Item>

            {/* Code input */}
            <Form.Item
              label="Code of your snippet"
              validateStatus={errors.code ? 'error' : ''}
              help={errors.code?.message}
            >
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    rows={10}
                    placeholder="Write your code here..."
                    style={{ fontFamily: 'monospace' }}
                  />
                )}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
              Create snippet
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
};
