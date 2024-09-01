import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';
import NoResult from './NoResult';
import { fetchSavedProjects } from '../actions';
import { fetchProjects } from '../redux/slices/CreateProjectSlice';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const ProjectList = ({ roles = [], tags = [], userId, showSavedProjects = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const projects = useSelector(state => state.projects.projects);
  const savedProjectIds = useSelector(state => state.savedProjects.savedProjects);
  const {user} = useContext(noteContext)
  const { error, reload } = useSelector(state => state.projects);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchProjects()).unwrap();
        if (userId) {
          await dispatch(fetchSavedProjects(userId)).unwrap();
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [dispatch, userId, reload]);
  
  const filterProjects = (projectsToFilter) => {
    if (!roles || !tags || !Array.isArray(roles) || !Array.isArray(tags)) {
      return projectsToFilter;
    }
    if (roles.length === 0 && tags.length === 0 && !userId) {
      return projectsToFilter;
    }
    return projectsToFilter.filter((project) => {
      const userNameMatch = userId ? project.userid._id === userId : false;
      const roleMatch = roles.length ? roles.some((role) => project.roles.includes(role)) : false;
      const tagMatch = tags.length ? tags.some((tag) => project.tags.includes(tag)) : false;
  
      return userNameMatch || roleMatch || tagMatch;
    });
  };
  
  const getProjectsToDisplay = () => {
    if (showSavedProjects) {
      return projects.filter(project => savedProjectIds.includes(project._id));
    }
    return projects;
  };
  
  if (loading) {
    return (
      <Spinner/>
    );
  }
  
  const projectsToDisplay = getProjectsToDisplay();
  const filteredProjects = filterProjects(projectsToDisplay);
  
  if (showSavedProjects && savedProjectIds.length === 0) {
    return (
      <div className='w-full mt-[12px] text-center'> 
        <p>You haven't saved any projects yet.</p>
        <button
          onClick={() => navigate('/projects')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Explore Projects to Save
        </button>
      </div>
    );
  }

  return (
    <>
      {filteredProjects && filteredProjects.length > 0 ? (
        <div className="mx-auto py-8 w-[80%] min-width-[900px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                isSaved={savedProjectIds.includes(project._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          {userId ? (
            <>
              <p className="text-gray-600 font-[500] text-lg mb-4 mt-40">
                {showSavedProjects
                  ? "You haven't saved any projects that match the current filters."
                  : "You haven't created any projects yet."}
              </p>
              <NavLink
                to={showSavedProjects ? "/projects" : "/new-project"}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {showSavedProjects ? "Explore Projects" : "Start a Project"}
              </NavLink>
            </>
          ) : (
            <NoResult />
          )}
        </div>
      )}
    </>
  );
};

export default ProjectList;