import React from 'react';
import { FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

const ContactContent = () => (
  <div className="bg-white shadow-lg rounded-xl p-8 w-full mx-auto border border-gray-200">
    <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Contact Us</h3>
    
    <form className="space-y-5" method="POST" action="/">
      {/* Name Field */}
      <div className="relative">
        <FiUser className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <input 
          type="text" 
          name="name" 
          placeholder="Your Full Name" 
          className="pl-10 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
          required
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <FiMail className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email Address" 
          className="pl-10 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="relative">
        <FiPhone className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Your Phone Number (Optional)" 
          className="pl-10 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
        />
      </div>

      {/* Subject Field */}
      <div>
        <input 
          type="text" 
          name="subject" 
          placeholder="Subject" 
          className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
          required
        />
      </div>

      {/* Message Field */}
      <div className="relative">
        <FiMessageSquare className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <textarea 
          name="message" 
          rows="4" 
          placeholder="Write your message here..." 
          className="pl-10 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-blue-700 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-800 transition"
      >
        Send Message
      </button>
    </form>
  </div>
);

export default ContactContent;