"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { fetchHealthPredictions } from "./apiutils";
import { FaHeartbeat } from "react-icons/fa"; // Icon for health prediction UI

const AnalyticsContent = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [nearbyLakes, setNearbyLakes] = useState([]);
  const [selectedLake, setSelectedLake] = useState("");
  const [waterQualityData, setWaterQualityData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [healthPredictions, setHealthPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📌 Fetch locations dynamically
  useEffect(() => {
    setLocations(["Koramangala", "Indiranagar", "Whitefield", "Jayanagar", "JP Nagar"]);
  }, []);

  // 📌 Fetch nearby lakes based on selected location
  useEffect(() => {
    if (selectedLocation) {
      const mockLakes = {
        Koramangala: ["Bellandur Lake", "Madiwala Lake"],
        Indiranagar: ["Ulsoor Lake", "Sankey Tank"],
        Whitefield: ["Varthur Lake", "Kundalahalli Lake"],
        Jayanagar: ["Lalbagh Lake", "Yediyur Lake"],
        "JP Nagar": ["Puttenahalli Lake", "Sarakki Lake"],
      };
      setNearbyLakes(mockLakes[selectedLocation] || []);
    }
  }, [selectedLocation]);

  // ✅ Generate random water quality data
  const generateRandomWaterQualityData = () => ({
    pH: Array.from({ length: 3 }, (_, i) => ({
      name: `Sample ${i + 1}`,
      value: parseFloat((6.5 + Math.random() * 2).toFixed(2)), // pH (6.5 - 8.5)
    })),
    TDS: Array.from({ length: 3 }, (_, i) => ({
      name: `Sample ${i + 1}`,
      value: Math.floor(100 + Math.random() * 400), // TDS (100 - 500 mg/L)
    })),
    dissolvedO2: Array.from({ length: 3 }, (_, i) => ({
      name: `Sample ${i + 1}`,
      value: parseFloat((5 + Math.random() * 5).toFixed(2)), // DO (5 - 10 mg/L)
    })),
  });

  // 📌 Fetch water quality data + health predictions
  const fetchWaterQualityData = async () => {
    if (!selectedLocation || !selectedLake) {
      alert("Please select both a location and a lake");
      return;
    }

    setLoading(true);
    try {
      const newData = generateRandomWaterQualityData();
      setWaterQualityData(newData);

      // 📌 Update historical data for trends
      setHistoricalData((prev) => [
        ...prev.slice(-5), // Keep last 5 records
        { date: new Date().toLocaleTimeString(), pH: newData.pH[0].value, TDS: newData.TDS[0].value, dissolvedO2: newData.dissolvedO2[0].value },
      ]);

      // 📌 Fetch health predictions
      const predictions = await fetchHealthPredictions(newData);
      setHealthPredictions(Array.isArray(predictions) ? predictions : [predictions]);
    } catch (error) {
      console.error("Error fetching water quality data:", error);
      alert("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Water Quality Analytics</h3>
      <p className="text-gray-600 mb-6">Analyze water quality levels and predicted health impacts in real-time.</p>

      {/* 📌 Location & Lake Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nearby Lake</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedLake}
            onChange={(e) => setSelectedLake(e.target.value)}
            disabled={!selectedLocation}
          >
            <option value="">Select a lake</option>
            {nearbyLakes.map((lake) => (
              <option key={lake} value={lake}>{lake}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 📌 Fetch Button */}
      <button
        className="mt-6 w-full bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200"
        onClick={fetchWaterQualityData}
        disabled={loading}
      >
        {loading ? "Loading..." : "Check Water Quality"}
      </button>

      {/* 📌 Water Quality Results */}
      {waterQualityData && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Water Quality Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(waterQualityData).map((key) => (
              <div key={key} className="h-80 bg-gray-50 p-4 rounded-lg shadow-sm">
                <h5 className="text-center font-semibold mb-2">{key.toUpperCase()} Levels</h5>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterQualityData[key]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill={key === "pH" ? "#8884d8" : key === "TDS" ? "#82ca9d" : "#ffc658"} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📌 Water Quality Trends (Updated for Bold Lines) */}
      {historicalData.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Water Quality Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pH" stroke="#FF5733" strokeWidth={3} />
              <Line type="monotone" dataKey="TDS" stroke="#4287f5" strokeWidth={3} />
              <Line type="monotone" dataKey="dissolvedO2" stroke="#2ECC71" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 📌 Health Predictions (Modern Stylish Cards) */}
      {healthPredictions.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Health Predictions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthPredictions.map((prediction, index) => (
              <div key={index} className="bg-red-100 p-4 rounded-lg shadow-md flex items-center">
                <FaHeartbeat className="text-red-600 text-3xl mr-3" />
                <p className="text-red-900 font-medium">{prediction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsContent;