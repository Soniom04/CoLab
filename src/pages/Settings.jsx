import React from "react";
import { useState } from "react";
import AboutMe from "../components/AboutMe";
import DeleteAccount from "../components/DeleteAccount";
import UpdatePassword from "../components/UpdatePasswod";
import Navbar from "../components/Navbar";
import Expertise from "../components/Expertise";

const Settings = () => {

    const components={
        AboutMe: AboutMe,
        UpdatePassword:UpdatePassword,
        DeleteAccount:DeleteAccount,
        Expertise:Expertise,
    };

    const[activeComponent,setActiveComponent]=useState('AboutMe')

    const ActiveComponent=components[activeComponent];

    return(
        <div className="bg-gray-100 h-[100vh]">
            <Navbar/>
            {/* main div */}
            <div className={`flex pt-20 px-[100px] gap-x-[20px] ${activeComponent==='AboutMe' || 'Expertise' ? 'bg-gray-100 h-fit ':''}`}>
                {/* left div */}
                <div className="flex flex-col w-1/4 ">
                    <div className="text-gray-500 w-[220px] mb-[20px] pl-0 place-content-start place-items-start"><p className="text-center">EDIT PROFILE</p></div>
                    <button
                    className={`py-[10px] w-[220px] ${activeComponent==='AboutMe' ? 'bg-gray-300 font-semibold ':'hover:bg-gray-200'}`}
                    onClick={()=>setActiveComponent("AboutMe")}>About Me</button>
                    <button
                    className={`py-[10px] w-[220px] ${activeComponent==='Expertise' ? 'bg-gray-300 font-semibold':'hover:bg-gray-200'}`}
                    onClick={()=>setActiveComponent("Expertise")}>Expertise</button>
                    <button
                    className={`py-[10px] w-[220px] ${activeComponent==='UpdatePassword' ? 'bg-gray-300 font-semibold':'hover:bg-gray-200'}`}
                    onClick={()=>setActiveComponent("UpdatePassword")}>Update password</button>
                    <button
                    className={`py-[10px] w-[220px] ${activeComponent==='DeleteAccount' ? 'bg-gray-300 font-semibold':'hover:bg-gray-200'}`}
                    onClick={()=>setActiveComponent("DeleteAccount")}>Delete account</button>
                </div>
                {/* right div */}
                <div>
                    <ActiveComponent/>
                </div>
            </div>
            
        </div>
    );
}

export default Settings;