jest.mock('@shared/api/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { getQuestions } from '@modules/questions/api';
import { Question } from '@modules/questions/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('getQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockQuestion: Question = {
    id: '1',
    title: 'Test Question',
    description: 'Test description',
    attachedCode: 'console.log("test")',
    answers: [],
    user: { id: '1', username: 'testuser', role: 'user' },
    isResolved: false,
  };

  const mockApiResponse = {
    data: [mockQuestion],
    meta: {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 10,
      totalPages: 2,
    },
  };

  it('should fetch questions with pagination', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: { data: mockApiResponse },
    });

    const result = await getQuestions(1, 5);

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith('/questions?sortBy=id:DESC', {
      params: { page: 1, limit: 5 },
    });
    expect(result.questions).toEqual(mockApiResponse.data);
    expect(result.meta).toEqual(mockApiResponse.meta);
    expect(result.questions).toHaveLength(1);
  });

  it('should handle fetch questions failure', async () => {
    const error = new Error('Fetch failed');
    mockedApi.get.mockRejectedValueOnce(error);

    await expect(getQuestions(1, 5)).rejects.toThrow('Fetch failed');
  });

  it('should use default limit if not provided', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: { data: mockApiResponse },
    });

    await getQuestions(1);

    expect(mockedApi.get).toHaveBeenCalledWith('/questions?sortBy=id:DESC', {
      params: { page: 1, limit: 5 },
    });
  });
});
