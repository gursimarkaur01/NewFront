import { useEffect, useState } from 'react';
import "./adminApplications.css";

const AdminApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('admin-token');

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch('https://jobportal-backend-fufj.onrender.com/jobs', {
          headers: { Authorization: token },
          method:GET
        });
        const data = await res.json();
        setApps(data.applications || []);
      } catch (err) {
        setError('Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [token]);

  return (
    <div className="admin-applications-container">
      <h2>All Job Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : apps.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {apps.map((app, i) => (
            <li key={i} className="application-card">
              <p><strong>Student ID:</strong> {app.student_id}</p>
              <p><strong>Job ID:</strong> {app.job_id}</p>
              <p><strong>Status:</strong> {app.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApplications;
