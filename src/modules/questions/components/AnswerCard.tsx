import { Card, Tag } from 'antd';
import { UserOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Answer } from '../types';

interface AnswerCardProps {
  answer: Answer;
}

export const AnswerCard = ({ answer }: AnswerCardProps) => {
  return (
    <Card className="shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500 mb-1">
          <UserOutlined /> {answer.user.username}
        </div>
        {answer.isCorrect && (
          <Tag color="green" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}>
            Correct
          </Tag>
        )}
      </div>
      <p className="px-3 text-gray-800 max-h-32 overflow-y-auto whitespace-pre-line">{answer.content}</p>
    </Card>
  );
};
