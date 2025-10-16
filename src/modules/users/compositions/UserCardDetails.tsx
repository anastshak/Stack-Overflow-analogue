import { useParams } from 'react-router-dom';
import { CodeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Empty, Tag, Tooltip } from 'antd';

import { formatNumber } from '@shared/helpers/formatNumber';
import { useAuthStore } from '@shared/store/authStore';
import { Loader } from '@shared/ui/Loader';

import { getUserStatistic } from '../api';
import { UserStatistics } from '../components/UserStatistics';

interface UserCardDetailsProps {
  isMyAccount?: boolean;
}

export const UserCardDetails = ({ isMyAccount = false }: UserCardDetailsProps) => {
  const { user } = useAuthStore();
  const params = useParams();
  const id = isMyAccount ? user?.id : params.id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserStatistic(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    throw error;
  }

  if (!data) {
    return <Empty description="User not found" className="pt-16" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <Card className="shadow-lg">
        <div className="flex gap-8 flex-col lg:flex-row justify-center items-center mx-4 sm:my-0 sm:mx-6">
          <Avatar size={96} icon={<UserOutlined />} className="shadow-xl flex-shrink-0" />

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col lg:flex-row items-start sm:items-center gap-3">
              <Tooltip title={data.username}>
                <h1 className="text-2xl font-bold cursor-help truncate min-w-0 max-w-[250px]">{data.username}</h1>
              </Tooltip>
              <Tag color={'blue'} icon={<UserOutlined />} className="capitalize flex-shrink-0">
                {data.role}
              </Tag>
            </div>

            <p className="text-gray-500 text-sm text-center lg:text-left my-3">User ID: {data.id}</p>
          </div>

          {/* rating + snippets count */}
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start sm:pl-7">
            <Tooltip title="Community Rating">
              <div className="flex items-center text-gray-700 font-semibold space-x-1 bg-yellow-200 px-4 py-2 rounded-full shadow-sm">
                <StarOutlined />
                <span>{formatNumber(data.statistic.rating)}</span>
                <span>Rating</span>
              </div>
            </Tooltip>

            <Tooltip title="Code Snippets Count">
              <div className="flex items-center text-gray-700 font-semibold space-x-1 bg-blue-300 px-4 py-2 rounded-full shadow-sm">
                <CodeOutlined />
                <span>{data.statistic.snippetsCount}</span>
                <span>Snippets</span>
              </div>
            </Tooltip>
          </div>
        </div>
      </Card>

      {/* Detailed Statistics */}
      <UserStatistics stats={data.statistic} />
    </div>
  );
};
