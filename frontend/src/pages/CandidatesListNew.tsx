import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { candidatesAPI } from '../services/api';
import { toast } from 'react-toastify';
import { 
  Card, 
  LoadingSpinner, 
  Button, 
  Badge, 
  ConfirmModal,
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableCell 
} from '../components/UIComponents';
import Breadcrumb from '../components/Breadcrumb';

export const CandidatesList: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 20;

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    setLoading(true);
    try {
      const data = await candidatesAPI.getAll();
      setCandidates(data);
      toast.success(`Loaded ${data.length} candidates`);
    } catch (error: any) {
      toast.error('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    
    try {
      await candidatesAPI.delete(deleteModal.id);
      toast.success('Candidate deleted successfully');
      setCandidates(candidates.filter(c => c.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (error: any) {
      toast.error('Failed to delete candidate');
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (sortField === 'skills') {
      aVal = a.skills?.length || 0;
      bVal = b.skills?.length || 0;
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedCandidates = sortedCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  if (loading) {
    return <LoadingSpinner text="Loading candidates..." />;
  }

  return (
    <div>
      <Breadcrumb />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Candidates</h1>
          <p className="mt-2 text-secondary-600">Manage and view all candidates</p>
        </div>
        <Button onClick={() => navigate('/upload')} variant="primary">
          📤 Upload New CVs
        </Button>
      </div>

      <Card>
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-secondary-600">
            Showing {paginatedCandidates.length} of {candidates.length} candidates
          </div>
        </div>

        <Table>
          <TableHead>
            <tr>
              <TableHeader sortable onClick={() => handleSort('name')}>
                Name
              </TableHeader>
              <TableHeader sortable onClick={() => handleSort('email')}>
                Email
              </TableHeader>
              <TableHeader sortable onClick={() => handleSort('years_of_experience')}>
                Experience
              </TableHeader>
              <TableHeader sortable onClick={() => handleSort('skills')}>
                Skills
              </TableHeader>
              <TableHeader>Parse Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {paginatedCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-secondary-50">
                <TableCell className="font-medium">{candidate.name || 'N/A'}</TableCell>
                <TableCell>{candidate.email || 'N/A'}</TableCell>
                <TableCell>
                  {candidate.years_of_experience ? `${candidate.years_of_experience} years` : 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills?.slice(0, 3).map((skill: string, idx: number) => (
                      <Badge key={idx} variant="info">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills?.length > 3 && (
                      <Badge variant="secondary">+{candidate.skills.length - 3}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={candidate.parse_status === 'SUCCESS' ? 'success' : 'error'}>
                    {candidate.parse_status || 'PENDING'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => setDeleteModal({ isOpen: true, id: candidate.id })}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-secondary-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </Card>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Candidate"
        message="Are you sure you want to delete this candidate? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
      />
    </div>
  );
};
