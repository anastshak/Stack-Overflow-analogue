jest.mock('@shared/api/api', () => ({
  api: {
    delete: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { deleteQuestion } from '@modules/questions/api';

const mockedApi = api as jest.Mocked<typeof api>;

describe('deleteQuestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete question', async () => {
    mockedApi.delete.mockResolvedValueOnce({
      data: { data: { message: 'Question deleted' } },
    });

    const result = await deleteQuestion('1');

    expect(mockedApi.delete).toHaveBeenCalledTimes(1);
    expect(mockedApi.delete).toHaveBeenCalledWith('/questions/1');
    expect(result).toEqual({ message: 'Question deleted' });
  });

  it('should handle delete question failure', async () => {
    const error = new Error('Delete failed');
    mockedApi.delete.mockRejectedValueOnce(error);

    await expect(deleteQuestion('1')).rejects.toThrow('Delete failed');
  });
});
