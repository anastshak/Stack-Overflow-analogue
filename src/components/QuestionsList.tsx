import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../api/questions';
import { Spin, Alert, Empty, List } from 'antd';
import { QuestionCard } from '../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';

export const QuestionsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['questions', page],
    queryFn: () => getQuestions(page, 5),
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
        description={error instanceof Error ? error.message : 'Failed to load questions'}
        type="error"
        showIcon
      />
    );
  }

  if (!data?.questions || data.questions.length === 0) {
    return <Empty description="No questions found" />;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        current: page,
        pageSize: data?.meta.itemsPerPage || 5,
        total: data?.meta.totalItems,
        onChange: (p) => setSearchParams({ page: p.toString() }),
        showSizeChanger: false,
      }}
      dataSource={data?.questions || []}
      renderItem={(question) => <QuestionCard key={question.id} question={question} />}
    />
  );
};
