import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/Utils.css';

const VerifyEmail = () => {
  const [code, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-email', {
        code,
      });
      console.log(response.data);
      toast.success("OTP verification successful", {position: "bottom-right"})
      setTimeout(() => {
        navigate('/login');
      }, 1000); // Redirect to login page after successful verification
    } catch (error) {
      console.error(error);
      toast.error('OTP verification failed! Please check your OTP and try again.', {position: "bottom-right"});
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 md:p-14 my-40 mx-9 font-poppins" style={{ backgroundColor: 'inherit', borderRadius:'10px' }}>
      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600">Register Now to be a part of the team</h1>
        <p className="text-blue-800">
          An Organization that you can trust on.
        </p>
      </div>

      {/* Right section - Verify OTP */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <div className="verify-email-container">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">Verify Your Email</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-blue-600">Enter 6-digit OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={code}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-md text-white bg-blue-600 hover:bg-blue-800"
            >
              Verify
            </button>
          </form>
        </div>
        <p className="mt-4 text-sm text-blue-600">
          Literally you probably haven't heard of them.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
