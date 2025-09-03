jest.mock('@shared/api/api', () => ({
  api: {
    patch: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { updateUsername } from '@modules/account/api';
import { UpdatedUser } from '@modules/account/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('updateUsername', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: UpdatedUser = {
    id: '1',
    username: 'newusername',
    role: 'user',
    password: 'testpassword',
  };

  it('should update username successfully', async () => {
    mockedApi.patch.mockResolvedValueOnce({
      data: { data: mockUser },
    });

    const result = await updateUsername('newusername');

    expect(mockedApi.patch).toHaveBeenCalledTimes(1);
    expect(mockedApi.patch).toHaveBeenCalledWith('/me', { username: 'newusername' });
    expect(result).toEqual(mockUser);
    expect(result.username).toBe('newusername');
  });

  it('should handle update username failure', async () => {
    const error = new Error('Update failed');
    mockedApi.patch.mockRejectedValueOnce(error);

    await expect(updateUsername('newusername')).rejects.toThrow('Update failed');
  });
});
