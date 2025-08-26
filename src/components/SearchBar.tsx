import { Input } from 'antd';
import type { GetProps } from 'antd';

export type SearchProps = GetProps<typeof Input.Search>;

interface UserSearchProps {
  initialValue?: string;
  onSearch: (value: string) => void;
  loading?: boolean;
}

const { Search } = Input;

export const UserSearch = ({ initialValue = '', onSearch, loading = false }: UserSearchProps) => {
  return (
    <div className="flex justify-center mb-6">
      <Search
        placeholder="Search users..."
        defaultValue={initialValue}
        onSearch={onSearch}
        enterButton="Search"
        size="large"
        allowClear
        loading={loading}
        style={{ maxWidth: 400, width: '100%' }}
      />
    </div>
  );
};
