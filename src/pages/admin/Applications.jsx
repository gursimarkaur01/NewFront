import { useEffect, useState } from "react";
import "./adminApplications.css";

const AdminApplications = () => {
  const [apps, setApps] = useState([]);
  const token = localStorage.getItem("admin-token");

  const fetchApps = async () => {
    const res = await fetch("https://jobportal-backend-fufj.onrender.com/admin/applications", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setApps(data.applications || []);
  };

  const updateStatus = async (appId, status) => {
    await fetch(`https://jobportal-backend-fufj.onrender.com/admin/application/${appId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });
    fetchApps(); // Refresh after update
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="admin-applications">
      <h2>All Applications</h2>
      <div className="apps-list">
        {apps.map((app) => (
          <div className="app-card" key={app.app_id}>
            <h4>{app.title} @ {app.company}</h4>
            <p><strong>Student ID:</strong> {app.stu_id}</p>
            <p><strong>Status:</strong> {app.status}</p>
            <div className="actions">
              <button onClick={() => updateStatus(app.app_id, "Selected")} className="select">
                Mark Selected
              </button>
              <button onClick={() => updateStatus(app.app_id, "Rejected")} className="reject">
                Mark Rejected
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminApplications;
