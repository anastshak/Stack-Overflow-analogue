import { api } from './api';
import { ApiUsersResponse } from '../types/api';
import { UserWithStatistic } from '../types/user';

export const getUsers = async (
  page: number,
  limit: number = 12,
  search: string = '',
): Promise<{ users: ApiUsersResponse['data']; meta: ApiUsersResponse['meta'] }> => {
  const response = await api.get('/users', { params: { page, limit, search } });
  const serverData = response.data.data;
  return { users: serverData.data, meta: serverData.meta };
};

export const getUserStatistic = async (id: string): Promise<UserWithStatistic> => {
  const response = await api.get(`/users/${id}/statistic`);
  return response.data.data;
};
