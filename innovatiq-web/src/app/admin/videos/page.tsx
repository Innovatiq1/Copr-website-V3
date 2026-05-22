'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import ExcelIcon from '@/components/ExcelIcon';
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
      const token = getToken();
      await fetch(`${API}/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch {
      alert('Failed to delete video');
    }
  };

  // Build location tags from video data
  const getLocations = (video: Video): string[] => {
    const locs: string[] = [];
    if (video.home) locs.push('Home');
    if (video.career) locs.push('Career');
    if (video.products) locs.push('Products');
    if (video.services) locs.push('Services');
    return locs;
  };

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Videos</h1>
          <p className="text-gray-400 text-sm mt-1">Manage video content</p>
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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
          >
            <ExcelIcon size={20} />
          </button>
          <Link
            href="/admin/videos/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 15px rgba(212,23,74,0.3)' }}
          >
            <Plus size={16} /> Add Video
          </Link>
        </div>
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
                {['Video Name', 'Title', 'Link', 'Locations', 'Actions'].map((h) => (
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
                    {Array.from({ length: 5 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.07)', width: j === 0 ? '50%' : '30%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : videos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500">No videos found</td>
                </tr>
              ) : (
                videos.map((video) => (
                  <tr
                    key={video._id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4 text-gray-300 text-sm font-medium">{video.videoName || '-'}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm max-w-xs">
                      <div className="truncate">{video.title || '-'}</div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {video.videoLink ? (
                        <a href={video.videoLink} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors">
                          <ExternalLink size={12} />
                          <span className="max-w-[140px] truncate block">{video.videoLink}</span>
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {getLocations(video).map((loc) => (
                          <span key={loc} className="px-2 py-0.5 rounded-full text-xs text-gray-400"
                            style={{ background: 'rgba(139,92,246,0.15)', color: '#A78BFA' }}>
                            {loc}
                          </span>
                        ))}
                        {getLocations(video).length === 0 && <span className="text-gray-600 text-xs">None</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/videos/${video._id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300"
                          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: 'rgba(220,38,38,0.15)', color: '#EF4444', border: '1px solid rgba(220,38,38,0.2)' }}
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
