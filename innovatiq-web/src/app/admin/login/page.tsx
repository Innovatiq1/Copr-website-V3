'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/lib/adminApi';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

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

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #F8FAFC 50%, #EEF2FF 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px]"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.06) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.08) 0%, transparent 60%)' }} />
      </div>

      {/* Floating decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-dashed"
          style={{ borderColor: 'rgba(212,23,74,0.1)', animation: 'spin 30s linear infinite' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full border border-dashed"
          style={{ borderColor: 'rgba(99,102,241,0.08)', animation: 'spin 20s linear infinite reverse' }} />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        <div
          className="relative rounded-3xl p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Logo / Icon */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-2xl blur-lg"
                style={{ background: 'rgba(212,23,74,0.2)' }} />
              <div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                  boxShadow: '0 8px 32px rgba(212,23,74,0.35)',
                }}
              >
                <Shield size={26} color="white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Portal</h1>
            <p className="text-slate-400 text-sm">Innovatiq Technologies</p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-start gap-3 mb-5 px-4 py-3.5 rounded-2xl text-sm"
              style={{
                background: 'rgba(220,38,38,0.06)',
                border: '1px solid rgba(220,38,38,0.18)',
              }}
            >
              <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
              <span className="text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@innovatiq.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 text-sm placeholder-slate-300 outline-none transition-all"
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,23,74,0.5)';
                    e.currentTarget.style.background = 'rgba(212,23,74,0.02)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.background = '#F8FAFC';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-slate-900 text-sm placeholder-slate-300 outline-none transition-all"
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,23,74,0.5)';
                    e.currentTarget.style.background = 'rgba(212,23,74,0.02)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.background = '#F8FAFC';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all mt-2 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                boxShadow: '0 8px 32px rgba(212,23,74,0.3)',
              }}
              onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,23,74,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,23,74,0.3)')}
            >
              <span className="relative">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In to Admin'}
              </span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-300 text-xs mt-6">
            Authorized personnel only · Innovatiq Technologies © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
