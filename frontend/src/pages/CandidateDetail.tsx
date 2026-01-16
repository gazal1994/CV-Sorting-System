import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { candidatesAPI } from '../services/api';
import { Candidate } from '../types';

export function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCandidate(parseInt(id));
    }
  }, [id]);

  const fetchCandidate = async (candidateId: number) => {
    try {
      setLoading(true);
      const data = await candidatesAPI.getById(candidateId);
      setCandidate(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load candidate');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">Loading candidate details...</div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="page-container">
        <div className="alert alert-error">{error || 'Candidate not found'}</div>
        <button onClick={() => navigate('/candidates')} className="btn-secondary">
          ← Back to Candidates
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{candidate.name}</h1>
        <button onClick={() => navigate(-1)} className="btn-secondary">
          ← Back
        </button>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Contact Information</h2>
          <div className="info-grid">
            <div>
              <strong>Email:</strong>
              <p>{candidate.email || 'Not provided'}</p>
            </div>
            <div>
              <strong>Phone:</strong>
              <p>{candidate.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Experience & Education</h2>
          <div className="info-grid">
            <div>
              <strong>Years of Experience:</strong>
              <p>{candidate.years_of_experience?.toFixed(1) || '0'} years</p>
            </div>
            <div>
              <strong>Education:</strong>
              <p>{candidate.education || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Skills</h2>
        {candidate.skills && candidate.skills.length > 0 ? (
          <div className="skills-list">
            {candidate.skills.map((skill, idx) => (
              <span key={idx} className="badge badge-skill">{skill}</span>
            ))}
          </div>
        ) : (
          <p>No skills extracted</p>
        )}
      </div>

      <div className="card">
        <h2>Languages</h2>
        {candidate.languages && candidate.languages.length > 0 ? (
          <div className="skills-list">
            {candidate.languages.map((lang, idx) => (
              <span key={idx} className="badge badge-secondary">{lang}</span>
            ))}
          </div>
        ) : (
          <p>No languages extracted</p>
        )}
      </div>

      <div className="card">
        <h2>File Information</h2>
        <div className="info-grid">
          <div>
            <strong>File Name:</strong>
            <p>{candidate.file_name}</p>
          </div>
          <div>
            <strong>File Type:</strong>
            <p>{candidate.file_type?.toUpperCase()}</p>
          </div>
          <div>
            <strong>Parse Status:</strong>
            <p>
              <span className={`badge badge-${candidate.parse_status === 'success' ? 'success' : 'warning'}`}>
                {candidate.parse_status}
              </span>
            </p>
          </div>
          <div>
            <strong>Uploaded:</strong>
            <p>{new Date(candidate.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {candidate.raw_text && (
        <div className="card">
          <h2>Raw CV Text</h2>
          <pre className="raw-text">{candidate.raw_text}</pre>
        </div>
      )}
    </div>
  );
}
