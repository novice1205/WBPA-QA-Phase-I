"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { fetchHealthPredictions } from "./apiutils"

const AnalyticsContent = () => {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [nearbyLakes, setNearbyLakes] = useState([])
  const [selectedLake, setSelectedLake] = useState("")
  const [waterQualityData, setWaterQualityData] = useState(null)
  const [healthPredictions, setHealthPredictions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLocations = async () => {
      const mockLocations = ["Koramangala", "Indiranagar", "Whitefield", "Jayanagar", "JP Nagar"]
      setLocations(mockLocations)
    }
    fetchLocations()
  }, [])

  useEffect(() => {
    if (selectedLocation) {
      const fetchNearbyLakes = async () => {
        const mockLakes = {
          Koramangala: ["Bellandur Lake", "Madiwala Lake"],
          Indiranagar: ["Ulsoor Lake", "Sankey Tank"],
          Whitefield: ["Varthur Lake", "Kundalahalli Lake"],
          Jayanagar: ["Lalbagh Lake", "Yediyur Lake"],
          "JP Nagar": ["Puttenahalli Lake", "Sarakki Lake"],
        }
        setNearbyLakes(mockLakes[selectedLocation] || [])
      }
      fetchNearbyLakes()
    }
  }, [selectedLocation])

  // ✅ Function to generate new random water quality values within valid ranges
  const generateRandomWaterQualityData = () => {
    return {
      pH: Array.from({ length: 3 }, (_, i) => ({ name: `Sample ${i + 1}`, value: parseFloat((6.5 + Math.random() * 2).toFixed(2)) })), // pH (6.5 - 8.5)
      TDS: Array.from({ length: 3 }, (_, i) => ({ name: `Sample ${i + 1}`, value: Math.floor(100 + Math.random() * 400) })), // TDS (100 - 500 mg/L)
      dissolvedO2: Array.from({ length: 3 }, (_, i) => ({ name: `Sample ${i + 1}`, value: parseFloat((5 + Math.random() * 5).toFixed(2)) })), // DO (5 - 10 mg/L)
    }
  }

  const fetchWaterQualityData = async () => {
    if (!selectedLocation || !selectedLake) {
      alert("Please select both a location and a lake");
      return;
    }

    setLoading(true);
    try {
        // 🔥 Generate new water quality values dynamically
        const newData = generateRandomWaterQualityData();
        setWaterQualityData(newData);

        // Fetch health predictions
        const predictions = await fetchHealthPredictions(newData);
        setHealthPredictions(Array.isArray(predictions) ? predictions : [predictions]);

    } catch (error) {
        console.error("Error fetching water quality data:", error);
        alert("Failed to fetch data. Please try again.");
        setHealthPredictions(["Error retrieving predictions."]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Water Quality Analytics</h3>
      <p className="text-gray-600 mb-4">Use our prediction model to check water quality in your area.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            id="location"
            name="location"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lake" className="block text-sm font-medium text-gray-700">
            Nearby Lake
          </label>
          <select
            id="lake"
            name="lake"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedLake}
            onChange={(e) => setSelectedLake(e.target.value)}
            disabled={!selectedLocation}
          >
            <option value="">Select a lake</option>
            {nearbyLakes.map((lake) => (
              <option key={lake} value={lake}>
                {lake}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-[#4299E1] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          onClick={fetchWaterQualityData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Check Water Quality"}
        </button>
      </div>

      {waterQualityData && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Water Quality Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(waterQualityData).map((key) => (
              <div key={key} className="h-80">
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

      {healthPredictions.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Health Predictions</h4>
          <ul className="list-disc pl-5">
            {healthPredictions.map((prediction, index) => (
              <li key={index} className="mb-2">{prediction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AnalyticsContent
