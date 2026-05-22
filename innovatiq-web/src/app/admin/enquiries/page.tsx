'use client';

import { useEffect, useState } from 'react';
import { API, authFetch } from '@/lib/adminApi';
import { X, Eye } from 'lucide-react';
import ExcelIcon from '@/components/ExcelIcon';
import { exportToExcel } from '@/lib/exportExcel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Enquiry = any;

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      try {
        const res = await authFetch(`${API}/enquiries`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setEnquiries(list);
      } catch {
        setError('Failed to load enquiries');
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Enquiries</h1>
          <p className="text-gray-400 text-sm mt-1">View contact form submissions</p>
        </div>
        <button
          onClick={() => exportToExcel(
            enquiries.map((e) => ({
              Name: e.name || e.fullName || '',
              Email: e.email || '',
              Phone: e.phone || e.phoneNumber || '',
              Location: e.location || e.country || '',
              Company: e.company || e.companyName || '',
              'Looking For': e.lookingFor || e.service || '',
              Message: e.message || '',
              Date: e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '',
            })),
            'enquiries'
          )}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
        >
          <ExcelIcon size={20} />
        </button>
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
                {['Name', 'Email', 'Phone', 'Location', 'Looking For', 'Date', 'Actions'].map((h) => (
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
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.07)', width: j === 0 ? '60%' : '40%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-500">No enquiries found</td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4 text-gray-300 text-sm font-medium">
                      {enquiry.name || enquiry.fullName || '-'}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-sm">{enquiry.email || '-'}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm">{enquiry.phone || enquiry.phoneNumber || '-'}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm">{enquiry.location || enquiry.country || '-'}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm max-w-xs">
                      <div className="truncate">{enquiry.lookingFor || enquiry.service || enquiry.message?.substring(0, 40) || '-'}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">
                      {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelected(enquiry)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 transition-all"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div
            className="w-full max-w-lg rounded-2xl p-6"
            style={{
              background: 'linear-gradient(145deg, #0A1225, #070D1C)',
              border: '1px solid rgba(255,255,255,0.1)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Enquiry Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
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
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
                    <span className="text-sm text-gray-300 break-words">{value}</span>
                  </div>
                ) : null
              )}

              {/* Show any other fields dynamically */}
              {Object.entries(selected)
                .filter(([key]) => !['_id', '__v', 'name', 'fullName', 'email', 'phone', 'phoneNumber', 'location', 'country', 'company', 'companyName', 'lookingFor', 'service', 'message', 'createdAt', 'updatedAt'].includes(key))
                .map(([key, value]) =>
                  value && typeof value !== 'object' ? (
                    <div key={key} className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{key}</span>
                      <span className="text-sm text-gray-300 break-words">{String(value)}</span>
                    </div>
                  ) : null
                )}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full py-2.5 rounded-xl text-sm font-medium text-gray-300"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
