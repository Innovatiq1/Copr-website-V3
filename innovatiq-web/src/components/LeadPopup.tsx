'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isBlockingModalOpen } from '@/lib/blockingModal';

type PopupField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: string[];
  order?: number;
};

type PopupSettings = {
  enabled: boolean;
  delaySeconds: number;
  title: string;
  description: string;
  thankYouMessage: string;
  submitButtonText: string;
  fields: PopupField[];
};

const STORAGE_KEY = 'iq_lead_popup_submitted';

export default function LeadPopup() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const [settings, setSettings] = useState<PopupSettings | null>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load settings + check if this visitor already submitted (localStorage + server IP check)
  useEffect(() => {
    if (isAdmin) return;

    let cancelled = false;

    async function init() {
      try {
        const alreadyLocally = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1';
        if (alreadyLocally) {
          setSubmitted(true);
          setChecking(false);
          return;
        }

        const [settingsRes, statusRes] = await Promise.all([
          fetch('/api/popup-settings'),
          fetch('/api/popup-leads/status'),
        ]);

        const settingsData = await settingsRes.json();
        const statusData = await statusRes.json();

        if (cancelled) return;

        if (statusData?.submitted) {
          localStorage.setItem(STORAGE_KEY, '1');
          setSubmitted(true);
          setChecking(false);
          return;
        }

        setSettings(settingsData);
        setChecking(false);
      } catch {
        if (!cancelled) setChecking(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [isAdmin]);

  // Timer: show popup after admin-configured delay. If another modal (e.g.
  // course registration) is open when the delay elapses, wait for it to
  // close first instead of popping up on top of it.
  useEffect(() => {
    if (isAdmin || checking || submitted || !settings?.enabled) return;

    let pollId: ReturnType<typeof setInterval> | undefined;
    const reveal = () => {
      if (isBlockingModalOpen()) {
        pollId = setInterval(() => {
          if (!isBlockingModalOpen()) {
            clearInterval(pollId);
            setVisible(true);
          }
        }, 500);
      } else {
        setVisible(true);
      }
    };

    const delayMs = Math.max(0, (settings.delaySeconds ?? 10)) * 1000;
    const timer = setTimeout(reveal, delayMs);
    return () => {
      clearTimeout(timer);
      if (pollId) clearInterval(pollId);
    };
  }, [isAdmin, checking, submitted, settings]);

  if (isAdmin || checking || !settings?.enabled || !visible) return null;

  const sortedFields = [...(settings.fields || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    for (const field of sortedFields) {
      if (field.required && !formData[field.id]?.trim()) {
        setError(`Please fill in ${field.label}`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/popup-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData, page: pathname }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      localStorage.setItem(STORAGE_KEY, '1');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#0F172A',
  };
  const accentGradient = 'linear-gradient(135deg, #BE123C 0%, #E11D48 60%, #F43F5E 100%)';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 sm:p-8"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(255,250,251,0.94) 100%)',
          border: '1px solid rgba(190,18,60,0.12)',
          boxShadow: '0 24px 70px rgba(190,18,60,0.18), 0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Top accent bar, matching the site's crimson gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
          style={{ background: accentGradient }}
        />

        {/* Intentionally no close/X button while unsubmitted — popup is mandatory per requirement.
            It only disappears after successful submission. */}
        {!submitted ? (
          <>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#0F172A' }}>{settings.title}</h2>
            <p className="text-sm mb-6" style={{ color: '#64748B' }}>{settings.description}</p>

            {error && (
              <div
                className="mb-4 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {sortedFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>
                    {field.label}{field.required && <span style={{ color: '#E11D48' }}> *</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={inputStyle}
                    >
                      <option value="">Select...</option>
                      {(field.options || []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={inputStyle}
                    />
                  ) : (
                    <input
                      type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={inputStyle}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{ background: accentGradient, boxShadow: '0 8px 20px rgba(190,18,60,0.25)' }}
              >
                {submitting ? 'Submitting...' : settings.submitButtonText}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-lg font-semibold mb-6" style={{ color: '#0F172A' }}>{settings.thankYouMessage}</p>
            <button
              onClick={() => setVisible(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: accentGradient }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}