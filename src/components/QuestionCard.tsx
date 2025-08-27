import { Card, Avatar } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Question } from '../types/question';
import { useNavigate } from 'react-router-dom';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="m-4 px-[15%]">
      <Card className="hover:shadow-md cursor-pointer shadow-sm" onClick={() => navigate(`/questions/${question.id}`)}>
        <div className="flex items-center gap-4">
          <Avatar size={48} icon={<QuestionCircleOutlined />} />
          <div className="flex-1 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{question.title}</h3>
              <p className="text-xs text-gray-500">asked by user: {question.user.username}</p>
            </div>
            <span className="text-2xl">
              {question.isResolved ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <ClockCircleTwoTone />}
            </span>
          </div>
        </div>

        <p className="bg-gray-50 rounded-md line-clamp-3 py-1 px-2 my-4">{question.description}</p>
      </Card>
    </div>
  );
};
