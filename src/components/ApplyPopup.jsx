import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { applyToProject } from '../api';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const ApplyPopup = ({ isOpen, onClose, projectId, onApplicationSuccess  }) => {
  const {user} = useContext(noteContext)
  const [introMessage, setIntroMessage] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const result = await applyToProject(projectId, introMessage, resume,user.userid);
      if (result.success) {
        onClose();
        onApplicationSuccess()
        toast.success("Applied successfully");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 min-w-[400px] w-[30%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Apply</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Introduction message
            </label>
            <textarea
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="4"
              placeholder="Write why would you like to be part of this project..."
              value={introMessage}
              onChange={(e) => setIntroMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume (optional)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Upload your CV or portfolio if you think it matters for this project.
            </p>
            
          <div className="flex items-center space-x-2">
            <input 
              type="file" 
              id="file-upload"
              accept=".doc,.docx,.pdf" 
              onChange={(e) => setResume(e.target.files[0])} 
              className="hidden" 
            />
            <label 
              htmlFor="file-upload" 
              className="flex items-center space-x-2 cursor-pointer text-sm py-2 px-4 rounded-full border-0 font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              <FaUpload className="w-4 h-4" />
              <span>Upload</span>
            </label>
            <span className="text-sm text-gray-500">
              {resume ? resume.name : 'No file chosen'}
            </span>
          </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPopup;