import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { QuestionFormData, questionSchema } from '../utils/validationQuestionSchema';
import { DeleteTwoTone } from '@ant-design/icons';

interface QuestionFormProps {
  mode: 'create' | 'edit';
  initialValues?: QuestionFormData;
  onSubmit: (values: QuestionFormData) => void;
  loading?: boolean;
  deleteLoading?: boolean;
  handleDeleteQuestion?: () => void;
}

export const QuestionForm = ({
  mode,
  initialValues,
  onSubmit,
  loading,
  deleteLoading,
  handleDeleteQuestion,
}: QuestionFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      attachedCode: '',
    },
  });

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

      <div className="flex gap-1">
        <Button type="primary" htmlType="submit" loading={loading} block>
          {mode === 'create' ? 'Ask question' : 'Save changes'}
        </Button>
        {mode === 'edit' && (
          <Button color="danger" variant="solid" loading={deleteLoading} onClick={handleDeleteQuestion} block>
            <DeleteTwoTone twoToneColor={'white'} /> Delete question
          </Button>
        )}
      </div>
    </Form>
  );
};
