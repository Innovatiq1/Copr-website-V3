'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from '@/lib/toast';
import {
  LayoutDashboard, FileText, Briefcase, Trophy,
  Video, Users, UserCheck, LogOut, Menu, X, ChevronRight, Bell, Trash2,
} from 'lucide-react';

interface ActivityItem {
  type: 'talent' | 'application' | 'enquiry';
  name: string;
  detail: string;
  sub: string;
  createdAt: string;
  isNew: boolean;
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const navLinks = [
  { label: 'Dashboard',   icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Blogs',       icon: FileText,         href: '/admin/blogs' },
  { label: 'Careers',     icon: Briefcase,        href: '/admin/careers' },
  { label: 'Talent Pool', icon: UserCheck,        href: '/admin/talent-pool' },
  { label: 'Awards',      icon: Trophy,           href: '/admin/awards' },
  { label: 'Videos',      icon: Video,            href: '/admin/videos' },
  { label: 'Enquiries',   icon: Users,            href: '/admin/enquiries' },
];

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length <= 1) return [{ label: 'Admin' }, { label: 'Dashboard' }];

  const items = [{ label: 'Admin' }];
  const moduleName = parts[1];
  let formattedModule = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  if (moduleName === 'talent-pool') formattedModule = 'Talent Pool';
  items.push({ label: formattedModule });

  if (parts.length > 2) {
    const last = parts[parts.length - 1];
    if (last && last !== moduleName) {
      const formattedAction = last.charAt(0).toUpperCase() + last.slice(1);
      items.push({ label: formattedAction });
    }
  }

  return items;
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const token = localStorage.getItem('admin_token');
    if (!token) router.replace('/admin/login');
    else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.email) setAdminEmail(payload.email);
      } catch {}
    }
  }, [pathname, router]);

  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [notifOpen]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    const fetchActivity = async () => {
      try {
        const res = await fetch('/api/admin/activity', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          const clearedAt = localStorage.getItem('notif_cleared_at');
          const seenAt = localStorage.getItem('notif_seen_at');
          const items: ActivityItem[] = (data.items || []).filter((item: ActivityItem) =>
            !clearedAt || new Date(item.createdAt) > new Date(clearedAt)
          );
          setActivities(items);
          const unread = seenAt
            ? items.filter(i => new Date(i.createdAt) > new Date(seenAt)).length
            : items.filter(i => i.isNew).length;
          setUnreadCount(unread);
        }
      } catch {}
    };
    fetchActivity();
    const id = setInterval(fetchActivity, 60000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.replace('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;

  const currentPage = pathname.split('/').filter(Boolean).pop() ?? 'dashboard';

  return (
    <>
      <style>{`
        .sb-nav-item { transition: background 0.16s ease, color 0.16s ease; }
        .sb-nav-item:not(.sb-active):hover {
          background: rgba(255,255,255,0.09) !important;
          color: rgba(255,255,255,0.95) !important;
        }
        .sb-signout:hover {
          background: rgba(255,255,255,0.08) !important;
          color: rgba(255,255,255,0.90) !important;
        }
        @media (max-width: 639px) {
          .admin-main { padding: 14px !important; }
          .notif-panel { width: calc(100vw - 32px) !important; right: -50px !important; }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F4F8' }}>

        {/* Mobile overlay with smooth opacity transition */}
        <div
          className={`fixed inset-0 z-20 lg:hidden transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ════════════ SIDEBAR ════════════ */}
        <aside
          className={`fixed top-0 left-0 z-30 flex flex-col transition-transform duration-300 cubic-bezier(0.16,1,0.3,1)
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-0`}
          style={{
            width: '256px', minWidth: '256px', height: '100vh',
            flexShrink: 0,
            background: 'linear-gradient(180deg, #420617 0%, #650A25 35%, #920C32 70%, #B21040 100%)',
            overflow: 'hidden',
            boxShadow: sidebarOpen ? '4px 0 25px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 pointer-events-none" style={{
            width: '200px', height: '200px',
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.10) 0%, transparent 65%)',
          }} />
          {/* Circle arcs texture */}
          <div className="absolute top-0 right-0 pointer-events-none" style={{
            width: '240px', height: '240px',
            backgroundImage: "url('/images/bg-pattern-circles.svg')",
            backgroundSize: 'contain', backgroundPosition: 'top right', backgroundRepeat: 'no-repeat',
            opacity: 0.28, mixBlendMode: 'overlay',
          }} />
          {/* Dot matrix texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "url('/images/bg-dots.svg')",
            backgroundRepeat: 'repeat', opacity: 0.28, mixBlendMode: 'overlay',
          }} />

          {/* Circle arcs mirrored bottom-left */}
          <div className="absolute bottom-0 left-0 pointer-events-none" style={{
            width: '200px', height: '200px',
            backgroundImage: "url('/images/bg-pattern-circles.svg')",
            backgroundSize: 'contain', backgroundPosition: 'bottom left', backgroundRepeat: 'no-repeat',
            opacity: 0.22, mixBlendMode: 'overlay',
            transform: 'rotate(180deg)',
          }} />

          {/* Bottom bloom */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
            height: '120px',
            background: 'linear-gradient(0deg, rgba(50,4,14,0.40) 0%, transparent 100%)',
          }} />

          {/* Logo */}
          <div className="relative z-10 flex items-center justify-between px-5 py-[18px]"
            style={{ borderBottom: 'none' }}>
            <div className="flex items-center gap-3">
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px', flexShrink: 0,
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.22)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src="/logo/logo.png" alt="Innovatiq"
                  style={{ width: '22px', height: '22px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div>
                <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px', lineHeight: 1 }}>Innovatiq</p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '10.5px', marginTop: '3px' }}>Admin Panel</p>
              </div>
            </div>
            <button className="lg:hidden cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', padding: 0 }}
              onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="relative z-10 flex-1 overflow-y-auto py-5 px-3">
            <p style={{
              fontSize: '10px', color: 'rgba(255,255,255,1)',
              fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '0 10px', marginBottom: '8px',
            }}>Main Menu</p>

            {navLinks.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link key={href} href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sb-nav-item${isActive ? ' sb-active' : ''} flex items-center gap-3 px-3 py-[10px] rounded-xl mb-0.5 relative`}
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.16)' : 'transparent',
                    border: isActive ? '1px solid rgba(255,255,255,0.20)' : '1px solid transparent',
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.92)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '13.5px',
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: '12px',
                  }}
                >
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 rounded-r-full" style={{
                      width: '3px',
                      background: '#FECDD3',
                      boxShadow: '0 0 8px rgba(254,205,211,0.55)',
                    }} />
                  )}
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {isActive && <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.40)' }} />}
                </Link>
              );
            })}
          </nav>

          {/* Sign out */}
          <div className="relative z-10 p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.22)' }}>
            <button onClick={handleLogout}
              className="sb-signout flex items-center gap-3 w-full px-3 py-2.5 rounded-xl cursor-pointer"
              style={{
                color: '#FFFFFF', fontSize: '13.5px', fontWeight: 600,
                background: 'transparent', border: 'none', textAlign: 'left', width: '100%',
              }}>
              <LogOut size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ════════════ MAIN ════════════ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100vh' }}>

          {/* Top header */}
          <header style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '0 28px', height: '64px', flexShrink: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid #EEF2F7',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <button className="lg:hidden cursor-pointer"
              style={{ color: '#64748B', background: 'none', border: 'none', padding: 0 }}
              onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2">
              {getBreadcrumbs(pathname).map((crumb, idx, arr) => (
                <div key={crumb.label + idx} className="flex items-center gap-2">
                  {idx > 0 && <ChevronRight size={13} strokeWidth={2.5} style={{ color: '#64748B' }} />}
                  <span
                    style={{
                      color: idx === arr.length - 1 ? '#9F1239' : '#0F172A',
                      fontSize: '13.5px',
                      fontWeight: idx === arr.length - 1 ? 500 : 600,
                      padding: idx === arr.length - 1 ? '4px 12px' : '0',
                      borderRadius: idx === arr.length - 1 ? '8px' : '0',
                      background: idx === arr.length - 1 ? 'rgba(159,18,57,0.08)' : 'transparent',
                      border: idx === arr.length - 1 ? '1px solid rgba(159,18,57,0.16)' : 'none',
                    }}
                  >
                    {crumb.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex lg:hidden items-center gap-1.5 min-w-0">
              {getBreadcrumbs(pathname).slice(-2).map((crumb, idx, arr) => (
                <div key={crumb.label + idx} className="flex items-center gap-1.5 min-w-0">
                  {idx > 0 && <ChevronRight size={12} strokeWidth={2.5} style={{ color: '#64748B' }} />}
                  <span style={{
                    color: idx === arr.length - 1 ? '#9F1239' : '#0F172A',
                    fontWeight: 600,
                    fontSize: '14px',
                  }} className="truncate">
                    {crumb.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: bell + avatar */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Bell notification */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setNotifOpen(p => !p);
                  if (!notifOpen) {
                    setUnreadCount(0);
                    localStorage.setItem('notif_seen_at', new Date().toISOString());
                  }
                }}
                style={{
                  position: 'relative', width: '40px', height: '40px', borderRadius: '12px',
                  background: notifOpen ? '#F1F5F9' : unreadCount > 0 ? 'rgba(225,29,72,0.06)' : '#F8FAFC',
                  border: `1.5px solid ${notifOpen ? '#E2E8F0' : unreadCount > 0 ? 'rgba(225,29,72,0.16)' : '#EEF2F7'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  color: unreadCount > 0 ? '#E11D48' : '#64748B',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = unreadCount > 0 ? 'rgba(225,29,72,0.10)' : '#EEF2F7';
                  e.currentTarget.style.borderColor = unreadCount > 0 ? 'rgba(225,29,72,0.25)' : '#E2E8F0';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = notifOpen ? '#F1F5F9' : unreadCount > 0 ? 'rgba(225,29,72,0.06)' : '#F8FAFC';
                  e.currentTarget.style.borderColor = notifOpen ? '#E2E8F0' : unreadCount > 0 ? 'rgba(225,29,72,0.16)' : '#EEF2F7';
                }}
              >
                <Bell size={16} strokeWidth={2} style={{ marginTop: '-1px' }} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    minWidth: '18px', height: '18px', borderRadius: '9px',
                    background: '#E11D48', border: '2px solid #FFFFFF',
                    fontSize: '9px', fontWeight: 800, color: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1, padding: '0 3px',
                    boxShadow: '0 1px 4px rgba(225,29,72,0.45)',
                  }}>{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
              </button>

              {notifOpen && (
                <div className="notif-panel" style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: '#FFFFFF', border: '1px solid #E2E8F0',
                  borderRadius: '16px', boxShadow: '0 16px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
                  width: '340px', zIndex: 100, overflow: 'hidden',
                }}>
                  {/* Header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #EEF2F7', display: 'flex', alignItems: 'center' }}>
                    <Bell size={14} style={{ color: '#475569', marginRight: '8px', flexShrink: 0 }} />
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', flex: 1 }}>Notifications</span>
                    {activities.length > 0 && (
                      <button
                        onClick={() => {
                          const now = new Date().toISOString();
                          setActivities([]); setUnreadCount(0);
                          localStorage.setItem('notif_cleared_at', now);
                          localStorage.setItem('notif_seen_at', now);
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          fontSize: '11px', fontWeight: 600, color: '#64748B',
                          background: '#F1F5F9', border: '1px solid #E2E8F0',
                          padding: '4px 10px', borderRadius: '8px', cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#E11D48'; e.currentTarget.style.borderColor = 'rgba(225,29,72,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                      >
                        <Trash2 size={10} />
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Items */}
                  <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                    {activities.length === 0 ? (
                      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                          <Bell size={22} style={{ color: '#CBD5E1' }} />
                        </div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>All caught up!</p>
                        <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>No new activity right now</p>
                      </div>
                    ) : activities.map((item, i) => (
                      <div key={i} style={{
                        padding: '12px 16px',
                        borderBottom: i < activities.length - 1 ? '1px solid #F8FAFC' : 'none',
                        background: item.isNew ? 'rgba(225,29,72,0.025)' : '#FFFFFF',
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                      }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '11px', flexShrink: 0,
                          background: item.type === 'talent' ? 'rgba(14,165,233,0.12)' : item.type === 'application' ? 'rgba(5,150,105,0.12)' : 'rgba(190,18,60,0.10)',
                          border: `1px solid ${item.type === 'talent' ? 'rgba(14,165,233,0.18)' : item.type === 'application' ? 'rgba(5,150,105,0.18)' : 'rgba(190,18,60,0.16)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {item.type === 'talent'
                            ? <UserCheck size={15} style={{ color: '#0EA5E9' }} />
                            : item.type === 'application'
                            ? <Briefcase size={15} style={{ color: '#059669' }} />
                            : <Users size={15} style={{ color: '#BE123C' }} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                            <span style={{ fontSize: '10.5px', color: '#475569', flexShrink: 0, fontWeight: 500 }}>{timeAgo(item.createdAt)}</span>
                          </div>
                          <span style={{
                            display: 'inline-block', marginTop: '3px', marginBottom: '2px',
                            fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                            padding: '1.5px 7px', borderRadius: '5px',
                            background: item.type === 'talent' ? 'rgba(14,165,233,0.10)' : item.type === 'application' ? 'rgba(5,150,105,0.10)' : 'rgba(190,18,60,0.10)',
                            color: item.type === 'talent' ? '#0369A1' : item.type === 'application' ? '#047857' : '#9F1239',
                            border: `1px solid ${item.type === 'talent' ? 'rgba(14,165,233,0.18)' : item.type === 'application' ? 'rgba(5,150,105,0.18)' : 'rgba(190,18,60,0.16)'}`,
                          }}>
                            {item.type === 'talent' ? 'Talent Pool' : item.type === 'application' ? 'Job Application' : 'Enquiry'}
                          </span>
                          <p style={{ fontSize: '12px', color: '#475569', marginTop: '1px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.detail}</p>
                          {item.sub && <p style={{ fontSize: '11px', color: '#64748B', marginTop: '1px', textTransform: 'capitalize', fontWeight: 500 }}>{item.sub}</p>}
                        </div>
                        {item.isNew && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#E11D48', flexShrink: 0, marginTop: '6px', boxShadow: '0 0 4px rgba(225,29,72,0.5)' }} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar + dropdown */}
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(p => !p)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9F1239 0%, #E11D48 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: profileOpen ? '0 0 0 3px rgba(225,29,72,0.20)' : '0 2px 8px rgba(159,18,57,0.28)',
                  color: '#FFFFFF', fontSize: '13px', fontWeight: 800,
                  border: 'none', cursor: 'pointer',
                  flexShrink: 0, userSelect: 'none',
                  transition: 'box-shadow 0.15s',
                }}
              >
                A
              </button>

              {profileOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: '#FFFFFF',
                  border: '1px solid #EEF2F7',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
                  minWidth: '230px',
                  zIndex: 100,
                  overflow: 'hidden',
                }}>
                  {/* User info */}
                  <div style={{ padding: '16px 18px', borderBottom: '1px solid #EEF2F7' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #9F1239 0%, #E11D48 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#FFFFFF', fontSize: '15px', fontWeight: 800,
                      }}>A</div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Admin</p>
                        <p style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {adminEmail || 'admin@innovatiq.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div style={{ padding: '8px' }}>
                    <button
                      onClick={() => { setProfileOpen(false); handleLogout(); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        width: '100%', padding: '10px 12px', borderRadius: '10px',
                        background: 'transparent', border: 'none',
                        fontSize: '13px', fontWeight: 600, color: '#E11D48',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(225,29,72,0.07)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={14} strokeWidth={2} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            </div>{/* end right flex */}
          </header>

          <main className="admin-main" style={{ flex: 1, padding: '24px', overflow: 'auto', background: '#F8FAFC' }}>{children}</main>
        </div>

        <Toaster />
      </div>
    </>
  );
}
