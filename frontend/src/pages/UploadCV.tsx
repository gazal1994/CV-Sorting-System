import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { candidatesAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Card, Button, Badge, LoadingSpinner } from '../components/UIComponents';
import Breadcrumb from '../components/Breadcrumb';

export function UploadCV() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast.error('Please select at least one CV file');
      return;
    }

    setLoading(true);

    try {
      const fileList = new DataTransfer();
      files.forEach(file => fileList.items.add(file));
      
      const uploadResults = await candidatesAPI.uploadCVs(fileList.files);
      setResults(uploadResults);
      toast.success(`Successfully processed ${uploadResults.length} CV(s)`);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to upload CVs');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div>
      <Breadcrumb />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Upload CVs</h1>
          <p className="mt-2 text-secondary-600">Upload multiple candidate CVs for automatic parsing</p>
        </div>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>

      <Card className="mb-6">
        <form onSubmit={handleUpload}>
          {/* Drag and Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? 'border-primary-600 bg-primary-50'
                : 'border-secondary-300 bg-secondary-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              id="cv-files"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
            
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 text-secondary-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              
              <p className="text-lg font-medium text-secondary-900 mb-2">
                Drag and drop CV files here
              </p>
              <p className="text-sm text-secondary-600 mb-4">
                or click to browse files
              </p>
              
              <Button
                type="button"
                variant="primary"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                📁 Browse Files
              </Button>
              
              <p className="text-xs text-secondary-500 mt-4">
                Supported formats: PDF, DOC, DOCX, TXT • Max 50 files
              </p>
            </div>
          </div>

          {/* Selected Files List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Selected Files ({files.length})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg border border-secondary-200"
                  >
                    <div className="flex items-center flex-1">
                      <svg className="w-8 h-8 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="flex-1">
                        <p className="font-medium text-secondary-900">{file.name}</p>
                        <p className="text-sm text-secondary-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={loading}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-6 flex justify-end space-x-3">
            {files.length > 0 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setFiles([])}
                disabled={loading}
              >
                Clear All
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={loading || files.length === 0}
              loading={loading}
            >
              {loading ? 'Processing...' : `Upload ${files.length} File(s)`}
            </Button>
          </div>
        </form>
      </Card>

      {/* Upload Results */}
      {results.length > 0 && (
        <Card title="Upload Results" className="mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Candidate Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {results.map((result, idx) => (
                  <tr key={idx} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {result.file_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {result.candidate_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={result.status === 'success' ? 'success' : 'error'}>
                        {result.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-600">
                      {result.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="primary" onClick={() => navigate('/candidates')}>
              View All Candidates →
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
