import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getQuestionById } from '../api/questions';
import { Spin, Alert, Empty } from 'antd';
import { QuestionCard } from '../components/QuestionCard';
import { AnswerCard } from '../components/AnswerCard';

export const QuestionCardDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description={error instanceof Error ? error.message : 'Failed to load question'}
        type="error"
        showIcon
      />
    );
  }

  if (!data) {
    return <Empty description="Question not found" />;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <QuestionCard question={data} isFullVersion={true} />

      {data.answers.length > 0 ? (
        <div>
          <h2 className="text-lg font-bold mt-6 mb-3 pl-1">Answers</h2>
          <div className="flex flex-col gap-3">
            {data.answers.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
        </div>
      ) : (
        <Empty className="my-[10%]" description="No answers yet" />
      )}
    </div>
  );
};
