import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Jobs.css'; // CSS file we'll define below

const Jobs = () => {
  const { jobid } = useParams();
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://jobportal-backend-fufj.onrender.com/jobs/${jobid}`, {
          headers: {
            Authorization: token,
          },
        });
        setJob(response.data.job);
      } catch (error) {
        setMessage('Failed to fetch job details.');
      }
    };
    fetchJob();
  }, [jobid, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://jobportal-backend-fufj.onrender.com/jobs/apply`,
        { job_id: jobid },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage(response.data.message || 'Application submitted successfully!');
    } catch (err) {
      setMessage('Error while applying.');
    }
  };

  if (!job) return <p className="loading">Loading job details...</p>;

  return (
    <div className="job-details-container">
      <div className="job-header">
        <h2>{job.title}</h2>
        <p className="company-name">{job.company}</p>
        <p className="job-type">{job.type || 'Full-time'}</p>
        <p className="job-description">{job.description || 'No description available.'}</p>
        <button className="apply-toggle-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Apply Now'}
        </button>
      </div>

      {showForm && (
        <form className="apply-form" onSubmit={handleSubmit}>
          <p><strong>You're applying to:</strong> {job.title} at {job.company}</p>
          <button className="submit-btn" type="submit">Submit Application</button>
        </form>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Jobs;
