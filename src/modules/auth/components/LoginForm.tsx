import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input, message } from 'antd';
import axios from 'axios';

import { useAuthStore } from '@shared/store/authStore';
import { ControlledFormItem } from '@shared/ui/ControlledFormItem';
import { Loader } from '@shared/ui/Loader';

import { loginUser } from '../api';
import { LoginFormData, loginSchema } from '../helpers/validationLoginSchema';

export const LoginForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginFormData) => loginUser(values.username, values.password),
    onSuccess: (data) => {
      useAuthStore.getState().login(data);
      message.success(`Welcome, ${data.username}`);
      navigate('/');
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || 'Login error');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('Unknown login error');
      }
    },
  });

  if (mutation.status === 'pending') {
    return <Loader />;
  }

  const onSubmit = (values: LoginFormData) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex justify-center items-center mt-[10%]">
      <Card title="Login" className="w-full max-w-md shadow-md">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Username */}
          <ControlledFormItem<LoginFormData>
            label="Username"
            error={errors.username}
            name="username"
            control={control}
            render={(field) => <Input {...field} placeholder="Enter your name" />}
          />

          {/* Password */}
          <ControlledFormItem<LoginFormData>
            label="Password"
            error={errors.password}
            name="password"
            control={control}
            render={(field) => <Input.Password {...field} placeholder="Enter your password" />}
          />

          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Continue
          </Button>
        </Form>

        <div className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};
