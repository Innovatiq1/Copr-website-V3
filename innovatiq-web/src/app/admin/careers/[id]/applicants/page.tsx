'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { ArrowLeft, ChevronDown, Eye, ExternalLink, FileText, ChevronUp, Download } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Applicant = any;

const STATUS_OPTIONS = ['Pending', 'Reviewed', 'Shortlisted', 'Rejected'];

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  reviewed:    { bg: 'rgba(244,63,94,0.08)',  color: '#E11D48', border: 'rgba(244,63,94,0.2)' },
  shortlisted: { bg: 'rgba(16,185,129,0.08)', color: '#059669', border: 'rgba(16,185,129,0.2)' },
  rejected:    { bg: 'rgba(220,38,38,0.08)',  color: '#DC2626', border: 'rgba(220,38,38,0.2)' },
  pending:     { bg: 'rgba(245,158,11,0.08)', color: '#D97706', border: 'rgba(245,158,11,0.2)' },
};

function getStatusStyle(status: string) {
  return statusColors[status?.toLowerCase()] || statusColors['pending'];
}

export default function ApplicantsPage() {
  const params = useParams();
  const careerId = params?.id as string;

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await authFetch(`${API}/job-applications/${careerId}`);
        const data = await res.json();
        setApplicants(Array.isArray(data) ? data : []);
      } catch {
        setError('Failed to load applicants');
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
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/careers" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Applicants</h1>
            <p className="text-slate-500 text-sm mt-1">{applicants.length} applicant{applicants.length !== 1 ? 's' : ''} for this position</p>
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
                'Cover Letter': a.coverLetter || '',
                'Applied Date': a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '',
              })),
              'applicants'
            )}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <Download size={16} /> Export Excel
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: '#F1F5F9' }} />
          ))}
        </div>
      ) : applicants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <FileText size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No applicants yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applicants.map((applicant) => {
            const s = getStatusStyle(applicant.status);
            const isExpanded = expanded === applicant._id;

            return (
              <div key={applicant._id} className="rounded-2xl overflow-hidden transition-all"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>

                {/* Main row */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">

                  {/* Avatar + name */}
                  <div className="flex items-center gap-3 min-w-40">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C)' }}>
                      {(applicant.name || 'A').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{applicant.name || '-'}</p>
                      <p className="text-xs text-slate-400">
                        {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString('en-GB') : '-'}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="min-w-40 max-w-52">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">Email</p>
                    <p className="text-sm text-slate-700">{applicant.email || '-'}</p>
                  </div>

                  {/* Phone */}
                  <div className="min-w-30">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">Phone</p>
                    <p className="text-sm text-slate-700">{applicant.phone || '-'}</p>
                  </div>

                  {/* Resume */}
                  <div className="min-w-25">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">Resume</p>
                    {applicant.resumeName ? (
                      <button
                        onClick={async () => {
                          const token = getToken();
                          const res = await fetch(`/api/job-applications/application/${applicant._id}/resume`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          if (!res.ok) { alert('Failed to load resume'); return; }
                          const blob = await res.blob();
                          const url = URL.createObjectURL(blob);
                          window.open(url, '_blank');
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
                        style={{ background: 'rgba(190,18,60,0.08)', color: '#BE123C', border: '1px solid rgba(190,18,60,0.20)' }}>
                        <Eye size={11} /> View
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </div>

                  {/* Portfolio */}
                  <div className="min-w-25">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">Portfolio</p>
                    {applicant.portfolioLink ? (
                      <a href={applicant.portfolioLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        <ExternalLink size={11} /> View
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </div>

                  {/* Status badge */}
                  <div className="min-w-24">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">Status</p>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                      {applicant.status || 'pending'}
                    </span>
                  </div>

                  {/* Update status */}
                  <div className="min-w-30">
                    <p className="text-xs text-slate-400 font-medium mb-0.5">Update</p>
                    <div className="relative inline-block">
                      <select
                        value={applicant.status ? applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1) : 'Pending'}
                        disabled={updating === applicant._id}
                        onChange={(e) => updateStatus(applicant._id, e.target.value)}
                        className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs text-slate-700 outline-none cursor-pointer disabled:opacity-60"
                        style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Expand toggle */}
                  {applicant.coverLetter && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : applicant._id)}
                      className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B' }}>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      Cover Letter
                    </button>
                  )}
                </div>

                {/* Expanded: Cover Letter */}
                {isExpanded && applicant.coverLetter && (
                  <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: '#F1F5F9' }}>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Why should we hire them?</p>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl px-4 py-3"
                      style={{ border: '1px solid #E2E8F0' }}>
                      {applicant.coverLetter}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
