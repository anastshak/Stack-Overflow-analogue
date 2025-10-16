import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Tag } from 'antd';

import { UserInfo } from '@shared/types';

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
      <div className="flex flex-col xl:flex-row items-center gap-3 mx-3">
        <Avatar size={48} icon={<UserOutlined className="flex-shrink-0" />} />

        <div className="flex-1 min-w-0 max-w-[200px]">
          <div className="flex flex-col gap-1 items-center xl:items-start justify-around mx-2">
            <h4 className="text-base font-medium truncate w-full">{user.username}</h4>
            <Tag color={'blue'} className="capitalize text-xs m-0">
              {user.role}
            </Tag>
          </div>
        </div>
      </div>
    </Card>
  );
};
