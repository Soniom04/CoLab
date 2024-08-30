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
        <div className="bg-white w-[700px] flex flex-col rounded-md mb-[20px] ml-[80px]">
            <h2 className="font-semibold text-xl mb-[20px] pl-[30px] pt-[35px]">Update password</h2>
            <div className="h-[2px] bg-gray-100 w-[640px] mx-auto mb-[20px]"></div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col pl-[30px]">
                    <label className="text-gray-800 mb-[7px]">Current password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-100 mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-400 mb-[20px]"
                        required
                    />
                </div>
                <div className="flex flex-col pl-[30px]">
                    <label className="text-gray-800 mb-[7px]">New password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-100 mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-400 mb-[20px]"
                        required
                    />
                </div>
                <div className="flex flex-col pl-[30px]">
                    <label className="text-gray-800 mb-[7px]">Confirm password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-100 mr-[30px] rounded-md py-[7px] pl-[10px] border border-gray-400 mb-[20px]"
                        required
                    />
                </div>
                <button 
                    className="bg-green-500 p-2 rounded-lg text-white px-4 ml-[30px] mb-[20px] hover:bg-green-400 disabled:bg-gray-400"
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
