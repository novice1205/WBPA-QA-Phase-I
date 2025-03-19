import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../styles/Utils.css";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams(); // Get the token from URL params
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', {position: "bottom-right"});
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/auth/reset-password/${token}`, { password });
      
      if (response.data.success) {
        toast.success('Password reset successful!', {position: "bottom-right"});
        navigate('/login'); // Redirect to login page after success
      } else {
        toast.error(response.data.message, {position: "bottom-right"});
      }
    } catch (error) {
      console.error('Error resetting password', error);
      toast.error('Something went wrong, please try again.', {position: "bottom-right"});
    }
  };

  const handleLogin = (e) =>{
    e.preventDefault();
    navigate('/login'); // Redirect to login page after clicking on "Login" button
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-40 mx-9 p-5 md:p-14 font-poppins" style={{ backgroundColor: 'inherit' }}>
      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">Reset Your Password</h1>
        <p className="text-blue-800">
          Create a new, strong password for your account to ensure your information stays secure.
        </p>
      </div>

      {/* Right section - Reset Password Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">Create New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-blue-600">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-600">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded-md text-white bg-blue-600 hover:bg-blue-800"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-sm text-blue-600">
          Remember your password? <a href="/login" onClick={handleLogin} className="font-medium hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
