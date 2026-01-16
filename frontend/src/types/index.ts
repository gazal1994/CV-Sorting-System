"""TypeScript type definitions"""

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'HR_ADMIN' | 'HR_RECRUITER';
  is_active: boolean;
  created_at: string;
}

export interface Candidate {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  education?: string;
  years_of_experience: number;
  skills: string[];
  languages: string[];
  file_path?: string;
  file_name?: string;
  file_type?: string;
  parse_status: string;
  parse_error?: string;
  created_at: string;
  updated_at?: string;
}

export interface Job {
  id: number;
  title: string;
  description?: string;
  required_skills: string[];
  nice_to_have: string[];
  minimum_experience: number;
  keywords: string[];
  status: 'active' | 'closed' | 'draft';
  created_by: number;
  created_at: string;
  updated_at?: string;
}

export interface CandidateScore {
  id: number;
  candidate_id: number;
  job_id: number;
  total_score: number;
  skills_score: number;
  experience_score: number;
  keywords_score: number;
  rank?: number;
  explanation?: string;
  matched_skills: string[];
  missing_skills: string[];
  created_at: string;
  candidate: Candidate;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UploadResponse {
  filename: string;
  status: string;
  candidate_id?: number;
  error?: string;
}

export interface SkillFrequency {
  skill: string;
  count: number;
  percentage: number;
}

export interface SkillsFrequencyReport {
  job_id: number;
  job_title: string;
  total_candidates: number;
  skills: SkillFrequency[];
}

export interface PipelineStats {
  total_candidates: number;
  parsed_successfully: number;
  parse_failed: number;
  success_rate: number;
  total_jobs: number;
  active_jobs: number;
  average_score_by_job: Array<{
    job_id: number;
    job_title: string;
    average_score: number;
    candidate_count: number;
  }>;
}
