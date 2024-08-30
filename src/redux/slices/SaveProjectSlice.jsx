import { FETCH_SAVED_PROJECTS, SAVE_PROJECT, UNSAVE_PROJECT } from '../../actions';

const initialState = {
  savedProjects: []
};

const savedProjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SAVED_PROJECTS:
      return {
        ...state,
        savedProjects: action.payload
      };
    case SAVE_PROJECT:
      return {
        ...state,
        savedProjects: [...state.savedProjects, action.payload]
      };
    case UNSAVE_PROJECT:
      return {
        ...state,
        savedProjects: state.savedProjects.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};

export default savedProjectsReducer;