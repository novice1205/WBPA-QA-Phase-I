import React from 'react';

const UserContent = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">User Information</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <p className="mt-1 text-sm text-gray-900">Parth Raheja</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 text-sm text-gray-900">parth@gmail.com</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <p className="mt-1 text-sm text-gray-900">PESU Boys Hostel BSK 3rd Stage</p>
      </div>
    </div>
  </div>
);

export default UserContent;

