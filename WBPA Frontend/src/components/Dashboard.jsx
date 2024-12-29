import React, { useState } from 'react';
import { Home, User, BarChart2, Mail, LogOut, Menu, X, DropletsIcon as WaterDrop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {toast, Toaster } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import "../styles/Utils.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleSignOut = (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging out...',{position: "bottom-right"});
    toast.success('Logout successful!', { position: "bottom-right", id: toastId });
    // Redirect to the dashboard after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />;
      case 'user':
        return <UserContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-poppins">
      {/* Navbar */}
      <nav className="bg-[#2c5282] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <WaterDrop className="h-8 w-8 mr-2" />
              <span className="text-xl font-semibold">Water Body Property Analyzer</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem icon={<Home className="w-5 h-5" />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
                <NavItem icon={<User className="w-5 h-5" />} label="User Info" active={activeTab === 'user'} onClick={() => setActiveTab('user')} />
                <NavItem icon={<BarChart2 className="w-5 h-5" />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                <NavItem icon={<Mail className="w-5 h-5" />} label="Contact Us" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
              </div>
            </div>
            <div className="hidden md:block">
              <button onClick={handleSignOut} className="flex items-center text-white hover:text-blue-200 transition-colors duration-200">
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white hover:text-blue-200 focus:outline-none">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem icon={<Home className="w-5 h-5" />} label="Home" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); toggleMenu(); }} />
              <NavItem icon={<User className="w-5 h-5" />} label="User Info" active={activeTab === 'user'} onClick={() => { setActiveTab('user'); toggleMenu(); }} />
              <NavItem icon={<BarChart2 className="w-5 h-5" />} label="Analytics" active={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); toggleMenu(); }} />
              <NavItem icon={<Mail className="w-5 h-5" />} label="Contact Us" active={activeTab === 'contact'} onClick={() => { setActiveTab('contact'); toggleMenu(); }} />
              <button onClick={handleSignOut} className="flex items-center w-full text-left px-3 py-2 text-white hover:bg-blue-700 transition-colors duration-200">
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
      active ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-600 hover:text-white'
    } transition-colors duration-200`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const HomeContent = () => {
  // Placeholder data for water quality (you can replace this with dynamic data later)
  const waterQualityData = [
    { name: 'Week 1', quality: 85 },
    { name: 'Week 2', quality: 88 },
    { name: 'Week 3', quality: 87 },
    { name: 'Week 4', quality: 89 },
  ];

  // Placeholder data for water composition (you can replace this with dynamic data later)
  const waterCompositionData = [
    { name: 'Oxygen', value: 60 },
    { name: 'Hydrogen', value: 30 },
    { name: 'Minerals', value: 7 },
    { name: 'Other', value: 3 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Welcome to Water Quality Dashboard</h3>
        <p className="text-gray-600 mb-4">
          Here you can check water quality predictions, view your information, and access analytics.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Water Quality This Month</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterQualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quality" fill="#4299E1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Water Composition</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={waterCompositionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {waterCompositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const UserContent = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">User Information</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <p className="mt-1 text-sm text-gray-900">John Doe</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 text-sm text-gray-900">johndoe@example.com</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <p className="mt-1 text-sm text-gray-900">123 Water St, Cityville, State, 12345</p>
      </div>
    </div>
  </div>
);

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
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
        Check Water Quality
      </button>
    </div>
  </div>
);

const ContactContent = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
        Send Message
      </button>
    </form>
  </div>
);

export default Dashboard;