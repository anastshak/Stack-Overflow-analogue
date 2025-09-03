jest.mock('@shared/api/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { getUsers } from '@modules/users/api';
import { UserWithStatistic, UserStatistic } from '@modules/users/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('getUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserStatistic: UserStatistic = {
    snippetsCount: 5,
    rating: 10,
    commentsCount: 3,
    likesCount: 15,
    dislikesCount: 2,
    questionsCount: 0,
    correctAnswersCount: 0,
    regularAnswersCount: 0,
  };

  const mockUser: UserWithStatistic = {
    id: '1',
    username: 'testuser',
    role: 'user',
    statistic: mockUserStatistic,
  };

  const mockApiResponse = {
    data: [mockUser],
    meta: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 1,
      totalPages: 1,
    },
  };

  it('should fetch users with statistics successfully', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: { data: mockApiResponse },
    });

    const result = await getUsers(1, 10);

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith('/users', {
      params: { page: 1, limit: 10, search: '' },
    });
    expect(result.users).toEqual(mockApiResponse.data);
    expect(result.meta).toEqual(mockApiResponse.meta);
    expect(result.users[0].statistic.snippetsCount).toBe(5);
    expect(result.users[0].statistic.rating).toBe(10);
  });

  it('should handle fetch users failure', async () => {
    const error = new Error('Fetch failed');
    mockedApi.get.mockRejectedValueOnce(error);

    await expect(getUsers(1, 10)).rejects.toThrow('Fetch failed');
  });

  it('should use default limit if not provided', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: { data: mockApiResponse },
    });

    await getUsers(1);

    expect(mockedApi.get).toHaveBeenCalledWith('/users', {
      params: { page: 1, limit: 12, search: '' },
    });
  });
});
