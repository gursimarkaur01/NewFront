import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-links">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/jobs/new">Create Job</Link>
        <Link to="/admin/applications">Applications</Link>
        <Link to="/admin/status">Postings</Link>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default AdminNavbar;
