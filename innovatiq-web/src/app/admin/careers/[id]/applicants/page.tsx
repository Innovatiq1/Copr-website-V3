'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { ArrowLeft, ChevronDown } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Applicant = any;

const STATUS_OPTIONS = ['Reviewed', 'Shortlisted', 'Rejected'];

const statusColors: Record<string, { bg: string; color: string }> = {
  Reviewed: { bg: 'rgba(59,130,246,0.1)', color: '#60A5FA' },
  Shortlisted: { bg: 'rgba(16,185,129,0.1)', color: '#10B981' },
  Rejected: { bg: 'rgba(220,38,38,0.1)', color: '#EF4444' },
  Pending: { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
};

export default function ApplicantsPage() {
  const params = useParams();
  const careerId = params?.id as string;

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await authFetch(`${API}/job-applications/${careerId}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setApplicants(list);
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
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setApplicants((prev) =>
        prev.map((a) => (a._id === applicationId ? { ...a, status } : a))
      );
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/careers" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Applicants</h1>
          <p className="text-gray-400 text-sm mt-1">{applicants.length} applicant{applicants.length !== 1 ? 's' : ''} for this position</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#EF4444' }}>
          {error}
        </div>
      )}

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Name', 'Email', 'Phone', 'Status', 'Applied', 'Update Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.07)', width: j === 0 ? '60%' : '40%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : applicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-500">No applicants yet</td>
                </tr>
              ) : (
                applicants.map((applicant) => {
                  const statusStyle = statusColors[applicant.status] || statusColors['Pending'];
                  return (
                    <tr
                      key={applicant._id}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td className="px-5 py-4 text-gray-300 text-sm font-medium">
                        {applicant.name || applicant.fullName || '-'}
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-sm">{applicant.email || '-'}</td>
                      <td className="px-5 py-4 text-gray-400 text-sm">{applicant.phone || applicant.phoneNumber || '-'}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: statusStyle.bg, color: statusStyle.color }}>
                          {applicant.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">
                        {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="relative inline-block">
                          <select
                            value={applicant.status || 'Pending'}
                            disabled={updating === applicant._id}
                            onChange={(e) => updateStatus(applicant._id, e.target.value)}
                            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs text-gray-300 outline-none cursor-pointer disabled:opacity-60"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                          >
                            <option value="Pending" style={{ background: '#0A1225' }}>Pending</option>
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} style={{ background: '#0A1225' }}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
