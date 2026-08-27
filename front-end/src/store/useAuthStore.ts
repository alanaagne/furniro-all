import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('@furniro:user') || 'null'),
  token: localStorage.getItem('@furniro:token'),

  setAuth: (user, token) => {
    localStorage.setItem('@furniro:user', JSON.stringify(user));
    localStorage.setItem('@furniro:token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('@furniro:user');
    localStorage.removeItem('@furniro:token');
    set({ user: null, token: null });
  },
}));