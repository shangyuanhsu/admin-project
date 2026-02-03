import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  // Default to open only on larger screens (>= 1024px)
  isSidebarOpen: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
  },
});

export const { toggleSidebar, closeSidebar, openSidebar } = uiSlice.actions;
export default uiSlice.reducer;
