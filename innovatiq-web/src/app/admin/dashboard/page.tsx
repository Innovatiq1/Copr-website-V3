'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API, authFetch } from '@/lib/adminApi';
import {
  FileText, Briefcase, Trophy, Video,
  ArrowUpRight, RefreshCw,
  MessageSquare, UserCheck, Clock,
} from 'lucide-react';
import { toast } from '@/lib/toast';

interface Stats { blogs: number; careers: number; awards: number; videos: number; }
interface TalentItem { fullName: string; email: string; skills: string; experience: string; createdAt: string; }
interface ApplicationItem { name: string; email: string; status: string; createdAt: string; }
interface EnquiryItem { name: string; email: string; subject: string; read: boolean; createdAt: string; }

const statCards = [
  { key: 'blogs',   label: 'Total Blogs',  icon: FileText,  color: '#E11D48', href: '/admin/blogs' },
  { key: 'careers', label: 'Open Careers', icon: Briefcase, color: '#059669', href: '/admin/careers' },
  { key: 'awards',  label: 'Awards',       icon: Trophy,    color: '#D97706', href: '/admin/awards' },
  { key: 'videos',  label: 'Videos',       icon: Video,     color: '#7C3AED', href: '/admin/videos' },
] as const;

const quickActions = [
  { label: 'New Blog Post',   desc: 'Write & publish an article',  href: '/admin/blogs/create',   color: '#E11D48', icon: FileText },
  { label: 'New Job Opening', desc: 'Post a new career listing',   href: '/admin/careers/create', color: '#059669', icon: Briefcase },
  { label: 'Add Award',       desc: 'Showcase an achievement',     href: '/admin/awards/create',  color: '#D97706', icon: Trophy },
  { label: 'Add Video',       desc: 'Upload or embed a video',     href: '/admin/videos/create',  color: '#7C3AED', icon: Video },
];

const adminSections = [
  { label: 'Blogs',       href: '/admin/blogs',       color: '#E11D48', icon: FileText },
  { label: 'Careers',     href: '/admin/careers',     color: '#059669', icon: Briefcase },
  { label: 'Talent Pool', href: '/admin/talent-pool', color: '#0EA5E9', icon: UserCheck },
  { label: 'Awards',      href: '/admin/awards',      color: '#D97706', icon: Trophy },
  { label: 'Videos',      href: '/admin/videos',      color: '#7C3AED', icon: Video },
  { label: 'Enquiries',   href: '/admin/enquiries',   color: '#BE123C', icon: MessageSquare },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:     { bg: 'rgba(245,158,11,0.12)',  color: '#B45309' },
  reviewed:    { bg: 'rgba(99,102,241,0.12)',  color: '#4338CA' },
  shortlisted: { bg: 'rgba(5,150,105,0.12)',   color: '#047857' },
  rejected:    { bg: 'rgba(239,68,68,0.12)',   color: '#DC2626' },
};

const AVATAR_COLORS = ['#E11D48','#059669','#D97706','#7C3AED','#0EA5E9','#BE123C'];

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatExp(exp: string) {
  if (!exp) return '';
  const trimmed = exp.trim();
  const hadYear = /(years?|yrs?)/i.test(trimmed);
  const cleaned = trimmed.replace(/\s*(years?|yrs?)\b/gi, '').trim();

  if (hadYear || /^[\d.\-+]+$/.test(cleaned)) {
    return cleaned ? `${cleaned} yrs` : '';
  }
  return trimmed;
}

function WaveLoader({ color = '#CBD5E1' }: { color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '32px' }}>
      {[0, 0.18, 0.36].map((delay, i) => (
        <div key={i} style={{
          width: '5px', height: '32px', borderRadius: '3px', background: color,
          transformOrigin: 'bottom',
          animationName: 'dashWave', animationDuration: '0.9s',
          animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite',
          animationDelay: `${delay}s`,
        }} />
      ))}
    </div>
  );
}

function RowSkeleton() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #EEF2F7' }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#E2E8F0', flexShrink: 0, animationName: 'dashPulse', animationDuration: '1.4s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }} />
      <div style={{ flex: 1 }}>
        <div style={{ width: '50%', height: '10px', borderRadius: '4px', background: '#E2E8F0', marginBottom: '6px', animationName: 'dashPulse', animationDuration: '1.4s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: '0.15s' }} />
        <div style={{ width: '70%', height: '8px', borderRadius: '4px', background: '#EEF2F7', animationName: 'dashPulse', animationDuration: '1.4s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}

/* ── Panel wrapper ── */
function Panel({ title, color, href, linkLabel, children }: {
  title: string; color: string; href: string; linkLabel?: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid #EEF2F7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="flex items-center justify-between mb-4">
        <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: '10px' }}>
          <h2 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>{title}</h2>
        </div>
        <Link href={href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color }}>{linkLabel ?? 'View all'}</span>
          <ArrowUpRight size={11} style={{ color }} />
        </Link>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

/* ── Empty state ── */
function Empty({ icon: Icon, color, title, sub }: { icon: React.ElementType; color: string; title: string; sub: string }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 12px', minHeight: '180px' }}>
      <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: `${color}0F`, border: `1.5px solid ${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} style={{ color, opacity: 0.5 }} strokeWidth={1.6} />
      </div>
      <p style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginTop: '2px' }}>{title}</p>
      <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 500, textAlign: 'center', maxWidth: '150px', lineHeight: 1.55 }}>{sub}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ blogs: 0, careers: 0, awards: 0, videos: 0 });
  const [loading, setLoading] = useState(true);
  const [recentTalents, setRecentTalents] = useState<TalentItem[]>([]);
  const [recentApplications, setRecentApplications] = useState<ApplicationItem[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryItem[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/admin/stats`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setStats({ blogs: data.blogs || 0, careers: data.careers || 0, awards: data.awards || 0, videos: data.videos || 0 });
    } catch { toast.error('Failed to load dashboard stats.'); }
    finally { setLoading(false); }
  };

  const fetchActivity = async () => {
    setActivityLoading(true);
    try {
      const res = await authFetch(`${API}/admin/activity`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecentTalents(data.recentTalents || []);
      setRecentApplications(data.recentApplications || []);
      setRecentEnquiries(data.recentEnquiries || []);
    } catch {}
    finally { setActivityLoading(false); }
  };

  useEffect(() => { fetchStats(); fetchActivity(); }, []);

  return (
    <>
      <style>{`
        @keyframes dashWave {
          0%, 100% { transform: scaleY(0.25); opacity: 0.55; }
          50%       { transform: scaleY(1);   opacity: 1;    }
        }
        @keyframes dashPulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.9; }
        }
        .qa-link { transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease; }
        .qa-link:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.09) !important; }
        .qa-arrow { transition: transform 0.2s ease; flex-shrink: 0; }
        .qa-link:hover .qa-arrow { transform: translate(3px, -3px); }
        @media (max-width: 639px) {
          .stat-icon-col { display: none !important; }
          .stat-card-inner { padding: 14px 14px !important; }
          .stat-number { font-size: 28px !important; }
          .qa-link { flex-direction: column !important; align-items: center !important; justify-content: center !important; padding: 14px 8px !important; min-height: 80px !important; text-align: center !important; gap: 8px !important; }
          .qa-link:hover { transform: none !important; }
          .qa-desc { display: none !important; }
          .qa-link .qa-arrow { display: none !important; }
          .dash-header { flex-wrap: wrap; gap: 12px; }
          .dash-refresh-text { display: none !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh' }}>

        {/* Page title */}
        <div className="dash-header flex items-center justify-between mb-7">
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>Dashboard</h1>
            <p style={{ fontSize: '13px', color: '#475569', fontWeight: 500, marginTop: '4px' }}>Welcome back! Here&apos;s an overview of your content.</p>
          </div>
          <button onClick={() => { fetchStats(); fetchActivity(); }} disabled={loading}
            style={{
              padding: '9px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
              background: loading ? '#F1F5F9' : 'linear-gradient(135deg, #BE123C 0%, #E11D48 100%)',
              color: loading ? '#94A3B8' : '#FFFFFF',
              border: 'none', cursor: loading ? 'default' : 'pointer',
              boxShadow: loading ? 'none' : '0 3px 10px rgba(190,18,60,0.28)',
              display: 'flex', alignItems: 'center', gap: '7px', transition: 'all 0.2s', flexShrink: 0,
            }}>
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span className="dash-refresh-text">Refresh</span>
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-5">
          {statCards.map(({ key, label, icon: Icon, color, href }) => (
            <Link href={href} key={key}
              className="group flex rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#FFFFFF', border: '1px solid #EEF2F7', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', minHeight: '110px', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px ${color}22`; e.currentTarget.style.borderColor = `${color}30`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#EEF2F7'; }}
            >
              <div className="stat-card-inner" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '9.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.10em' }}>{label}</p>
                {loading
                  ? <WaveLoader color={color + '55'} />
                  : <p className="stat-number" style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{stats[key as keyof Stats]}</p>
                }
                <div className="flex items-center gap-1" style={{ color }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 700 }}>View all</span>
                  <ArrowUpRight size={10} />
                </div>
              </div>
              <div className="stat-icon-col" style={{ width: '64px', flexShrink: 0, background: `linear-gradient(160deg, ${color}0D 0%, ${color}1A 100%)`, borderLeft: `1px solid ${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={26} style={{ color, opacity: 0.85 }} strokeWidth={1.6} />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions — full width, redesigned */}
        <div className="mb-5 rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid #EEF2F7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ borderLeft: '3px solid #BE123C', paddingLeft: '10px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {quickActions.map(({ label, desc, href, color, icon: Icon }) => (
              <Link key={href} href={href}
                className="qa-link flex items-center gap-3 rounded-2xl"
                style={{ padding: '14px 16px', background: '#F8FAFC', border: '1px solid #EEF2F7', textDecoration: 'none', minHeight: '68px' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${color}07`; e.currentTarget.style.borderColor = `${color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#EEF2F7'; }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                  background: `linear-gradient(135deg, ${color}18 0%, ${color}0D 100%)`,
                  border: `1px solid ${color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} style={{ color }} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>{label}</p>
                  <p className="qa-desc" style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500, marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{desc}</p>
                </div>
                <ArrowUpRight size={14} className="qa-arrow" style={{ color, opacity: 0.6, flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Talent Pool + Applications + Enquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5 items-stretch">

          {/* Recent Talent Pool — 2/4 */}
          <div className="lg:col-span-2 flex flex-col">
            <Panel title="Recent Talent Pool" color="#059669" href="/admin/talent-pool">
              {activityLoading ? (
                <div className="flex flex-col gap-2">{[1,2,3,4].map(i => <RowSkeleton key={i} />)}</div>
              ) : recentTalents.length === 0 ? (
                <Empty icon={UserCheck} color="#0EA5E9" title="No submissions yet" sub="Profiles submitted through the website will appear here" />
              ) : (
                <div className="flex flex-col gap-2">
                  {recentTalents.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background: '#F8FAFC', border: '1px solid #EEF2F7' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                        background: AVATAR_COLORS[i % AVATAR_COLORS.length] + '18',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11.5px', fontWeight: 800, color: AVATAR_COLORS[i % AVATAR_COLORS.length],
                      }}>
                        {initials(t.fullName)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.fullName}</p>
                        <p style={{ fontSize: '11.5px', color: '#475569', fontWeight: 500, marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.skills ? t.skills.split(',').slice(0, 3).map((s: string) => s.trim()).join(' · ') : t.email}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div className="flex items-center gap-1" style={{ color: '#64748B', justifyContent: 'flex-end' }}>
                          <Clock size={10} />
                          <span style={{ fontSize: '11px', fontWeight: 600 }}>{timeAgo(t.createdAt)}</span>
                        </div>
                        {t.experience && <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>{formatExp(t.experience)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </div>

          {/* Recent Applications — 1/4 */}
          <div className="lg:col-span-1 flex flex-col">
            <Panel title="Recent Applications" color="#059669" href="/admin/careers">
              {activityLoading ? (
                <div className="flex flex-col gap-2">{[1,2,3,4].map(i => <RowSkeleton key={i} />)}</div>
              ) : recentApplications.length === 0 ? (
                <Empty icon={Briefcase} color="#059669" title="No applications" sub="Job applications will appear here" />
              ) : (
                <div className="flex flex-col gap-2">
                  {recentApplications.map((a, i) => {
                    const st = STATUS_STYLE[a.status] || STATUS_STYLE.pending;
                    return (
                      <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl"
                        style={{ background: '#F8FAFC', border: '1px solid #EEF2F7' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                          background: 'rgba(5,150,105,0.10)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', fontWeight: 800, color: '#059669',
                        }}>
                          {initials(a.name)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</p>
                          <div className="flex items-center gap-1.5 flex-wrap" style={{ marginTop: '3px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 7px', borderRadius: '20px', background: st.bg, color: st.color, whiteSpace: 'nowrap' }}>{a.status}</span>
                            <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>{timeAgo(a.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>
          </div>

          {/* Recent Enquiries — 1/4 */}
          <div className="lg:col-span-1 flex flex-col">
            <Panel title="Recent Enquiries" color="#059669" href="/admin/enquiries">
              {activityLoading ? (
                <div className="flex flex-col gap-2">{[1,2,3,4].map(i => <RowSkeleton key={i} />)}</div>
              ) : recentEnquiries.length === 0 ? (
                <Empty icon={MessageSquare} color="#BE123C" title="No enquiries" sub="Customer enquiries will appear here" />
              ) : (
                <div className="flex flex-col gap-2">
                  {recentEnquiries.map((e, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl"
                      style={{ background: '#F8FAFC', border: '1px solid #EEF2F7' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                        background: 'rgba(190,18,60,0.10)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 800, color: '#BE123C',
                      }}>
                        {initials(e.name)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</p>
                        <p style={{ fontSize: '11px', color: '#475569', fontWeight: 500, marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.subject}</p>
                        <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>{timeAgo(e.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </div>
        </div>

        {/* Admin sections */}
        <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid #EEF2F7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ borderLeft: '3px solid #BE123C', paddingLeft: '10px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Admin Sections</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {adminSections.map(({ label, href, color, icon: Icon }) => (
              <Link key={href} href={href}
                className="group flex flex-col items-center gap-2 py-4 rounded-xl text-center transition-all duration-200"
                style={{ background: '#F8FAFC', border: '1px solid #EEF2F7', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${color}08`; e.currentTarget.style.borderColor = `${color}28`; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#EEF2F7'; }}
              >
                <div className="group-hover:scale-105 transition-transform duration-200"
                  style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} style={{ color }} strokeWidth={1.8} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
