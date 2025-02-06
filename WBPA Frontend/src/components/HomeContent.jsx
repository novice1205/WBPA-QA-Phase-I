import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

export default HomeContent;

