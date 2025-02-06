import React from 'react';

const AnalyticsContent = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Water Quality Analytics</h3>
    <p className="text-gray-600 mb-4">
      Use our prediction model to check water quality in your area.
    </p>
    <div className="space-y-4">
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input type="text" id="location" name="location" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your location" />
      </div>
      <div>
        <label htmlFor="lake" className="block text-sm font-medium text-gray-700">Nearby Lake</label>
        <input type="text" id="lake" name="lake" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter nearby lake" />
      </div>
      <button className="bg-[#4299E1] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
        Check Water Quality
      </button>
    </div>
  </div>
);

export default AnalyticsContent;