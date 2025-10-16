jest.mock('@shared/api/api', () => ({
  api: {
    patch: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { updatePassword } from '@modules/account/api';

const mockedApi = api as jest.Mocked<typeof api>;

describe('updatePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockResponse = { message: 'Password updated successfully' };

  it('should update password successfully', async () => {
    mockedApi.patch.mockResolvedValueOnce({
      data: { data: mockResponse },
    });

    const result = await updatePassword('oldpass', 'newpass');

    expect(mockedApi.patch).toHaveBeenCalledTimes(1);
    expect(mockedApi.patch).toHaveBeenCalledWith('/me/password', {
      oldPassword: 'oldpass',
      newPassword: 'newpass',
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle update password failure', async () => {
    const error = new Error('Password update failed');
    mockedApi.patch.mockRejectedValueOnce(error);

    await expect(updatePassword('oldpass', 'newpass')).rejects.toThrow('Password update failed');
  });
});
