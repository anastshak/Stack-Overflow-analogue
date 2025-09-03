jest.mock('@shared/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

import { api } from '@shared/api/api';
import { registerUser } from '@modules/auth/api';
import { UserInfo } from '@shared/types';

const mockedApi = api as jest.Mocked<typeof api>;

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: UserInfo = {
    id: '1',
    username: 'testuser',
    role: 'user',
  };

  it('should register user successfully', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockUser },
    });

    const result = await registerUser('testuser', 'password123');

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/register', {
      username: 'testuser',
      password: 'password123',
    });
    expect(result).toEqual(mockUser);
    expect(result.id).toBe('1');
    expect(result.username).toBe('testuser');
    expect(result.role).toBe('user');
  });

  it('should handle registration failure', async () => {
    const error = new Error('Registration failed');
    mockedApi.post.mockRejectedValueOnce(error);

    await expect(registerUser('testuser', 'password123')).rejects.toThrow('Registration failed');
  });

  it('should return UserInfo type', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { data: mockUser },
    });

    const result = await registerUser('testuser', 'password123');

    expect(typeof result.id).toBe('string');
    expect(typeof result.username).toBe('string');
    expect(typeof result.role).toBe('string');
    expect(Object.keys(result)).toEqual(['id', 'username', 'role']);
  });
});
