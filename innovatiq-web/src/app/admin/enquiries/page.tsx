'use client';

import { useEffect, useState } from 'react';
import { API, authFetch } from '@/lib/adminApi';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { X, Eye, Download, Trash2, MessageSquare, Search, Mail, Phone, MapPin } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Enquiry = any;
const PAGE_SIZE = 8;

const AVATAR_COLORS = ['#E11D48','#059669','#D97706','#7C3AED','#0EA5E9','#BE123C'];
function initials(s: string) { return (s || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await authFetch(`${API}/enquiries`);
        const data = await res.json();
        setEnquiries(Array.isArray(data) ? data : []);
      } catch { toast.error('Failed to load enquiries'); }
      finally { setLoading(false); }
    })();
  }, []);

  const doDelete = async () => {
    if (!confirmId) return;
    const id = confirmId; setConfirmId(null); setDeleting(id);
    try {
      await authFetch(`${API}/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries(prev => prev.filter(e => e._id !== id));
      toast.success('Deleted successfully');
    } catch { toast.error('Failed to delete'); }
    finally { setDeleting(null); }
  };

  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase();
    return (e.name||e.fullName||'').toLowerCase().includes(q) ||
      (e.email||'').toLowerCase().includes(q) ||
      (e.lookingFor||e.service||'').toLowerCase().includes(q);
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  useEffect(() => setPage(1), [search]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-slate-600 text-sm font-medium mt-1">View contact form submissions</p>
        </div>
        <button onClick={() => exportToExcel(enquiries.map(e => ({ Name: e.name||e.fullName||'', Email: e.email||'', Phone: e.phone||e.phoneNumber||'', Location: e.location||e.country||'', Company: e.company||e.companyName||'', 'Looking For': e.lookingFor||e.service||'', Message: e.message||'', Date: e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '' })), 'enquiries')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>
          <Download size={15} /> Export
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

        {/* Search in card header */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3.5"
          style={{ borderBottom: '1px solid #EEF2F7', background: '#FAFBFC' }}>
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', maxWidth: '320px', minWidth: '160px' }}>
            <Search size={13} className="text-slate-500 shrink-0" />
            <input type="text" placeholder="Search by name or email..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-slate-800 text-sm font-medium outline-none placeholder-slate-500" />
            {search && <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-700 cursor-pointer"><X size={12} /></button>}
          </div>
          {!loading && (
            <span className="text-xs font-bold text-slate-700 ml-auto">
              {filtered.length} {filtered.length === 1 ? 'enquiry' : 'enquiries'}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                {['Sender', 'Contact', 'Location', 'Looking For', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl animate-pulse shrink-0" style={{ background: '#EEF2F7' }} />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3.5 rounded animate-pulse" style={{ background: '#EEF2F7', width: '55%' }} />
                          <div className="h-2.5 rounded animate-pulse" style={{ background: '#F1F5F9', width: '70%' }} />
                        </div>
                      </div>
                    </td>
                    {[50, 35, 45, 20].map((w, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-3.5 rounded animate-pulse" style={{ background: '#EEF2F7', width: `${w}%` }} />
                      </td>
                    ))}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <div className="h-7 w-14 rounded-lg animate-pulse" style={{ background: '#EEF2F7' }} />
                        <div className="h-7 w-16 rounded-lg animate-pulse" style={{ background: '#EEF2F7' }} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div style={{ padding: '72px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(190,18,60,0.07)', border: '1.5px solid rgba(190,18,60,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={28} style={{ color: '#BE123C', opacity: 0.55 }} strokeWidth={1.5} />
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                        {search ? 'No results found' : 'No enquiries yet'}
                      </p>
                      <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, textAlign: 'center', maxWidth: '220px', lineHeight: 1.65 }}>
                        {search ? `No enquiries match "${search}"` : 'Enquiries from the contact form will appear here'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((enquiry, idx) => {
                  const name = enquiry.name || enquiry.fullName || 'Visitor';
                  return (
                    <tr key={enquiry._id} style={{ borderBottom: '1px solid #F1F5F9' }}
                      className="transition-colors"
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '11px', flexShrink: 0,
                            background: AVATAR_COLORS[idx % AVATAR_COLORS.length] + '18',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', fontWeight: 800, color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                          }}>{initials(name)}</div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800">{name}</p>
                            {(enquiry.company || enquiry.companyName) && (
                              <p className="text-xs text-slate-400 mt-0.5">{enquiry.company || enquiry.companyName}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="space-y-1">
                          <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                            <Mail size={10} className="text-slate-400 shrink-0" />
                            <span>{enquiry.email || '—'}</span>
                          </span>
                          {(enquiry.phone || enquiry.phoneNumber) && (
                            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                              <Phone size={10} className="text-slate-400 shrink-0" />
                              {enquiry.phone || enquiry.phoneNumber}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {(enquiry.location || enquiry.country) ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                            <MapPin size={10} className="text-slate-400 shrink-0" />
                            {enquiry.location || enquiry.country}
                          </span>
                        ) : <span className="text-slate-400 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-sm">
                        {(enquiry.lookingFor || enquiry.service) ? (
                          <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{ background: 'rgba(190,18,60,0.08)', color: '#9F1239', border: '1px solid rgba(190,18,60,0.15)' }}>
                            {enquiry.lookingFor || enquiry.service}
                          </span>
                        ) : (
                          <p className="text-xs text-slate-400">
                            {enquiry.message?.substring(0, 50) || '—'}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 font-semibold whitespace-nowrap">
                        {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString('en-GB') : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelected(enquiry)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 transition-all hover:bg-slate-100 cursor-pointer"
                            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                            <Eye size={11} /> View
                          </button>
                          <button onClick={() => setConfirmId(enquiry._id)} disabled={deleting === enquiry._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                            style={{ background: 'rgba(220,38,38,0.07)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.18)' }}>
                            <Trash2 size={11} /> {deleting === enquiry._id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid #E2E8F0', background: '#FAFAFA' }}>
            <span className="text-xs font-semibold text-slate-600">{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-1">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer" style={{background:'#F1F5F9',border:'1px solid #E2E8F0',color:'#64748B'}}>←</button>
              {Array.from({length:Math.min(5,totalPages)},(_,i)=>{let p=i+1;if(totalPages>5){if(page<=3)p=i+1;else if(page>=totalPages-2)p=totalPages-4+i;else p=page-2+i;}return <button key={p} onClick={()=>setPage(p)} className="w-8 h-8 rounded-lg text-xs font-medium cursor-pointer" style={page===p?{background:'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)',color:'#fff',border:'none'}:{background:'#F1F5F9',border:'1px solid #E2E8F0',color:'#64748B'}}>{p}</button>;})}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer" style={{background:'#F1F5F9',border:'1px solid #E2E8F0',color:'#64748B'}}>→</button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-lg rounded-2xl p-6"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 24px 64px rgba(0,0,0,0.18)', maxHeight: '85vh', overflowY: 'auto' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(190,18,60,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={18} style={{ color: '#BE123C' }} />
                </div>
                <div>
                  <h2 className="text-base font-bold" style={{ color: '#BE123C' }}>Enquiry Details</h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{selected.createdAt ? new Date(selected.createdAt).toLocaleString() : ''}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Name', value: selected.name || selected.fullName },
                { label: 'Email', value: selected.email },
                { label: 'Phone', value: selected.phone || selected.phoneNumber },
                { label: 'Location', value: selected.location || selected.country },
                { label: 'Company', value: selected.company || selected.companyName },
                { label: 'Looking For', value: selected.lookingFor || selected.service },
                { label: 'Message', value: selected.message },
              ].map(({ label, value }) =>
                value ? (
                  <div key={label} className="rounded-xl p-3.5"
                    style={{ background: '#F8FAFC', border: '1px solid #EEF2F7' }}>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</p>
                    <p className="text-sm text-slate-700 leading-relaxed break-words">{value}</p>
                  </div>
                ) : null
              )}
              {Object.entries(selected)
                .filter(([key]) => !['_id','__v','name','fullName','email','phone','phoneNumber','location','country','company','companyName','lookingFor','service','message','createdAt','updatedAt','read'].includes(key))
                .map(([key, value]) =>
                  value && typeof value !== 'object' ? (
                    <div key={key} className="rounded-xl p-3.5" style={{ background: '#F8FAFC', border: '1px solid #EEF2F7' }}>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{key}</p>
                      <p className="text-sm text-slate-700 break-words">{String(value)}</p>
                    </div>
                  ) : null
                )}
            </div>

          </div>
        </div>
      )}

      <ConfirmModal open={confirmId!==null} title="Confirm Delete"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        confirmLabel="Delete" onConfirm={doDelete} onCancel={()=>setConfirmId(null)} />
    </div>
  );
}
