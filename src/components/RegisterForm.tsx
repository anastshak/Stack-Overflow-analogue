import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form, Input, message, Spin } from 'antd';
import { registerSchema, RegisterFormData } from '../utils/validationRegisterSchema';
import { registerUser } from '../api/auth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: RegisterFormData) => registerUser(values.username, values.password),
    onSuccess: () => {
      message.success('Registration is successful! Log in to the system');
      navigate('/login');
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || 'Registration error');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('Unknown registration error');
      }
    },
  });

  if (mutation.status === 'pending') {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const onSubmit = (values: RegisterFormData) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex justify-center items-center mt-[10%]">
      <Card title="Sign Up" className="w-full max-w-md shadow-md">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* username */}
          <Form.Item label="Username" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter your name" />}
            />
          </Form.Item>

          {/* psw */}
          <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Create password" />}
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
            Create an account
          </Button>
        </Form>

        <div className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};
