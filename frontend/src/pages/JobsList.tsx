import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { Job } from '../types';

export function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsAPI.getAll();
      setJobs(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      await jobsAPI.delete(id);
      fetchJobs();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Job Positions ({jobs.length})</h1>
        <div className="header-actions">
          <button onClick={() => navigate('/jobs/new')} className="btn-primary">
            + Create Job
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {jobs.length === 0 ? (
        <div className="card">
          <p className="text-center">No jobs found. Create your first job position!</p>
          <div className="text-center" style={{ marginTop: '1rem' }}>
            <button onClick={() => navigate('/jobs/new')} className="btn-primary">
              Create Job
            </button>
          </div>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="card job-card">
              <div className="job-card-header">
                <h3>{job.title}</h3>
                <span className={`badge badge-${job.status === 'active' ? 'success' : 'secondary'}`}>
                  {job.status}
                </span>
              </div>
              
              <p className="job-description">{job.description}</p>
              
              <div className="job-details">
                <div>
                  <strong>Min Experience:</strong> {job.minimum_experience} years
                </div>
                <div>
                  <strong>Required Skills:</strong>
                  <div className="skills-list">
                    {job.required_skills?.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="badge badge-skill">{skill}</span>
                    ))}
                    {job.required_skills && job.required_skills.length > 3 && (
                      <span className="badge badge-secondary">
                        +{job.required_skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="job-card-actions">
                <button 
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="btn-secondary btn-sm"
                >
                  View Details
                </button>
                <button 
                  onClick={() => navigate(`/jobs/${job.id}/rank`)}
                  className="btn-primary btn-sm"
                >
                  Rank Candidates
                </button>
                <button 
                  onClick={() => handleDelete(job.id)}
                  className="btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
