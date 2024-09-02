import React, { useState, useEffect } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const techBubbles = [
    { name: "Front-End Developers", link: "https://www.w3schools.com/whatis/whatis_frontenddev.asp", position: "left-[5%] top-[70%]" },
    { name: "Databases", link: "https://www.oracle.com/in/database/what-is-database/", position: "left-[20%] bottom-[5%]" },
    { name: "Backend Developers", link: "https://www.oracle.com/in/database/what-is-database/", position: "right-[5%] top-[30%]" },
    { name: "Flutter Developer", link: "https://flutter.dev/", position: "left-[30%] top-[15%]" },
    { name: "SaaS", link: "https://azure.microsoft.com/en-in/resources/cloud-computing-dictionary/", position: "left-[3%] top-[20%]" },
    { name: "React Developers", link: "https://react.dev/", position: "left-[15%] top-[5%]" },
    { name: "Node JS Developers", link: "https://nodejs.org/en", position: "left-[40%] bottom-[10%]" },
    { name: "Cyber Security", link: "https://www.intel.com/content/www/us/en/architecture-and-technology/vpro/hardware-shield/overview.html", position: "right-[2%] bottom-[20%]" },
    { name: "Android Developers", link: "https://developer.android.com/", position: "right-[10%] top-[5%]" },
    { name: "Robotics", link: "https://en.wikipedia.org/wiki/Robotics", position: "left-[50%] top-[10%]" },
    { name: "Game Developer", link: "https://www.gamedeveloper.com/", position: "right-[20%] bottom-[5%]" },
    { name: "UI/UX developer", link: "https://www.simplilearn.com/how-to-become-ui-ux-designer-article", position: "right-[30%] top-[20%]" },
  ];

  const getVisibleBubbles = () => {
    if (windowWidth > 1280) return techBubbles;
    if (windowWidth > 1024) return techBubbles.slice(0, 10);
    if (windowWidth > 768) return techBubbles.slice(0, 8);
    if (windowWidth > 640) return techBubbles.slice(0, 6);
    return techBubbles.slice(0, 4);
  };

  return (
    <div className="w-full h-[436px] mx-auto relative overflow-hidden">
      {getVisibleBubbles().map((bubble, index) => (
        <TechBubble key={index} className={`border-2 p-2 absolute ${bubble.position} border-opacity-20 rounded-xl font-bold hover:ring-4 hover:ring-rose-200 hover:bg-rose-200 hover:border-rose-400 hover:text-rose-500 hover:p-4 hover:text-xl transition-all duration-300 z-[0]`}>
          <a href={bubble.link} className="cursor-pointer">{bubble.name}</a>
        </TechBubble>
      ))}

      <h1 className="mx-auto text-black absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl md:text-5xl font-bold z-10 bg-white whitespace-nowrap px-2 sm:px-4">
        CoLab<span className="red font-extrabold text-red-500 place-content-center"> : </span>
        <span className="border border-dashed border-red-500 p-2 sm:p-3 md:p-5 rounded-xl">Find what's next</span>
      </h1>
    </div>
  );
};

export default InteractiveTechBubbles;
