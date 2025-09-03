jest.mock('@shared/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { logoutUser } from '@shared/api/logout';

describe('logoutUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make POST request to logout endpoint', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    await logoutUser();

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('/auth/logout');
  });

  it('should resolve on successful logout', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    await expect(logoutUser()).resolves.toBeUndefined();
  });

  it('should reject when API call fails', async () => {
    const error = new Error('Network error');
    (api.post as jest.Mock).mockRejectedValueOnce(error);

    await expect(logoutUser()).rejects.toThrow('Network error');
  });
});
