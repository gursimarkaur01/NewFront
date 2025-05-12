import { Link, useNavigate } from 'react-router-dom';
import './StudentNavbar.css'; // Make sure this file is created

const StudentNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="student-navbar">
      <div className="nav-left">
        <Link to="/student/dashboard">Dashboard</Link>
        {/* <Link to="/student/jobs">Jobs</Link> */}
        <Link to="/student/applications">Applications</Link>
        <Link to="/student/profile">Profile</Link>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default StudentNavbar;
