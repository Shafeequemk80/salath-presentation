import React, { useEffect, useState } from "react";
import { api } from "../api";
import AnalyticsCard from "./AnalyticsCard";

function AdminDashboard() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [topUsers, setTopUsers] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await api("/admin/dashboard", { method: "GET" });
        console.log(data);

        setTotalAmount(data.totalAmount);
        setTopUsers(data.topUsers);

        const formattedChartData = data.graphData.map((item) => ({
          date: item._id,
          value: item.total,
        }));

        setChartData(formattedChartData);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Total Amount */}
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Total Amount</h2>
        <p className="text-xl font-bold text-green-600">₹{totalAmount}</p>
      </div>

      {/* Top Users */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🏆 Top 4 Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topUsers.map((user, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  Rank #{idx + 1}
                </span>
                <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-1 rounded-lg">
                  {user.total} salats
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow">
                  {user.name.charAt(0)}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-800">
                  {user.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Analytics</h2>
        {/* You can integrate a chart library like Recharts or Chart.js here */}
        <AnalyticsCard chartData={chartData} />
      </div>
    </div>
  );
}

export default AdminDashboard;
