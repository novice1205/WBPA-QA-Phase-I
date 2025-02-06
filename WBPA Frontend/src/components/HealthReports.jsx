"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import jsPDF from "jspdf"

const HealthReports = () => {
  const [formData, setFormData] = useState({
    location: "",
    nearbyWaterBody: "",
    waterQualityCategory: "",
  })
  const [report, setReport] = useState(null)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateReport = (e) => {
    e.preventDefault()
    // In a real application, this data would be sent to a backend for processing
    // Here, we'll simulate a report generation
    const diseases = [
      {
        name: "Cholera",
        description:
          "An acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.",
      },
      {
        name: "Typhoid Fever",
        description:
          "A bacterial infection that can spread throughout the body, affecting many organs. It is caused by Salmonella typhi.",
      },
      {
        name: "Giardiasis",
        description:
          "A diarrheal disease caused by the microscopic parasite Giardia. It is found on surfaces or in soil, food, or water that has been contaminated with feces from infected humans or animals.",
      },
      {
        name: "Hepatitis A",
        description:
          "A highly contagious liver infection caused by the hepatitis A virus. It can be spread through contaminated food or water.",
      },
    ]

    setReport({
      location: formData.location,
      nearbyWaterBody: formData.nearbyWaterBody,
      waterQualityCategory: formData.waterQualityCategory,
      diseases: diseases,
    })
  }

  const downloadReport = () => {
    if (!report) return

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
    report.diseases.forEach((disease) => {
      pdf.text(`${disease.name}:`, 20, yPosition)
      yPosition += 7
      const descriptionLines = pdf.splitTextToSize(disease.description, 170)
      pdf.text(descriptionLines, 25, yPosition)
      yPosition += 7 * descriptionLines.length + 5
    })

    pdf.save("water_quality_health_report.pdf")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Health Reports</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <form onSubmit={generateReport} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nearbyWaterBody">
                Nearby Lake/Reservoir
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nearbyWaterBody"
                type="text"
                name="nearbyWaterBody"
                value={formData.nearbyWaterBody}
                onChange={handleInputChange}
                required
              />
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
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Generate Report
              </button>
            </div>
          </form>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          {report && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-4">Generated Report</h2>
              <p>
                <strong>Location:</strong> {report.location}
              </p>
              <p>
                <strong>Nearby Water Body:</strong> {report.nearbyWaterBody}
              </p>
              <p>
                <strong>Water Quality Category:</strong> {report.waterQualityCategory}
              </p>
              <h3 className="text-xl font-bold mt-4 mb-2">Potential Water-borne Diseases:</h3>
              <ul className="list-disc pl-5">
                {report.diseases.map((disease, index) => (
                  <li key={index} className="mb-2">
                    <strong>{disease.name}:</strong> {disease.description}
                  </li>
                ))}
              </ul>
              <button
                onClick={downloadReport}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <Download className="mr-2" size={20} />
                Download Report
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default HealthReports