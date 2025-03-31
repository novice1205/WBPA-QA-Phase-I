import React, { useState } from "react";
import { FiUser, FiMail, FiHome, FiMapPin, FiEdit2, FiSave, FiPlusCircle, FiTrash2 } from "react-icons/fi";

const UserContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [customFields, setCustomFields] = useState([]);
  const [userData, setUserData] = useState({
    name: "Parth Raheja",
    email: "parthraheja1205@gmail.com",
    address: "PESU Boys Hostel, BSK 3rd Stage, Karnataka - 560085",
    lake: "",
    custom: {},
  });

  const nearbyLakes = ["Ulsoor Lake", "Bellandur Lake", "Varthur Lake", "Hebbal Lake", "Other"];

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedCustom = { ...userData.custom, [index]: value };
    setUserData({ ...userData, custom: updatedCustom });
  };

  const addCustomField = () => {
    setCustomFields([...customFields, ""]);
  };

  const removeCustomField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    const updatedCustom = { ...userData.custom };
    delete updatedCustom[index];
    setCustomFields(updatedFields);
    setUserData({ ...userData, custom: updatedCustom });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">User Information</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition"
        >
          {isEditing ? <FiSave className="mr-2" /> : <FiEdit2 className="mr-2" />}
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div className="flex items-center border border-gray-300 rounded-lg p-3 shadow-sm">
          <FiUser className="text-gray-500 mr-3" />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          ) : (
            <span className="text-gray-900">{userData.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 rounded-lg p-3 shadow-sm">
          <FiMail className="text-gray-500 mr-3" />
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          ) : (
            <span className="text-gray-900">{userData.email}</span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-center border border-gray-300 rounded-lg p-3 shadow-sm">
          <FiHome className="text-gray-500 mr-3" />
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          ) : (
            <span className="text-gray-900">{userData.address}</span>
          )}
        </div>

        {/* Nearby Lake Dropdown */}
        <div className="flex items-center border border-gray-300 rounded-lg p-3 shadow-sm">
          <FiMapPin className="text-gray-500 mr-3" />
          {isEditing ? (
            <select
              name="lake"
              value={userData.lake}
              onChange={handleInputChange}
              className="w-full bg-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select Nearby Lake</option>
              {nearbyLakes.map((lake, index) => (
                <option key={index} value={lake}>
                  {lake}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-gray-900">{userData.lake || "Not Selected"}</span>
          )}
        </div>

        {/* Dynamic Custom Fields */}
        {customFields.map((_, index) => (
          <div key={index} className="flex items-center border border-gray-300 rounded-lg p-3 shadow-sm">
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder={`Custom Field ${index + 1}`}
                  value={userData.custom[index] || ""}
                  onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                  className="w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeCustomField(index)}
                  className="text-red-500 hover:text-red-700 transition ml-2"
                >
                  <FiTrash2 size={20} />
                </button>
              </>
            ) : (
              <span className="text-gray-900">{userData.custom[index] || "Not Provided"}</span>
            )}
          </div>
        ))}

        {/* Add Custom Field Button */}
        {isEditing && (
          <button
            type="button"
            onClick={addCustomField}
            className="flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FiPlusCircle className="mr-2" />
            Add Field
          </button>
        )}
      </div>
    </div>
  );
};

export default UserContent;