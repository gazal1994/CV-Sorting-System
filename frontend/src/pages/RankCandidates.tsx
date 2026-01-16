import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, matchingAPI } from '../services/api';
import { Job, CandidateScore } from '../types';

export function RankCandidates() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [results, setResults] = useState<CandidateScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchJob(parseInt(id));
      fetchResults(parseInt(id));
    }
  }, [id]);

  const fetchJob = async (jobId: number) => {
    try {
      const data = await jobsAPI.getById(jobId);
      setJob(data);
    } catch (err: any) {
      setError('Failed to load job details');
    }
  };

  const fetchResults = async (jobId: number) => {
    try {
      const data = await matchingAPI.getResults(jobId);
      setResults(data);
    } catch (err: any) {
      // Results might not exist yet, that's okay
      console.log('No existing results');
    }
  };

  const handleRank = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await matchingAPI.rankCandidates(parseInt(id));
      setResults(data.ranked_candidates || []);
      alert(`Successfully ranked ${data.ranked_candidates?.length || 0} candidates!`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to rank candidates');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="page-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Rank Candidates</h1>
          <p className="subtitle">{job.title}</p>
        </div>
        <button onClick={() => navigate(`/jobs/${id}`)} className="btn-secondary">
          ← Back to Job
        </button>
      </div>

      <div className="card">
        <div className="ranking-header">
          <div>
            <h3>Job Requirements</h3>
            <div className="job-info">
              <div><strong>Min Experience:</strong> {job.minimum_experience} years</div>
              <div>
                <strong>Required Skills:</strong>{' '}
                {job.required_skills?.join(', ') || 'None'}
              </div>
            </div>
          </div>
          <button 
            onClick={handleRank} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Ranking...' : '🎯 Run Ranking Algorithm'}
          </button>
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}
      </div>

      {results.length > 0 ? (
        <div className="card">
          <h2>Ranking Results ({results.length} candidates)</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Candidate</th>
                <th>Total Score</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Keywords</th>
                <th>Matched Skills</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className={result.rank <= 3 ? 'top-candidate' : ''}>
                  <td>
                    <strong className={`rank-badge rank-${result.rank}`}>
                      #{result.rank}
                    </strong>
                  </td>
                  <td>
                    <strong>{result.candidate_name}</strong>
                  </td>
                  <td>
                    <div className="score-badge score-total">
                      {result.total_score.toFixed(1)}
                    </div>
                  </td>
                  <td>
                    <div className="score-badge">
                      {result.skills_score.toFixed(1)}
                    </div>
                  </td>
                  <td>
                    <div className="score-badge">
                      {result.experience_score.toFixed(1)}
                    </div>
                  </td>
                  <td>
                    <div className="score-badge">
                      {result.keywords_score.toFixed(1)}
                    </div>
                  </td>
                  <td>
                    <div className="skills-list">
                      {result.matched_skills?.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="badge badge-success">{skill}</span>
                      ))}
                      {result.matched_skills && result.matched_skills.length > 3 && (
                        <span className="badge badge-secondary">
                          +{result.matched_skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => navigate(`/candidates/${result.candidate_id}`)}
                      className="btn-sm btn-secondary"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ranking-explanation">
            <h3>Scoring Breakdown</h3>
            <ul>
              <li><strong>Skills Score (50 points):</strong> Based on matching required and nice-to-have skills</li>
              <li><strong>Experience Score (30 points):</strong> Based on years of experience vs minimum requirement</li>
              <li><strong>Keywords Score (20 points):</strong> Based on matching keywords in CV</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="card">
          <p className="text-center">
            No ranking results yet. Click "Run Ranking Algorithm" to rank candidates for this job.
          </p>
        </div>
      )}
    </div>
  );
}
