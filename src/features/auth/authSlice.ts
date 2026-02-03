import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  menus: MenuItem[];
  isAuthenticated: boolean;
}

// Check localStorage for existing session
const loadState = (): AuthState => {
  try {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    const menus = localStorage.getItem('auth_menus');
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
        menus: menus ? JSON.parse(menus) : [],
        isAuthenticated: true,
      };
    }
  } catch (err) {
    // Ignore errors
  }
  return {
    token: null,
    user: null,
    menus: [],
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User; menus: MenuItem[] }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.menus = action.payload.menus;
      state.isAuthenticated = true;
      
      // Persist to localStorage
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      localStorage.setItem('auth_menus', JSON.stringify(action.payload.menus));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.menus = [];
      state.isAuthenticated = false;
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_menus');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
