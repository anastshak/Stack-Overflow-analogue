jest.mock('@shared/api/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { getQuestionById } from '@modules/questions/api';
import { Question } from '@modules/questions/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('getQuestionById', () => {
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

  it('should fetch question by id', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: { data: mockQuestion },
    });

    const result = await getQuestionById('1');

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith('/questions/1');
    expect(result).toEqual(mockQuestion);
    expect(result.id).toBe('1');
    expect(result.title).toBe('Test Question');
  });

  it('should handle fetch question failure', async () => {
    const error = new Error('Question not found');
    mockedApi.get.mockRejectedValueOnce(error);

    await expect(getQuestionById('999')).rejects.toThrow('Question not found');
  });
});
