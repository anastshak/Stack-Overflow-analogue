import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { snippetSchema, SnippetFormData } from '../helpers/validationSnippetSchema';
import { getLanguages } from '../api/snippets';
import { Loader } from '@shared/ui/Loader';
import { DeleteTwoTone } from '@ant-design/icons';

interface PostSnippetFormProps {
  mode: 'create' | 'edit';
  initialValues?: SnippetFormData;
  onSubmit: (values: SnippetFormData) => void;
  loading?: boolean;
  deleteLoading?: boolean;
  handleDeleteQuestion?: () => void;
}

export const PostSnippetForm = ({
  mode,
  initialValues,
  onSubmit,
  loading,
  deleteLoading,
  handleDeleteQuestion,
}: PostSnippetFormProps) => {
  const { data: languages, isLoading: isLoadingLanguages } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SnippetFormData>({
    resolver: zodResolver(snippetSchema),
    defaultValues: initialValues || { language: '', code: '' },
  });

  return (
    <>
      {isLoadingLanguages ? (
        <Loader />
      ) : (
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

          <div className="flex gap-1">
            <Button type="primary" htmlType="submit" loading={loading} block>
              {mode === 'create' ? 'Create snippet' : 'Save changes'}
            </Button>
            {mode === 'edit' && (
              <Button color="danger" variant="solid" loading={deleteLoading} onClick={handleDeleteQuestion} block>
                <DeleteTwoTone twoToneColor={'white'} /> Delete snippet
              </Button>
            )}
          </div>
        </Form>
      )}
    </>
  );
};
