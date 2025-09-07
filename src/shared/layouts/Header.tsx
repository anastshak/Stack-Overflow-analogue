import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, message } from 'antd';

import { AskQuestionModal } from '@modules/questions';

import { logoutUser } from '../api/logout';
import { useAuthStore } from '../store/authStore';
import { Logo } from '../ui/Logo';

export const Header = () => {
  const { isAuthenticated, clear } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);

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

  const handleAskQuestionClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/questions');
  };

  return (
    <header className="flex justify-between items-center bg-blue-600 px-6 py-4 text-white">
      <Logo isDisplay />
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            {location.pathname === '/questions' && <Button onClick={handleAskQuestionClick}>Ask question</Button>}
            <Button onClick={logout} loading={mutation.isPending}>
              Logout
            </Button>
          </>
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

      <AskQuestionModal open={modalOpen} onClose={handleModalClose} />
    </header>
  );
};
