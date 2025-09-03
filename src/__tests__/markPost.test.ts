jest.mock('@shared/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { markPost } from '@modules/snippets/api/mark';

const mockedApi = api as jest.Mocked<typeof api>;

describe('markPost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockResponse = {
    message: 'Mark added successfully',
    mark: { id: '1', type: 'like', user: { id: '1', username: 'testuser', role: 'user' } },
  };

  it('should like post successfully', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockResponse },
    });

    const result = await markPost('snippet-123', 'like');

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/snippets/snippet-123/mark', { mark: 'like' });
    expect(result).toEqual(mockResponse);
  });

  it('should dislike post successfully', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: { ...mockResponse, mark: { ...mockResponse.mark, type: 'dislike' } } },
    });

    const result = await markPost('snippet-123', 'dislike');

    expect(mockedApi.post).toHaveBeenCalledWith('/snippets/snippet-123/mark', { mark: 'dislike' });
    expect(result.mark.type).toBe('dislike');
  });

  it('should handle mark post failure', async () => {
    const error = new Error('Mark failed');
    mockedApi.post.mockRejectedValueOnce(error);

    await expect(markPost('snippet-123', 'like')).rejects.toThrow('Mark failed');
  });
});
