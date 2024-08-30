import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import * as Components from '../pages/Components';
import OTPVerification2 from '../pages/OTPVerification2';

const apiUrl = 'https://colab1.onrender.com/api/colab';

const ForgotPassword = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            await axios.post(`${apiUrl}/auth/forgot-password`, { email });
            toast.success("OTP sent to your email. Please verify.");
            setShowOTP(true);
        } catch (error) {
            console.error("Error during email submission:", error);
            toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
        }
    };

    const handleOTPVerified = () => {
        toast.success("OTP verified successfully!");
        setShowOTP(false);
        setOtpVerified(true);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(`${apiUrl}/auth/reset-password`, { email, newPassword });
            toast.success("Password reset successful");
            onClose();
        } catch (error) {
            console.error("Error during password reset:", error);
            toast.error(error.response?.data?.message || "Password reset failed. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[500]">
            <Components.Container className="w-full max-w-md mx-auto">
                <Components.SignInContainer signinIn={true}>
                    <Components.Form onSubmit={otpVerified ? handlePasswordReset : handleEmailSubmit}>
                        <Components.Title>{otpVerified ? "Reset Password" : "Forgot Password"}</Components.Title>
                        {!otpVerified ? (
                            <>
                                <Components.Input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Components.Button type="submit" className="w-full">
                                    Send OTP
                                </Components.Button>
                            </>
                        ) : (
                            <>
                                <Components.Input
                                    type='password'
                                    placeholder='New Password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Components.Input
                                    type='password'
                                    placeholder='Confirm New Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Components.Button type="submit" className="w-full">
                                    Reset Password
                                </Components.Button>
                            </>
                        )}
                        <Components.Button className="mt-4 w-full" onClick={onClose}>
                            Cancel
                        </Components.Button>
                    </Components.Form>
                </Components.SignInContainer>
            </Components.Container>

            <OTPVerification2
                isOpen={showOTP}
                onClose={() => setShowOTP(false)}
                onVerified={handleOTPVerified}
                email={email}
            />
        </div>
    );
};

export default ForgotPassword;