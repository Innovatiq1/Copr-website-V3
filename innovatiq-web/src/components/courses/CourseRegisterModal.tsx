'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2 } from 'lucide-react';
import { LMS_API_BASE, type LmsCourse } from '@/lib/lms';
import { markModalOpen, markModalClosed } from '@/lib/blockingModal';

interface Props {
  course: LmsCourse;
  orgCode?: string;
  onClose: () => void;
}

export default function CourseRegisterModal({ course, orgCode, onClose }: Props) {
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [enrollWarning, setEnrollWarning] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    markModalOpen();
    return () => {
      document.body.style.overflow = '';
      markModalClosed();
    };
  }, []);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!orgCode) {
      setError('Registration is temporarily unavailable. Please try again later.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setSubmitting(true);
    try {
      const registerRes = await fetch(`${LMS_API_BASE}/auth/register/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgCode,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          password: form.password,
        }),
      });
      const registerData = await registerRes.json().catch(() => ({}));
      if (!registerRes.ok) throw new Error(registerData?.error || 'Registration failed. Please try again.');

      // Account created. Also enroll them in this specific course so the
      // request shows up in the org admin's course approvals/learners list,
      // not just as a standalone account.
      try {
        const loginRes = await fetch(`${LMS_API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok || !loginData?.token) throw new Error('login failed');

        const enrollRes = await fetch(`${LMS_API_BASE}/enrollments/${course.id}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginData.token}`,
          },
        });
        if (!enrollRes.ok) throw new Error('enroll failed');
      } catch {
        setEnrollWarning(true);
      }

      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,15,20,0.55)', backdropFilter: 'blur(4px)' }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#BE123C' }}>Register for course</p>
            <h3 className="font-bold text-gray-900">{course.title}</h3>
          </div>
          <button onClick={onClose} className="shrink-0 p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {done ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-emerald-600" size={28} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Registration submitted!</h4>
              {enrollWarning ? (
                <p className="text-sm text-gray-600 mt-2">
                  Your account has been created. We couldn&apos;t automatically enroll you in <span className="font-semibold">{course.title}</span> — please log in and register for it from your dashboard to complete enrollment.
                </p>
              ) : (
                <p className="text-sm text-gray-600 mt-2">
                  Your enrollment request for <span className="font-semibold">{course.title}</span> has been sent to the organization admin for approval. You&apos;ll be notified by email once it&apos;s approved.
                </p>
              )}
              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-xl text-white text-sm font-semibold py-3 transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" autoComplete="off">
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={form.email}
                  onChange={update('email')}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">First name</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={form.firstName}
                    onChange={update('firstName')}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Last name</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={form.lastName}
                    onChange={update('lastName')}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={update('password')}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm password</label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl text-white text-sm font-semibold py-3 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 18px rgba(190,18,60,0.30)' }}
              >
                {submitting ? 'Submitting…' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
