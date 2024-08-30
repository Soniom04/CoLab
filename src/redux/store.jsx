// src/store.jsx

import { configureStore } from '@reduxjs/toolkit';
import savedProjectsReducer from './slices/SaveProjectSlice'
import projectReducer from '../redux/slices/CreateProjectSlice';

const store = configureStore({
  reducer: {
    savedProjects: savedProjectsReducer,
    projects: projectReducer,
  },
});

export default store;