'use client';

import { useEffect, useState } from 'react';
import { API, authFetch } from '@/lib/adminApi';
import { exportToExcel } from '@/lib/exportExcel';
import { Trash2, Inbox, Download } from 'lucide-react';

type PopupLead = {
  _id: string;
  data: Record<string, string>;
  page?: string;
  ip?: string;
  createdAt?: string;
};

export default function PopupLeadsPage() {
  const [leads, setLeads] = useState<PopupLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/popup-leads`);
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await authFetch(`${API}/popup-leads?id=${id}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((l) => l._id !== id));
    } catch {
      setError('Failed to delete lead');
    }
  };

  // Columns are derived from whatever fields were actually captured,
  // since the popup's fields are fully configurable from Admin > Popup Settings.
  const columns = Array.from(
    new Set(leads.flatMap((l) => Object.keys(l.data || {})))
  );

  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid #EEF2F7',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Popup Leads</h1>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>Submissions captured via the lead-capture popup</p>
        </div>
        <button
          onClick={() =>
            exportToExcel(
              leads.map((l) => ({
                ...columns.reduce((acc, col) => ({ ...acc, [col]: l.data?.[col] || '' }), {}),
                Page: l.page || '',
                Date: l.createdAt ? new Date(l.createdAt).toLocaleDateString() : '',
              })),
              'popup-leads'
            )
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
          style={{ background: '#ECFDF5', color: '#047857' }}
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
          {error}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        {!loading && leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(225,29,72,0.08)' }}
            >
              <Inbox size={24} style={{ color: '#E11D48' }} />
            </div>
            <p className="font-bold" style={{ color: '#0F172A' }}>No popup leads yet</p>
            <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
              Submissions from the lead-capture popup will appear here
            </p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {[...columns, 'Page', 'Date', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: '#64748B' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    {Array.from({ length: columns.length + 2 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: '#F1F5F9', width: '60%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    {columns.map((col) => (
                      <td key={col} className="px-5 py-4 text-sm whitespace-nowrap" style={{ color: '#334155' }}>
                        {lead.data?.[col] || '—'}
                      </td>
                    ))}
                    <td className="px-5 py-4 text-sm whitespace-nowrap" style={{ color: '#64748B' }}>{lead.page || '—'}</td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap" style={{ color: '#64748B' }}>
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '—'}
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap">
                      <button
                        onClick={() => deleteLead(lead._id)}
                        style={{ color: '#94A3B8' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#E11D48'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}