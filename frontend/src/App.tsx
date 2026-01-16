import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UploadCV } from './pages/UploadCV';
import { CandidatesList } from './pages/CandidatesList';
import { CandidateDetail } from './pages/CandidateDetail';
import { JobsList } from './pages/JobsList';
import { JobForm } from './pages/JobForm';
import { RankCandidates } from './pages/RankCandidates';
import { Reports } from './pages/Reports';
import './index.css';

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadCV />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidates"
              element={
                <ProtectedRoute>
                  <CandidatesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidates/:id"
              element={
                <ProtectedRoute>
                  <CandidateDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <JobsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/new"
              element={
                <ProtectedRoute>
                  <JobForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute>
                  <JobForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id/rank"
              element={
                <ProtectedRoute>
                  <RankCandidates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

    </BrowserRouter>
  );
}

export default App;
