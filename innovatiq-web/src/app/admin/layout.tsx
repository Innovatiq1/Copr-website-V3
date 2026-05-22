'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
    <div className="flex min-h-screen" style={{ background: '#07101E' }}>

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle at top left, rgba(212,23,74,0.18) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(59,130,246,0.05) 0%, transparent 60%)' }} />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
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
          background: 'linear-gradient(180deg, rgba(10,18,37,0.98) 0%, rgba(6,11,20,0.98) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Logo area */}
        <div
          className="flex items-center justify-between px-5 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)' }}>
              <span className="text-white text-xs font-black">IQ</span>
            </div>
            <div>
              <p className="text-white text-sm font-bold leading-none">Innovatiq</p>
              <p className="text-gray-500 text-[10px] mt-0.5 leading-none">Admin Panel</p>
            </div>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest px-3 mb-3">
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
                    ? 'linear-gradient(135deg, rgba(212,23,74,0.2) 0%, rgba(212,23,74,0.22) 100%)'
                    : 'transparent',
                  border: isActive ? '1px solid rgba(212,23,74,0.2)' : '1px solid transparent',
                  color: isActive ? '#FF4D7C' : '#6B7280',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '14px',
                }}
              >
                {/* Active left bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ background: '#D4174A' }} />
                )}
                <Icon size={17} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} style={{ color: '#D4174A' }} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-gray-500 hover:text-red-400 hover:bg-red-900/10 group"
            style={{ fontSize: '14px', border: '1px solid transparent' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-6 py-4"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'linear-gradient(180deg, rgba(10,18,37,0.8) 0%, transparent 100%)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <span className="text-white font-semibold text-sm">Admin Panel</span>
          </div>
          {/* Breadcrumb on desktop */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <span className="text-gray-600">Admin</span>
            <ChevronRight size={14} className="text-gray-700" />
            <span className="text-gray-300 font-medium capitalize">
              {pathname.split('/').filter(Boolean).pop()}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500 hidden sm:block">Connected</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
