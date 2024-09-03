    import { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux';
    import { fetchSavedProjects, saveProjectAction, unsaveProjectAction } from '../actions';
    import { getProjectDetails, deleteProject,saveProject,unsaveProject,getSavedProjects, fetchProfileDetails } from '../api'; // Adjust the import path
    import { IoPersonSharp } from 'react-icons/io5';
    import { MdPeople} from 'react-icons/md';
    import { toast } from 'react-hot-toast';
    import ConfirmationModal from "../components/ConfirmModal";
    import FormattedText from '../components/FormattedText';
    import Spinner from "../components/Spinner"
    import NoResult from "../components/NoResult"
    import Navbar from "../components/Navbar"
    import ApplyPopup from "../components/ApplyPopup";
    import { MdOutlineModeEditOutline , MdDelete} from 'react-icons/md';
    import { triggerReload } from '../redux/slices/CreateProjectSlice';
    import noteContext from '../context/notes/NoteContext';
    import { useContext } from 'react';
    
    export default function Description() {
      const [imageUrl,setImageUrl] = useState('')
      const { projectId } = useParams();
      console.log(projectId)
      const [projectDetails, setProjectDetails] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [isApplied, setIsApplied] = useState(false);
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const navigate = useNavigate();
      const { user } = useContext(noteContext);
      const [isOwner, setIsOwner] = useState(false);
     
      const projectDate = new Date(projectDetails?.createdAt);
      const now = new Date();
      const isToday = projectDate.toDateString() === now.toDateString();
      const daysAgo = Math.floor((now - projectDate) / (1000 * 60 * 60 * 24));
      const [hasApplied, setHasApplied] = useState(false);
    
      // Fetch project details when projectId changes
      const handleApplicationSuccess = () => {
        setHasApplied(true); // Update state to trigger re-fetch of project data
      };

      const fetchProject = async () => {
        try {
          const response = await getProjectDetails(projectId);
          if (response.success) {
            setProjectDetails(response.project);
            setIsOwner(response.project.userid._id === user.userid);
            await fetchProfile(response.project.userid._id);
            setIsApplied(response.project.applications.some((application) => application.userid === user.userid));
            setError(response.error);
          }
        } catch (err) {
          setError("An error occurred while fetching project details.");
        } finally {
          setLoading(false);
        }
      };
    
      // Function to fetch profile details
      const fetchProfile = async (profileId) => {
        try {
          const response = await fetchProfileDetails(profileId);
          if (response.success) {
            setImageUrl(response.data.profile.profileImage);
          }
        } catch (err) {
          setError("An error occurred while fetching profile details.");
        }
      };
    
      useEffect(() => {
        fetchProject();
      }, [projectId,hasApplied]);

      const dispatch = useDispatch();
  const savedProjects = useSelector(state => state.savedProjects.savedProjects);
  
  useEffect(() => {
    dispatch(fetchSavedProjects(user.userid));
  }, [dispatch, user.userid]);
  
  let isProjectSaved = false

  if(projectDetails != null) isProjectSaved = savedProjects.some(id => id === projectDetails._id);
  const handleBookmark = async () => {
    try {
      if (isProjectSaved) {
        const success = dispatch(unsaveProjectAction(user.userid, projectDetails._id));
        if (success) {
          toast.success("Removed from Saved Projects");
        } else {
          toast.error("Failed to remove from saved projects.");
        }
      } else {
        const success = dispatch(saveProjectAction(user.userid, projectDetails._id));
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
    
      const handleClose = () => setIsPopupOpen(false);
    
      const handleEditClick = async (projectId) => {
        try {
          const project = await getProjectDetails(projectDetails._id);
          if (project) {
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
            const result = await deleteProject(projectDetails._id);
            dispatch(triggerReload());
            if (result.success) {
                toast.success("Project deleted successfully");
                navigate('/projects'); // Adjust this path as needed
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

      const handleClick = () => {
        if (!isDisabled) {
          setIsPopupOpen(true);
        }
      };
    
      if (loading) return <Spinner />;
      if (error) return <NoResult message="Couldn't find Project-Details" />;
    
      const buttonText = isApplied ? 'Applied' : 'Apply';
      const isDisabled = isApplied;
    
      return (
        <>
          <Navbar />
          <div className="bg-[#d2f0ff] min-h-screen w-full">
            <div className="container mx-auto px-4 py-12 pt-10">
              <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mt-12 relative">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{projectDetails.projectname}</h1>
                <div className='absolute top-5 right-5 space-x-3'>
                { projectDetails.userid._id === user.userid && (
                        <>
                            <button
                            onClick={() => handleEditClick(projectDetails._id)}
                            className="text-2xl border-2 p-1"
                            >
                            <MdOutlineModeEditOutline />
                            </button>
                            <button
                            onClick={handleDeleteClick}
                            className="text-2xl border-2 p-1"
                            >
                            <MdDelete />
                            </button>
                        </>
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:space-x-6 mb-6 justify-between">
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img
                      src={imageUrl}
                      alt="User"
                      className="w-40 h-40 rounded-full mx-auto mb-2 border-4 border-blue-100"
                    />
                    <div className="text-center text-gray-700">
                      <p className="mb-1">Proposed by <span className="font-semibold text-blue-600">{projectDetails.userid.username}</span></p>
                      <p className="text-sm bg-blue-50 inline-block px-3 py-1 rounded-full">
                        {isToday ? 'Today' : `${daysAgo} ${daysAgo === 1 ? 'Day' : 'Days'} Ago`}
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-2/3 flex flex-col justify-end mt-auto">
                    <div className="flex items-center space-x-3 text-lg mb-4">
                      {projectDetails.roles.length === 1 ? <IoPersonSharp className="text-blue-500" size={20} /> : <MdPeople className="text-blue-500" size={24} />}
                      <div className="flex flex-wrap items-center gap-y-2">
                        {projectDetails.roles.map((role, index) => (
                          <span key={index} className="mr-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        className={`py-2 px-4 rounded-lg w-1/2 transition duration-300 ease-in-out text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600`}
                        onClick={handleBookmark}
                        disabled={savedProjects.loading}
                      >
                        {isProjectSaved ? 'Unsave' : 'Save'} Project
                      </button>
                      <button
                        className={`w-1/2 transition duration-300 ease-in-out text-lg font-semibold text-white 
                                    ${isDisabled || isOwner 
                                      ? 'bg-gray-700 cursor-not-allowed' 
                                      : 'bg-green-500 hover:bg-green-600'}`}
                        disabled={isDisabled}
                        onClick={handleClick}>
                        {isOwner ? 'You Own this project' : isApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">Description</h2>
                  <FormattedText html={projectDetails.description} />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">Tags</h2>
                  <div className="flex flex-wrap">
                    {projectDetails.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full mr-2 mb-2 hover:bg-gray-300 transition duration-300 ease-in-out">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this project? This action cannot be undone."
              />

              {projectDetails && (
                <ApplyPopup 
                  isOpen={isPopupOpen} 
                  onClose={handleClose} 
                  projectId={projectDetails._id} 
                  onApplicationSuccess={handleApplicationSuccess}
                />
              )}
            </div>
          </div>
        </>
      );
    }
    