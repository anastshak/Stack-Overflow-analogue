import { useQuery } from '@tanstack/react-query';
import { Spin, Empty, Pagination, Alert, List } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { UserCard } from './UserCard';
import { UserSearch } from './SearchBar';
import { UserInfo } from '../types/user';
import { getUsers } from '../api/users';

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
    return (
      <Alert
        message="Error"
        description={error instanceof Error ? error.message : 'Failed to load users'}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <UserSearch initialValue={search} onSearch={handleSearch} loading={isLoading} />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : data?.users?.length ? (
        <>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
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
        </>
      ) : (
        <Empty description="No users found" />
      )}
    </div>
  );
};
