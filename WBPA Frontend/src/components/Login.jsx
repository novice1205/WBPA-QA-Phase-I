import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';  // Import react-hot-toast
import '../styles/Utils.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show a processing toast
    const toastId = toast.loading('Logging in...', {position:"bottom-right"});

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log(response.data);

      // Update the toast with a success message
      toast.success('Login successful!', { id: toastId, position: "bottom-right" });

      // Redirect to the dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error(error);

      // Update the toast with an error message
      toast.error('Login failed! Please check your credentials.', { id: toastId, position: "bottom-right" });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    navigate('/forget-password');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 md:p-14 my-20 mx-9 poppins" style={{ backgroundColor: 'inherit' }}>
      <Toaster /> {/* Add Toaster component */}
      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold" style={{ color: '#2B6CB0' }}>Welcome Back</h1>
        <p style={{ color: '#4299E1', fontSize: "18px" }}>
          Log in to access your account and continue your journey with us.
        </p>
      </div>

      {/* Right section - Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#2B6CB0' }}>Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium" style={{ color: '#4299E1' }}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium" style={{ color: '#4299E1' }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-md text-white"
            style={{ backgroundColor: '#3182CE', hover: { backgroundColor: '#2C5282' } }}
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-sm" style={{ color: '#4299E1' }}>
          <a href="/forget-password" onClick={handleForgetPassword} className="hover:underline">Forgot password?</a>
        </div>
        <p className="mt-4 text-sm" style={{ color: '#4299E1' }}>
          Don't have an account? <a href="/register" onClick={handleSignUp} className="font-medium hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
