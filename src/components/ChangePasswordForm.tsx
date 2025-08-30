import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Form, Input, message } from 'antd';
import { ChangePasswordFormData, changePasswordSchema } from '../utils/validationChangePasswordSchema';
import { useMutation } from '@tanstack/react-query';
import { UpdateUserPassword } from '../types/user';
import { updatePassword } from '../api/auth';
import axios from 'axios';

export const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: UpdateUserPassword) => updatePassword(values.oldPassword, values.newPassword),
    onSuccess: () => {
      message.success('Password updated! Do not forget!!');
      reset();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || 'Changing password error');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('Failed to update password');
      }
    },
  });

  const onSubmit = (values: UpdateUserPassword) => {
    if (values.newPassword !== values.confirmPassword) {
      return message.error('Passwords do not match');
    }
    mutation.mutate(values);
  };

  return (
    <div className="m-3 max-w-lg flex-1">
      <Card title="Change your password" className="shadow-md">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* old psw */}
          <Form.Item
            label="Old password"
            validateStatus={errors.oldPassword ? 'error' : ''}
            help={errors.oldPassword?.message}
          >
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Enter your old password" />}
            />
          </Form.Item>

          {/* new psw */}
          <Form.Item
            label="New password"
            validateStatus={errors.newPassword ? 'error' : ''}
            help={errors.newPassword?.message}
          >
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Create a new password" />}
            />
          </Form.Item>

          {/* confirm psw */}
          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Repeat your password" />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Save changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};
