jest.mock('@shared/api/api', () => ({
  api: {
    patch: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { editSnippet } from '@modules/snippets/api/snippets';
import { ApiModifySnippet, SnippetModel } from '@modules/snippets/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('editSnippet', () => {
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

  const updateData: Partial<ApiModifySnippet> = {
    code: 'updated code',
    language: 'typescript',
  };

  it('should edit snippet', async () => {
    mockedApi.patch.mockResolvedValueOnce({
      data: { data: { ...mockSnippet, ...updateData } },
    });

    const result = await editSnippet('1', updateData);

    expect(mockedApi.patch).toHaveBeenCalledTimes(1);
    expect(mockedApi.patch).toHaveBeenCalledWith('/snippets/1', updateData);
    expect(result.code).toBe('updated code');
    expect(result.language).toBe('typescript');
  });

  it('should handle edit snippet failure', async () => {
    const error = new Error('Edit failed');
    mockedApi.patch.mockRejectedValueOnce(error);

    await expect(editSnippet('1', updateData)).rejects.toThrow('Edit failed');
  });
});
