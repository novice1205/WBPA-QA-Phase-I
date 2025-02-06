"use client"
import { useState } from "react"
import {
  Home,
  User,
  BarChart2,
  Mail,
  LogOut,
  Menu,
  X,
  DropletsIcon as WaterDrop,
  FileText,
  Lightbulb,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import HomeContent from "./HomeContent"
import UserContent from "./UserContent"
import AnalyticsContent from "./AnalyticsContent"
import ContactContent from "./ContactContent"
import HealthReports from "./HealthReports"
import Recommendations from "./Recommendations"
import "../styles/Utils.css"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()
  const handleSignOut = (e) => {
    e.preventDefault()
    navigate("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />
      case "user":
        return <UserContent />
      case "analytics":
        return <AnalyticsContent />
      case "contact":
        return <ContactContent />
      case "health-reports":
        return <HealthReports />
      case "recommendations":
        return <Recommendations />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-blue-800 to-blue-900 text-white w-64 min-h-screen p-4 flex flex-col transition-all duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
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
          <NavItem
            icon={<Home className="w-5 h-5" />}
            label="Home"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <NavItem
            icon={<User className="w-5 h-5" />}
            label="User Info"
            active={activeTab === "user"}
            onClick={() => setActiveTab("user")}
          />
          <NavItem
            icon={<BarChart2 className="w-5 h-5" />}
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Health Reports"
            active={activeTab === "health-reports"}
            onClick={() => setActiveTab("health-reports")}
          />
          <NavItem
            icon={<Lightbulb className="w-5 h-5" />}
            label="Recommendations"
            active={activeTab === "recommendations"}
            onClick={() => setActiveTab("recommendations")}
          />
          <NavItem
            icon={<Mail className="w-5 h-5" />}
            label="Contact Us"
            active={activeTab === "contact"}
            onClick={() => setActiveTab("contact")}
          />
        </nav>
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-2 text-white bg-red-400 hover:bg-red-500 rounded transition-colors duration-200"
        >
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
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")}
            </h2>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
      active ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-700 hover:text-white"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
)

export default Dashboard

