import {
  CheckCircleOutlined,
  CodeOutlined,
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

import { UserStatistic } from '../types';

interface UserStatisticsProps {
  stats: UserStatistic;
}

export const UserStatistics = ({ stats }: UserStatisticsProps) => {
  return (
    <>
      {/* Statistics Grid */}
      <Row gutter={[16, 16]} className="my-6">
        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Code Snippets"
            value={stats.snippetsCount}
            prefix={<CodeOutlined />}
            valueStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
            className="text-center"
          />
        </Col>

        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Comments"
            value={stats.commentsCount}
            prefix={<CommentOutlined />}
            valueStyle={{ color: '#fe5959', fontWeight: 'bold' }}
            className="text-center"
          />
        </Col>

        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Questions"
            value={stats.questionsCount}
            prefix={<QuestionCircleOutlined />}
            valueStyle={{ color: '#8B5CF6', fontWeight: 'bold' }}
            className="text-center"
          />
        </Col>

        <Col xs={12} sm={12} lg={6}>
          <Statistic
            title="Marks"
            value={stats.likesCount + stats.dislikesCount}
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
                <div className="text-2xl font-bold text-blue-700">{stats.likesCount}</div>
                <div className="text-gray-600 text-sm">Likes Posted</div>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <DislikeOutlined className="text-2xl mb-2" />
                <div className="text-2xl font-bold text-red-700">{stats.dislikesCount}</div>
                <div className="text-gray-600 text-sm">Dislikes Posted</div>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <MessageOutlined className="text-2xl mb-2" />
                <div className="text-2xl font-bold text-purple-700">{stats.regularAnswersCount}</div>
                <div className="text-gray-600 text-sm">Answers Given</div>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <SafetyOutlined className="text-2xl mb-2" />
                <div className="text-2xl font-bold text-green-700">{stats.correctAnswersCount}</div>
                <div className="text-gray-600 text-sm">Correct Answers Given</div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};
