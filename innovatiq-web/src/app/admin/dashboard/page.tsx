'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch } from '@/lib/adminApi';
import { FileText, Briefcase, Trophy, Video, Plus, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface Stats {
  blogs: number;
  careers: number;
  awards: number;
  videos: number;
}

const statCards = [
  { key: 'blogs',   label: 'Total Blogs',   icon: FileText, color: '#3B82F6', glow: 'rgba(59,130,246,0.1)',  href: '/admin/blogs' },
  { key: 'careers', label: 'Open Careers',  icon: Briefcase, color: '#10B981', glow: 'rgba(16,185,129,0.1)', href: '/admin/careers' },
  { key: 'awards',  label: 'Awards',        icon: Trophy,  color: '#F59E0B', glow: 'rgba(245,158,11,0.1)',  href: '/admin/awards' },
  { key: 'videos',  label: 'Videos',        icon: Video,   color: '#8B5CF6', glow: 'rgba(139,92,246,0.1)',  href: '/admin/videos' },
] as const;

const quickActions = [
  { label: 'New Blog Post',   href: '/admin/blogs/create',   color: '#3B82F6', icon: FileText },
  { label: 'New Job Opening', href: '/admin/careers/create', color: '#10B981', icon: Briefcase },
  { label: 'Add Award',       href: '/admin/awards/create',  color: '#F59E0B', icon: Trophy },
  { label: 'Add Video',       href: '/admin/videos/create',  color: '#8B5CF6', icon: Video },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ blogs: 0, careers: 0, awards: 0, videos: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch(`${API}/admin/stats`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setStats({ blogs: data.blogs || 0, careers: data.careers || 0, awards: data.awards || 0, videos: data.videos || 0 });
    } catch {
      setError('Failed to load dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here&apos;s an overview of your content.</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 transition-all disabled:opacity-50 cursor-pointer"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div
          className="flex items-start gap-3 px-5 py-4 rounded-2xl mb-6 text-sm"
          style={{
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.25)',
          }}
        >
          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-600 font-medium">Server Unreachable</p>
            <p className="text-amber-500 text-xs mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map(({ key, label, icon: Icon, color, glow, href }) => (
          <Link href={href} key={key}
            className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 block"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.1), 0 0 0 1px ${color}25`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)')}
          >
            <div className="h-0.5 w-10 rounded-full mb-5" style={{ background: color }} />
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: glow }}>
                <Icon size={20} style={{ color }} />
              </div>
              <TrendingUp size={14} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
            </div>
            <div className="text-3xl font-black mb-1">
              {loading ? (
                <span className="inline-block w-10 h-8 rounded-lg animate-pulse"
                  style={{ background: '#F1F5F9' }} />
              ) : (
                <span style={{ color }}>{error ? '—' : stats[key as keyof Stats]}</span>
              )}
            </div>
            <p className="text-slate-500 text-sm font-medium">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-0.5 w-8 rounded-full" style={{ background: '#D4174A' }} />
          <h2 className="text-base font-semibold text-slate-800">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map(({ label, href, color, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-3 py-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-center"
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${color}08`;
                e.currentTarget.style.borderColor = `${color}30`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative"
                style={{ background: `${color}15` }}>
                <Plus size={16} style={{ color }} className="absolute" />
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors leading-tight px-2">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity / Info row */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Server status */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 w-8 rounded-full" style={{ background: '#10B981' }} />
            <h2 className="text-base font-semibold text-slate-800">System Status</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'API Server', ok: !error },
              { label: 'Authentication', ok: true },
              { label: 'Database', ok: !error },
            ].map(({ label, ok }) => (
              <div key={label} className="flex items-center justify-between py-2.5 px-4 rounded-xl"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <span className="text-sm text-slate-600">{label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ok ? 'bg-green-400' : 'bg-yellow-400'}`}
                    style={{ boxShadow: ok ? '0 0 6px rgba(52,211,153,0.5)' : '0 0 6px rgba(251,191,36,0.5)' }} />
                  <span className={`text-xs font-medium ${ok ? 'text-green-600' : 'text-yellow-600'}`}>
                    {ok ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Sections */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(145deg, rgba(212,23,74,0.04) 0%, rgba(212,23,74,0.01) 100%)',
            border: '1px solid rgba(212,23,74,0.1)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 w-8 rounded-full" style={{ background: '#D4174A' }} />
            <h2 className="text-base font-semibold text-slate-800">Admin Sections</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Manage Blogs', href: '/admin/blogs', color: '#3B82F6' },
              { label: 'Manage Careers', href: '/admin/careers', color: '#10B981' },
              { label: 'Manage Awards', href: '/admin/awards', color: '#F59E0B' },
              { label: 'Manage Videos', href: '/admin/videos', color: '#8B5CF6' },
              { label: 'View Enquiries', href: '/admin/enquiries', color: '#D4174A' },
            ].map(({ label, href, color }) => (
              <Link key={href} href={href}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 transition-all"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}35`; e.currentTarget.style.color = '#1E293B'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B'; }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
