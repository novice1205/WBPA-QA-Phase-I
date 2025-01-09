import React, { useState, useEffect } from 'react';
import { Home, User, BarChart2, Mail, LogOut, Menu, X, DropletsIcon as WaterDrop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import "../styles/Utils.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleSignOut = (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging out...', {position:"bottom-right"});

    // Update the toast with a success message
    toast.success('Logout successful!', { id: toastId, position: "bottom-right" });
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

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
    <div className="flex h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-blue-800 to-blue-900 text-white w-64 min-h-screen p-4 flex flex-col transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <WaterDrop className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">WBPA-QA</span>
          </div>
          <button onClick={toggleMenu} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 mb-auto">
          <NavItem icon={<Home className="w-5 h-5" />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<User className="w-5 h-5" />} label="User Info" active={activeTab === 'user'} onClick={() => setActiveTab('user')} />
          <NavItem icon={<BarChart2 className="w-5 h-5" />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <NavItem icon={<Mail className="w-5 h-5" />} label="Contact Us" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
        </nav>
        <button onClick={handleSignOut} className="flex items-center w-full px-4 py-2 text-white bg-red-400 hover:bg-red-500 rounded transition-colors duration-200">
          <LogOut className="w-5 h-5 mr-2" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
      active ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:shadow-lg">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
    {children}
  </div>
);

const HomeContent = () => {
  const waterQualityData = [
    { name: 'Week 1', quality: 85 },
    { name: 'Week 2', quality: 88 },
    { name: 'Week 3', quality: 87 },
    { name: 'Week 4', quality: 89 },
  ];

  const generatePieData = () => [
    { name: 'Excellent', value: Math.floor(Math.random() * 40) + 30 },
    { name: 'Good', value: Math.floor(Math.random() * 30) + 20 },
    { name: 'Fair', value: Math.floor(Math.random() * 20) + 10 },
    { name: 'Poor', value: Math.floor(Math.random() * 10) + 5 },
  ];

  const previousMonthData = generatePieData();
  const currentMonthData = generatePieData();
  const nextMonthPrediction = generatePieData();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Welcome to WBPA-QA Dashboard</h3>
        <p className="text-gray-600">
          Here you can check water quality predictions, view your information, and access analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ChartCard title="Water Quality This Month">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterQualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quality" fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <ChartCard title="Current Month Water Quality">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentMonthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {currentMonthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ChartCard title="Previous Month Water Quality">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={previousMonthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {previousMonthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Next Month Water Quality Prediction">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nextMonthPrediction}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {nextMonthPrediction.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

const UserContent = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">User Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-sm text-gray-900">Parth Raheja</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-sm text-gray-900">parthraheja1205@gmail.com</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <p className="mt-1 text-sm text-gray-900">PESU Boys Hostel, BSK 3rd Stage, Bangalore, Karnataka - 560085</p>
        </div>
      </div>
    </div>
  );
};

const AnalyticsContent = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Water Quality Analytics</h3>
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
      <button className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors duration-200">
        Check Water Quality
      </button>
    </div>
  </div>
);

const ContactContent = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
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
      <button type="submit" className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors duration-200">
        Send Message
      </button>
    </form>
  </div>
);

export default Dashboard;

