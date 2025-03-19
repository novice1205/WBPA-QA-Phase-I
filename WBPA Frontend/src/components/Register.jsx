import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';  // Import react-hot-toast
import "../styles/Utils.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show a processing toast
    const toastId = toast.loading('Processing registration...',{position: 'bottom-right'});

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        email, name, password
      });
      console.log(response.data);

      // Update the toast with success message and close it after a delay
      toast.success('Registration successful! Redirecting to verify email...', { id: toastId, position: "bottom-right" });
      
      // Redirect to the verify email page after a short delay
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);

    } catch (error) {
      console.error(error);
      
      // Update the toast with an error message
      toast.error('Registration failed!', { id: toastId, position: "bottom-right"});
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 md:p-14 my-20 mx-9 font-poppins" style={{ backgroundColor: 'inherit', borderRadius: '10px' }}>
      <Toaster /> {/* Add Toaster component */}
      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600">Be a part of the solution to ensure cleaner and healthier water for all.</h1>
        <p className="text-blue-800">
        Sign up to access insights, predictions, and health tips tailored for your location.
        </p>
      </div>

      {/* Right section */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-blue-600">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-blue-600">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-blue-600">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded-md text-white bg-blue-600 hover:bg-blue-800"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-blue-600">
          Literally you probably haven't heard of them.
        </p>
        <p className="mt-4 text-sm text-blue-600">
          Already have an account? <a href="/login" onClick={handleSignIn} className="font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
