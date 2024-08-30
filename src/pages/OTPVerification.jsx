import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiUrl = 'https://colab1.onrender.com/api/colab';

const OTPVerification = ({ isOpen, onClose, onVerified, email }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^[a-zA-Z0-9]$/.test(value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);

      if (event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');

    try {
      await axios.post(`${apiUrl}/verify-otp`, { email, otp: enteredOTP });
      toast.success('OTP Verified Successfully!');
      onVerified();  // Notify parent of successful OTP verification
      onClose();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const resendOTP = async () => {
    try {
      await axios.post(`${apiUrl}/send-otp`, { email });
      setTimer(60);
      toast.success('New OTP sent successfully!');
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[500]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="mb-4">We've sent a 6-digit OTP to your email address.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 border-2 rounded text-center text-xl"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
        <div className="mt-4 text-center">
          {timer > 0 ? (
            <p>Resend OTP in {timer} seconds</p>
          ) : (
            <button
              onClick={resendOTP}
              className="text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;