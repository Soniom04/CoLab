import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoteContext from "../context/notes/NoteContext";
import { AiFillDelete } from "react-icons/ai";

const Expertise = () => {
    const [skills, setSkills] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([
        "Backend Developer", "React Developer", "Android Developer", "Frontend Developer",
        "UI/UX Designer", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer",
        "Project Manager", "Database Administrator", "Cloud Architect", "Cybersecurity Specialist",
        "Full Stack Developer", "PHP Developer", "Java Developer", "Python Developer",
        "JavaScript Developer", "Ruby on Rails Developer", "Swift Developer", "Kotlin Developer",
        "C# Developer", "Game Developer", "Embedded Systems Engineer", "Systems Analyst",
        "Technical Writer", "Business Analyst", "Network Engineer", "Site Reliability Engineer",
        "Salesforce Developer", "AWS Specialist", "Azure Specialist", "Google Cloud Specialist",
        "Scrum Master", "Ethical Hacker"
    ]);
    const [selectedSkill, setSelectedSkill] = useState('');
    const { user } = useContext(NoteContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, [user.userid]);

    const fetchSkills = async () => {
        try {
            const response = await axios.get(`https://colab1.onrender.com/api/colab/profile/user/${user.userid}`);
            setSkills(response.data.profile.expertise || []);
            setIsLoading(false);
        } catch (error) {
            toast.error("Failed to fetch skills");
            setIsLoading(false);
        }
    };

    const handleAddSkill = async (skill) => {
        if (skill && !skills.includes(skill)) {
            try {
                const response = await axios.put(
                    `https://colab1.onrender.com/api/colab/addSkillProfile/${user.userid}/skill`,
                    { skill },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                );

                if (response.status === 200) {
                    setSkills([...skills, skill]);
                    setSelectedSkill('');
                    toast.success("Skill added successfully");
                } else {
                    throw new Error('Failed to add skill');
                }
            } catch (error) {
                toast.error("Failed to add skill");
            }
        } else if (skills.includes(skill)) {
            toast.error("Skill already exists");
        }
    };

    const handleRemoveSkill = async (skillToRemove) => {
        try {
            const response = await axios.delete(
                `https://colab1.onrender.com/api/colab/profile/${user.userid}/remove-skill`,
                {
                    data: { skill: skillToRemove }, // Fix payload for DELETE request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );

            if (response.status === 200) {
                setSkills(skills.filter(skill => skill !== skillToRemove));
                toast.success("Skill removed successfully");
            } else {
                throw new Error('Failed to remove skill');
            }
        } catch (error) {
            toast.error("Failed to remove skill");
        }
    };

    const handleSelectSkill = (e) => {
        const skill = e.target.value;
        if (skill) {
            handleAddSkill(skill);
        }
    };

    if (isLoading) {
        return (
            <div className="overflow-y-hidden ml-[400px] pb-[100px]">
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white w-[700px] ml-[80px] rounded-md mb-[70px]">
            <h2 className="font-semibold text-xl mb-[20px] pl-[30px] pt-[35px]">Edit Expertise</h2>
            <div className="h-[2px] bg-gray-100 w-[640px] mx-auto mb-[20px]"></div>
            <div className="flex flex-col pl-[30px] mb-[20px]">
                <label className="text-gray-800 mb-[7px]">Add Skill</label>
                <select
                    value={selectedSkill}
                    onChange={handleSelectSkill}
                    className="bg-gray-100 mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-400 w-[250px]"
                >
                    <option value="">Add a skill</option>
                    {availableSkills.map((skill, index) => (
                        <option key={index} value={skill}>{skill}</option>
                    ))}
                </select>
            </div>
            <div>
                <h2 className="font-semibold text-lg pb-[30px] pl-[30px] pt-[25px]">Your Expertise</h2>
                <div className="pl-[30px] pb-[20px] flex flex-wrap">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className={`py-2 pl-4 pr-[5px] w-fit border rounded-lg mr-[10px] mb-[15px] ${selectedSkill === skill ? 'bg-blue-400' : 'bg-gray-100'}`}
                            onClick={() => setSelectedSkill(skill)}
                        >
                            {skill}
                            <button
                                className="pl-[5px] pr-[5px] ml-[15px] text-xs  rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveSkill(skill);
                                }}
                            >
                                <AiFillDelete />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Expertise;