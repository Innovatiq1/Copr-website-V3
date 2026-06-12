'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Trophy,
  Video,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Blogs', icon: FileText, href: '/admin/blogs' },
  { label: 'Careers', icon: Briefcase, href: '/admin/careers' },
  { label: 'Awards', icon: Trophy, href: '/admin/awards' },
  { label: 'Videos', icon: Video, href: '/admin/videos' },
  { label: 'Enquiries', icon: Users, href: '/admin/enquiries' },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.replace('/admin/login');
  };

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#F1F5F9' }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}
        style={{
          width: '260px',
          minWidth: '260px',
          background: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          boxShadow: '4px 0 24px rgba(0,0,0,0.04)',
        }}
      >
        {/* Logo area */}
        <div
          className="flex items-center justify-between px-5 py-5"
          style={{ borderBottom: '1px solid #E2E8F0' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)' }}>
              <span className="text-white text-xs font-black">IQ</span>
            </div>
            <div>
              <p className="text-slate-900 text-sm font-bold leading-none">Innovatiq</p>
              <p className="text-slate-600 text-[10px] mt-0.5 leading-none">Admin Panel</p>
            </div>
          </div>
          <button
            className="lg:hidden text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest px-3 mb-3">
            Main Menu
          </p>
          {navLinks.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all group relative"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(190,18,60,0.08) 0%, rgba(190,18,60,0.12) 100%)'
                    : 'transparent',
                  border: isActive ? '1px solid rgba(190,18,60,0.15)' : '1px solid transparent',
                  color: isActive ? '#BE123C' : '#1E293B',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '14px',
                }}
              >
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ background: '#BE123C' }} />
                )}
                <Icon size={17} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} style={{ color: '#BE123C' }} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4" style={{ borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-slate-500 hover:text-red-500 hover:bg-red-50 group cursor-pointer"
            style={{ fontSize: '14px', border: '1px solid transparent' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-6 py-4"
          style={{
            borderBottom: '1px solid #E2E8F0',
            background: '#FFFFFF',
            boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
          }}
        >
          <button
            className="lg:hidden text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <span className="text-slate-800 font-semibold text-sm">Admin Panel</span>
          </div>
          {/* Breadcrumb on desktop */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <span className="text-slate-600">Admin</span>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-slate-700 font-medium capitalize">
              {pathname.split('/').filter(Boolean).pop()}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-600 hidden sm:block">Connected</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
