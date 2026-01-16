import axios from 'axios';
import type { LoginRequest, TokenResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/api/auth/login', credentials);
    return response.data;
  },
};

// Candidates API
export const candidatesAPI = {
  upload: async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    
    const response = await api.post('/api/candidates/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/api/candidates');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/api/candidates/${id}`);
    return response.data;
  },
  
  update: async (id: number, data: any) => {
    const response = await api.put(`/api/candidates/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/api/candidates/${id}`);
    return response.data;
  },
};

// Jobs API
export const jobsAPI = {
  create: async (data: any) => {
    const response = await api.post('/api/jobs', data);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/api/jobs');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/api/jobs/${id}`);
    return response.data;
  },
  
  update: async (id: number, data: any) => {
    const response = await api.put(`/api/jobs/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/api/jobs/${id}`);
    return response.data;
  },
};

// Matching API
export const matchingAPI = {
  rankCandidates: async (jobId: number) => {
    const response = await api.post('/api/matching/rank', { job_id: jobId });
    return response.data;
  },
  
  getResults: async (jobId: number) => {
    const response = await api.get(`/api/matching/results/${jobId}`);
    return response.data;
  },
};

// Reports API
export const reportsAPI = {
  getSkillsFrequency: async (jobId: number) => {
    const response = await api.get(`/api/reports/skills-frequency/${jobId}`);
    return response.data;
  },
  
  getPipelineStats: async () => {
    const response = await api.get('/api/reports/pipeline-stats');
    return response.data;
  },
  
  getAuditLogs: async () => {
    const response = await api.get('/api/reports/audit-logs');
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/api/users');
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await api.post('/api/users', data);
    return response.data;
  },
  
  update: async (id: number, data: any) => {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  },
};

export default api;
