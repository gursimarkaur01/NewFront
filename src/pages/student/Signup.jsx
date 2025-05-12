import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [enroll_id, setEnrollId] = useState('');
  const [semail, setEmail] = useState('');
  const [sname, setName] = useState('');
  const [spassword, setPassword] = useState('');
  const [sbranch, setBranch] = useState('');
  const [sresume_link, setResumeLink] = useState('');
  const [sphoto_link, setPhotoLink] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch('https://jobportal-backend-fufj.onrender.com/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enroll_id, semail, sname, spassword, sbranch, sresume_link, sphoto_link }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/student/login'), 1500);
    } else {
      setMessage(data.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Student Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input type="text" placeholder="Enrollment ID" value={enroll_id} onChange={(e) => setEnrollId(e.target.value)} required />
        <input type="email" placeholder="Email" value={semail} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={sname} onChange={(e) => setName(e.target.value)} required />
        <input type="password" placeholder="Password" value={spassword} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Branch" value={sbranch} onChange={(e) => setBranch(e.target.value)} required />
        <input type="url" placeholder="Resume Link" value={sresume_link} onChange={(e) => setResumeLink(e.target.value)} required />
        <input type="url" placeholder="Photo Link" value={sphoto_link} onChange={(e) => setPhotoLink(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <a href="/student/login" className="signref">Login here</a>
      {message && <p className="signup-message">{message}</p>}
    </div>
  );
};

export default Signup;
