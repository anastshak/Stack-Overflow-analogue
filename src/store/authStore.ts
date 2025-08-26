import { create } from 'zustand';
import { UserInfo } from '../types/user';
import { queryClient } from '../utils/queryClient';

interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (user: UserInfo) => void;
  logout: () => void;
  restore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
    queryClient.invalidateQueries({ queryKey: ['snippets'] });
    queryClient.invalidateQueries({ queryKey: ['post'] });
  },

  restore: () => {
    const user = localStorage.getItem('user');
    if (user) {
      set({ user: JSON.parse(user), isAuthenticated: true });
    }
  },
}));
