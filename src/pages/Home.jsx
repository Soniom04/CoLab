import React from "react";
import { NavLink } from "react-router-dom";
import { PiQuotes } from "react-icons/pi";
import { GrTask } from "react-icons/gr";
import { GiProgression } from "react-icons/gi";
import { LuMilestone } from "react-icons/lu";
import { GiSkills } from "react-icons/gi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import InteractiveTechBubbles from "../components/InteractiveTechBubbles";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen overflow-x-hidden overflow-y-hidden">
      <nav className="bg-white shadow-md w-full">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
          <NavLink
            to="/"
            className="text-3xl font-bold text-indigo-600 mb-2 sm:mb-0"
          >
            CoLab
          </NavLink>
          <NavLink
            to="/login"
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Log In / Sign Up
          </NavLink>
        </div>
      </nav>

      <header className="bg-indigo-900 text-white py-10 sm:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to CoLab
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Collaborate, Innovate, Succeed
          </p>
          <InteractiveTechBubbles />
        </div>
      </header>

      <section className="py-10 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            Our Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: GrTask,
                title: "Task Boards",
                description: "Organize and manage tasks effectively",
              },
              {
                icon: GiProgression,
                title: "Progress Tracking",
                description: "Monitor project progress in real-time",
              },
              {
                icon: LuMilestone,
                title: "Milestone Management",
                description: "Set and achieve project milestones",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-100 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <feature.icon className="mx-auto text-4xl sm:text-5xl text-indigo-600 mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            Why Collaborators Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                img: "../n9 (1).jpeg",
                text: "Directly connect with innovators and project leads - no intermediaries involved.",
              },
              {
                img: "../n1 (1).jpeg",
                text: "Get all project details upfront. Understand the scope, requirements, and expectations before applying.",
              },
              {
                img: "../n5.jpeg",
                text: "Skip the formalities - your profile and interests are all you need. Apply with a single click and start collaborating.",
              },
              {
                img: "../n9 (2).jpeg",
                text: "Discover unique projects and opportunities in various fields that you won't find anywhere else.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <img
                  src={item.img}
                  alt=""
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-4 sm:mb-0 sm:mr-6"
                />
                <p className="text-base sm:text-lg text-center sm:text-left">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <NavLink
              to="/login"
              className="bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            Find Your Perfect Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: GiSkills,
                title: "Find Your Match",
                description: "Discover projects that align with your skills",
              },
              {
                icon: FaSearch,
                title: "Filter by Skills",
                description: "Narrow down by required skills and interests",
              },
              {
                icon: MdOutlineTravelExplore,
                title: "Explore Projects",
                description: "Browse and apply to projects of interest",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-indigo-800 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <feature.icon className="mx-auto text-4xl sm:text-5xl mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold mb-4 md:mb-0">
              CoLab
            </div>
            <div className="text-xs sm:text-sm mb-4 md:mb-0">
              Copyright © 2024 CoLab. All rights reserved.
            </div>
            <div className="text-xs sm:text-sm text-center md:text-left">
              Browse by: Jobs, Remote Jobs, Locations, Startups, Startups
              Hiring, Industries, Tech Hubs
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
