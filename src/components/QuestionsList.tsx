import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../api/questions';
import { Empty, List } from 'antd';
import { QuestionCard } from '../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { ErrorMsg } from './Error';

export const QuestionsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['questions', page],
    queryFn: () => getQuestions(page, 5),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMsg msg="questions" errorObj={error} />;
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
