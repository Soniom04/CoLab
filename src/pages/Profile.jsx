import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, NavLink, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CiClock2, CiCalendarDate } from "react-icons/ci";
import { FaEdit, FaMapMarkerAlt, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import NoteContext from "../context/notes/NoteContext";
import './profile.css';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(NoteContext);
    const [parr, setParr] = useState([]);
    const { userid: paramUserId } = useParams();
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const profileUserId = paramUserId || user.userid;
            setIsOwnProfile(profileUserId === user.userid);

            const [profileResponse] = await Promise.all([
                axios.get(`https://colab1.onrender.com/api/colab/profile/user/${profileUserId}`),
            ]);

            setProfileData(profileResponse.data.profile);
        } catch (err) {
            console.error("Error fetching profile data:", err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (err.response.status === 500) {
                    setError("A server error occurred. Please try again later.");
                } else if (err.response.status === 404) {
                    navigate("/404");
                } else {
                    setError(`An error occurred: ${err.response.data.message || err.message}`);
                }
            } else if (err.request) {
                // The request was made but no response was received
                setError("No response received from server. Please check your internet connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(`An unexpected error occurred: ${err.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProjects = async () => {
        try {
            const profileUserId = paramUserId || user.userid;
            const response = await axios.get(`https://colab1.onrender.com/api/colab/projects/user/${profileUserId}`);
            setParr(response.data.projects || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError(error.message);
        }
    };
    

    useEffect(() => {
        fetchData();
        fetchProjects();
    }, [paramUserId]);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const limit = 200;

    const imageMap = new Map([
        ['Web Development', '../web Dev.png'],
        ['ios', '../ios.png'],
        ['macos', '../macos.png'],
        ['React', '../React.png'],
        ['Swift', '../swift.png'],
        ['default', '../web Dev.png'],
    ]);

    const ImageComponent = ({ text }) => {
        const imageUrl = imageMap.get(text) || imageMap.get('default');
        return <img src={imageUrl} alt={text} className="w-12 h-12 rounded-full shadow-md transition-transform duration-300 hover:scale-110" />;
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
        </div>
    );

    if (error) return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <img src='WhatsApp Image 2024-08-28 at 21.23.17_45cb877b.jpg' className="mx-auto w-64 mb-4" alt="Error" />
                <p className="text-2xl font-bold text-red-600">Oops! Something went wrong.</p>
                <p className="mt-2 text-gray-600">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    if (!profileData) return null;

    const displayedText = profileData.description
        ? isExpanded
            ? profileData.description
            : profileData.description.substring(0, limit) + (profileData.description.length > limit ? '...' : '')
        : '';

    return (
        <div className="bg-[#d2f0ff] min-h-screen z-[-10]">
            <Navbar />
            <div className="container mx-auto py-12 px-10 lg:px-40">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] ">
                    <div className="md:flex ">
                        <div className="md:w-1/3 bg-rose-100 p-8 border-r border-blue-200">
                            <div className="relative mx-auto w-48 h-48">
                                <img src={profileData.profileImage} alt="Profile" className="rounded-full w-full h-full object-cover shadow-xl border-4 border-white" />
                                <div className="absolute bottom-0 right-0 bg-green-400 w-6 h-6 rounded-full border-4 border-white"></div>
                            </div>
                            <h3 className="text-center mt-6 font-bold text-3xl text-blue-900 tracking-wide">{profileData.username}</h3>
                            <h4 className="text-center mt-2 text-blue-600 font-semibold">
                                <FaBriefcase className="inline-block mr-2" />
                                Projects Completed: {parr.length}
                            </h4>
                            {isOwnProfile && (
                                <div className="mt-8 text-center">
                                    <NavLink to='/settings' className='inline-flex items-center  bg-blue-500 text-white font-bold py-3 px-6 rounded-full  transition duration-300 transform hover:scale-105 shadow-lg'>
                                        <FaEdit className="mr-2" />
                                        Edit Profile
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <div className="md:w-2/3 p-8">
                            <div className="mb-8">
                                <h3 className="font-bold text-3xl text-blue-900 mb-4 border-b-2 border-purple-200 pb-2">About Me</h3>
                                <h4 className="font-semibold text-2xl text-purple-700 mb-3">{profileData.title}</h4>
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    {displayedText}
                                    {profileData.description && profileData.description.length > limit && (
                                        <button
                                            onClick={toggleExpand}
                                            className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none font-semibold transition duration-300"
                                        >
                                            {isExpanded ? 'View less' : 'View more'}
                                        </button>
                                    )}
                                </p>
                                <div className="flex flex-wrap gap-6 text-gray-600 mt-6">
                                    <div className="flex items-center bg-blue-50 rounded-full px-4 py-2 transition-all duration-300 hover:bg-blue-100">
                                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                        <span>{profileData.location}</span>
                                    </div>
                                    <div className="flex items-center bg-purple-50 rounded-full px-4 py-2 transition-all duration-300 hover:bg-purple-100">
                                        <FaCalendarAlt className="mr-2 text-purple-500" />
                                        <span>Joined {new Date(profileData.joined).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-3xl text-blue-900 mb-6 border-b-2 border-purple-200 pb-2">Expertise</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {profileData.expertise && profileData.expertise.map((expertise, index) => (
                                        <div key={index} className="flex items-center bg-blue-50 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                                            <ImageComponent text={expertise} />
                                            <span className="ml-4 font-semibold text-blue-800">{expertise}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;