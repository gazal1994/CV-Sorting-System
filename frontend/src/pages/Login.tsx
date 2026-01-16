import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';
import { Button } from '../components/UIComponents';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      // Decode JWT to get user info (simplified - in production use proper JWT decode)
      const userInfo = {
        id: 1,
        email: email,
        full_name: email.includes('admin') ? 'Admin User' : 'Recruiter User',
        role: email.includes('admin') ? 'HR_ADMIN' as const : 'HR_RECRUITER' as const,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      
      login(userInfo, response.access_token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-4xl">🎯</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-secondary-900">
              CV Sorting System
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              Sign in to your account to continue
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-secondary-300 placeholder-secondary-500 text-secondary-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-secondary-300 placeholder-secondary-500 text-secondary-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={loading}
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
            <p className="text-xs text-secondary-600 font-semibold mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-secondary-600">
              <p><strong>Admin:</strong> admin@example.com / admin123</p>
              <p><strong>Recruiter:</strong> recruiter@example.com / recruiter123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
