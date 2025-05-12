import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./AdminDashboard.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1"];

const AdminDashboard = () => {
  const [pieData, setPieData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [placementRate, setPlacementRate] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    axios
      .get("https://jobportal-backend-fufj.onrender.com/admin/jobs/dashboard", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPieData(res.data.pieData);
        setTotalStudents(res.data.totalStudents);
        setPlacementRate(res.data.placementRate);
      })
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="summary-cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="card">
          <h3>Placement Rate</h3>
          <p>{placementRate}%</p>
        </div>
      </div>

      <h3>Applications per Job</h3>
      <div className="chart-and-data">
        {Array.isArray(pieData) && pieData.length > 0 ? (
          <>
            <PieChart width={500} height={400}>
              <Pie
                data={pieData}
                dataKey="count"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div className="job-data-list">
              <h4>Detailed Application Counts</h4>
              <ul>
                {pieData.map((job, index) => (
                  <li key={index}>
                    <span className="dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <strong>{job.title}:</strong> {job.count} applications
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>Loading or no job application data found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
