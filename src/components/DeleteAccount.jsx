import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

     const handleDelete = async () => {
        try {
            const response = await fetch('https://colab1.onrender.com/api/colab/profile/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Fixed syntax issue
                },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                toast.success('Account Deleted Successfully');
                localStorage.removeItem('authToken'); // Corrected the token key to match localStorage
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                const data = await response.json();
               toast.error(data.message || "Failed to delete account");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the account");
        }
    };

    return (
        <div className="bg-white w-[700px] rounded-lg ml-[80px] mb-[70px]">
            <h2 className="font-semibold text-xl mb-[20px] pl-[30px] pt-[35px]">Delete Account</h2>
            <div className="h-[2px] bg-gray-100 w-[640px] mx-auto mb-[20px]"></div>
            <h2 className="font-semibold text-l pl-[30px] mb-[20px]">Permanently delete your account</h2>
            <div className="flex w-[640px] mx-auto items-center gap-x-[5px] bg-gray-100 h-[90px] py-[20px] px-[20px] mb-[20px]">
                <IoWarningOutline size='10em'/>
                <p className="text-gray-500">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </div>
            <button 
                className="bg-red-500 p-2 rounded-lg text-white px-4 ml-[30px] mb-[20px] hover:bg-red-400"
                type="button"
                onClick={() => setShowModal(true)}>
                Delete
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
                    <div className="w-[520px] bg-white mx-auto justify-center rounded-lg">
                        <h2 className="font-semibold text-md mb-[20px] pl-[10px] pt-[20px]">Delete Account Permanently</h2>
                        <div className="h-[1px] bg-gray-300 w-full mx-auto mb-[20px]"></div>
                        <p className="p-[10px] mb-[5px] text-gray-500">
                            Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be <span className="text-red-500">permanently deleted</span>. Please enter your password to confirm you would like to permanently delete your account.
                        </p>
                        <div className="flex flex-col pl-[10px]">
                            <label className="text-gray-800 mb-[7px]">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-800 mb-[20px]"
                            />
                        </div>
                        <div className="flex gap-x-[10px]">
                            <button 
                                className="p-2 rounded-lg border border-gray-300 px-4 ml-[30px] mb-[20px] hover:bg-gray-50"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button 
                                className="bg-red-500 p-2 rounded-lg text-white px-4 ml-[30px] mb-[20px] hover:bg-red-400"
                                onClick={handleDelete}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;