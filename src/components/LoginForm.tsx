import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form, Input, message } from 'antd';
import { loginSchema, LoginFormData } from '../utils/validationLoginSchema';
import { loginUser } from '../api/auth';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

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

  const onSubmit = async (values: LoginFormData) => {
    try {
      const data = await loginUser(values.username, values.password);
      useAuthStore.getState().login(data);

      message.success(`Welcome, ${data.username}`);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || 'Login error');
      } else if (err instanceof Error) {
        message.error(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-[10%]">
      <Card title="Login" className="w-full max-w-md shadow-md">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Username */}
          <Form.Item label="Username" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter your name" />}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Enter your password" />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Continue
          </Button>
        </Form>

        <div className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};
