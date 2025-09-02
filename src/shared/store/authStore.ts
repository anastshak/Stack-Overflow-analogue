import { create } from 'zustand';
import { UserInfo } from '../types';
import { queryClient } from '@app/providers/queryClient';

interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (user: UserInfo) => void;
  clear: () => void;
  restore: () => void;
  updateUser: (updates: Partial<UserInfo>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  clear: () => {
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

  updateUser: (updates) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  },
}));
