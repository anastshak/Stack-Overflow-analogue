import { Button, message } from 'antd';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../api/auth';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, clear } = useAuthStore();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      message.success('Goodbye...');
      clear();
      navigate('/');
    },
    onError: () => {
      message.error('Logout failed');
      clear();
      navigate('/');
    },
  });

  const logout = () => {
    mutation.mutate();
  };

  return (
    <header className="flex justify-between items-center bg-blue-600 px-6 py-4 text-white">
      <Logo isDisplay />
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <Button onClick={logout} loading={mutation.isPending}>
            Logout
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                navigate('/signup');
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
