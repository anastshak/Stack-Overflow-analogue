import { SnippetCard } from '../components/SnippetCard';
import { useQuery } from '@tanstack/react-query';
import { getSnippetsByUserID } from '../api/snippets';
import { Empty, List } from 'antd';
import { SnippetModel } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '@shared/ui/Loader';
import { useAuthStore } from '@shared/store/authStore';

export const MySnippetsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { user } = useAuthStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['my-snippets', user?.id, page],
    queryFn: () => getSnippetsByUserID(user!.id, page, 5),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    throw error;
  }

  if (!data?.snippets || data.snippets.length === 0) {
    return <Empty className="mt-[10%]" description="You haven’t posted any snippets yet" />;
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
