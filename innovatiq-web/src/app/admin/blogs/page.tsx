'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch } from '@/lib/adminApi';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Plus, Pencil, Trash2, Search, Download, FileText, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';
import { toast } from '@/lib/toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Blog = any;
const PAGE_SIZE = 8;

const AVATAR_COLORS = ['#E11D48','#059669','#D97706','#7C3AED','#0EA5E9','#BE123C'];
function initials(s: string) { return (s || 'B').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await authFetch(`${API}/blogs?page=1&limit=100`);
        const data = await res.json();
        setBlogs(data?.blogs || data?.data || (Array.isArray(data) ? data : []));
      } catch { toast.error('Failed to load blogs'); }
      finally { setLoading(false); }
    })();
  }, []);

  const doDelete = async () => {
    if (!confirmId) return;
    const id = confirmId; setConfirmId(null);
    try {
      const res = await authFetch(`${API}/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.message || 'Failed'); }
      setBlogs(prev => prev.filter(b => b._id !== id));
      toast.success('Deleted successfully');
    } catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Failed to delete blog'); }
  };

  const filtered = blogs.filter(b => (b.title || '').toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  useEffect(() => setPage(1), [search]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
          <p className="text-slate-600 text-sm font-medium mt-1">Manage your blog posts</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportToExcel(filtered.map(b => ({ Title: b.title || '', Author: b.author || '', Tags: (b.tags || []).join(', '), Published: b.published ? 'Yes' : 'No', Likes: b.likes ?? 0, Dislikes: b.dislikes ?? 0, Date: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '' })), 'blogs')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>
            <Download size={15} /> Export
          </button>
          <Link href="/admin/blogs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg,#9F1239 0%,#BE123C 50%,#E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.25)' }}>
            <Plus size={15} /> Create Blog
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
            <input type="text" placeholder="Search blogs..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-slate-800 text-sm font-medium outline-none placeholder-slate-500" />
            {search && <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-700 cursor-pointer"><X size={12} /></button>}
          </div>
          {!loading && (
            <span className="text-xs font-bold text-slate-700 ml-auto">
              {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                {['Blog Post', 'Author', 'Tags', 'Reactions', 'Date', 'Actions'].map(h => (
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
                          <div className="h-3.5 rounded animate-pulse" style={{ background: '#EEF2F7', width: '65%' }} />
                          <div className="h-2.5 rounded animate-pulse" style={{ background: '#F1F5F9', width: '45%' }} />
                        </div>
                      </div>
                    </td>
                    {[30, 50, 25, 20].map((w, j) => (
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
                      <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(225,29,72,0.07)', border: '1.5px solid rgba(225,29,72,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={28} style={{ color: '#E11D48', opacity: 0.55 }} strokeWidth={1.5} />
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                        {search ? 'No results found' : 'No blog posts yet'}
                      </p>
                      <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, textAlign: 'center', maxWidth: '220px', lineHeight: 1.65 }}>
                        {search ? `No blogs match "${search}"` : 'Create your first blog post to get started'}
                      </p>
                      {!search && (
                        <Link href="/admin/blogs/create"
                          className="inline-flex items-center gap-1.5 mt-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                          style={{ background: 'linear-gradient(135deg,#9F1239,#E11D48)', boxShadow: '0 4px 14px rgba(190,18,60,0.22)' }}>
                          <Plus size={14} /> Create Blog
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((blog, idx) => (
                  <tr key={blog._id} style={{ borderBottom: '1px solid #F1F5F9' }}
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
                        }}>{initials(blog.title)}</div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{blog.title || '-'}</p>
                          {blog.shortDescription && (
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{blog.shortDescription}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-700 text-sm font-semibold whitespace-nowrap">{blog.author || '-'}</td>
                    <td className="px-5 py-3.5 text-sm">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {(blog.tags || []).slice(0, 2).map((tag: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                            style={{ background: 'rgba(99,102,241,0.08)', color: '#4338CA', border: '1px solid rgba(99,102,241,0.2)' }}>{tag}</span>
                        ))}
                        {(blog.tags || []).length > 2 && (
                          <span className="px-2 py-1 rounded-full text-xs font-bold"
                            style={{ background: 'rgba(100,116,139,0.08)', color: '#475569', border: '1px solid rgba(100,116,139,0.2)' }}>
                            +{blog.tags.length - 2}
                          </span>
                        )}
                        {!(blog.tags || []).length && <span className="text-slate-400 text-xs">—</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex items-center gap-1 text-xs font-bold"
                          style={{ color: '#059669' }}>
                          <ThumbsUp size={11} /> {blog.likes ?? 0}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold"
                          style={{ color: '#64748B' }}>
                          <ThumbsDown size={11} /> {blog.dislikes ?? 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700 font-semibold whitespace-nowrap">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB') : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/blogs/${blog._id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                          <Pencil size={11} /> Edit
                        </Link>
                        <button onClick={() => setConfirmId(blog._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                          style={{ background: 'rgba(220,38,38,0.07)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.18)' }}>
                          <Trash2 size={11} /> Delete
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
            <span className="text-xs font-semibold text-slate-600">{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>←</button>
              {Array.from({ length: Math.min(5,totalPages) }, (_,i) => {
                let p = i+1;
                if (totalPages>5) { if (page<=3) p=i+1; else if (page>=totalPages-2) p=totalPages-4+i; else p=page-2+i; }
                return <button key={p} onClick={() => setPage(p)} className="w-8 h-8 rounded-lg text-xs font-medium cursor-pointer"
                  style={page===p ? { background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', color: '#fff', border: 'none' } : { background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>{p}</button>;
              })}
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>→</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal open={confirmId !== null} title="Confirm Delete"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        confirmLabel="Delete" onConfirm={doDelete} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
