import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Empty, List, Pagination } from 'antd';

import { UserInfo } from '@shared/types';
import { Loader } from '@shared/ui/Loader';

import { getUsers } from '../api';
import { SearchBar } from '../components/SearchBar';
import { UserCard } from '../components/UserCard';

export const UsersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', page, search],
    queryFn: () => getUsers(page, 12, search),
  });

  const buildParams = (page: number, search = '') => ({
    page: String(page),
    ...(search ? { search } : {}),
  });

  const handleSearch = (value: string) => {
    setSearchParams(buildParams(1, value));
  };

  if (isError) {
    throw error;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <SearchBar initialValue={search} onSearch={handleSearch} loading={isLoading} />
        <Loader />
      </div>
    );
  }

  if (!data?.users?.length) {
    return (
      <div className="container mx-auto px-4 py-6">
        <SearchBar initialValue={search} onSearch={handleSearch} loading={isLoading} />
        <Empty description="No users found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBar initialValue={search} onSearch={handleSearch} loading={isLoading} />

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 6,
        }}
        dataSource={data.users}
        renderItem={(user: UserInfo) => (
          <List.Item key={user.id}>
            <UserCard user={user} />
          </List.Item>
        )}
      />

      {data.meta?.totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <Pagination
            current={page}
            total={data.meta.totalItems}
            pageSize={data.meta.itemsPerPage}
            onChange={(newPage) => setSearchParams(buildParams(newPage, search))}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};
