import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const apiUrl = 'https://colab1.onrender.com/api/colab';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                toast.error("You are not authenticated. Please log in.");
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${apiUrl}/profile/update-password`,
                {
                    currentPassword,
                    newPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message || "Password updated successfully");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response?.status === 403) {
                toast.error("You are not authorized to perform this action.");
            } else {
                const errorMessage = error.response?.data?.error || "Failed to update password";
                toast.error(errorMessage);
            }
            console.error("Error updating password:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white w-full sm:w-[700px] flex flex-col rounded-md mb-[20px] mx-auto p-6 sm:p-8">
            <h2 className="font-semibold text-xl mb-[20px]">Update password</h2>
            <div className="h-[2px] bg-gray-100 w-full mb-[20px]"></div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-[20px]">
                    <label className="text-gray-800 mb-[7px]" htmlFor="currentPassword">Current password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-100 rounded-md py-[7px] px-[10px] border border-gray-400 w-full"
                        required
                    />
                </div>
                <div className="flex flex-col mb-[20px]">
                    <label className="text-gray-800 mb-[7px]" htmlFor="newPassword">New password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-100 rounded-md py-[7px] px-[10px] border border-gray-400 w-full"
                        required
                    />
                </div>
                <div className="flex flex-col mb-[20px]">
                    <label className="text-gray-800 mb-[7px]" htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-100 rounded-md py-[7px] px-[10px] border border-gray-400 w-full"
                        required
                    />
                </div>
                <button 
                    className="bg-green-500 p-2 rounded-lg text-white w-full sm:w-auto sm:px-4 mb-[20px] hover:bg-green-400 disabled:bg-gray-400"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;
