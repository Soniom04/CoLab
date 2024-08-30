// src/redux/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProjects } from '../../api';// Replace with your actual API call

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await getAllProjects();
    return response.projects; // Assuming response.projects contains the projects array
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: false,
    error: null,
    reload: false,
  },
  reducers: {
    triggerReload: (state) => {
      state.reload = !state.reload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { triggerReload } = projectSlice.actions;

export default projectSlice.reducer;
