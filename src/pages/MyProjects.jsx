import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState('My Projects');
  const { user } = useContext(noteContext);
  const handleToggle = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#d2f0ff] pt-10 min-h-screen">
        <div className="w-full flex justify-center mb-8">
          <div className="flex items-center bg-white p-2 mt-2 rounded-full shadow-lg">
            <button
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-150 ${activeTab === 'My Projects' ? 'bg-blue-500 text-white shadow-md' : 'bg-transparent text-gray-600'}`}
              onClick={() => handleToggle('My Projects')}
            >
              My Projects
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'Saved Projects' ? 'bg-blue-500 text-white shadow-md' : 'bg-transparent text-gray-600'}`}
              onClick={() => handleToggle('Saved Projects')}
            >
              Saved Projects
            </button>
          </div>
        </div>

        {activeTab === 'My Projects' && (
          <ProjectList roles={[]} tags={[]} userId={user.userid} />
        )}
        {activeTab === 'Saved Projects' && (
          <ProjectList 
            roles={[]} 
            tags={[]} 
            userId={null} 
            showSavedProjects={true} // Indicate that you want to show saved projects
          />
        )}
      </div>
    </>
  );
};

export default MyProjects;
