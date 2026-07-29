'use client';

import { useEffect, useState } from 'react';
import { API, authFetch } from '@/lib/adminApi';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { X, Eye, Download, Trash2 } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Enquiry = any;

const PAGE_SIZE = 5;

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(enquiries.length / PAGE_SIZE);
  const paginated = enquiries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const doDelete = async () => {
    if (!confirmId) return;
    const id = confirmId;
    setConfirmId(null);
    setDeleting(id);
    try {
      await authFetch(`${API}/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries(prev => prev.filter(e => e._id !== id));
      toast.success('Deleted successfully');
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      try {
        const res = await authFetch(`${API}/enquiries`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setEnquiries(list);
      } catch {
        toast.error('Failed to load enquiries');
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-slate-500 text-sm mt-1">View contact form submissions</p>
        </div>
        <button
          onClick={() => exportToExcel(
            enquiries.map((e) => ({
              Name: e.name || e.fullName || '',
              Email: e.email || '',
              Phone: e.phone || e.phoneNumber || '',
              Location: e.location || e.country || '',
              Company: e.company || e.companyName || '',
              Subject: e.subject || '',
              'Looking For': e.lookingFor || e.service || '',
              Message: e.message || '',
              Read: e.read ? 'Yes' : 'No',
              Date: e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '',
            })),
            'enquiries'
          )}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
        >
          <Download size={16} /> Export Excel
        </button>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Name', 'Email', 'Phone', 'Location', 'Looking For', 'Date', 'Actions'].map((h) => (
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
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: '#F1F5F9', width: j === 0 ? '60%' : '40%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-400">No enquiries found</td>
                </tr>
              ) : (
                paginated.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    style={{ borderBottom: '1px solid #F1F5F9' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4 text-slate-800 text-sm font-medium">
                      {enquiry.name || enquiry.fullName || '-'}
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{enquiry.email || '-'}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{enquiry.phone || enquiry.phoneNumber || '-'}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{enquiry.location || enquiry.country || '-'}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm max-w-xs">
                      <div className="truncate">{enquiry.lookingFor || enquiry.service || enquiry.message?.substring(0, 40) || '-'}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-sm whitespace-nowrap">
                      {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(enquiry)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 transition-all hover:bg-slate-100 cursor-pointer"
                          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}
                        >
                          <Eye size={12} /> View
                        </button>
                        <button
                          onClick={() => setConfirmId(enquiry._id)}
                          disabled={deleting === enquiry._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-red-50 cursor-pointer"
                          style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}
                        >
                          <Trash2 size={12} /> {deleting === enquiry._id ? '...' : 'Delete'}
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
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, enquiries.length)} of {enquiries.length}
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

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}>
          <div
            className="w-full max-w-lg rounded-2xl p-6"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Enquiry Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Name', value: selected.name || selected.fullName },
                { label: 'Email', value: selected.email },
                { label: 'Phone', value: selected.phone || selected.phoneNumber },
                { label: 'Location', value: selected.location || selected.country },
                { label: 'Company', value: selected.company || selected.companyName },
                { label: 'Looking For', value: selected.lookingFor || selected.service },
                { label: 'Message', value: selected.message },
                { label: 'Date', value: selected.createdAt ? new Date(selected.createdAt).toLocaleString() : null },
              ].map(({ label, value }) =>
                value ? (
                  <div key={label} className="flex flex-col gap-1 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
                    <span className="text-sm text-slate-700 wrap-break-word">{value}</span>
                  </div>
                ) : null
              )}

              {Object.entries(selected)
                .filter(([key]) => !['_id', '__v', 'name', 'fullName', 'email', 'phone', 'phoneNumber', 'location', 'country', 'company', 'companyName', 'lookingFor', 'service', 'message', 'createdAt', 'updatedAt'].includes(key))
                .map(([key, value]) =>
                  value && typeof value !== 'object' ? (
                    <div key={key} className="flex flex-col gap-1 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{key}</span>
                      <span className="text-sm text-slate-700 wrap-break-word">{String(value)}</span>
                    </div>
                  ) : null
                )}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
