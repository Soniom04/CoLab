// import axios from 'axios';

// const apiUrl = 'http://localhost:7000/api/colab'

// // const routes = {
// //   saveProject: '/users/save-project',
// //   getSavedProjects: (userid) => `/users/${userid}/saved-projects`,
// //   removeSavedProject: '/users/remove-saved-project', 
// //   createProject: '/project/create',
// //   getProjectsByUser: (userid) => `/projects/user/${userid}`,
// //   getAllProjects: '/projects/getallproject',
// //   searchProjects: '/projects/search',
// //   deleteProject: (projectId) => `/projects/${projectId}`,
// //   getProjectDetails: (projectId) => `/projects/${projectId}`,
// //   updateProject: (projectId) => `/projects/${projectId}`,
// //   applyToProject: (projectId) => `/projects/${projectId}/apply`,
// // };

// const routes = {
//   saveProject: '/users/save-project',
//   getSavedProjects: (userid) => `/users/${userid}/saved-projects`,
//   removeSavedProject: '/users/remove-saved-project', 
//   createProject: '/project/create',
//   getProjectsByUser: (userid) => `/projects/user/${userid}`,
//   getAllProjects: '/projects/getallproject',
//   searchProjects: '/projects/search',
//   deleteProject: (projectId) => `/projects/${projectId}`,
//   getProjectDetails: (projectId) => `/projects/${projectId}`,
//   updateProject: (projectId) => `/projects/${projectId}`,
//   applyToProject: (projectId) => `/projects/${projectId}/apply`,
// };

// export const saveProject = async (userid, projectId) => {
//   try {
//     const response = await axios.post(`${apiUrl}${routes.saveProject}`, {
//       userid,
//       projectId,
//     });

//     if (response.status === 200) {
//       return { success: true, message: response.data.message };
//     } else {
//       return { success: false, error: response.data.error };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while saving the project');
//   }
// };

// export const getSavedProjects = async (userid) => {
//   try {
//     const response = await axios.get(`${apiUrl}${routes.getSavedProjects(userid)}`);

//     if (response.status === 200) {
//       return { success: true, data: response.data };
//     } else {
//       return { success: false, error: 'Failed to fetch saved projects' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while fetching saved projects');
//   }
// };

// export const removeSavedProject = async (userid, projectId) => {
//   try {
//     const response = await axios.post(`${apiUrl}${routes.removeSavedProject}`, {
//       userid,
//       projectId,
//     });

//     if (response.status === 200) {
//       return { success: true, message: response.data.message };
//     } else {
//       return { success: false, error: 'Failed to remove saved project' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while removing the saved project');
//   }
// };

// export const createProject = async (projectData) => {
//   console.log("rgfberhgb")
//   try {
//     const { projectname, description, roles, tags, userid } = projectData;

//     if (!projectname || !description || !roles || !tags || !userid) {
//       return {
//         success: false,
//         error: 'All fields (projectname, description, roles, tags, userid) are required.',
//       };
//     }

//     const response = await axios.post(`${apiUrl}${routes.createProject}`, {
//       projectname,
//       description,
//       roles: Array.isArray(roles) ? roles : roles.split(','),
//       tags: Array.isArray(tags) ? tags : tags.split(','),
//       userid,
//     });

//     if (response.status === 201) {
//       return { success: true, project: response.data.project };
//     } else {
//       return { success: false, error: 'Failed to create project' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while creating the project');
//   }
// };

// export const getProjectsByUser = async (userid) => {
//   try {
//     if (!userid) {
//       return { success: false, error: 'userid is required.' };
//     }

//     const response = await axios.get(`${apiUrl}${routes.getProjectsByUser(userid)}`);

//     if (response.status === 200) {
//       return { success: true, projects: response.data.projects };
//     } else {
//       return { success: false, error: 'Failed to retrieve projects' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while retrieving projects');
//   }
// };

// export const getAllProjects = async () => {
//   try {
//     const response = await axios.get(`${apiUrl}${routes.getAllProjects}`);

//     if (response.status === 200) {
//       return { success: true, projects: response.data.projects };
//     } else {
//       return { success: false, error: 'Failed to fetch projects' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while fetching projects');
//   }
// };

// export const searchProjects = async (roles, tags) => {
//   try {
//     let queryParams = new URLSearchParams();

//     if (roles && roles.length > 0) {
//       queryParams.append('roles', roles.join(','));
//     }

//     if (tags && tags.length > 0) {
//       queryParams.append('tags', tags.join(','));
//     }

//     const url = `${apiUrl}${routes.searchProjects}?${queryParams.toString()}`;
//     const response = await axios.get(url);

//     if (response.status === 200) {
//       return { success: true, projects: response.data.projects };
//     } else {
//       return { success: false, error: 'Failed to search projects' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while searching projects');
//   }
// };

// export const deleteProject = async (projectid) => {
//   console.log(projectid)
//   try {
//     if (!projectid) {
//       console.log("aaya")
//       return { success: false, error: 'Project ID is required.' };
//     }

//     console.log(`${apiUrl}${routes.deleteProject(projectid)}`)
//     const response = await axios.delete(`${apiUrl}${routes.deleteProject(projectid)}`);
//     console.log(response)

//     if (response.status === 200) {
//       return { success: true, message: 'Project deleted successfully' };
//     } else {
//       return { success: false, error: 'Failed to delete project' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while deleting the project');
//   }
// };

// export const getProjectDetails = async (projectId) => {
//   try {
//     if (!projectId) {
//       return { success: false, error: 'Project ID is required.' };
//     }

//     const response = await axios.get(`${apiUrl}${routes.getProjectDetails(projectId)}`);

//     if (response.status === 200) {
//       return { success: true, project: response.data.project };
//     } else {
//       return { success: false, error: 'Failed to fetch project details' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while fetching project details');
//   }
// };

// export const updateProjectInfo = async (projectId, updatedInfo) => {
//   try {
//     if (!projectId) {
//       return { success: false, error: 'Project ID is required.' };
//     }

//     const response = await axios.put(`${apiUrl}${routes.updateProject(projectId)}`, updatedInfo);

//     if (response.status === 200) {
//       return { success: true, project: response.data.project };
//     } else {
//       return { success: false, error: 'Failed to update project' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while updating project information');
//   }
// };

// export const applyToProject = async (projectId, introductionMessage, file) => {
//   try {
//     if (!projectId) {
//       return { success: false, error: 'Project ID is required.' };
//     }

//     if (!introductionMessage) {
//       return {
//         success: false,
//         error: 'Introduction message is required.',
//       };
//     }

//     const formData = new FormData();
//     formData.append('introductionMessage', introductionMessage);
//     formData.append('file', file);

//     const response = await axios.post(`${apiUrl}${routes.applyToProject(projectId)}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (response.status === 200) {
//       return { success: true, message: 'Application submitted successfully' };
//     } else {
//       return { success: false, error: 'Failed to submit application' };
//     }
//   } catch (error) {
//     return handleError(error, 'An error occurred while submitting the application');
//   }
// };

// // Helper function to handle errors
// const handleError = (error, defaultMessage) => {
//   if (error.response) {
//     return { success: false, error: error.response.data.error || defaultMessage };
//   } else if (error.request) {
//     return { success: false, error: 'No response received from the server' };
//   } else {
//     return { success: false, error: 'Error setting up the request' };
//   }
// };

import axios from 'axios';
import { useContext } from 'react';
import noteContext from "./context/notes/NoteContext"

const apiUrl = 'https://colab1.onrender.com/api/colab';

const routes = {
  saveProject: '/users/save-project',
  getSavedProjects: (userid) => `/users/${userid}/saved-projects`,
  unsaveProject: '/users/remove-saved-project',
  createProject: '/project/create',
  getProjectsByUser: (userid) => `/projects/user/${userid}`,
  getAllProjects: '/projects/getallproject',
  deleteProject: (projectId) => `/projects/${projectId}`,
  getProjectDetails: (projectId) => `/projects/${projectId}`,
  updateProject: (projectId) => `/projects/${projectId}`,
  applyToProject: `/apply`,
  getProfile:(userid) =>`/profile/user/${userid}`
};

// Helper function to handle errors
const handleError = (error, defaultMessage) => {
  if (error.response) {
    return { success: false, error: error.response.data.error || defaultMessage };
  } else if (error.request) {
    return { success: false, error: 'No response received from the server' };
  } else {
    return { success: false, error: 'Error setting up the request' };
  }
};

// Save a project
export const saveProject = async (userid, projectId) => {
  try {
    const response = await axios.post(`${apiUrl}${routes.saveProject}`, {
      userid,
      projectid: projectId,
    });

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, error: response.data.error };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred while saving the project' };
  }
};

export const unsaveProject = async (userid, projectId) => {
  try {
    console.log("hrgbheb")
    const response = await axios.post(`${apiUrl}${routes.unsaveProject}`, {
      userid,
      projectid: projectId,
    });

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, error: response.data.error };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred while unsaving the project' };
  }
};

// Get saved projects
export const getSavedProjects = async (userid) => {
  try {
    const response = await axios.get(`${apiUrl}${routes.getSavedProjects(userid)}`);
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: 'Failed to fetch saved projects' };
    }
  } catch (error) {
    return handleError(error, 'An error occurred while fetching saved projects');
  }
};

// Create a project
export const createProject = async (projectData) => {
  console.log(projectData)
  try {
    const { projectname, description, roles, tags, userid } = projectData;

    if (!projectname || !description || !roles.length || !tags.length || !userid) {
      return {
        success: false,
        error: 'All fields (projectname, description, roles, tags, userid) are required.',
      };
    }

    const response = await axios.post(`${apiUrl}${routes.createProject}`, {
      projectname,
      description,
      roles,
      tags,
      userid,
    });


    if (response.status === 201) {
      return { success: true, project: response.data.project };
    } else {
      return { success: false, error: 'Failed to create project' };
    }
  } catch (error) {
    console.error("Error while creating project:", error);
    return { success: false, error: 'An error occurred while creating the project.' };
  }
};

// Get projects by user
export const getProjectsByUser = async (userid) => {
  console.log("yha se aaya")
  try {
    if (!userid) {
      return { success: false, error: 'userid is required.' };
    }

    const response = await axios.get(`${apiUrl}${routes.getProjectsByUser(userid)}`);

    if (response.status === 200) {
      return { success: true, projects: response.data.projects };
    } else {
      return { success: false, error: 'Failed to retrieve projects' };
    }
  } catch (error) {
    return handleError(error, 'An error occurred while retrieving projects');
  }
};

// Get all projects
export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${apiUrl}${routes.getAllProjects}`);
    if (response.status === 200) {
      return { success: true, projects: response.data.projects };
    } else {
      return { success: false, error: 'Failed to fetch projects' };
    }
  } catch (error) {
    return handleError(error, 'An error occurred while fetching projects');
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    if (!projectId) {
      return { success: false, error: 'Project ID is required.' };
    }

    const response = await axios.delete(`${apiUrl}${routes.deleteProject(projectId)}`);

    if (response.status === 200) {
      return { success: true, message: 'Project deleted successfully' };
    } else {
      return { success: false, error: 'Failed to delete project' };
    }
  } catch (error) {
    return handleError(error, 'An error occurred while deleting the project');
  }
};

// Get project details
export const getProjectDetails = async (projectId) => {
  console.log(projectId)
  try {
    if (!projectId) {
      return { success: false, error: 'Project ID is required.' };
    }

    const response = await axios.get(`${apiUrl}${routes.getProjectDetails(projectId)}`);

    if (response.status === 200) {
      return { success: true, project: response.data.project };
    } else {
      return { success: false, error: 'Failed to fetch project details' };
    }
  } catch (error) {
    return handleError(error, 'An error occurred while fetching project details');
  }
};

// Update project info
export const updateProjectInfo = async (projectId, updatedInfo) => {
  try {
    if (!projectId) {
      return { success: false, error: 'Project ID is required.' };
    }

    const response = await axios.put(`${apiUrl}${routes.updateProject(projectId)}`, updatedInfo);

    if (response.status === 200) {
      return { success: true, project: response.data.project };
    } else {
      return { success: false, error: 'Failed to update project' };
    }
  } catch (error) {
    return handleError(error, 'An error occurred while updating project information');
  }
};

// Apply to project
export const applyToProject = async (projectid, introductionMessage, file,userid) => {
  try {
    if (!projectid) {
      return { success: false, error: 'Project ID is required.' };
    }
    
    if (!introductionMessage) {
      return {
        success: false,
        error: 'Introduction message is required.',
      };
    }

    const formData = new FormData();
    formData.append('projectid',projectid)
    formData.append('introductionMessage', introductionMessage);
    formData.append('userid',userid)
    if (file) {
      formData.append('resume', file);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const response = await axios.post(`${apiUrl}${routes.applyToProject}`, formData);
    console.log(response)
    if (response.status === 201) {
      return { success: true, message: 'Application submitted successfully' };
    } else {
      return { success: false, error: 'Failed to submit application' };
    }
  } catch (error) {
    return handleError(error, 'An error occurred while submitting the application');
  }
};

export const fetchProfileDetails = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}${routes.getProfile(userId)}`);

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.error || 'Failed to fetch profile details' };
    }
  } catch (error) {
    console.error('Error fetching profile details:', error);
    return { success: false, error: 'An error occurred while fetching profile details' };
  }
};