'use client';

import { useEffect, useState } from 'react';
import { API, authFetch, getToken } from '@/lib/adminApi';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Users, Eye, ChevronDown, ChevronUp, FileText, Trash2, Mail, Phone, Briefcase, Cpu, Download, Search, X, Calendar } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Profile = any;

const PAGE_SIZE = 8;

const AVATAR_COLORS = ['#E11D48','#059669','#D97706','#7C3AED','#0EA5E9','#BE123C'];
function initials(s: string) { return (s || 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

function formatExp(exp: string) {
  if (!exp) return '';
  const trimmed = exp.trim();
  if (/year|yr/i.test(trimmed)) return trimmed;
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed} yrs`;
  return trimmed;
}

export default function TalentPoolPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = profiles.filter(p => {
    const q = search.toLowerCase();
    return !q ||
      (p.fullName || '').toLowerCase().includes(q) ||
      (p.email || '').toLowerCase().includes(q) ||
      (p.skills || '').toLowerCase().includes(q) ||
      (p.phone || '').toLowerCase().includes(q);
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [search]);

  const doDelete = async () => {
    if (!confirmId) return;
    const id = confirmId;
    setConfirmId(null);
    setDeleting(id);
    try {
      const token = getToken();
      await fetch(`/api/talent-profiles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(prev => prev.filter(p => p._id !== id));
      toast.success('Deleted successfully');
    } catch {
      toast.error('Failed to delete profile.');
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    authFetch(`${API}/talent-profiles`)
      .then(r => r.json())
      .then(d => setProfiles(Array.isArray(d) ? d : []))
      .catch(() => toast.error('Failed to load talent profiles'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Talent Pool</h1>
          <p className="text-slate-600 text-sm font-medium mt-1">Profiles submitted via &quot;Submit Your Profile&quot;</p>
        </div>
        {profiles.length > 0 && (
          <button
            onClick={() => {
              const token = getToken();
              const base = typeof window !== 'undefined' ? window.location.origin : '';
              exportToExcel(
                profiles.map((p) => ({
                  'Full Name': p.fullName || '',
                  Email: p.email || '',
                  Phone: p.phone || '',
                  Skills: p.skills || '',
                  Experience: p.experience || '',
                  'About / Statement': p.statement || '',
                  'Resume File': p.resumeName || '',
                  'Resume URL': p.resumeName ? `${base}/api/talent-profiles/${p._id}/resume?token=${token}` : '',
                  'Submitted Date': p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '',
                })),
                'talent-pool'
              );
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer self-start sm:self-auto"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <Download size={15} /> Export Excel
          </button>
        )}
      </div>

      {/* Card wrapper */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

        {/* Card header: search + count */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3.5"
          style={{ borderBottom: '1px solid #EEF2F7', background: '#FAFBFC' }}>
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', maxWidth: '320px', minWidth: '160px' }}>
            <Search size={13} className="text-slate-500 shrink-0" />
            <input type="text" placeholder="Search by name, email, skills..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-slate-800 text-sm font-medium outline-none placeholder-slate-500" />
            {search && <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-700 cursor-pointer"><X size={12} /></button>}
          </div>
          {!loading && (
            <span className="text-xs font-bold text-slate-700 ml-auto">
              {filtered.length} {filtered.length === 1 ? 'profile' : 'profiles'}
            </span>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <div className="w-10 h-10 rounded-xl animate-pulse shrink-0" style={{ background: '#EEF2F7' }} />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 rounded animate-pulse" style={{ background: '#EEF2F7', width: '30%' }} />
                  <div className="h-3 rounded animate-pulse" style={{ background: '#EEF2F7', width: '60%' }} />
                </div>
                <div className="flex gap-2 shrink-0">
                  <div className="h-7 w-20 rounded-lg animate-pulse" style={{ background: '#EEF2F7' }} />
                  <div className="h-7 w-16 rounded-lg animate-pulse" style={{ background: '#EEF2F7' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '72px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(190,18,60,0.07)', border: '1.5px solid rgba(190,18,60,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={28} style={{ color: '#BE123C', opacity: 0.55 }} strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
              {search ? 'No results found' : 'No profiles submitted yet'}
            </p>
            <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, textAlign: 'center', maxWidth: '240px', lineHeight: 1.65 }}>
              {search ? `No profiles match "${search}"` : 'Profiles submitted via the website will appear here'}
            </p>
          </div>
        ) : (
          <div>
            {paginated.map((p, idx) => {
              const isExpanded = expanded === p._id;
              const color = AVATAR_COLORS[((page - 1) * PAGE_SIZE + idx) % AVATAR_COLORS.length];
              return (
                <div key={p._id} className="transition-colors"
                  style={{ borderBottom: '1px solid #F1F5F9' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4">

                    {/* Avatar */}
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
                      background: color + '18',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 800, color,
                    }}>
                      {initials(p.fullName || 'A')}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                        <p className="text-sm font-bold text-slate-900">{p.fullName || '-'}</p>
                        {p.createdAt && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold text-slate-700"
                            style={{ background: '#F1F5F9', border: '1px solid #CBD5E1' }}>
                            <Calendar size={11} className="text-slate-500 shrink-0" />
                            {new Date(p.createdAt).toLocaleDateString('en-GB')}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                          <Mail size={11} className="text-slate-500 shrink-0" />
                          {p.email || '-'}
                        </span>
                        <span className="text-slate-300 text-xs hidden sm:inline">|</span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                          <Phone size={11} className="text-slate-500 shrink-0" />
                          {p.phone || '-'}
                        </span>
                        {p.experience && (
                          <>
                            <span className="text-slate-300 text-xs hidden sm:inline">|</span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                              <Briefcase size={11} className="text-slate-500 shrink-0" />
                              {formatExp(p.experience)}
                            </span>
                          </>
                        )}
                        {p.skills && (
                          <>
                            <span className="text-slate-300 text-xs hidden sm:inline">|</span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                              <Cpu size={11} className="text-slate-500 shrink-0" />
                              <span>{p.skills}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                      {p.resumeName ? (
                        <button
                          onClick={async () => {
                            const token = getToken();
                            const res = await fetch(`/api/talent-profiles/${p._id}/resume`, {
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            if (!res.ok) { toast.error('Failed to load resume'); return; }
                            const blob = await res.blob();
                            const url = URL.createObjectURL(blob);
                            window.open(url, '_blank');
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-rose-50 cursor-pointer"
                          style={{ background: 'rgba(190,18,60,0.06)', color: '#BE123C', border: '1px solid #E2E8F0' }}>
                          <Eye size={12} /> Resume
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium px-2 py-1.5">No resume</span>
                      )}

                      {p.statement && (
                        <button
                          onClick={() => setExpanded(isExpanded ? null : p._id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-slate-100 cursor-pointer"
                          style={{
                            background: '#F1F5F9',
                            color: '#334155',
                            border: '1px solid #E2E8F0',
                          }}>
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          About
                        </button>
                      )}

                      <button
                        onClick={() => setConfirmId(p._id)}
                        disabled={deleting === p._id}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-red-50 cursor-pointer disabled:opacity-60"
                        style={{ background: 'rgba(220,38,38,0.06)', color: '#DC2626', border: '1px solid #E2E8F0' }}>
                        <Trash2 size={12} /> {deleting === p._id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded: About */}
                  {isExpanded && p.statement && (
                    <div className="px-5 pb-4 pt-0" style={{ borderTop: '1px solid #F1F5F9' }}>
                      <div className="flex items-center gap-2 mt-3 mb-2">
                        <FileText size={12} className="text-slate-500" />
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">ABOUT</p>
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed rounded-xl px-4 py-3"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        {p.statement}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid #E2E8F0', background: '#FAFAFA' }}>
            <span className="text-xs font-semibold text-slate-600">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>←</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pg = i + 1;
                if (totalPages > 5) {
                  if (page <= 3) pg = i + 1;
                  else if (page >= totalPages - 2) pg = totalPages - 4 + i;
                  else pg = page - 2 + i;
                }
                return (
                  <button key={pg} onClick={() => setPage(pg)}
                    className="w-8 h-8 rounded-lg text-xs font-medium cursor-pointer"
                    style={page === pg ? { background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', color: '#fff', border: 'none' } : { background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>
                    {pg}
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
