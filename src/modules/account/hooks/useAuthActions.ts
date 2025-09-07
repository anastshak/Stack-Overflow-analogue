import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

import { logoutUser } from '@shared/api/logout';
import { useAuthStore } from '@shared/store/authStore';

import { deleteAccount } from '../api';

export const useAuthActions = () => {
  const { clear } = useAuthStore();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      message.success('Account deleted');
      clear();
      navigate('/');
    },
    onError: () => {
      message.error('Failed to delete account');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      message.success('Goodbye...');
      clear();
      navigate('/');
    },
    onError: () => {
      message.error('Logout failed');
    },
  });

  return {
    deleteMutation,
    logoutMutation,
  };
};
