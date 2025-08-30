import { Button, message } from 'antd';
import { deleteAccount, logoutUser } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ChangeUsernameForm } from './ChangeUsernameForm';
import { DeleteTwoTone, LogoutOutlined } from '@ant-design/icons';

export const AccountActions = () => {
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

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-2.5 mb-4">
      <div className="flex flex-wrap justify-center mb-4">
        <ChangeUsernameForm />
        <ChangePasswordForm />
      </div>

      <div className="flex gap-4 justify-center">
        <Button color="danger" variant="solid" size="large" onClick={handleDelete} loading={deleteMutation.isPending}>
          <DeleteTwoTone twoToneColor={'white'} /> Delete Account
        </Button>
        <Button color="green" variant="solid" size="large" onClick={handleLogout} loading={logoutMutation.isPending}>
          <LogoutOutlined /> Exit
        </Button>
      </div>
    </div>
  );
};
