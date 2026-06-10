'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { Plus, Pencil, Trash2, ExternalLink, Download } from 'lucide-react';
import { exportToExcel } from '@/lib/exportExcel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Video = any;

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/videos`);
      const data = await res.json();
      const list = data?.videos || data?.data || (Array.isArray(data) ? data : []);
      setVideos(list);
    } catch {
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    try {
      const res = await authFetch(`${API}/videos/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete video');
      }
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete video');
    }
  };

  const getLocations = (video: Video): string[] => {
    const locs: string[] = [];
    if (video.home) locs.push('Home');
    if (video.career) locs.push('Career');
    if (video.products) locs.push('Products');
    if (video.services) locs.push('Services');
    return locs;
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Videos</h1>
          <p className="text-slate-500 text-sm mt-1">Manage video content</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToExcel(
              videos.map((v) => ({
                'Video Name': v.videoName || '',
                Title: v.title || '',
                Link: v.videoLink || '',
                Locations: getLocations(v).join(', '),
              })),
              'videos'
            )}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <Download size={16} /> Export Excel
          </button>
          <Link
            href="/admin/videos/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow: '0 4px 15px rgba(29,78,216,0.25)' }}
          >
            <Plus size={16} /> Add Video
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
          {error}
        </div>
      )}

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Video Name', 'Title', 'Link', 'Locations', 'Actions'].map((h) => (
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
                    {Array.from({ length: 5 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: '#F1F5F9', width: j === 0 ? '50%' : '30%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : videos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-400">No videos found</td>
                </tr>
              ) : (
                videos.map((video) => (
                  <tr
                    key={video._id}
                    style={{ borderBottom: '1px solid #F1F5F9' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4 text-slate-800 text-sm font-medium">{video.videoName || '-'}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm max-w-xs">
                      <div className="truncate">{video.title || '-'}</div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {video.videoLink ? (
                        <a href={video.videoLink} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-700 transition-colors">
                          <ExternalLink size={12} />
                          <span className="max-w-[140px] truncate block">{video.videoLink}</span>
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {getLocations(video).map((loc) => (
                          <span key={loc} className="px-2 py-0.5 rounded-full text-xs"
                            style={{ background: 'rgba(139,92,246,0.1)', color: '#7C3AED', border: '1px solid rgba(139,92,246,0.2)' }}>
                            {loc}
                          </span>
                        ))}
                        {getLocations(video).length === 0 && <span className="text-slate-400 text-xs">None</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/videos/${video._id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-all"
                          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(video._id)}
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
