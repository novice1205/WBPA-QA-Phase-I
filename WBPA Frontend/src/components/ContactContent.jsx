import React from 'react';

const ContactContent = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4299E1] focus:border-[#4299E1]" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4299E1] focus:border-[#4299E1]" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4299E1] focus:border-[#4299E1]"></textarea>
      </div>
      <button type="submit" className="bg-[#4299E1] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
        Send Message
      </button>
    </form>
  </div>
);

export default ContactContent;