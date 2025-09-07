import { api } from '@shared/api/api';
import { API_ENDPOINTS } from '@shared/constants/endpoints';

import { ApiUsersResponse, UserWithStatistic } from '../types';

export const getUsers = async (
  page: number,
  limit: number = 12,
  search: string = '',
): Promise<{ users: ApiUsersResponse['data']; meta: ApiUsersResponse['meta'] }> => {
  const response = await api.get(API_ENDPOINTS.USERS.BASE, { params: { page, limit, search }, withCredentials: false });
  const serverData = response?.data?.data;
  return { users: serverData.data, meta: serverData.meta };
};

export const getUserStatistic = async (id: string): Promise<UserWithStatistic> => {
  const response = await api.get(API_ENDPOINTS.USERS.BY_ID_STATISTIC(id), { withCredentials: false });
  const serverData = response?.data?.data;
  return serverData;
};
