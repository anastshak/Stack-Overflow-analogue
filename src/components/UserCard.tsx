import { Card, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserInfo } from '../types/user';
import { useNavigate } from 'react-router-dom';

interface UserCardCompactProps {
  user: UserInfo;
}

export const UserCard = ({ user }: UserCardCompactProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <div className="flex items-center mx-3">
        <Avatar size={48} icon={<UserOutlined />} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-around mx-2">
            <h4 className="text-base font-medium truncate">{user.username}</h4>
            <Tag color={'blue'} className="capitalize">
              {user.role}
            </Tag>
          </div>
        </div>
      </div>
    </Card>
  );
};
