import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { candidatesAPI, jobsAPI, reportsAPI } from '../services/api';
import { Card, LoadingSpinner, Button } from '../components/UIComponents';
import Breadcrumb from '../components/Breadcrumb';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [candidates, jobs, pipelineStats] = await Promise.all([
        candidatesAPI.getAll(),
        jobsAPI.getAll(),
        reportsAPI.getPipelineStats(),
      ]);

      setStats({
        totalCandidates: candidates.length,
        totalJobs: jobs.length,
        ...pipelineStats,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <p className="mt-2 text-base text-secondary-600">Welcome back, {user?.full_name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 uppercase">Total Candidates</p>
              <p className="mt-2 text-3xl font-bold text-secondary-900">{stats?.total_candidates || 0}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 uppercase">Active Jobs</p>
              <p className="mt-2 text-3xl font-bold text-secondary-900">{stats?.active_jobs || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 uppercase">Parse Success Rate</p>
              <p className="mt-2 text-3xl font-bold text-secondary-900">{stats?.success_rate?.toFixed(1) || 0}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 uppercase">Total Jobs</p>
              <p className="mt-2 text-3xl font-bold text-secondary-900">{stats?.total_jobs || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions" className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Button onClick={() => navigate('/upload')} variant="primary" className="w-full">
            📤 Upload CVs
          </Button>
          <Button onClick={() => navigate('/jobs/new')} variant="success" className="w-full">
            ➕ Create Job
          </Button>
          <Button onClick={() => navigate('/candidates')} variant="secondary" className="w-full">
            👥 View Candidates
          </Button>
          <Button onClick={() => navigate('/reports')} variant="secondary" className="w-full">
            📈 View Reports
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      {stats?.average_score_by_job && stats.average_score_by_job.length > 0 && (
        <Card title="Recent Job Rankings">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider hidden sm:table-cell">Candidates</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Avg Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {stats.average_score_by_job.map((job: any) => (
                  <tr key={job.job_id} className="hover:bg-secondary-50">
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-secondary-900"><div className="max-w-xs truncate">{job.job_title}</div></td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-secondary-600 hidden sm:table-cell">{job.candidate_count}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-secondary-600">{job.average_score?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
