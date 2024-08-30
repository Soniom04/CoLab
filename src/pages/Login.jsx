import React, { useState, useContext } from "react";
import axios from 'axios';
import * as Components from './Components';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import OTPVerification from './OTPVerification';
import NoteContext from "../context/notes/NoteContext";
import ForgotPassword from '../components/ForgotPassword';


const apiUrl = 'https://colab1.onrender.com/api/colab';

function Login() {

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [signupData, setSignupData] = useState({ email: '', username: '', password: '' });
    const { update } = useContext(NoteContext);
    const [signIn, toggle] = useState(true);
    const [signinData, setSigninData] = useState({ email: '', password: '' });
    const [signinError, setSigninError] = useState(false);
    const navigate = useNavigate();

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSigninChange = (e) => {
        const { name, value } = e.target;
        setSigninData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!signupData.email) {
            toast.error("Please enter your email");
            return;
        }
    
        try {
            await axios.post(`${apiUrl}/send-otp`, { email: signupData.email });
            toast.success("OTP sent to your email. Please verify.");
            setShowOTP(true);  // Show the OTP verification modal
        } catch (error) {
            console.error("Error during email submission:", error);
            toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
        }
    };

    const handleOTPVerified = () => {
        toast.success("OTP verified successfully!");
        setShowOTP(false);  // Close the OTP modal
        // Move forward to create account section
        setSignupData(prevData => ({ ...prevData, otpVerified: true }));
    };

    const handleSignup = async () => {
        if (!signupData.username || !signupData.password) {
            toast.error("Please fill out all fields");
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/create-account`, signupData);
            localStorage.setItem('authToken', response.data.token);
            toast.success("Signup successful");
            update(response.data.user.id, response.data.user.username);
            navigate('/projects');
        } catch (error) {
            console.error("Error during sign-up:", error);
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        }
    }

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/login`, signinData);
            localStorage.setItem('authToken', response.data.token);
            toast.success("Signin successful");
            setSigninError(false);
            update(response.data.user.id, response.data.user.username);
            navigate('/projects');
        } catch (error) {
            console.error("Error during sign-in:", error);
            setSigninError(true);
            toast.error("Wrong email or password");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="bodycl">
            <Components.Container className="overflow-y-hidden">
            <Components.SignUpContainer signinIn={signIn}>
    <Components.Form onSubmit={handleSubmit}>
        <Components.Title>Create Account</Components.Title>
        {!signupData.otpVerified ? (
            <>
                <Components.Input
                    type='email'
                    placeholder='Email'
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                />
                <Components.Button
                    className="mt-[10px]"
                    type="button"
                    onClick={handleEmailSubmit}
                >
                    Submit Email
                </Components.Button>
            </>
        ) : (
            <>
                <Components.Input
                    type='text'
                    placeholder='Name'
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                />
                <Components.Input
                    type='password'
                    placeholder='Password'
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                />
                <Components.Button
                    className="mt-[10px]"
                    type="button"
                    onClick={handleSignup}
                >
                    Sign Up
                </Components.Button>
            </>
        )}
    </Components.Form>
</Components.SignUpContainer>

<Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            name="email"
                            value={signinData.email}
                            onChange={handleSigninChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Password'
                            name="password"
                            value={signinData.password}
                            onChange={handleSigninChange}
                        />
                        {signinError && <Components.Anchor href='#' style={{ color: 'red' }}>Invalid email or password</Components.Anchor>}
                        <Components.Button
                            type="button"
                            onClick={handleSignin}
                        >
                            Sign In
                        </Components.Button>
                        <Components.Anchor 
                            href='#' 
                            onClick={(e) => {
                                e.preventDefault();
                                setShowForgotPassword(true);
                            }}
                        >
                            Forgot Password?
                        </Components.Anchor>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>

            <OTPVerification
                isOpen={showOTP}
                onClose={() => setShowOTP(false)}
                onVerified={handleOTPVerified}
                email={signupData.email}
            />

            <ForgotPassword
                isOpen={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
            />
        </div>
    );
}

export default Login;