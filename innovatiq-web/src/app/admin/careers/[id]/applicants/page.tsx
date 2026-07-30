'use client';

import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { ArrowLeft, ChevronDown, Eye, ExternalLink, FileText, ChevronUp, Download } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Applicant = any;

const STATUS_OPTIONS = ['Pending', 'Reviewed', 'Shortlisted', 'Rejected'];

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  reviewed:    { bg: 'rgba(244,63,94,0.10)',  color: '#E11D48', border: 'rgba(244,63,94,0.25)' },
  shortlisted: { bg: 'rgba(16,185,129,0.10)', color: '#059669', border: 'rgba(16,185,129,0.25)' },
  rejected:    { bg: 'rgba(220,38,38,0.10)',  color: '#DC2626', border: 'rgba(220,38,38,0.25)' },
  pending:     { bg: 'rgba(245,158,11,0.10)', color: '#D97706', border: 'rgba(245,158,11,0.25)' },
};

function getStatusStyle(status: string) {
  return statusColors[status?.toLowerCase()] || statusColors['pending'];
}

export default function ApplicantsPage() {
  const params = useParams();
  const careerId = params?.id as string;

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await authFetch(`${API}/job-applications/${careerId}`);
        const data = await res.json();
        setApplicants(Array.isArray(data) ? data : []);
      } catch {
        toast.error('Failed to load applicants');
      } finally {
        setLoading(false);
      }
    };
    if (careerId) fetchApplicants();
  }, [careerId]);

  const updateStatus = async (applicationId: string, status: string) => {
    setUpdating(applicationId);
    try {
      const token = getToken();
      const res = await fetch(`${API}/job-applications/application/${applicationId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: status.toLowerCase() }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setApplicants((prev) => prev.map((a) => (a._id === applicationId ? { ...a, status: status.toLowerCase() } : a)));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const HEADERS = ['Applicant', 'Email', 'Phone', 'Resume', 'Portfolio', 'Status', 'Update Status', 'Action'];

  return (
    <div className="min-h-screen pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin/careers"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer shrink-0"
            style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
            title="Back to careers"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F1F5F9';
              e.currentTarget.style.borderColor = '#94A3B8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Job Applicants</h1>
            <p className="text-sm font-semibold text-slate-600 mt-0.5">
              {applicants.length} applicant{applicants.length !== 1 ? 's' : ''} for this position
            </p>
          </div>
        </div>

        {applicants.length > 0 && (
          <button
            onClick={() => exportToExcel(
              applicants.map((a) => ({
                Name: a.name || '',
                Email: a.email || '',
                Phone: a.phone || '',
                'Portfolio Link': a.portfolioLink || '',
                'Resume URL': a.resume || '',
                Status: a.status || 'pending',
                'Personal Statement': a.coverLetter || '',
                'Applied Date': a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '',
              })),
              'applicants'
            )}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all hover:shadow-sm"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#047857', border: '1px solid rgba(16,185,129,0.3)' }}
          >
            <Download size={15} /> Export Excel
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl animate-pulse" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }} />
          ))}
        </div>
      ) : applicants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
          <FileText size={42} className="text-slate-300 mb-3" />
          <p className="text-base font-bold text-slate-700">No applicants found</p>
          <p className="text-xs font-medium text-slate-500 mt-1">Applications submitted for this job opening will appear here.</p>
        </div>
      ) : (
        /* Standard Admin Data Table Card */
        <div className="rounded-2xl border overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                  {HEADERS.map((h, i) => (
                    <th key={h} className={`px-5 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wider ${i === HEADERS.length - 1 ? 'text-right' : 'text-left'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => {
                  const s = getStatusStyle(applicant.status);
                  const isExpanded = expanded === applicant._id;

                  return (
                    <Fragment key={applicant._id}>
                      <tr className={`group transition-colors ${isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50/80'}`} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        {/* Applicant */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-xs"
                              style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C)' }}>
                              {(applicant.name || 'A').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{applicant.name || '-'}</p>
                              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                                {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString('en-GB') : '-'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-slate-800">{applicant.email || '-'}</p>
                        </td>

                        {/* Phone */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-slate-800">{applicant.phone || '-'}</p>
                        </td>

                        {/* Resume */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          {applicant.resumeName ? (
                            <button
                              onClick={async () => {
                                const token = getToken();
                                const res = await fetch(`/api/job-applications/application/${applicant._id}/resume`, {
                                  headers: { Authorization: `Bearer ${token}` },
                                });
                                if (!res.ok) { toast.error('Failed to load resume'); return; }
                                const blob = await res.blob();
                                const url = URL.createObjectURL(blob);
                                window.open(url, '_blank');
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:bg-rose-100 cursor-pointer"
                              style={{ background: 'rgba(190,18,60,0.08)', color: '#BE123C', border: '1px solid rgba(190,18,60,0.22)' }}>
                              <Eye size={13} /> View
                            </button>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400">—</span>
                          )}
                        </td>

                        {/* Portfolio */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          {applicant.portfolioLink ? (
                            <a href={applicant.portfolioLink} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-200"
                              style={{ background: '#F1F5F9', border: '1px solid #CBD5E1' }}>
                              <ExternalLink size={12} /> View
                            </a>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold capitalize"
                            style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                            {applicant.status || 'pending'}
                          </span>
                        </td>

                        {/* Update Status */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="relative inline-block w-36">
                            <select
                              value={applicant.status ? applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1) : 'Pending'}
                              disabled={updating === applicant._id}
                              onChange={(e) => updateStatus(applicant._id, e.target.value)}
                              className="w-full appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold text-slate-800 outline-none cursor-pointer disabled:opacity-60 transition-all hover:border-slate-400"
                              style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1' }}>
                              {STATUS_OPTIONS.map((st) => <option key={st} value={st}>{st}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                          </div>
                        </td>

                        {/* Action / Personal Statement Toggle */}
                        <td className="px-5 py-4 whitespace-nowrap text-right">
                          {applicant.coverLetter ? (
                            <button
                              onClick={() => setExpanded(isExpanded ? null : applicant._id)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer hover:bg-slate-200"
                              style={{
                                background: '#F8FAFC',
                                border: '1.5px solid #CBD5E1',
                                color: '#334155'
                              }}>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              Personal Statement
                            </button>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400">—</span>
                          )}
                        </td>
                      </tr>

                      {/* INLINE ROW EXPANSION DIRECTLY BENEATH THE CANDIDATE */}
                      {isExpanded && applicant.coverLetter && (
                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                          <td colSpan={8} className="px-6 py-4">
                            <div className="space-y-2 p-4 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                Personal Statement — <span className="text-rose-700 font-bold">{applicant.name}</span>
                              </p>
                              <p className="text-sm text-slate-800 leading-relaxed font-medium pt-1 whitespace-pre-wrap">
                                {applicant.coverLetter}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
