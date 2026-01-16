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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [activeTab]);

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
    <div>
      <Breadcrumb />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary-900">Reports & Analytics</h1>
        <p className="mt-2 text-secondary-600">View insights and statistics</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-secondary-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('skills')}
              className={`${
                activeTab === 'skills'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
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
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={skillsData.slice(0, 15)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#2563eb" name="Candidates" />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-secondary-900 mb-3">All Skills</h4>
                    <div className="space-y-2">
                      {skillsData.map((item: any, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-32 text-sm text-secondary-700">{item.skill}</div>
                          <div className="flex-1 mx-4">
                            <div className="bg-secondary-200 rounded-full h-4 overflow-hidden">
                              <div
                                className="bg-primary-600 h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${(item.count / (skillsData[0]?.count || 1)) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-12 text-sm font-semibold text-secondary-900">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                  <div className="text-center">
                    <p className="text-sm font-medium text-secondary-600 uppercase mb-2">
                      Total Candidates
                    </p>
                    <p className="text-4xl font-bold text-primary-600">
                      {pipelineStats.total_candidates || 0}
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-sm font-medium text-secondary-600 uppercase mb-2">
                      Active Jobs
                    </p>
                    <p className="text-4xl font-bold text-green-600">
                      {pipelineStats.active_jobs || 0}
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-sm font-medium text-secondary-600 uppercase mb-2">
                      Success Rate
                    </p>
                    <p className="text-4xl font-bold text-yellow-600">
                      {pipelineStats.success_rate?.toFixed(1) || 0}%
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-sm font-medium text-secondary-600 uppercase mb-2">
                      Failed Parses
                    </p>
                    <p className="text-4xl font-bold text-red-600">
                      {pipelineStats.failed_parses || 0}
                    </p>
                  </div>
                </Card>
              </div>

              {pipelineStats.average_score_by_job && pipelineStats.average_score_by_job.length > 0 && (
                <Card title="Average Scores by Job">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-secondary-200">
                      <thead className="bg-secondary-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                            Job Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                            Candidates Ranked
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                            Average Score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-secondary-200">
                        {pipelineStats.average_score_by_job.map((job: any, index: number) => (
                          <tr key={index} className="hover:bg-secondary-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                              {job.job_title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              {job.candidate_count}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                              <div className="flex items-center">
                                <div className="w-20 bg-secondary-200 rounded-full h-2 mr-3">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full"
                                    style={{ width: `${job.average_score}%` }}
                                  ></div>
                                </div>
                                {job.average_score?.toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
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
            <Card title="System Audit Logs">
              {auditLogs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-secondary-200">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                          Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-secondary-200">
                      {auditLogs.map((log: any, index: number) => (
                        <tr key={index} className="hover:bg-secondary-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {log.user_email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge variant="info">{log.action}</Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-secondary-600">
                            {log.details || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-secondary-600 py-8">No audit logs available</p>
              )}
            </Card>
          )}
        </>
      )}
    </div>
  );
};
