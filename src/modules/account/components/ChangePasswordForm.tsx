import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input, message } from 'antd';
import axios from 'axios';

import { ControlledFormItem } from '@shared/ui/ControlledFormItem';

import { updatePassword } from '../api';
import { ChangePasswordFormData, changePasswordSchema } from '../helpers/validationChangePasswordSchema';
import { UpdateUserPassword } from '../types';

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
      } else {
        message.error(err instanceof Error ? err.message : 'Failed to update password');
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
          <ControlledFormItem<ChangePasswordFormData>
            label="Old password"
            error={errors.oldPassword}
            name="oldPassword"
            control={control}
            render={(field) => <Input.Password {...field} placeholder="Enter your old password" />}
          />

          {/* new psw */}
          <ControlledFormItem<ChangePasswordFormData>
            label="New password"
            error={errors.newPassword}
            name="newPassword"
            control={control}
            render={(field) => <Input.Password {...field} placeholder="Create a new password" />}
          />

          {/* confirm psw */}
          <ControlledFormItem<ChangePasswordFormData>
            label="Confirm password"
            error={errors.confirmPassword}
            name="confirmPassword"
            control={control}
            render={(field) => <Input.Password {...field} placeholder="Repeat your password" />}
          />

          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Save changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};
