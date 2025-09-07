import { Button } from 'antd';
import { ChangePasswordForm } from '../components/ChangePasswordForm';
import { ChangeUsernameForm } from '../components/ChangeUsernameForm';
import { DeleteTwoTone, LogoutOutlined } from '@ant-design/icons';
import { useAuthActions } from '../hooks/useAuthActions';

export const AccountActions = () => {
  const { deleteMutation, logoutMutation } = useAuthActions();

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
