import { Card, Avatar, Tag, Tooltip, Empty, Row, Col, Statistic } from 'antd';
import {
  CodeOutlined,
  CommentOutlined,
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  StarOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getUserStatistic } from '../api/users';
import { useQuery } from '@tanstack/react-query';
import { formatNumber } from '../utils/formatNumber';
import { Loader } from './Loader';
import { useAuthStore } from '../store/authStore';

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

      {/* Statistics Grid */}
      <Row gutter={[16, 16]} className="my-6">
        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Code Snippets"
            value={data.statistic.snippetsCount}
            prefix={<CodeOutlined />}
            valueStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
            className="text-center"
          />
        </Col>

        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Comments"
            value={data.statistic.commentsCount}
            prefix={<CommentOutlined />}
            valueStyle={{ color: '#fe5959', fontWeight: 'bold' }}
            className="text-center"
          />
        </Col>

        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Questions"
            value={data.statistic.questionsCount}
            prefix={<QuestionCircleOutlined />}
            valueStyle={{ color: '#8B5CF6', fontWeight: 'bold' }}
            className="text-center"
          />
        </Col>

        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Marks"
            value={data.statistic.likesCount + data.statistic.dislikesCount}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#14B8A6', fontWeight: 'bold' }}
            className="text-center"
          />
        </Col>
      </Row>

      {/* Detailed Statistics */}
      <div className="mb-6">
        <Card title="Detailed Statistics" className="shadow-md">
          <Row gutter={[16, 16]}>
            <Col xs={12} md={6}>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <LikeOutlined className="text-2xl mb-2" />
                <div className="text-2xl font-bold text-blue-700">{data.statistic.likesCount}</div>
                <div className="text-gray-600 text-sm">Likes Posted</div>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <DislikeOutlined className="text-2xl mb-2" />
                <div className="text-2xl font-bold text-red-700">{data.statistic.dislikesCount}</div>
                <div className="text-gray-600 text-sm">Dislikes Posted</div>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <MessageOutlined className="text-2xl mb-2" />
                <div className="text-2xl font-bold text-purple-700">{data.statistic.regularAnswersCount}</div>
                <div className="text-gray-600 text-sm">Answers Given</div>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <SafetyOutlined className="text-2xl mb-2" />
                <div className="text-2xl font-bold text-green-700">{data.statistic.correctAnswersCount}</div>
                <div className="text-gray-600 text-sm">Correct Answers Given</div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};
