import { useState } from 'react';
import "./jobs.css";

const AdminCreateJob = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('admin-token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://jobportal-backend-fufj.onrender.com/admin/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        company,
        location,
        description: desc,
      }),
    });

    const data = await res.json();
    setMessage(data.message);
    setTitle('');
    setCompany('');
    setLocation('');
    setDesc('');
  };

  return (
    <div className="admin-job-container">
      <h2>Create New Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit">Post Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminCreateJob;
