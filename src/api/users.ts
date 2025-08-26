import axios from 'axios';
import { ApiUsersResponse } from '../types/api';
import { UserWithStatistic } from '../types/user';

export const getUsers = async (
  page: number,
  limit: number = 12,
  search: string = '',
): Promise<{ users: ApiUsersResponse['data']; meta: ApiUsersResponse['meta'] }> => {
  const response = await axios.get(`/api/users`, { params: { page, limit, search } });
  const serverData = response.data.data;

  return { users: serverData.data, meta: serverData.meta };
};

export const getUserStatistic = async (id: string): Promise<UserWithStatistic> => {
  const response = await axios.get(`/api/users/${id}/statistic`);
  const userData = response.data.data;

  return userData;
};
