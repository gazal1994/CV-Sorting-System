import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Navbar.css';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        CV Sorting System
      </Link>

      <ul className="navbar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/candidates">Candidates</Link></li>
        <li><Link to="/upload">Upload CVs</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        {user?.role === 'HR_ADMIN' && (
          <li><Link to="/admin/users">Users</Link></li>
        )}
      </ul>

      <div className="navbar-user">
        <span className="user-name">{user?.full_name}</span>
        <span className="user-role">{user?.role}</span>
        <button onClick={handleLogout} className="btn btn-secondary btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}
