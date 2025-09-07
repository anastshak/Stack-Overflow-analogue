import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Form, Input, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { UpdateUserUsername } from '../types';
import { updateUsername } from '../api';
import axios from 'axios';
import { ChangeUsernameFormData, changeUsernameSchema } from '../helpers/validationChangeUsernameSchema';
import { queryClient } from '@app/providers/queryClient';
import { useAuthStore } from '@shared/store/authStore';
import { ControlledFormItem } from '@shared/ui/ControlledFormItem';

export const ChangeUsernameForm = () => {
  const { updateUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeUsernameFormData>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: UpdateUserUsername) => updateUsername(values.username),
    onSuccess: (responseData) => {
      message.success('Username updated!');
      reset();
      queryClient.invalidateQueries({ queryKey: ['user', responseData.id] });
      updateUser({ username: responseData.username });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || 'Changing username error');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('Failed to update username');
      }
    },
  });

  const onSubmit = (values: UpdateUserUsername) => {
    mutation.mutate(values);
  };

  return (
    <div className="m-3 max-w-lg flex-1">
      <Card title="Change your username" className="shadow-md">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <ControlledFormItem<ChangeUsernameFormData>
            label="New username"
            error={errors.username}
            name="username"
            control={control}
            render={(field) => <Input {...field} placeholder="Enter your new username" />}
          />

          <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
            Save changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};
