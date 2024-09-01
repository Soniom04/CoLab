import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoteContext from "../context/notes/NoteContext";
import { AiFillDelete } from "react-icons/ai";

const Expertise = () => {
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([
    "Backend Developer",
    "React Developer",
    "Android Developer",
    "Frontend Developer",
    "UI/UX Designer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Project Manager",
    "Database Administrator",
    "Cloud Architect",
    "Cybersecurity Specialist",
    "Full Stack Developer",
    "PHP Developer",
    "Java Developer",
    "Python Developer",
    "JavaScript Developer",
    "Ruby on Rails Developer",
    "Swift Developer",
    "Kotlin Developer",
    "C# Developer",
    "Game Developer",
    "Embedded Systems Engineer",
    "Systems Analyst",
    "Technical Writer",
    "Business Analyst",
    "Network Engineer",
    "Site Reliability Engineer",
    "Salesforce Developer",
    "AWS Specialist",
    "Azure Specialist",
    "Google Cloud Specialist",
    "Scrum Master",
    "Ethical Hacker",
  ]);
  const { user } = useContext(NoteContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.userid) {
      fetchSkills();
    }
  }, [user.userid]);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(
        `https://colab1.onrender.com/api/colab/profile/user/${user.userid}`
      );
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
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.status === 200) {
          setSkills([...skills, skill]);
          toast.success("Skill added successfully");
        } else {
          throw new Error("Failed to add skill");
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
          data: { skill: skillToRemove },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
        toast.success("Skill removed successfully");
      } else {
        throw new Error("Failed to remove skill");
      }
    } catch (error) {
      toast.error("Failed to remove skill");
    }
  };

  const handleSelectChange = (e) => {
    const skill = e.target.value;
    if (skill) {
      handleAddSkill(skill);
      e.target.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="bg-white w-full max-w-3xl mx-auto rounded-md p-4 md:p-8 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Edit Expertise</h2>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Add Skill</label>
        <select
          onChange={handleSelectChange}
          className="w-full md:w-1/2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a skill</option>
          {availableSkills
            .filter((skill) => !skills.includes(skill))
            .map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
        </select>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Expertise</h3>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded-full shadow-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <AiFillDelete size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Expertise;
