import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GiPowerButton } from "react-icons/gi";
import { FaProjectDiagram, FaFolderOpen, FaPlusCircle } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import PowerButton from "./PowerButton";
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(noteContext);

  const navItems = [
    { name: 'Projects', icon: FaProjectDiagram, path: '/projects' },
    { name: 'My Projects', icon: FaFolderOpen, path: '/my-projects' },
    { name: 'New Project', icon: FaPlusCircle, path: '/new-project' },
  ];

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <h1 className="text-white text-3xl font-bold tracking-wider">CoLab</h1>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center
                    ${isActive
                      ? 'text-white bg-blue-700 shadow-md'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <PowerButton />
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center
                  ${isActive
                    ? 'text-white bg-blue-700 shadow-md'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-2" />
                {item.name}
              </NavLink>
            ))}
            <NavLink to={`/profile/${user.userid}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center">
              <CgProfile className="mr-2" />
              View Profile
            </NavLink>
            <NavLink to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center">
              <HiLogout className="mr-2" />
              Logout
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
