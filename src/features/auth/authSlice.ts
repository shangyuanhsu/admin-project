import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

// Check localStorage for existing session
const loadState = (): AuthState => {
  try {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      };
    }
  } catch (err) {
    // Ignore errors
  }
  return {
    token: null,
    user: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      
      // Persist to localStorage
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
