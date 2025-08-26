import { SnippetCard } from './SnippetCard';
import { useQuery } from '@tanstack/react-query';
import { getSnippets } from '../api/snippets';
import { Alert, Empty, List, Spin } from 'antd';
import { SnippetModel } from '../types/snippet';
import { useSearchParams } from 'react-router-dom';

export const SnippetsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['snippets', page],
    queryFn: () => getSnippets(page, 5),
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
        description={error instanceof Error ? error.message : 'Failed to load posts'}
        type="error"
        showIcon
      />
    );
  }

  if (!data?.snippets || data.snippets.length === 0) {
    return <Empty description="No posts found" />;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        current: page,
        pageSize: data?.meta.itemsPerPage || 5,
        total: data?.meta.totalItems || 0,
        onChange: (p) => setSearchParams({ page: p.toString() }),
        showSizeChanger: false,
      }}
      dataSource={data?.snippets || []}
      renderItem={(snippet: SnippetModel) => <SnippetCard key={snippet.id} snippet={snippet} />}
    />
  );
};
