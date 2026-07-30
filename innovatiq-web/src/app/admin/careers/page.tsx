'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch } from '@/lib/adminApi';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Plus, Pencil, Trash2, Search, Users, Download, Briefcase, X, MapPin, Clock } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Career = any;
const PAGE_SIZE = 8;

const JOB_COLORS: Record<string, { bg: string; color: string }> = {
  'Full-time':  { bg: 'rgba(5,150,105,0.10)',  color: '#047857' },
  'Part-time':  { bg: 'rgba(14,165,233,0.10)',  color: '#0369A1' },
  'Internship': { bg: 'rgba(245,158,11,0.10)',  color: '#B45309' },
  'Contract':   { bg: 'rgba(139,92,246,0.10)',  color: '#6D28D9' },
  'Remote':     { bg: 'rgba(190,18,60,0.10)',   color: '#9F1239' },
};

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await authFetch(`${API}/careers?page=1&limit=100`);
        const data = await res.json();
        setCareers(data?.careers || data?.data || (Array.isArray(data) ? data : []));
      } catch { toast.error('Failed to load careers'); }
      finally { setLoading(false); }
    })();
  }, []);

  const doDelete = async () => {
    if (!confirmId) return;
    const id = confirmId; setConfirmId(null);
    try {
      const res = await authFetch(`${API}/careers/${id}`, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.message || 'Failed'); }
      setCareers(prev => prev.filter(c => c._id !== id));
      toast.success('Deleted successfully');
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Failed to delete'); }
  };

  const filtered = careers.filter(c =>
    (c.jobTitle || c.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.location || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  useEffect(() => setPage(1), [search]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Careers</h1>
          <p className="text-slate-600 text-sm font-medium mt-1">Manage job postings</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => exportToExcel(filtered.map(c => ({ 'Job Title': c.jobTitle||c.title||'', Company: c.companyName||'', Location: c.location||'', Experience: c.experience||'', Type: c.employmentType||'', 'Posted Date': c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '' })), 'careers')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>
            <Download size={15} /> Export
          </button>
          <Link href="/admin/careers/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg,#9F1239 0%,#BE123C 50%,#E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.25)' }}>
            <Plus size={15} /> Create Career
          </Link>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

        {/* Search bar in card header */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3.5"
          style={{ borderBottom: '1px solid #EEF2F7', background: '#FAFBFC' }}>
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', maxWidth: '320px', minWidth: '160px' }}>
            <Search size={13} className="text-slate-500 shrink-0" />
            <input type="text" placeholder="Search by title or location..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-slate-800 text-sm font-medium outline-none placeholder-slate-500" />
            {search && <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-700 cursor-pointer"><X size={12} /></button>}
          </div>
          {!loading && (
            <span className="text-xs font-bold text-slate-700 ml-auto">
              {filtered.length} {filtered.length === 1 ? 'posting' : 'postings'}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                {['Job', 'Location', 'Experience', 'Type', 'Posted', 'Actions'].map(h => (
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
                          <div className="h-3.5 rounded animate-pulse" style={{ background: '#EEF2F7', width: '60%' }} />
                          <div className="h-2.5 rounded animate-pulse" style={{ background: '#F1F5F9', width: '40%' }} />
                        </div>
                      </div>
                    </td>
                    {[35, 30, 30, 20].map((w, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-3.5 rounded animate-pulse" style={{ background: '#EEF2F7', width: `${w}%` }} />
                      </td>
                    ))}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <div className="h-7 w-12 rounded-lg animate-pulse" style={{ background: '#EEF2F7' }} />
                        <div className="h-7 w-20 rounded-lg animate-pulse" style={{ background: '#EEF2F7' }} />
                        <div className="h-7 w-14 rounded-lg animate-pulse" style={{ background: '#EEF2F7' }} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div style={{ padding: '72px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(5,150,105,0.07)', border: '1.5px solid rgba(5,150,105,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Briefcase size={28} style={{ color: '#059669', opacity: 0.55 }} strokeWidth={1.5} />
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                        {search ? 'No results found' : 'No job postings yet'}
                      </p>
                      <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, textAlign: 'center', maxWidth: '220px', lineHeight: 1.65 }}>
                        {search ? `No careers match "${search}"` : 'Create your first job posting to attract candidates'}
                      </p>
                      {!search && (
                        <Link href="/admin/careers/create"
                          className="inline-flex items-center gap-1.5 mt-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                          style={{ background: 'linear-gradient(135deg,#9F1239,#E11D48)', boxShadow: '0 4px 14px rgba(190,18,60,0.22)' }}>
                          <Plus size={14} /> Create Career
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((career) => {
                  const typeStyle = JOB_COLORS[career.employmentType] || { bg: 'rgba(100,116,139,0.1)', color: '#475569' };
                  return (
                    <tr key={career._id} style={{ borderBottom: '1px solid #F1F5F9' }}
                      className="transition-colors"
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div style={{ width: '36px', height: '36px', borderRadius: '11px', flexShrink: 0, background: 'rgba(5,150,105,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Briefcase size={16} style={{ color: '#059669' }} strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900">{career.jobTitle || career.title || '—'}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{career.companyName || ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 font-semibold">
                          <MapPin size={13} className="text-slate-500 shrink-0" />
                          {career.location || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 font-semibold">
                          <Clock size={13} className="text-slate-500 shrink-0" />
                          {career.experience || career.experienceLevel || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {career.employmentType ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{ background: typeStyle.bg, color: typeStyle.color, border: `1px solid ${typeStyle.color}20` }}>
                            {career.employmentType}
                          </span>
                        ) : <span className="text-slate-500 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-700 font-semibold whitespace-nowrap">
                        {career.createdAt ? new Date(career.createdAt).toLocaleDateString('en-GB') : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Link href={`/admin/careers/${career._id}/edit`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                            <Pencil size={11} /> Edit
                          </Link>
                          <Link href={`/admin/careers/${career._id}/applicants`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer hover:bg-emerald-100"
                            style={{ background: 'rgba(16,185,129,0.10)', color: '#047857', border: '1px solid rgba(16,185,129,0.28)' }}>
                            <Users size={12} /> Applicants
                          </Link>
                          <button onClick={() => setConfirmId(career._id)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                            style={{ background: 'rgba(220,38,38,0.07)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.18)' }}>
                            <Trash2 size={11} /> Delete
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
              <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
                style={{ background:'#F1F5F9',border:'1px solid #E2E8F0',color:'#64748B' }}>←</button>
              {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
                let p=i+1;
                if(totalPages>5){if(page<=3)p=i+1;else if(page>=totalPages-2)p=totalPages-4+i;else p=page-2+i;}
                return <button key={p} onClick={()=>setPage(p)} className="w-8 h-8 rounded-lg text-xs font-medium cursor-pointer"
                  style={page===p?{background:'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)',color:'#fff',border:'none'}:{background:'#F1F5F9',border:'1px solid #E2E8F0',color:'#64748B'}}>{p}</button>;
              })}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
                style={{background:'#F1F5F9',border:'1px solid #E2E8F0',color:'#64748B'}}>→</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal open={confirmId!==null} title="Confirm Delete"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        confirmLabel="Delete" onConfirm={doDelete} onCancel={()=>setConfirmId(null)} />
    </div>
  );
}
