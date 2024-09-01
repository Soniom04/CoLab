import React, { useState } from "react";
import AboutMe from "../components/AboutMe";
import DeleteAccount from "../components/DeleteAccount";
import UpdatePassword from "../components/UpdatePasswod";
import Navbar from "../components/Navbar";
import Expertise from "../components/Expertise";

const Settings = () => {

    const components = {
        AboutMe: AboutMe,
        UpdatePassword: UpdatePassword,
        DeleteAccount: DeleteAccount,
        Expertise: Expertise,
    };

    const [activeComponent, setActiveComponent] = useState('AboutMe');

    const ActiveComponent = components[activeComponent];

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            {/* main div */}
            <div className={`flex flex-col lg:flex-row pt-20 px-4 lg:px-[100px] gap-x-[20px] ${activeComponent === 'AboutMe' || activeComponent === 'Expertise' ? 'bg-gray-100 h-fit' : ''}`}>
                {/* left div */}
                <div className="flex flex-col w-full lg:w-1/4 mb-4 lg:mb-0">
                    <div className="text-gray-500 w-full lg:w-[220px] mb-4 lg:mb-[20px] pl-0 place-content-start place-items-start">
                        <p className="text-center">EDIT PROFILE</p>
                    </div>
                    <button
                        className={`py-2 w-full lg:w-[220px] ${activeComponent === 'AboutMe' ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveComponent("AboutMe")}>About Me</button>
                    <button
                        className={`py-2 w-full lg:w-[220px] ${activeComponent === 'Expertise' ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveComponent("Expertise")}>Expertise</button>
                    <button
                        className={`py-2 w-full lg:w-[220px] ${activeComponent === 'UpdatePassword' ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveComponent("UpdatePassword")}>Update Password</button>
                    <button
                        className={`py-2 w-full lg:w-[220px] ${activeComponent === 'DeleteAccount' ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveComponent("DeleteAccount")}>Delete Account</button>
                </div>
                {/* right div */}
                <div className="w-full lg:w-3/4">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
}

export default Settings;
