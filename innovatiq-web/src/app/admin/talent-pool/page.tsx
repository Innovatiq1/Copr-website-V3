'use client';

import { useEffect, useState } from 'react';
import { API, authFetch, getToken } from '@/lib/adminApi';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Users, Eye, ChevronDown, ChevronUp, FileText, Trash2, Mail, Phone, Briefcase, Cpu, Download } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Profile = any;

const PAGE_SIZE = 5;

export default function TalentPoolPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(profiles.length / PAGE_SIZE);
  const paginated = profiles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Talent Pool</h1>
          <p className="text-slate-500 text-sm mt-1">Profiles submitted via &quot;Submit Your Profile&quot;</p>
        </div>
        <div className="flex items-center gap-3">
          {profiles.length > 0 && (
            <button
              onClick={() => exportToExcel(
                profiles.map((p) => ({
                  'Full Name': p.fullName || '',
                  Email: p.email || '',
                  Phone: p.phone || '',
                  Skills: p.skills || '',
                  Experience: p.experience || '',
                  'About / Statement': p.statement || '',
                  'Resume File': p.resumeName || '',
                  'Submitted Date': p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '',
                })),
                'talent-pool'
              )}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              <Download size={16} /> Export Excel
            </button>
          )}
          {profiles.length > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-default"
              style={{ background: 'rgba(190,18,60,0.08)', color: '#BE123C', border: '1px solid rgba(190,18,60,0.22)' }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#BE123C' }} />
              <span className="font-bold">{profiles.length}</span>
              <span className="font-semibold" style={{ color: '#9F1239' }}>profile{profiles.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl px-5 py-4 flex items-center gap-5" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div className="w-10 h-10 rounded-full animate-pulse shrink-0" style={{ background: '#F1F5F9' }} />
              <div className="flex-1 space-y-2">
                <div className="h-4 rounded animate-pulse" style={{ background: '#F1F5F9', width: '30%' }} />
                <div className="h-3 rounded animate-pulse" style={{ background: '#F1F5F9', width: '60%' }} />
              </div>
              <div className="flex gap-2 shrink-0">
                <div className="h-7 w-20 rounded-lg animate-pulse" style={{ background: '#F1F5F9' }} />
                <div className="h-7 w-16 rounded-lg animate-pulse" style={{ background: '#F1F5F9' }} />
              </div>
            </div>
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <Users size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No profiles submitted yet</p>
        </div>
      ) : (
        <>
        <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight: '620px' }}>
          {paginated.map((p) => {
            const isExpanded = expanded === p._id;
            return (
              <div key={p._id} className="rounded-2xl overflow-hidden transition-all"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>

                <div className="flex items-center gap-5 px-5 py-4">

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C)' }}>
                    {(p.fullName || 'A').charAt(0).toUpperCase()}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    {/* Top row: name + date */}
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-sm font-bold text-slate-900">{p.fullName || '-'}</p>
                      <span className="text-xs text-slate-500">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB') : '-'}
                      </span>
                    </div>

                    {/* Bottom row: contact + tags */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                        <Mail size={11} className="text-slate-400 shrink-0" />
                        {p.email || '-'}
                      </span>
                      <span className="text-slate-300 text-xs">|</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                        <Phone size={11} className="text-slate-400 shrink-0" />
                        {p.phone || '-'}
                      </span>
                      {p.experience && (
                        <>
                          <span className="text-slate-300 text-xs">|</span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                            <Briefcase size={11} className="text-slate-400 shrink-0" />
                            {p.experience}
                          </span>
                        </>
                      )}
                      {p.skills && (
                        <>
                          <span className="text-slate-300 text-xs">|</span>
                          <span className="inline-flex items-center gap-1.5 text-xs"
                            style={{ color: '#BE123C' }}>
                            <Cpu size={11} className="shrink-0" />
                            {p.skills}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
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
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
                        style={{ background: 'rgba(190,18,60,0.07)', color: '#BE123C', border: '1px solid rgba(190,18,60,0.18)' }}>
                        <Eye size={12} /> Resume
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 px-3 py-1.5">No resume</span>
                    )}

                    {p.statement && (
                      <button
                        onClick={() => setExpanded(isExpanded ? null : p._id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B' }}>
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        About
                      </button>
                    )}

                    <button
                      onClick={() => setConfirmId(p._id)}
                      disabled={deleting === p._id}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-60 hover:-translate-y-0.5"
                      style={{ background: 'rgba(220,38,38,0.07)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.18)' }}>
                      <Trash2 size={12} /> {deleting === p._id ? '…' : 'Delete'}
                    </button>
                  </div>
                </div>

                {/* Expanded: About */}
                {isExpanded && p.statement && (
                  <div className="px-5 pb-5 pt-0 border-t" style={{ borderColor: '#F1F5F9' }}>
                    <div className="flex items-center gap-2 my-3">
                      <FileText size={12} className="text-slate-400" />
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">About</p>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed rounded-xl px-4 py-3"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      {p.statement}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-2 py-3.5 mt-3">
            <span className="text-xs text-slate-500">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, profiles.length)} of {profiles.length}
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
        </>
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
