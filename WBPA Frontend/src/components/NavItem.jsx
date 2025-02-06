import React from 'react';

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center w-full px-4 py-2 text-left ${
      active ? 'bg-blue-700' : 'hover:bg-blue-700'
    } transition-colors duration-200`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

export default NavItem;