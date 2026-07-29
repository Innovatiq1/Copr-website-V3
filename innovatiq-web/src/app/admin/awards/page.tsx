'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch } from '@/lib/adminApi';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Plus, Pencil, Trash2, Download } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Award = any;

const PAGE_SIZE = 5;

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const totalPages = Math.ceil(awards.length / PAGE_SIZE);
  const paginated = awards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fetchAwards = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/awards?page=1&limit=100`);
      const data = await res.json();
      const list = data?.awards || data?.data || (Array.isArray(data) ? data : []);
      setAwards(list);
    } catch {
      toast.error('Failed to load awards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAwards(); }, []);

  const doDelete = async () => {
    if (!confirmId) return;
    const id = confirmId;
    setConfirmId(null);
    try {
      const res = await authFetch(`${API}/awards/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete award');
      }
      setAwards((prev) => prev.filter((a) => a._id !== id));
      toast.success('Deleted successfully');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete award');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Awards</h1>
          <p className="text-slate-500 text-sm mt-1">Manage company awards and recognitions</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToExcel(
              awards.map((a) => ({
                Title: a.title || '',
                Year: a.year || '',
                Organization: a.organization || '',
                'Short Description': a.shortDescription || '',
                Description: a.description || '',
                'Added Date': a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '',
              })),
              'awards'
            )}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <Download size={16} /> Export Excel
          </button>
          <Link
            href="/admin/awards/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.25)' }}
          >
            <Plus size={16} /> Create Award
          </Link>
        </div>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Title', 'Year', 'Short Description', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    {Array.from({ length: 4 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: '#F1F5F9', width: j === 0 ? '50%' : '30%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : awards.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-400">No awards found</td>
                </tr>
              ) : (
                paginated.map((award) => (
                  <tr
                    key={award._id}
                    style={{ borderBottom: '1px solid #F1F5F9' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4 text-slate-800 text-sm font-medium max-w-xs">
                      <div className="truncate">{award.title}</div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {award.year && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(245,158,11,0.1)', color: '#D97706', border: '1px solid rgba(245,158,11,0.2)' }}>
                          {award.year}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-sm max-w-xs">
                      <div className="truncate">{award.shortDescription || '-'}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/awards/${award._id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 transition-all hover:bg-slate-100 cursor-pointer"
                          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <button
                          onClick={() => setConfirmId(award._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                          style={{ background: 'rgba(220,38,38,0.08)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.18)' }}
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
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid #E2E8F0', background: '#FAFAFA' }}>
            <span className="text-xs text-slate-500">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, awards.length)} of {awards.length}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>←</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p = i + 1;
                if (totalPages > 5) {
                  if (page <= 3) p = i + 1;
                  else if (page >= totalPages - 2) p = totalPages - 4 + i;
                  else p = page - 2 + i;
                }
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className="w-8 h-8 rounded-lg text-xs font-medium cursor-pointer"
                    style={page === p ? { background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', color: '#fff', border: 'none' } : { background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>→</button>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        open={confirmId !== null}
        title="Confirm Delete"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        confirmLabel="Delete"
        onConfirm={doDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}
