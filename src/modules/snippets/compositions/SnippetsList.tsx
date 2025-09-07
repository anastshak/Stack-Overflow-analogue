import { SnippetCard } from '../components/SnippetCard';
import { useQuery } from '@tanstack/react-query';
import { getSnippets } from '../api/snippets';
import { Empty, List } from 'antd';
import { SnippetModel } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '@shared/ui/Loader';

export const SnippetsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['snippets', page],
    queryFn: () => getSnippets(page, 5),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    throw error;
  }

  if (!data?.snippets || data.snippets.length === 0) {
    return <Empty description="No posts found" />;
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        current: page,
        pageSize: data?.meta.itemsPerPage || 5,
        total: data?.meta.totalItems || 0,
        onChange: handlePageChange,
        showSizeChanger: false,
      }}
      dataSource={data?.snippets || []}
      renderItem={(snippet: SnippetModel) => <SnippetCard key={snippet.id} snippet={snippet} />}
    />
  );
};
