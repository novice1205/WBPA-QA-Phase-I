"use client"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { ResponsiveContainer, Tooltip, Cell, Legend, PieChart, Pie } from "recharts"

const Recommendations = () => {
  const recommendations = [
    {
      title: "Implement Strict Water Quality Standards",
      description:
        "Establish and enforce rigorous water quality standards that align with or exceed international guidelines.",
    },
    {
      title: "Upgrade Water Treatment Facilities",
      description:
        "Invest in modern water treatment technologies to improve the efficiency and effectiveness of water purification processes.",
    },
    {
      title: "Regular Monitoring and Testing",
      description:
        "Conduct frequent water quality tests and maintain a comprehensive monitoring system to detect and address issues promptly.",
    },
    {
      title: "Protect Water Sources",
      description:
        "Implement measures to protect water sources from pollution, including buffer zones around water bodies and stricter regulations on industrial discharge.",
    },
    {
      title: "Public Education and Awareness",
      description:
        "Launch campaigns to educate the public about water conservation, proper waste disposal, and the importance of clean water.",
    },
    {
      title: "Improve Sewage and Wastewater Management",
      description:
        "Upgrade sewage treatment plants and expand sewage networks to reduce untreated wastewater entering water bodies.",
    },
    {
      title: "Encourage Green Infrastructure",
      description:
        "Promote the use of green infrastructure such as rain gardens and permeable pavements to naturally filter water and reduce runoff.",
    },
    {
      title: "Implement Water Conservation Measures",
      description:
        "Introduce water-saving technologies and practices to reduce overall water consumption and strain on water resources.",
    },
    {
      title: "Collaborate with Agricultural Sector",
      description:
        "Work with farmers to reduce agricultural runoff through better fertilizer management and erosion control practices.",
    },
    {
      title: "Invest in Research and Innovation",
      description:
        "Fund research into new water treatment technologies and support innovative solutions for improving water quality.",
    },
  ]

  // 🔥 Heatmap data (mock)
  const [heatmapData, setHeatmapData] = useState([
    { district: "Koramangala", severity: 80 },
    { district: "Whitefield", severity: 45 },
    { district: "Indiranagar", severity: 65 },
    { district: "JP Nagar", severity: 30 },
    { district: "Jayanagar", severity: 50 },
  ])

  const getColor = (value) => {
    if (value > 70) return "#dc2626" // red
    if (value > 50) return "#f97316" // orange
    if (value > 30) return "#facc15" // yellow
    return "#22c55e" // green
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recommendations for Improving Water Quality</h1>

      {/* 🧠 Heatmap visualization */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">District-Level Water Quality Risk Heatmap</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={heatmapData}
              dataKey="severity"
              nameKey="district"
              outerRadius={100}
              label
            >
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.severity)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-2">
          Risk is color-coded from green (low risk) to red (high contamination risk).
        </p>
      </div>

      {/* ✅ Recommendations cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <div className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2">{recommendation.title}</h2>
                <p className="text-gray-600">{recommendation.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Recommendations