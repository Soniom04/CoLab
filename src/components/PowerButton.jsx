import React, { useState, useEffect, useRef } from 'react';
import { HiPower } from 'react-icons/hi2'; 
import { HiLogout } from "react-icons/hi"; // Import icons from react-icons library
import { NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const PowerButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const {user} = useContext(noteContext)
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event) => {
    // Toggle the dropdown
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative hidden sm:flex" ref={ref}>
      <button
        className="bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600"
        onClick={handleButtonClick}>
        <HiPower size={24} />
      </button>

      {isOpen && 
        <div className="absolute top-0 right-0 mt-10 w-52 p-1 bg-white border border-gray-200 shadow-lg rounded-lg z-[500]">
          <NavLink to="/login"
            className="flex items-center w-full py-2 px-2 text-left hover:bg-gray-200">
            <HiLogout className="inline-block mr-3 text-blue-900" size={20} />
            Logout
          </NavLink>
          <NavLink to={`/profile/${user.userid}`}
            className="flex items-center w-full py-2 px-2 text-left hover:bg-gray-200">
            <CgProfile className="inline-block mr-3 text-blue-900" size={20} />
            View Profile
          </NavLink>
        </div>
      }
    </div>
  );
};

export default PowerButton;
