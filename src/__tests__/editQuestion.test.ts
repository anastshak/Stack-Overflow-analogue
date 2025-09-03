jest.mock('@shared/api/api', () => ({
  api: {
    patch: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { editQuestion } from '@modules/questions/api';
import { Question, ApiModifyQuestion } from '@modules/questions/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('editQuestion', () => {
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

  const updateData: Partial<ApiModifyQuestion> = {
    title: 'Updated Title',
    description: 'Updated description',
  };

  it('should edit question', async () => {
    mockedApi.patch.mockResolvedValueOnce({
      data: { data: { ...mockQuestion, ...updateData } },
    });

    const result = await editQuestion('1', updateData);

    expect(mockedApi.patch).toHaveBeenCalledTimes(1);
    expect(mockedApi.patch).toHaveBeenCalledWith('/questions/1', updateData);
    expect(result.title).toBe('Updated Title');
    expect(result.description).toBe('Updated description');
  });

  it('should handle edit question failure', async () => {
    const error = new Error('Edit failed');
    mockedApi.patch.mockRejectedValueOnce(error);

    await expect(editQuestion('1', updateData)).rejects.toThrow('Edit failed');
  });
});
