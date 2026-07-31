'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { API } from '@/lib/adminApi';
import {
  Eye, EyeOff, Lock, Mail,
  FileText, Users, Briefcase, BarChart2,
  Shield, XCircle,
} from 'lucide-react';

const FEATURES = [
  { icon: FileText,  label: 'Manage Blogs & Videos'     },
  { icon: Users,     label: 'Track Enquiries & Talent'   },
  { icon: Briefcase, label: 'Control Careers & Awards'   },
  { icon: BarChart2, label: 'Export Reports to Excel'    },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [focused,  setFocused]  = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res  = await fetch(`${API}/admin/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data?.message || 'Invalid credentials. Please try again.'); return; }
      const token = data.token || data.accessToken || data.data?.token;
      if (token) { localStorage.setItem('admin_token', token); router.replace('/admin/dashboard'); }
      else setError('Login failed: no token received from server.');
    } catch {
      setError('Cannot connect to server. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const inp = (field: string): React.CSSProperties => ({
    background:   focused === field ? '#FFFFFF' : '#F8FAFC',
    border:       `1.5px solid ${focused === field ? '#BE123C' : '#E2E8F0'}`,
    boxShadow:    focused === field
      ? '0 0 0 4px rgba(190,18,60,0.09), 0 1px 3px rgba(0,0,0,0.04)'
      : '0 1px 2px rgba(0,0,0,0.03)',
    color:        '#0F172A',
    borderRadius: '14px',
    padding:      '12px 16px 12px 44px',
    width:        '100%',
    fontSize:     '14px',
    outline:      'none',
    transition:   'all 0.18s ease',
  });

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .sb {
          background: linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .sb:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(190,18,60,0.38) !important;
        }
        .sb:active:not(:disabled) { transform: translateY(0); }
        .sb:disabled { opacity: 0.65; cursor: not-allowed; }

        input::placeholder { color: #94a3b8; }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', width: '100%', background: '#EDF1F7' }}>

        {/* ════════════════════════════════════
            LEFT — Brand Panel
        ════════════════════════════════════ */}
        <div
          className="hidden lg:flex flex-col justify-between w-[440px] shrink-0 p-10 relative overflow-hidden select-none"
          style={{ background: 'linear-gradient(180deg, #3D0712 0%, #6B0C27 30%, #9C1235 65%, #C81242 100%)' }}
        >
          {/* Deep centre-left warmth */}
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(180,12,52,0.45) 0%, transparent 70%)' }} />

          {/* Top-right ambient glow */}
          <div className="absolute top-0 right-0 w-[340px] h-[340px] pointer-events-none z-0"
            style={{ background: 'radial-gradient(circle at top right, rgba(255,255,255,0.10) 0%, transparent 65%)' }} />

          {/* Circular arcs — top-right */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none z-0"
            style={{
              backgroundImage: "url('/images/bg-pattern-circles.svg')",
              backgroundSize: 'contain', backgroundPosition: 'top right', backgroundRepeat: 'no-repeat',
              opacity: 0.85, mixBlendMode: 'overlay',
            }} />

          {/* Dot matrix — full panel */}
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{ backgroundImage: "url('/images/bg-dots.svg')", backgroundRepeat: 'repeat', opacity: 0.55, mixBlendMode: 'overlay' }} />

          {/* Bottom crimson bloom */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
            style={{ height: '180px', background: 'linear-gradient(0deg, rgba(180,10,50,0.75) 0%, transparent 100%)' }} />

          {/* Singapore Skyline */}
          <img src="/images/bg-skyline.png" alt="Singapore skyline silhouette"
            className="absolute bottom-0 left-0 pointer-events-none select-none z-0"
            style={{ width: '100%', height: 'auto', mixBlendMode: 'screen', opacity: 0.90 }} />

          {/* Top — Logo & Heading */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <img src="/logo/logo.png" alt="Innovatiq logo" className="w-6 h-6 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-none">Innovatiq</p>
                <p className="text-white/80 text-xs mt-0.5 font-medium">Technologies</p>
              </div>
            </div>

            <h1 className="text-white text-3xl font-bold leading-snug mb-3">
              Admin<br />Control Panel
            </h1>

            <div className="w-10 h-1 rounded-full mb-4"
              style={{ background: '#F43F7E', boxShadow: '0 0 10px rgba(244,63,126,0.7)' }} />

            <p className="text-white/90 text-sm leading-relaxed max-w-xs mb-8">
              Manage your website content, enquiries, careers, awards, blogs and more from one place.
            </p>

            <div className="space-y-4 mb-6">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255,255,255,0.13)', border: '1.5px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(4px)', boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
                    <Icon size={16} color="white" />
                  </div>
                  <span className="text-white text-sm font-medium tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT — Form Panel
        ════════════════════════════════════ */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', position: 'relative', overflow: 'hidden' }}>

          {/* Rose bleed — left edge, creates continuity with left panel */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(90deg, rgba(160,14,50,0.12) 0%, rgba(160,14,50,0.04) 25%, transparent 55%)',
          }} />

          {/* Soft top-right cool tint */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 50% at 100% 0%, rgba(220,220,235,0.6) 0%, transparent 70%)',
          }} />

          {/* Merlion — bottom-right watermark, facing left — hidden on mobile */}
          <img
            src="/images/singapore-merlion.png"
            alt=""
            aria-hidden
            className="absolute pointer-events-none select-none hidden lg:block"
            style={{
              bottom: '-10px',
              right: '-10px',
              width: '360px',
              height: 'auto',
              maxHeight: '68vh',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              opacity: 0.22,
              transform: 'scaleX(-1)',
            }}
          />

          <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center justify-center gap-3" style={{ marginBottom: '28px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: 'linear-gradient(135deg,#9F1239,#E11D48)',
                boxShadow: '0 4px 16px rgba(190,18,60,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src="/logo/logo.png" alt="Innovatiq" style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A', lineHeight: 1 }}>Innovatiq</p>
                <p style={{ color: '#64748B', fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>Technologies</p>
              </div>
            </div>

            {/* ── CARD ── */}
            <div
              className="p-6 sm:p-10"
              style={{
                background:    'rgba(255,255,255,0.97)',
                backdropFilter:'blur(24px) saturate(1.15)',
                border:        '1px solid rgba(226,232,240,0.85)',
                boxShadow:     '0 4px 6px rgba(0,0,0,0.04), 0 24px 64px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)',
                borderRadius:  '28px',
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '16px', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(159,18,57,0.07) 0%, rgba(225,29,72,0.13) 100%)',
                  border: '1.5px solid rgba(190,18,60,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Lock size={20} color="#BE123C" />
                </div>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, margin: 0 }}>
                    Welcome back
                  </h1>
                  <p style={{ fontSize: '13.5px', fontWeight: 500, color: '#64748B', marginTop: '3px' }}>
                    Sign in to your admin account
                  </p>
                </div>
              </div>

              {/* Error message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, y: -10, height: 0  }}
                    animate={{ opacity: 1, y: 0,   height: 'auto' }}
                    exit={{    opacity: 0, y: -10, height: 0  }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden', marginBottom: '20px' }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      background: 'rgba(220,38,38,0.05)',
                      border: '1px solid rgba(220,38,38,0.20)',
                      borderRadius: '12px', padding: '12px 14px',
                    }}>
                      <XCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: '1px' }} />
                      <span style={{ fontSize: '13.5px', color: '#B91C1C', lineHeight: 1.5 }}>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px', letterSpacing: '0.01em' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{
                      position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                      color: focused === 'email' ? '#BE123C' : '#94A3B8',
                      pointerEvents: 'none', transition: 'color 0.15s',
                    }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      style={inp('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={()  => setFocused(null)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px', letterSpacing: '0.01em' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{
                      position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                      color: focused === 'password' ? '#BE123C' : '#94A3B8',
                      pointerEvents: 'none', transition: 'color 0.15s',
                    }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••"
                      style={{ ...inp('password'), paddingRight: '46px' }}
                      onFocus={() => setFocused('password')}
                      onBlur={()  => setFocused(null)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                        color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer',
                        padding: 0, display: 'flex', alignItems: 'center',
                      }}
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="sb cursor-pointer"
                  style={{
                    width: '100%', padding: '14px 24px',
                    borderRadius: '14px', border: 'none',
                    color: '#FFFFFF', fontSize: '15px', fontWeight: 700,
                    boxShadow: '0 6px 24px rgba(190,18,60,0.30)',
                    marginTop: '4px', letterSpacing: '0.02em',
                    cursor: 'pointer',
                  }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px' }}>
                      <span style={{
                        width: '16px', height: '16px', borderRadius: '50%',
                        border: '2.5px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#ffffff',
                        animation: 'spin 0.65s linear infinite',
                        display: 'inline-block',
                      }} />
                      Signing in…
                    </span>
                  ) : 'Sign In'}
                </button>
              </form>

              {/* Footer */}
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0 text-center sm:whitespace-nowrap"
                style={{
                  marginTop: '24px', paddingTop: '20px',
                  borderTop: '1px solid #F1F5F9',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={12} color="#94A3B8" style={{ flexShrink: 0 }} />
                  <span style={{ color: '#64748B', fontSize: '11px', fontWeight: 500 }}>
                    Authorized personnel only
                  </span>
                </div>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-400 mx-2 align-middle shrink-0" style={{ opacity: 0.65 }} />
                <span style={{ color: '#64748B', fontSize: '11px', fontWeight: 500 }}>
                  Innovatiq Technologies &copy; {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
