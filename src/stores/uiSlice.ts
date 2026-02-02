import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  isSidebarOpen: true, // Default to open
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
