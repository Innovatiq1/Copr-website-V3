'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { Plus, Pencil, Trash2, Search, Users } from 'lucide-react';
import ExcelIcon from '@/components/ExcelIcon';
import { exportToExcel } from '@/lib/exportExcel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Career = any;

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/careers?page=1&limit=100`);
      const data = await res.json();
      const list = data?.careers || data?.data || (Array.isArray(data) ? data : []);
      setCareers(list);
    } catch {
      setError('Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCareers(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this career posting?')) return;
    try {
      const res = await authFetch(`${API}/careers/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete career posting');
      }
      setCareers((prev) => prev.filter((c) => c._id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete career posting');
    }
  };

  const filtered = careers.filter((c) =>
    (c.jobTitle || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Careers</h1>
          <p className="text-gray-400 text-sm mt-1">Manage job postings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToExcel(
              filtered.map((c) => ({
                'Job Title': c.jobTitle || c.title || '',
                Company: c.companyName || '',
                Location: c.location || '',
                Experience: c.experience || c.experienceLevel || '',
                'Employment Type': c.employmentType || '',
              })),
              'careers'
            )}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
          >
            <ExcelIcon size={20} />
          </button>
          <Link
            href="/admin/careers/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 15px rgba(212,23,74,0.3)' }}
          >
            <Plus size={16} /> Create Career
          </Link>
        </div>
      </div>

      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-6 max-w-sm"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <Search size={16} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600"
        />
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
                {['Job Title', 'Company', 'Location', 'Experience', 'Type', 'Actions'].map((h) => (
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
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-500">No careers found</td>
                </tr>
              ) : (
                filtered.map((career) => (
                  <tr
                    key={career._id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    className="transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4 text-gray-300 text-sm font-medium">
                      {career.jobTitle || career.title || '-'}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-sm">{career.companyName || '-'}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm">{career.location || '-'}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm">
                      {career.experience || career.experienceLevel || '-'}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {career.employmentType && (
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}
                        >
                          {career.employmentType}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/admin/careers/${career._id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 transition-all"
                          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <Link
                          href={`/admin/careers/${career._id}/applicants`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ background: 'rgba(59,130,246,0.15)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)' }}
                        >
                          <Users size={12} /> Applicants
                        </Link>
                        <button
                          onClick={() => handleDelete(career._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ background: 'rgba(220,38,38,0.15)', color: '#EF4444', border: '1px solid rgba(220,38,38,0.2)' }}
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
