jest.mock('@shared/api/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { getUserStatistic } from '@modules/users/api';
import { UserWithStatistic, UserStatistic } from '@modules/users/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('getUserStatistic', () => {
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

  it('should fetch user statistic by id', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: { data: mockUser },
    });

    const result = await getUserStatistic('1');

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith('/users/1/statistic');
    expect(result).toEqual(mockUser);
    expect(result.id).toBe('1');
    expect(result.username).toBe('testuser');
    expect(result.statistic.likesCount).toBe(15);
    expect(result.statistic.dislikesCount).toBe(2);
  });

  it('should handle fetch user statistic failure', async () => {
    const error = new Error('User not found');
    mockedApi.get.mockRejectedValueOnce(error);

    await expect(getUserStatistic('999')).rejects.toThrow('User not found');
  });
});
