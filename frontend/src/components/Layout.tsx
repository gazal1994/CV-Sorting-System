import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['HR_ADMIN', 'HR_RECRUITER'] },
    { name: 'Upload CVs', path: '/upload', icon: '📤', roles: ['HR_ADMIN', 'HR_RECRUITER'] },
    { name: 'Candidates', path: '/candidates', icon: '👥', roles: ['HR_ADMIN', 'HR_RECRUITER'] },
    { name: 'Job Positions', path: '/jobs', icon: '💼', roles: ['HR_ADMIN', 'HR_RECRUITER'] },
    { name: 'Reports', path: '/reports', icon: '📈', roles: ['HR_ADMIN', 'HR_RECRUITER'] },
    { name: 'Admin', path: '/admin', icon: '⚙️', roles: ['HR_ADMIN'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || 'HR_RECRUITER')
  );

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Top Navbar */}
      <nav className="bg-primary-800 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-white hover:bg-primary-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-4 flex items-center">
                <span className="text-2xl font-bold">🎯</span>
                <span className="ml-2 text-xl font-semibold">CV Sorting System</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-primary-700 px-4 py-2 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium">{user?.email}</p>
                  <p className="text-primary-200 text-xs">{user?.role?.replace('_', ' ')}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex pt-16">
        <aside
          className={`fixed left-0 h-full bg-white shadow-lg transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden`}
        >
          <nav className="mt-6 px-4">
            {filteredNavigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-700 hover:bg-secondary-100'
                }`}
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
