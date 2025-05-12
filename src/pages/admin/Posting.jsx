import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./post.css";

const Posting = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    const token = localStorage.getItem("admin-token");

    axios
      .get("https://jobportal-backend-fufj.onrender.com/jobs", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setJobs(res.data.jobs))
      .catch((err) => console.error("Failed to fetch jobs", err));
  };

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem("admin-token");

    try {
      await axios.delete(`https://jobportal-backend-fufj.onrender.com/admin/job/${jobId}`, {
        headers: {
          Authorization: token,
        },
      });

      // Remove the deleted job from state
      setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
      alert("Job deleted successfully");
    } catch (error) {
      console.error("Failed to delete job", error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Job Opportunities For You</h2>
      <div className="job-card-grid">
        {jobs.map((job) => (
          <div key={job.job_id} className="job-card">
            <div className="job-card-header">
              <h3 className="job-title">{job.title}</h3>
              <span className="job-type">{job.type || "Full-time"}</span>
            </div>
            <p className="company-name">{job.company}</p>
            <p className="job-description">
              {job.description || "No description provided."}
            </p>
            <div className="apply-button-container">
              <button
                className="apply-button"
                onClick={() => handleDelete(job.job_id)}
              >
                Delete Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posting;
