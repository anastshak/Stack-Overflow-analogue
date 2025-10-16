jest.mock('@shared/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { createQuestion } from '@modules/questions/api';
import { Question, ApiModifyQuestion } from '@modules/questions/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('createQuestion', () => {
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

  const newQuestion: ApiModifyQuestion = {
    title: 'New Question',
    description: 'New description',
    attachedCode: 'console.log("new")',
  };

  it('should create new question', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockQuestion },
    });

    const result = await createQuestion(newQuestion);

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/questions', newQuestion);
    expect(result).toEqual(mockQuestion);
  });

  it('should handle create question failure', async () => {
    const error = new Error('Create failed');
    mockedApi.post.mockRejectedValueOnce(error);

    await expect(createQuestion(newQuestion)).rejects.toThrow('Create failed');
  });
});
