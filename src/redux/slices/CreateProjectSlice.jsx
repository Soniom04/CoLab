import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProjects } from '../../api'; // Replace with your actual API call

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProjects();
      return response.projects; // Assuming response.projects contains the projects array
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { triggerReload } = projectSlice.actions;

export default projectSlice.reducer;