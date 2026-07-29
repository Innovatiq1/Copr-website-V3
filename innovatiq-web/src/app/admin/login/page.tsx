'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/lib/adminApi';
import { Eye, EyeOff, Lock, Mail, FileText, Users, Briefcase, BarChart2 } from 'lucide-react';

const FEATURES = [
  { icon: FileText, label: 'Manage Blogs & Videos' },
  { icon: Users, label: 'Track Enquiries & Talent' },
  { icon: Briefcase, label: 'Control Careers & Awards' },
  { icon: BarChart2, label: 'Export Reports to Excel' },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Invalid credentials. Please try again.');
        return;
      }
      const token = data.token || data.accessToken || data.data?.token;
      if (token) {
        localStorage.setItem('admin_token', token);
        router.replace('/admin/dashboard');
      } else {
        setError('Login failed: no token received from server.');
      }
    } catch {
      setError('Cannot connect to server. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase: React.CSSProperties = {
    background: '#F8FAFC',
    border: '1.5px solid #E2E8F0',
    color: '#0F172A',
    borderRadius: '12px',
    padding: '11px 14px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
  };

  return (
    <div className="min-h-screen flex w-full" style={{ background: '#F1F5F9' }}>

      {/* ── Left Brand Panel (Rose Section) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[440px] shrink-0 p-10 relative overflow-hidden select-none"
        style={{
          background: 'linear-gradient(180deg, #580820 0%, #7A0E2E 35%, #A80E38 70%, #CC1244 100%)',
        }}
      >
        {/* Layer 1: Ambient Top-Right Radial Glow */}
        <div
          className="absolute top-0 right-0 w-[350px] h-[350px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Layer 2: Top-Right Circular Arcs & Dots Pattern */}
        <div
          className="absolute top-0 right-0 w-[380px] h-[380px] pointer-events-none z-0 opacity-80"
          style={{
            backgroundImage: "url('/images/bg-pattern-circles.svg')",
            backgroundSize: 'contain',
            backgroundPosition: 'top right',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Layer 3: Dot Matrix Pattern Grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-50"
          style={{
            backgroundImage: "url('/images/bg-dots.svg')",
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Bottom Crimson Accent Glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[70px] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(0deg, rgba(212, 20, 69, 0.45) 0%, transparent 100%)',
          }}
        />

        {/* Top — Header Logo & Heading */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <img src="/logo/logo.png" alt="Innovatiq logo" className="w-6 h-6 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">Innovatiq</p>
              <p className="text-white/80 text-xs mt-0.5">Technologies</p>
            </div>
          </div>

          <h1 className="text-white text-3xl font-bold leading-snug mb-3">
            Admin<br />Control Panel
          </h1>

          {/* Accent Line */}
          <div
            className="w-10 h-1 rounded-full mb-4"
            style={{ background: '#D41445', boxShadow: '0 0 8px rgba(212,20,69,0.6)' }}
          />

          <p className="text-white/90 text-sm leading-relaxed max-w-xs mb-8">
            Manage your website content, enquiries, careers, awards, blogs and more from one place.
          </p>

          {/* Middle — Feature List */}
          <div className="space-y-4 mb-6">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  }}
                >
                  <Icon size={16} color="white" />
                </div>
                <span className="text-white text-sm font-medium tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Singapore Skyline Image */}
        <img
          src="/images/bg-skyline.png"
          alt="Singapore skyline silhouette"
          className="absolute bottom-0 left-0 pointer-events-none select-none"
          style={{
            width: '100%',
            height: 'auto',
            mixBlendMode: 'screen',
            opacity: 0.82,
          }}
        />
      </div>

      {/* ── Right Form Section (Original Card UI) ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative overflow-hidden">

        {/* Abstract: same circles pattern used on left panel — top-right */}
        <div className="absolute top-0 right-0 w-[340px] h-[340px] pointer-events-none select-none" style={{
          backgroundImage: "url('/images/bg-pattern-circles.svg')",
          backgroundSize: 'contain',
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
        }} />

        {/* Abstract: same circles pattern — bottom-left, flipped */}
        <div className="absolute bottom-0 left-0 w-[240px] h-[240px] pointer-events-none select-none" style={{
          backgroundImage: "url('/images/bg-pattern-circles.svg')",
          backgroundSize: 'contain',
          backgroundPosition: 'bottom left',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          transform: 'rotate(180deg)',
        }} />

        {/* Abstract: dot grid */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.28) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }} />
        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#9F1239,#E11D48)', boxShadow: '0 4px 16px rgba(190,18,60,0.3)' }}
            >
              <img src="/logo/logo.png" alt="Innovatiq logo" className="w-6 h-6 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-base leading-none">Innovatiq</p>
              <p className="text-slate-500 text-xs mt-0.5 font-medium">Technologies</p>
            </div>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
              <p className="text-slate-500 text-sm">Sign in to your admin account to continue.</p>
            </div>

            {error && (
              <div
                className="flex items-start gap-3 mb-5 px-4 py-3.5 rounded-xl text-sm"
                style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.18)' }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(220,38,38,0.1)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
                <span className="text-red-600">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    style={{ ...inputBase, paddingLeft: '38px' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#BE123C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(190,18,60,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={{ ...inputBase, paddingLeft: '38px', paddingRight: '44px' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#BE123C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(190,18,60,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#9F1239 0%,#BE123C 50%,#E11D48 100%)', boxShadow: '0 6px 24px rgba(190,18,60,0.28)', marginTop: '8px' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-5" style={{ borderTop: '1px solid #F1F5F9' }}>
              <p className="text-center text-slate-500 text-xs">
                Authorized personnel only &middot; Innovatiq Technologies &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
