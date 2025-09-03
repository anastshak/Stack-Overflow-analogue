jest.mock('@shared/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { addComment } from '@modules/snippets/api/comment';
import { CommentInfo } from '@modules/snippets/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('addComment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockComment: CommentInfo = {
    id: 'comment-1',
    content: 'Test comment content',
    user: { id: '1', username: 'testuser', role: 'user' },
  };

  it('should add comment successfully', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockComment },
    });

    const result = await addComment('Great snippet!', 'snippet-123');

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/comments', {
      content: 'Great snippet!',
      snippetId: 'snippet-123',
    });
    expect(result).toEqual(mockComment);
    expect(result.id).toBe('comment-1');
    expect(result.content).toBe('Test comment content');
    expect(result.user.username).toBe('testuser');
  });

  it('should handle empty content', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: { ...mockComment, content: '' } },
    });

    const result = await addComment('', 'snippet-123');
    expect(result.content).toBe('');
  });

  it('should handle add comment failure', async () => {
    const error = new Error('Comment failed');
    mockedApi.post.mockRejectedValueOnce(error);

    await expect(addComment('test content', 'snippet-123')).rejects.toThrow('Comment failed');
  });
});
