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
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                toast.success('Account and projects deleted successfully');
                localStorage.removeItem('authToken');
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
        <div className="bg-white w-full sm:w-[700px] rounded-lg mx-auto mb-[70px] p-6 sm:p-8">
            <h2 className="font-semibold text-xl mb-[20px]">Delete Account</h2>
            <div className="h-[2px] bg-gray-100 w-full mb-[20px]"></div>
            <h2 className="font-semibold text-l mb-[20px]">Permanently delete your account</h2>
            <div className="flex flex-col sm:flex-row w-full items-center gap-x-[5px] bg-gray-100 py-[20px] px-[20px] mb-[20px]">
                <IoWarningOutline size='2em' className="mb-4 sm:mb-0"/>
                <p className="text-gray-500">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </div>
            <button 
                className="bg-red-500 p-2 rounded-lg text-white w-full sm:w-auto sm:px-4 mb-[20px] hover:bg-red-400"
                type="button"
                onClick={() => setShowModal(true)}>
                Delete
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
                    <div className="w-full sm:w-[520px] bg-white mx-4 sm:mx-auto rounded-lg p-6">
                        <h2 className="font-semibold text-md mb-[20px]">Delete Account Permanently</h2>
                        <div className="h-[1px] bg-gray-300 w-full mb-[20px]"></div>
                        <p className="mb-[20px] text-gray-500">
                            Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be <span className="text-red-500">permanently deleted</span>. Please enter your password to confirm you would like to permanently delete your account.
                        </p>
                        <div className="flex flex-col mb-[20px]">
                            <label className="text-gray-800 mb-[7px]" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-md py-[7px] px-[10px] border border-gray-800 w-full"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-y-[10px] sm:gap-y-0 gap-x-[10px]">
                            <button 
                                className="p-2 rounded-lg border border-gray-300 w-full sm:w-auto px-4 mb-[10px] sm:mb-0 hover:bg-gray-50"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button 
                                className="bg-red-500 p-2 rounded-lg text-white w-full sm:w-auto px-4 hover:bg-red-400"
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
