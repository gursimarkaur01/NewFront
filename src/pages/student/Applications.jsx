import { useEffect, useState } from "react";
import axios from "axios";
import "./Applications.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("https://jobportal-backend-fufj.onrender.com/jobs/application/status", {
          headers: {
            Authorization: token,
          },
        });
        setApplications(res.data.applications);
      } catch (err) {
        setError("Failed to fetch applications.");
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications-container">
      <h2 className="applications-title">Your Applications</h2>
      {error && <p className="error-text">{error}</p>}
      {applications.length === 0 ? (
        <p className="empty-text">You have not applied to any jobs yet.</p>
      ) : (
        <div className="applications-grid">
          {applications.map((app, index) => (
            <div key={index} className="application-card">
              <h3 className="job-title">{app.title}</h3>
              <p className="company-name">{app.company}</p>
              <p className={`status ${app.status.toLowerCase()}`}>status:</p>
              <span className={`status ${app.status.toLowerCase()}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
