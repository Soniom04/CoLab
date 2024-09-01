//Puri Styling bachhi hui hai ->done
//media queries add krna hai ->done
//days ago ka issue ->done
//save waala feature
// data through redux
//saved icon change krna agar woh array mai hai toh
//comments
//toaster
//isme khudke ke cards ke liye edit and delete ka option bhi aana chahiye jo new_project ke page par saare prev information ke saath fill hona chhaiye

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { IoBookmarkOutline, IoPersonSharp } from 'react-icons/io5';
// import { MdPeople } from 'react-icons/md';
// import { saveProject, unsaveProject } from '../redux/slices/SaveProjectSlice';
// import { toast } from 'react-toastify';
// import { NavLink } from 'react-router-dom';

// const roleTagUrls = {
//     'Frontend Developer': 'https://react.dev/',
//     'Backend Developer': 'https://nodejs.dev/',
//     'Full Stack Developer': 'https://www.codecademy.com/learn/paths/full-stack-engineer-career-path',
//     'DevOps Engineer': 'https://aws.amazon.com/devops/',
//     'Database Administrator (DBA)': 'https://www.oracle.com/database/',
//     'Software Architect': 'https://martinfowler.com/architecture/',
//     'Mobile App Developer': 'https://developer.android.com/',
//     'Cloud Engineer': 'https://azure.microsoft.com/en-us/',
//     'Data Engineer': 'https://cloud.google.com/learn/what-is-a-data-engineer',
//     'Machine Learning Engineer': 'https://www.coursera.org/articles/machine-learning-engineer',
//     'Site Reliability Engineer (SRE)': 'https://sre.google/sre-book/table-of-contents/',
//     'Quality Assurance (QA) Engineer': 'https://www.guru99.com/software-testing.html',
//     'Security Engineer': 'https://www.cybrary.it/',
//     'Product Manager': 'https://www.productschool.com/',
//     'UX/UI Designer': 'https://www.adobe.com/creativecloud/design/discover/ux-design.html',
//     'Systems Analyst': 'https://www.ibm.com/services/business/systems-analyst',
//     'Release Engineer': 'https://www.atlassian.com/software/jira/release-management',
//     'Embedded Systems Developer': 'https://www.embedded.com/',
//     'Game Developer': 'https://learn.unity.com/',
//     'API Developer': 'https://swagger.io/resources/articles/what-is-an-api/',
//     'Web Development': 'https://developer.mozilla.org/en-US/docs/Learn',
//     'Mobile Development': 'https://developer.apple.com/',
//     'Machine Learning': 'https://www.tensorflow.org/',
//     'Data Science': 'https://www.datascience.com/',
//     'Cloud Computing': 'https://cloud.google.com/',
//     'Artificial Intelligence': 'https://www.ibm.com/cloud/learn/what-is-artificial-intelligence',
//     'Cybersecurity': 'https://www.cisa.gov/',
//     'Internet of Things (IoT)': 'https://www.iotforall.com/',
//     'DevOps': 'https://www.redhat.com/en/topics/devops',
//     'API Development': 'https://www.postman.com/api-platform/api-development/',
//     'Blockchain': 'https://www.ibm.com/blockchain',
//     'Game Development': 'https://www.gamedev.net/',
//     'Automation': 'https://www.uipath.com/',
//     'Augmented Reality (AR)': 'https://developers.google.com/ar',
//     'Virtual Reality (VR)': 'https://www.oculus.com/',
//     'Big Data': 'https://hadoop.apache.org/',
//     'Frontend Development': 'https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer',
//     'Backend Development': 'https://developer.mozilla.org/en-US/docs/Learn/Server-side',
//     'Database Management': 'https://www.oracle.com/database/',
//     'UI/UX Design': 'https://www.interaction-design.org/'
//   };

// const ProjectCard = ({ project }) => {
//     const dispatch = useDispatch();
//     const savedproject._id = useSelector((state) => state.saveProject.savedproject._id);
//     const projectDate = new Date(project.Date);
//     const now = new Date();
//     const isToday = projectDate.toDateString() === now.toDateString();
//     const daysAgo = Math.floor((now - projectDate) / (1000 * 60 * 60 * 24));

//     const handleBookmarkClick = () => {
//         if (savedproject._id === project._id) {
//             dispatch(unsaveProject());
//             toast.error("Project unsaved!");
//         } else {
//             dispatch(saveProject(project._id));
//             toast.success("Project saved!");
//         }
//     };

//     const handleLinkClick = (url) => {
//         window.open(url, '_blank');
//     };

//     return (
//         <div className='flex flex-col p-1 space-y-1 rounded-lg border bg-white'>
//             <div className='relative'>
//                 <div className='flex space-x-2 items-center text-left'>

//                 <NavLink to={`/users/${username}`}>
//                     <img className="h-12 w-12 rounded-full" loading='lazy' src={imageUrl} alt='User'/>
//                 </NavLink>

//                     <div className='flex flex-col justify-center'>
//                     <NavLink to={`/users/${username}`}>
//                     <p className='text-sm hover:underline hover:text-blue-600 transition-all duration-200'>{username}</p>
//                     </NavLink>

//                         {(isToday || daysAgo === 0) ? (<div>Today</div>) : (
//                             <div className='text-sm'>{daysAgo} {daysAgo === 1 ? 'Day' : 'Days'} Ago</div>
//                         )}
//                     </div>
//                     <button
//                         onClick={handleBookmarkClick}
//                         className={`absolute top-3 right-3 text-lg border-2 p-1 ${savedproject._id === project._id ? 'text-blue-600' : ''}`}
//                     >
//                         <IoBookmarkOutline />
//                     </button>
//                 </div>
//             </div>
//             <div className='flex flex-col bg-gray-100 p-3 h-full'>
//                 <NavLink  to={`/description/${project.projectname.replaceAll(' ','-')}`} className='text-lg font-semibold hover:underline transition-all duration-200'>{project.projectname}</NavLink>
//                 <div className='flex space-x-2 items-center flex-wrap'>
//                     {project.roles.length === 1 ? <IoPersonSharp /> : <MdPeople />}
//                     {project.roles.map((role, index) => (
//                         <span
//                             key={index}
//                             onClick={() => handleLinkClick(roleTagUrls[role] || `https://en.wikipedia.org/wiki/${role.replace(/\s+/g, '_')}`)}
//                         >
//                             {role}
//                             {index < project.roles.length - 1 && ', '}
//                         </span>
//                     ))}
//                 </div>
//                 <div className='flex flex-wrap gap-2 mt-2'>
//                     {project.tags.map((tag, index) => (
//                         <span
//                             className="bg-gray-600 text-white px-2 py-1 rounded-md cursor-pointer hover:underline"
//                             key={index}
//                             onClick={() => handleLinkClick(roleTagUrls[tag] || `https://en.wikipedia.org/wiki/${tag.replace(/\s+/g, '_')}`)}
//                         >
//                             {tag}
//                         </span>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectCard;

import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSavedProjects, saveProjectAction, unsaveProjectAction } from '../actions';
import { IoBookmarkOutline, IoPersonSharp } from 'react-icons/io5';
import { MdPeople } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../api';
import ConfirmationModal from './ConfirmModal';
import { triggerReload } from '../redux/slices/CreateProjectSlice';
import { saveProject, unsaveProject, getSavedProjects, getProjectDetails } from '../api';
import { FaBookmark } from "react-icons/fa";
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const roleTagUrls = {
    'Frontend Developer': 'https://react.dev/',
    'Backend Developer': 'https://nodejs.dev/',
    'Full Stack Developer': 'https://www.codecademy.com/learn/paths/full-stack-engineer-career-path',
    'DevOps Engineer': 'https://aws.amazon.com/devops/',
    'Database Administrator (DBA)': 'https://www.oracle.com/database/',
    'Software Architect': 'https://martinfowler.com/architecture/',
    'Mobile App Developer': 'https://developer.android.com/',
    'Cloud Engineer': 'https://azure.microsoft.com/en-us/',
    'Data Engineer': 'https://cloud.google.com/learn/what-is-a-data-engineer',
    'Machine Learning Engineer': 'https://www.coursera.org/articles/machine-learning-engineer',
    'Site Reliability Engineer (SRE)': 'https://sre.google/sre-book/table-of-contents/',
    'Quality Assurance (QA) Engineer': 'https://www.guru99.com/software-testing.html',
    'Security Engineer': 'https://www.cybrary.it/',
    'Product Manager': 'https://www.productschool.com/',
    'UX/UI Designer': 'https://www.adobe.com/creativecloud/design/discover/ux-design.html',
    'Systems Analyst': 'https://www.ibm.com/services/business/systems-analyst',
    'Release Engineer': 'https://www.atlassian.com/software/jira/release-management',
    'Embedded Systems Developer': 'https://www.embedded.com/',
    'Game Developer': 'https://learn.unity.com/',
    'API Developer': 'https://swagger.io/resources/articles/what-is-an-api/',
    'Web Development': 'https://developer.mozilla.org/en-US/docs/Learn',
    'Mobile Development': 'https://developer.apple.com/',
    'Machine Learning': 'https://www.tensorflow.org/',
    'Data Science': 'https://www.datascience.com/',
    'Cloud Computing': 'https://cloud.google.com/',
    'Artificial Intelligence': 'https://www.ibm.com/cloud/learn/what-is-artificial-intelligence',
    'Cybersecurity': 'https://www.cisa.gov/',
    'Internet of Things (IoT)': 'https://www.iotforall.com/',
    'DevOps': 'https://www.redhat.com/en/topics/devops',
    'API Development': 'https://www.postman.com/api-platform/api-development/',
    'Blockchain': 'https://www.ibm.com/blockchain',
    'Game Development': 'https://www.gamedev.net/',
    'Automation': 'https://www.uipath.com/',
    'Augmented Reality (AR)': 'https://developers.google.com/ar',
    'Virtual Reality (VR)': 'https://www.oculus.com/',
    'Big Data': 'https://hadoop.apache.org/',
    'Frontend Development': 'https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer',
    'Backend Development': 'https://developer.mozilla.org/en-US/docs/Learn/Server-side',
    'Database Management': 'https://www.oracle.com/database/',
    'UI/UX Design': 'https://www.interaction-design.org/'
  };

  const ProjectCard = ({ project }) => {
    console.log(project)
    const { user } = useContext(noteContext);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const username = project?.userid?.username || 'Unknown User'; // Fallback to 'Unknown 
    const imageUrl = project?.userid?.imageUrl || 'defaultImageUrl'; 
    const projectDate = new Date(project.createdAt);
    const now = new Date();
    const isToday = projectDate.toDateString() === now.toDateString();
    const daysAgo = Math.floor((now - projectDate) / (1000 * 60 * 60 * 24));
    
    const savedProjects = useSelector(state => state.savedProjects.savedProjects);
    const isProjectSaved = savedProjects.includes(project._id);
  
    const handleBookmark = async () => {
      try {
        if (isProjectSaved) {
          const success = dispatch(unsaveProjectAction(user.userid, project._id));
          if (success) {
            toast.success("Removed from Saved Projects");
          } else {
            toast.error("Failed to remove from saved projects.");
          }
        } else {
          const success = dispatch(saveProjectAction(user.userid, project._id));
          if (success) {
            toast.success("Added to saved projects");
          } else {
            toast.error("Failed to add to saved projects.");
          }
        }
      } catch (error) {
        toast.error("An unexpected error occurred while handling the bookmark.");
      }
    };
  
    const handleEditClick = async (projectId) => {
      try {
        const projectDetails = await getProjectDetails(project._id);
        if (projectDetails) {
          navigate('/new-project', {
            state: {
              isEditing: true,
              projectId: projectId
            }
          });
        } else {
          toast.error("Failed to fetch project details.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching project details.");
      }
    };
  
    const handleDeleteClick = () => {
      setIsDeleteModalOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      try {
        setLoading(true);
        const result = await deleteProject(project._id);
        if (result.success) {
          toast.success("Project deleted successfully");
          dispatch(triggerReload()); // Dispatch the triggerReload action
          navigate('/projects');
        } else {
          toast.error(result.error || "Failed to delete project");
        }
      } catch (error) {
        toast.error("An unexpected error occurred while deleting the project");
      } finally {
        setLoading(false);
        setIsDeleteModalOpen(false);
      }
    };

    const handleLinkClick = (url) => {
      window.open(url, '_blank');
  };
      
    return (
        <div className='flex flex-col p-1 space-y-1 rounded-lg border bg-white'>
            <div className='relative'>
                <div className='flex space-x-2 items-center text-left p-1'>

                <NavLink to={`/profile/${project.hostid}`}>
                    <img className="h-10 w-10 rounded-full" loading='lazy' src={imageUrl} alt='User'/>
                </NavLink>

                    <div className='flex flex-col justify-center'>
                    <NavLink to={`/profile/${project.hostid}`}>
                    <p className='text-sm hover:underline hover:text-blue-600 transition-all duration-200'>{username}</p>
                    </NavLink>

                        {(isToday || daysAgo === 0) ? (<div>Today</div>) : (
                            <div className='text-sm'>{daysAgo} {daysAgo === 1 ? 'Day' : 'Days'} Ago</div>
                        )}
                    </div>
                    <div className="absolute top-2 right-3 flex space-x-2">
                    <button
                        onClick={() => handleBookmark(project._id)}
                        className={`text-lg border-2 p-1 ${isProjectSaved ? 'text-blue-600' : ''}`}
                        >
                        {isProjectSaved ? <FaBookmark /> : <IoBookmarkOutline />}
                    </button>
                        { project.userid._id === user.userid && (
                        <>
                            <button
                            onClick={() => handleEditClick(project._id)}
                            className="text-lg border-2 p-1"
                            >
                            <MdOutlineModeEditOutline />
                            </button>
                            <button
                            onClick={handleDeleteClick}
                            className="text-lg border-2 p-1"
                            >
                            <MdDelete />
                            </button>
                        </>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-3 h-full'>

                <NavLink  to={`/project/${project._id}`} className='text-lg font-semibold hover:underline transition-all duration-200'>{project.projectname}</NavLink>

                <div className='flex space-x-2 items-center flex-wrap'>
                    {project.roles.length === 1 ? <IoPersonSharp /> : <MdPeople />}
                    {project.roles.map((role, index) => (
                        <span
                            key={index}
                            onClick={() => handleLinkClick(roleTagUrls[role] || `https://en.wikipedia.org/wiki/${role.replace(/\s+/g, '_')}`)}
                        >
                            {role}
                            {index < project.roles.length - 1 && ', '}
                        </span>
                    ))}
                </div>
                <div className='flex flex-wrap gap-2 mt-2'>
                    {project.tags.map((tag, index) => (
                        <span
                            className="bg-gray-600 text-white px-2 py-1 rounded-md cursor-pointer hover:underline"
                            key={index}
                            onClick={() => handleLinkClick(roleTagUrls[tag] || `https://en.wikipedia.org/wiki/${tag.replace(/\s+/g, '_')}`)}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <ConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
              message="Are you sure you want to delete this project? This action cannot be undone."
            />
        </div>
    );
};

export default ProjectCard;