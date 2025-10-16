jest.mock('@shared/api/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

jest.mock('@modules/snippets/helpers/mapSnippet', () => ({
  mapSnippet: jest.fn(),
}));

import { api } from '@shared/api/api';
import { getSnippets } from '@modules/snippets/api/snippets';
import { Snippet, SnippetModel } from '@modules/snippets/types';
import { mapSnippet } from '@modules/snippets/helpers/mapSnippet';

const mockedApi = api as jest.Mocked<typeof api>;
const mockedMapSnippet = mapSnippet as jest.MockedFunction<typeof mapSnippet>;

describe('getSnippets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSnippet: Snippet = {
    id: '1',
    code: 'console.log("test")',
    language: 'javascript',
    user: { id: '1', username: 'testuser', role: 'user' },
    comments: [],
    marks: [],
  };

  const mockMappedSnippet: SnippetModel = {
    id: '1',
    code: 'console.log("test")',
    language: 'javascript',
    creator: 'testuser',
    likes: 0,
    dislikes: 0,
    commentsCount: 0,
  };

  const mockApiResponse = {
    data: [mockMappedSnippet],
    meta: {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 10,
      totalPages: 2,
    },
  };

  it('should fetch snippets with pagination and mapping', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        data: {
          data: [mockSnippet],
          meta: mockApiResponse.meta,
        },
      },
    });

    mockedMapSnippet.mockReturnValue(mockMappedSnippet);

    const result = await getSnippets(1, 5);

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith('/snippets', {
      params: { page: 1, limit: 5 },
    });
    expect(mockedMapSnippet).toHaveBeenCalledTimes(1);
    expect(result.snippets).toEqual([mockMappedSnippet]);
    expect(result.meta).toEqual(mockApiResponse.meta);
  });

  it('should use default limit if not provided', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        data: {
          data: [mockSnippet],
          meta: mockApiResponse.meta,
        },
      },
    });

    mockedMapSnippet.mockReturnValue(mockMappedSnippet);

    await getSnippets(1);

    expect(mockedApi.get).toHaveBeenCalledWith('/snippets', {
      params: { page: 1, limit: 5 },
    });
  });

  it('should handle fetch snippets failure', async () => {
    const error = new Error('Fetch failed');
    mockedApi.get.mockRejectedValueOnce(error);

    await expect(getSnippets(1, 5)).rejects.toThrow('Fetch failed');
  });
});
