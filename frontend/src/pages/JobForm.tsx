import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { Job } from '../types';

export function JobForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    required_skills: [] as string[],
    nice_to_have: [] as string[],
    minimum_experience: 0,
    keywords: [] as string[],
    status: 'active' as 'active' | 'closed' | 'draft'
  });

  const [skillInput, setSkillInput] = useState('');
  const [niceToHaveInput, setNiceToHaveInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchJob(parseInt(id));
    }
  }, [id, isEdit]);

  const fetchJob = async (jobId: number) => {
    try {
      const job: Job = await jobsAPI.getById(jobId);
      setFormData({
        title: job.title,
        description: job.description || '',
        required_skills: job.required_skills || [],
        nice_to_have: job.nice_to_have || [],
        minimum_experience: job.minimum_experience,
        keywords: job.keywords || [],
        status: job.status
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to load job' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isEdit && id) {
        await jobsAPI.update(parseInt(id), formData);
        setMessage({ type: 'success', text: 'Job updated successfully!' });
      } else {
        await jobsAPI.create(formData);
        setMessage({ type: 'success', text: 'Job created successfully!' });
      }
      setTimeout(() => navigate('/jobs'), 1500);
    } catch (err: any) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.detail || `Failed to ${isEdit ? 'update' : 'create'} job` 
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        required_skills: [...prev.required_skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      required_skills: prev.required_skills.filter(s => s !== skill)
    }));
  };

  const addNiceToHave = () => {
    if (niceToHaveInput.trim() && !formData.nice_to_have.includes(niceToHaveInput.trim())) {
      setFormData(prev => ({
        ...prev,
        nice_to_have: [...prev.nice_to_have, niceToHaveInput.trim()]
      }));
      setNiceToHaveInput('');
    }
  };

  const removeNiceToHave = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      nice_to_have: prev.nice_to_have.filter(s => s !== skill)
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{isEdit ? 'Edit Job' : 'Create New Job'}</h1>
        <button onClick={() => navigate('/jobs')} className="btn-secondary">
          ← Back to Jobs
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              placeholder="e.g., Senior Python Developer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={4}
              placeholder="Describe the job position, responsibilities, and requirements..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="minimum_experience">Minimum Experience (years) *</label>
            <input
              id="minimum_experience"
              type="number"
              step="0.5"
              min="0"
              value={formData.minimum_experience}
              onChange={(e) => setFormData(prev => ({ ...prev, minimum_experience: parseFloat(e.target.value) }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Required Skills *</label>
            <div className="tag-input-group">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Type a skill and press Enter"
              />
              <button type="button" onClick={addSkill} className="btn-secondary btn-sm">
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.required_skills.map((skill, idx) => (
                <span key={idx} className="tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Nice to Have Skills</label>
            <div className="tag-input-group">
              <input
                type="text"
                value={niceToHaveInput}
                onChange={(e) => setNiceToHaveInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNiceToHave())}
                placeholder="Type a skill and press Enter"
              />
              <button type="button" onClick={addNiceToHave} className="btn-secondary btn-sm">
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.nice_to_have.map((skill, idx) => (
                <span key={idx} className="tag tag-secondary">
                  {skill}
                  <button type="button" onClick={() => removeNiceToHave(skill)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Keywords</label>
            <div className="tag-input-group">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                placeholder="Type a keyword and press Enter"
              />
              <button type="button" onClick={addKeyword} className="btn-secondary btn-sm">
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.keywords.map((keyword, idx) => (
                <span key={idx} className="tag tag-info">
                  {keyword}
                  <button type="button" onClick={() => removeKeyword(keyword)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {message && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/jobs')} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update Job' : 'Create Job')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
