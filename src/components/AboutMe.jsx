import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoteContext from "../context/notes/NoteContext";
import '../pages/profile.css';

const AboutMe = () => {
    const [username, setName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(true); // State to manage loading
    const { user } = useContext(NoteContext);

    useEffect(() => {
        // Fetch initial profile data
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`https://colab1.onrender.com/api/colab/profile/user/${user.userid}`);
                setName(response.data.profile.username);
                setProfileImage(response.data.profile.profileImage);
                setDescription(response.data.profile.description);
                setLocation(response.data.profile.location);
                setIsLoading(false); // Data fetched successfully
            } catch (error) {
                toast.error("Failed to fetch profile data");
                setIsLoading(false); // Stop loading on error
            }
        };

        if (user.userid) {
            fetchProfileData();
        }
    }, [user.userid]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        } else {
            toast.error("No File Selected");
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        document.getElementById('profileImage').value = '';
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('description', description);
        formData.append('location', location);
        if (profileImage) {
            formData.append('profileImage', document.getElementById('profileImage').files[0]);
        }

        try {
            const response = await axios.put(
                `https://colab1.onrender.com/api/colab/updateProfile/${user.userid}`,
                formData
            );

            if (response.status === 200) {
                toast.success("Profile Updated Successfully");
            } else {
                toast.error("Failed to update profile");
            }
            
        } catch (error) {
            toast.error("An error occurred while updating the profile");
        }
    };

    if (isLoading) {
        return (
            <div className=" min-h-screen ml-[400px] place-content-center">
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white w-[700px] ml-[80px] rounded-md mb-[70px]">
            <h2 className="font-semibold text-xl mb-[20px] pl-[30px] pt-[35px]">About Me</h2>
            <div className="h-[2px] bg-gray-100 w-[640px] mx-auto mb-[20px]"></div>
            <form onSubmit={handleFormSubmit}>
                {/* image */}
                <div className="flex flex-col pl-[30px]">
                    <label className="text-gray-800 mb-[7px]">Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mr-[30px] rounded-md py-[7px] mb-[20px]"
                    />
                    {profileImage && <img src={profileImage} alt="Profile" className='w-32 object-cover rounded-full mb-[20px]' />}
                    {profileImage && (
                        <button 
                            className="bg-red-500 py-[5px] rounded-lg w-fit text-white px-[5px] mb-[20px] hover:bg-red-400"
                            type="button"
                            onClick={handleRemoveImage}>
                            Remove
                        </button>
                    )}
                </div>
                {/* name */}
                <div className="flex flex-col pl-[30px]">
                    <label className="text-gray-800 mb-[7px]">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-100 mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-400 mb-[20px]"
                    />
                </div>
                {/* location */}
                <div className="flex flex-col pl-[30px]">
                    <label className="text-gray-800 mb-[7px]">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-gray-100 mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-400 mb-[20px]"
                    />
                </div>
                {/* description */}
                <div className="flex flex-col pl-[30px]">
                    <label className="text-gray-800 mb-[7px]">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-100 mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-400 mb-[20px] h-[200px]"
                    />
                </div>
                <button 
                    className="bg-green-500 p-2 rounded-lg text-white px-4 ml-[30px] mb-[20px] hover:bg-green-400"
                    type="submit">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default AboutMe;
