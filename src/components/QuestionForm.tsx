import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, message } from 'antd';
import { createQuestion } from '../api/questions';
import { queryClient } from '../utils/queryClient';
import { QuestionFormData, questionSchema } from '../utils/validationQuestionSchema';
import { useMutation } from '@tanstack/react-query';
import { Loader } from './Loader';

interface QuestionFormProps {
  onSuccess?: () => void;
}

export const QuestionForm = ({ onSuccess }: QuestionFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: '',
      description: '',
      attachedCode: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: QuestionFormData) => createQuestion(values.title, values.description, values.attachedCode),
    onSuccess: () => {
      message.success('Question posted successfully');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      reset();
      if (onSuccess) onSuccess();
    },
    onError: () => {
      message.error('Failed to post question');
    },
  });

  if (mutation.status === 'pending') {
    return <Loader />;
  }

  const onSubmit = async (values: QuestionFormData) => {
    mutation.mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Question title" validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Question title" />}
        />
      </Form.Item>

      <Form.Item
        label="Question description"
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} rows={3} placeholder="Question description" />}
        />
      </Form.Item>

      <Form.Item
        label="Attached Code:"
        validateStatus={errors.attachedCode ? 'error' : ''}
        help={errors.attachedCode?.message}
      >
        <Controller
          name="attachedCode"
          control={control}
          render={({ field }) => <Input.TextArea {...field} rows={6} placeholder="Code snippet" />}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isSubmitting} block>
        Ask question
      </Button>
    </Form>
  );
};
