"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import { fetchHealthPredictions } from "./apiutils"

const mockLocations = ["Koramangala", "Indiranagar", "Whitefield", "Jayanagar", "JP Nagar"]
const mockLakes = {
  Koramangala: ["Bellandur Lake", "Madiwala Lake"],
  Indiranagar: ["Ulsoor Lake", "Sankey Tank"],
  Whitefield: ["Varthur Lake", "Kundalahalli Lake"],
  Jayanagar: ["Lalbagh Lake", "Yediyur Lake"],
  "JP Nagar": ["Puttenahalli Lake", "Sarakki Lake"],
}

const HealthReports = () => {
  const [formData, setFormData] = useState({
    location: "",
    nearbyWaterBody: "",
    waterQualityCategory: "",
  })
  const [report, setReport] = useState({ diseases: [] })
  
  useEffect(() => {
    if (formData.location) {
      setFormData((prev) => ({ ...prev, nearbyWaterBody: mockLakes[formData.location]?.[0] || "" }))
    }
  }, [formData.location])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateReport = async (e) => {
    e.preventDefault()
    try {
      const diseases = await fetchHealthPredictions(formData)
      setReport({
        location: formData.location,
        nearbyWaterBody: formData.nearbyWaterBody,
        waterQualityCategory: formData.waterQualityCategory,
        diseases,
      })
    } catch (error) {
      console.error("Error generating report:", error)
    }
  }

  const downloadReport = () => {
    if (!report || !report.diseases.length) return

    const pdf = new jsPDF()
    let yPosition = 20

    pdf.setFontSize(18)
    pdf.text("Water Quality Health Report", 20, yPosition)
    yPosition += 10

    pdf.setFontSize(12)
    pdf.text(`Location: ${report.location}`, 20, yPosition)
    yPosition += 10
    pdf.text(`Nearby Water Body: ${report.nearbyWaterBody}`, 20, yPosition)
    yPosition += 10
    pdf.text(`Water Quality Category: ${report.waterQualityCategory}`, 20, yPosition)
    yPosition += 20

    pdf.setFontSize(14)
    pdf.text("Potential Water-borne Diseases:", 20, yPosition)
    yPosition += 10

    pdf.setFontSize(12)
    report.diseases.forEach((disease, index) => {
      pdf.text(`${index + 1}. ${disease}`, 20, yPosition)
      yPosition += 7
    })

    pdf.save("water_quality_health_report.pdf")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Health Reports</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <form onSubmit={generateReport} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a location</option>
                {mockLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nearbyWaterBody">
                Nearby Lake/Reservoir
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nearbyWaterBody"
                name="nearbyWaterBody"
                value={formData.nearbyWaterBody}
                onChange={handleInputChange}
                required
              >
                {mockLakes[formData.location]?.map((lake) => (
                  <option key={lake} value={lake}>{lake}</option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waterQualityCategory">
                Water Quality Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="waterQualityCategory"
                name="waterQualityCategory"
                value={formData.waterQualityCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
                <option value="Very Poor">Very Poor</option>
              </select>
            </div>
            <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded" type="submit">
              Generate Report
            </button>
          </form>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Generated Report</h2>
            <p><strong>Location:</strong> {report.location}</p>
            <p><strong>Nearby Water Body:</strong> {report.nearbyWaterBody}</p>
            <p><strong>Water Quality Category:</strong> {report.waterQualityCategory}</p>
            <h3 className="text-xl font-bold mt-4 mb-2">Potential Water-borne Diseases:</h3>
            <ul className="list-disc pl-5">
              {report.diseases.map((disease, index) => (
                <li key={index}>{disease}</li>
              ))}
            </ul>
            <button onClick={downloadReport} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
            Download Report<Download className="mr-2 mx-4" size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HealthReports
