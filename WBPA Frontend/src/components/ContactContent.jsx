import {React, useState} from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

const ContactContent = () => {
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[phone,setPhone] = useState("");
  const[subject,setSubject] = useState("");
  const[message,setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/auth/sendfeedback`, {
        name,email,phone,subject,message
      });
      toast.success('Thank you for the feedback!', { position: "bottom-right" });
      console.log(response.data);
    }catch (error){
      console.error(error);
    }
  }
  
  return (
  <div className="bg-white shadow-lg rounded-xl p-8 w-full mx-auto border border-gray-200">
    <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Get In Touch</h3>
    
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className="relative">
        <FiUser className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <input 
          type="text" 
          name={name} 
          placeholder="Your Full Name" 
          onChange={(e)=>setName(e.target.value)}
          className="pl-10 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
          required
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <FiMail className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <input 
          type="email" 
          name={email} 
          placeholder="Your Email Address"
          onChange={(e)=>setEmail(e.target.value)} 
          className="pl-10 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="relative">
        <FiPhone className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <input 
          type="tel" 
          name={phone} 
          placeholder="Your Phone Number (Optional)"
          onChange={(e)=>setPhone(e.target.value)}
          className="pl-10 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
        />
      </div>

      {/* Subject Field */}
      <div>
        <input 
          type="text" 
          name={subject} 
          placeholder="Subject"
          onChange={(e)=>setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-black focus:border-black"
          required
        />
      </div>

      {/* Message Field */}
      <div className="relative">
        <FiMessageSquare className="absolute left-3 top-3.5 text-gray-500 text-lg" />
        <textarea 
          name={message}
          rows="4"
          onChange={(e)=>setMessage(e.target.value)}
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
)};

export default ContactContent;