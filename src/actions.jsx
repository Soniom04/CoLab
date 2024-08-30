import { getSavedProjects, saveProject, unsaveProject } from './api'; // Assuming these API functions exist

export const FETCH_SAVED_PROJECTS = 'FETCH_SAVED_PROJECTS';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const UNSAVE_PROJECT = 'UNSAVE_PROJECT';

export const fetchSavedProjects = (userId) => async (dispatch) => {
  try {
    const response = await getSavedProjects(userId);
    if (response.success) {
      dispatch({
        type: FETCH_SAVED_PROJECTS,
        payload: response.data.map(project => project._id)
      });
    } else {
      console.error(response.error);
    }
  } catch (error) {
    console.error("Error fetching saved projects:", error);
  }
};

export const saveProjectAction = (userId, projectId) => async (dispatch) => {
  try {
    const response = await saveProject(userId, projectId);
    if (response.success) {
      dispatch({
        type: SAVE_PROJECT,
        payload: projectId
      });
      return true;
    } else {
      console.error(response.error);
      return false;
    }
  } catch (error) {
    console.error("Error saving project:", error);
    return false;
  }
};

export const unsaveProjectAction = (userId, projectId) => async (dispatch) => {
  try {
    const response = await unsaveProject(userId, projectId);
    if (response.success) {
      dispatch({
        type: UNSAVE_PROJECT,
        payload: projectId
      });
      return true;
    } else {
      console.error(response.error);
      return false;
    }
  } catch (error) {
    console.error("Error unsaving project:", error);
    return false;
  }
};