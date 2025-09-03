jest.mock('@shared/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { createSnippet } from '@modules/snippets/api/snippets';
import { ApiModifySnippet, SnippetModel } from '@modules/snippets/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('createSnippet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSnippet: SnippetModel = {
    id: '1',
    code: 'console.log("test")',
    language: 'Test Language',
    creator: 'Test Creator',
    likes: 0,
    dislikes: 0,
    commentsCount: 0,
  };

  const newSnippet: ApiModifySnippet = {
    language: 'New Language',
    code: 'console.log("new")',
  };

  it('should create new snippet', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockSnippet },
    });

    const result = await createSnippet(newSnippet);

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/snippets', newSnippet);
    expect(result).toEqual(mockSnippet);
  });

  it('should handle create question failure', async () => {
    const error = new Error('Create failed');
    mockedApi.post.mockRejectedValueOnce(error);

    await expect(createSnippet(newSnippet)).rejects.toThrow('Create failed');
  });
});
