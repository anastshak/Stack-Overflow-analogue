jest.mock('@shared/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { loginUser } from '@modules/auth/api';
import { UserInfo } from '@shared/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: UserInfo = {
    id: '1',
    username: 'testuser',
    role: 'user',
  };

  it('should login user successfully', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockUser },
    });

    const result = await loginUser('testuser', 'password123');

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/auth/login', {
      username: 'testuser',
      password: 'password123',
    });
    expect(result).toEqual(mockUser);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('role');
  });

  it('should handle login failure', async () => {
    const error = new Error('Login failed');
    mockedApi.post.mockRejectedValueOnce(error);

    await expect(loginUser('testuser', 'wrongpassword')).rejects.toThrow('Login failed');
  });

  it('should return UserInfo type', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockUser },
    });

    const result = await loginUser('testuser', 'password123');

    expect(typeof result.id).toBe('string');
    expect(typeof result.username).toBe('string');
    expect(typeof result.role).toBe('string');
    expect(Object.keys(result)).toEqual(['id', 'username', 'role']);
  });
});
