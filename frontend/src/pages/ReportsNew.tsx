import React, { useEffect, useState } from 'react';
import { reportsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Card, LoadingSpinner, Badge } from '../components/UIComponents';
import Breadcrumb from '../components/Breadcrumb';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'pipeline' | 'audit'>('skills');
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [pipelineStats, setPipelineStats] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Audit log filters
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  useEffect(() => {
    // Filter audit logs when filters change
    if (activeTab === 'audit') {
      filterAuditLogs();
    }
  }, [searchTerm, actionFilter, dateFrom, dateTo, auditLogs]);

  const filterAuditLogs = () => {
    let filtered = [...auditLogs];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Action filter
    if (actionFilter && actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter);
    }
    
    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(dateFrom));
    }
    if (dateTo) {
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59);
      filtered = filtered.filter(log => new Date(log.timestamp) <= endDate);
    }
    
    setFilteredLogs(filtered);
  };

  const exportToCSV = () => {
    const logs = filteredLogs.length > 0 ? filteredLogs : auditLogs;
    const headers = ['Timestamp', 'User', 'Action', 'Details'];
    const rows = logs.map(log => [
      new Date(log.timestamp).toLocaleString(),
      log.user_email || 'N/A',
      log.action || 'N/A',
      log.details || 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Audit logs exported successfully');
  };

  const getUniqueActions = () => {
    return Array.from(new Set(auditLogs.map(log => log.action))).filter(Boolean);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActionFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'skills') {
        const data = await reportsAPI.getSkillsFrequency();
        setSkillsData(data);
      } else if (activeTab === 'pipeline') {
        const data = await reportsAPI.getPipelineStats();
        setPipelineStats(data);
      } else if (activeTab === 'audit') {
        const data = await reportsAPI.getAuditLogs();
        setAuditLogs(data);
      }
    } catch (error: any) {
      toast.error(`Failed to load ${activeTab} data`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Reports & Analytics</h1>
        <p className="mt-2 text-base text-secondary-600">View insights and statistics</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-secondary-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-4 sm:space-x-8">
            <button
              onClick={() => setActiveTab('skills')}
              className={`${
                activeTab === 'skills'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-3 sm:px-2 border-b-2 font-medium text-sm transition-colors">
            >
              📊 Skills Frequency
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`${
                activeTab === 'pipeline'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              📈 Pipeline Statistics
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`${
                activeTab === 'audit'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              📝 Audit Logs
            </button>
          </nav>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading report data..." />
      ) : (
        <>
          {/* Skills Frequency Tab */}
          {activeTab === 'skills' && (
            <Card title="Top Skills Across All Candidates">
              {skillsData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={300} className="sm:h-96">
                    <BarChart data={skillsData.slice(0, 15)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 11 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#2563eb" name="Candidates" />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-secondary-900 mb-3 text-base">All Skills</h4>
                    <div className="space-y-2">
                      {skillsData.map((item: any, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-28 text-sm text-secondary-700 truncate">{item.skill}</div>
                          <div className="flex-1 mx-4">
                            <div className="bg-secondary-200 rounded-full h-5 sm:h-6 overflow-hidden">
                              <div
                                className="bg-primary-600 h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${(item.count / (skillsData[0]?.count || 1)) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-12 text-sm font-semibold text-secondary-900 text-right">
                            {item.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-secondary-600 py-8">No skills data available</p>
              )}
            </Card>
          )}

          {/* Pipeline Statistics Tab */}
          {activeTab === 'pipeline' && pipelineStats && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
                <Card>
                  <div className="text-center">
                    <p className="text-xs font-medium text-secondary-600 uppercase mb-2">
                      Total Candidates
                    </p>
                    <p className="text-3xl font-bold text-primary-600">
                      {pipelineStats.total_candidates || 0}
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-xs font-medium text-secondary-600 uppercase mb-2">
                      Active Jobs
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {pipelineStats.active_jobs || 0}
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-xs font-medium text-secondary-600 uppercase mb-2">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {pipelineStats.success_rate?.toFixed(1) || 0}%
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-xs font-medium text-secondary-600 uppercase mb-2">
                      Failed Parses
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {pipelineStats.failed_parses || 0}
                    </p>
                  </div>
                </Card>
              </div>

              {pipelineStats.average_score_by_job && pipelineStats.average_score_by_job.length > 0 && (
                <Card title="Average Scores by Job">
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <table className="min-w-full divide-y divide-secondary-200">
                      <thead className="bg-secondary-50">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider hidden sm:table-cell">
                            Candidates Ranked
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Avg Score
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider hidden md:table-cell">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-secondary-200">
                        {pipelineStats.average_score_by_job.map((job: any, index: number) => (
                          <tr key={index} className="hover:bg-secondary-50">
                            <td className="px-4 sm:px-6 py-4 text-sm font-medium text-secondary-900">
                              <div className="max-w-xs truncate">{job.job_title}</div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-secondary-600 hidden sm:table-cell">
                              {job.candidate_count}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              <div className="flex items-center">
                                <div className="w-20 bg-secondary-200 rounded-full h-2 mr-3">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full"
                                    style={{ width: `${job.average_score}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{job.average_score?.toFixed(1)}</span>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                              <Badge variant={job.average_score > 70 ? 'success' : 'warning'}>
                                {job.average_score > 70 ? 'Good Match' : 'Needs Review'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Audit Logs Tab */}
          {activeTab === 'audit' && (
            <div>
              {/* Filters Section */}
              <Card className="mb-6">
                <h3 className="text-base font-semibold text-secondary-900 mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="User, action, or details..."
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                  </div>
                  
                  {/* Action Filter */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Action Type
                    </label>
                    <select
                      value={actionFilter}
                      onChange={(e) => setActionFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    >
                      <option value="all">All Actions</option>
                      {getUniqueActions().map(action => (
                        <option key={action} value={action}>{action}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Date From */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                  </div>
                  
                  {/* Date To */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-secondary-700 bg-white border border-secondary-300 rounded-md hover:bg-secondary-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export to CSV
                  </button>
                  <div className="ml-auto text-sm text-secondary-600 flex items-center">
                    Showing {filteredLogs.length > 0 ? filteredLogs.length : auditLogs.length} of {auditLogs.length} logs
                  </div>
                </div>
              </Card>

              {/* Logs Table */}
              <Card title="System Audit Logs">
                {(filteredLogs.length > 0 || auditLogs.length > 0) ? (
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <table className="min-w-full divide-y divide-secondary-200">
                      <thead className="bg-secondary-50">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider hidden sm:table-cell">
                            User
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Action
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider hidden md:table-cell">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-secondary-200">
                        {(filteredLogs.length > 0 ? filteredLogs : auditLogs).map((log: any, index: number) => (
                          <tr key={index} className="hover:bg-secondary-50">
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              {new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-secondary-900 hidden sm:table-cell">
                              {log.user_email}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                              <Badge variant="info">{log.action}</Badge>
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm text-secondary-600 hidden md:table-cell">
                              <div className="max-w-xs truncate">{log.details || 'N/A'}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-secondary-600 py-8">
                    {searchTerm || actionFilter !== 'all' || dateFrom || dateTo 
                      ? 'No logs match your filters' 
                      : 'No audit logs available'}
                  </p>
                )}
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};
