import { useForm } from 'react-hook-form';
import { DeleteTwoTone } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';

import { ControlledFormItem } from '@shared/ui/ControlledFormItem';

import { QuestionFormData, questionSchema } from '../helpers/validationQuestionSchema';

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
      <ControlledFormItem<QuestionFormData>
        label="Question title"
        error={errors.title}
        name="title"
        control={control}
        render={(field) => <Input {...field} placeholder="Question title" />}
      />

      <ControlledFormItem<QuestionFormData>
        label="Question description"
        error={errors.description}
        name="description"
        control={control}
        render={(field) => <Input.TextArea {...field} rows={3} placeholder="Question description" />}
      />

      <ControlledFormItem<QuestionFormData>
        label="Attached Code:"
        error={errors.attachedCode}
        name="attachedCode"
        control={control}
        render={(field) => <Input.TextArea {...field} rows={6} placeholder="Code snippet" />}
      />

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
