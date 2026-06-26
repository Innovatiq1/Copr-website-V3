'use client';

import { useEffect, useState } from 'react';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { Users, Eye, ChevronDown, ChevronUp, FileText, Trash2, Mail, Phone, Briefcase, Cpu, Download } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Profile = any;

export default function TalentPoolPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const deleteProfile = async (id: string) => {
    if (!confirm('Delete this profile? This cannot be undone.')) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/talent-profiles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(prev => prev.filter(p => p._id !== id));
    } catch {
      alert('Failed to delete profile.');
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    authFetch(`${API}/talent-profiles`)
      .then(r => r.json())
      .then(d => setProfiles(Array.isArray(d) ? d : []))
      .catch(() => setError('Failed to load talent profiles'))
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
                  'Resume URL': p.resume || '',
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
            <span className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(190,18,60,0.08)', color: '#BE123C', border: '1px solid rgba(190,18,60,0.18)' }}>
              {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ background: '#F1F5F9' }} />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <Users size={40} className="text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No profiles submitted yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {profiles.map((p) => {
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
                          if (!res.ok) { alert('Failed to load resume'); return; }
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
                      onClick={() => deleteProfile(p._id)}
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
      )}
    </div>
  );
}
