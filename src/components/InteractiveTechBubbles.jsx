import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TechBubble = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${className} cursor-pointer`}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      animate={{
        x: isHovered ? Math.random() * 10 - 5 : 0,
        y: isHovered ? Math.random() * 10 - 5 : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
};

const InteractiveTechBubbles = () => {
  return (
    <div className="h-[436px] mx-auto relative">
      <TechBubble className="border-2 p-2 absolute ml-[100px] mt-[300px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href='https://www.w3schools.com/whatis/whatis_frontenddev.asp' className="cursor-pointer">Front-End Developers</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[350px] mt-[400px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://www.oracle.com/in/database/what-is-database/" className="cursor-pointer">Databases</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[1050px] mt-[150px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://www.oracle.com/in/database/what-is-database/" className="cursor-pointer">Backend Developers</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[450px] mt-[100px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://flutter.dev/" className="cursor-pointer">Flutter Developer</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[50px] mt-[100px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://azure.microsoft.com/en-in/resources/cloud-computing-dictionary/" className="cursor-pointer">SaaS</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[250px] mt-[50px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://react.dev/" className="cursor-pointer">React Developers</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[600px] mt-[350px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://nodejs.org/en" className="cursor-pointer">Node JS Developers</a>
      </TechBubble>
      <TechBubble className="border-2 p-2 absolute ml-[1400px] mt-[250px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://www.intel.com/content/www/us/en/architecture-and-technology/vpro/hardware-shield/overview.html" className="cursor-pointer">Cyber Security</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[1250px] mt-[50px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://developer.android.com/" className="cursor-pointer">Android Developers</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[700px] mt-[100px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://en.wikipedia.org/wiki/Robotics" className="cursor-pointer">Robotics</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[1000px] mt-[400px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://www.gamedeveloper.com/" className="cursor-pointer">Game Developer</a>
      </TechBubble>

      <TechBubble className="border-2 p-2 absolute ml-[950px] mt-[20px] border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]">
        <a href="https://www.simplilearn.com/how-to-become-ui-ux-designer-article" className="cursor-pointer">UI/UX developer</a>
      </TechBubble>

      {/* Add more TechBubble components for each item */}

      <h1 className="mx-auto text-black absolute text-center mt-[198px] ml-[418px] place-content-center text-5xl font-bold z-10 bg-white">
        CoLab<span className="red font-extrabold text-red-500 place-content-center"> : </span>
        <span className="border border-dashed border-red-500 p-5 rounded-xl pl-4 pr-4">Find what's next</span>
      </h1>
    </div>
  );
};

export default InteractiveTechBubbles;