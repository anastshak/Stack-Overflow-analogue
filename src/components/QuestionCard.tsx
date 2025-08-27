import { Card, Avatar } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Question } from '../types/question';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface QuestionCardProps {
  question: Question;
  isFullVersion?: boolean;
}

export const QuestionCard = ({ question, isFullVersion = false }: QuestionCardProps) => {
  const navigate = useNavigate();

  const handleQuestionClick = () => {
    navigate(`/questions/${question.id}`);
  };

  const customStyle = {
    borderRadius: '6px',
    margin: '0',
  };

  return (
    <div className={cn({ 'm-4 px-[15%]': !isFullVersion })}>
      <Card
        className={cn('shadow-sm', { 'hover:shadow-md cursor-pointer': !isFullVersion })}
        onClick={!isFullVersion ? handleQuestionClick : undefined}
      >
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

        {/* description */}
        <div className="my-4">
          {isFullVersion && <h5 className="text-gray-600">description</h5>}
          <p
            className={cn('bg-gray-50 rounded-md line-clamp-3 py-1 px-2 whitespace-pre-line', {
              'max-h-32 overflow-y-auto py-3.5 px-3.5 line-clamp-none': isFullVersion,
            })}
          >
            {question.description}
          </p>
        </div>

        {/* code snippet */}
        {isFullVersion && (
          <div className="my-4">
            <h5 className="text-gray-600">code snippet</h5>
            <SyntaxHighlighter style={duotoneDark} customStyle={customStyle}>
              {question.attachedCode}
            </SyntaxHighlighter>
          </div>
        )}
      </Card>
    </div>
  );
};
