'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch } from '@/lib/adminApi';
import { Plus, Pencil, Trash2, Search, Download } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Blog = any;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/blogs?page=1&limit=100`);
      const data = await res.json();
      const list = data?.blogs || data?.data || (Array.isArray(data) ? data : []);
      setBlogs(list);
    } catch {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog?')) return;
    try {
      const res = await authFetch(`${API}/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete blog');
      }
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete blog');
    }
  };

  const filtered = blogs.filter((b) =>
    (b.title || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your blog posts</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToExcel(
              filtered.map((b) => ({
                Title: b.title || '',
                Author: b.author || '',
                Tags: (b.tags || []).join(', '),
                Likes: b.likes ?? 0,
                Dislikes: b.dislikes ?? 0,
                Date: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '',
              })),
              'blogs'
            )}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <Download size={16} /> Export Excel
          </button>
          <Link
            href="/admin/blogs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.25)' }}
          >
            <Plus size={16} /> Create Blog
          </Link>
        </div>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-6 max-w-sm"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
      >
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-slate-800 text-sm outline-none placeholder-slate-400"
        />
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
          {error}
        </div>
      )}

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Title', 'Author', 'Tags', 'Likes / Dislikes', 'Date', 'Actions'].map((h) => (
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
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: '#F1F5F9', width: j === 0 ? '60%' : '40%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">No blogs found</td>
                </tr>
              ) : (
                filtered.map((blog) => (
                  <tr
                    key={blog._id}
                    style={{ borderBottom: '1px solid #F1F5F9' }}
                    className="transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4 text-slate-800 text-sm font-medium max-w-xs">
                      <div className="truncate">{blog.title}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-sm whitespace-nowrap">{blog.author || '-'}</td>
                    <td className="px-5 py-4 text-sm">
                      <div className="flex flex-wrap gap-1 max-w-45">
                        {(blog.tags || []).slice(0, 3).map((tag: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded-full text-xs text-slate-600" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                            {tag}
                          </span>
                        ))}
                        {(blog.tags || []).length > 3 && <span className="text-xs text-slate-400">+{blog.tags.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span className="text-green-600">{blog.likes ?? 0}</span>
                      <span className="text-slate-300 mx-1">/</span>
                      <span className="text-red-500">{blog.dislikes ?? 0}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-sm whitespace-nowrap">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blogs/${blog._id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 transition-all hover:bg-slate-100 cursor-pointer"
                          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
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
      </div>
    </div>
  );
}
