jest.mock('@shared/api/api', () => ({
  api: {
    delete: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { deleteAccount } from '@modules/account/api';

const mockedApi = api as jest.Mocked<typeof api>;

describe('deleteAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete account successfully', async () => {
    mockedApi.delete.mockResolvedValueOnce({ data: {} });

    await expect(deleteAccount()).resolves.toBeUndefined();
    expect(mockedApi.delete).toHaveBeenCalledTimes(1);
    expect(mockedApi.delete).toHaveBeenCalledWith('/me');
  });

  it('should handle delete account failure', async () => {
    const error = new Error('Delete failed');
    mockedApi.delete.mockRejectedValueOnce(error);

    await expect(deleteAccount()).rejects.toThrow('Delete failed');
  });
});
