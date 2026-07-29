'use client';

import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  exiting: boolean;
}

const _store: { toasts: ToastItem[]; listeners: Set<() => void> } = {
  toasts: [],
  listeners: new Set(),
};

function _emit() {
  _store.listeners.forEach(fn => fn());
}

function _exit(id: string) {
  _store.toasts = _store.toasts.map(t => (t.id === id ? { ...t, exiting: true } : t));
  _emit();
  setTimeout(() => {
    _store.toasts = _store.toasts.filter(t => t.id !== id);
    _emit();
  }, 400);
}

function _add(type: ToastType, message: string) {
  const id = Math.random().toString(36).slice(2, 9);
  _store.toasts = [..._store.toasts, { id, type, message, exiting: false }];
  _emit();
  setTimeout(() => _exit(id), 3800);
}

export const toast = {
  success: (msg: string) => _add('success', msg),
  error:   (msg: string) => _add('error', msg),
};

const CFG = {
  success: {
    strip:    'linear-gradient(90deg, #16A34A, #22C55E)',
    iconBg:   '#F0FDF4',
    iconBorder:'#BBF7D0',
    iconColor:'#16A34A',
    bar:      '#22C55E',
    label:    'Success',
  },
  error: {
    strip:    'linear-gradient(90deg, #DC2626, #F43F5E)',
    iconBg:   '#FFF1F2',
    iconBorder:'#FECDD3',
    iconColor:'#DC2626',
    bar:      '#F43F5E',
    label:    'Error',
  },
} as const;

function ToastCard({ item }: { item: ToastItem }) {
  const c = CFG[item.type];
  return (
    <div style={{
      position: 'relative',
      width: '360px',
      borderRadius: '16px',
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      boxShadow: '0 10px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      animation: item.exiting
        ? 'tOut 0.38s cubic-bezier(0.4,0,1,1) forwards'
        : 'tIn 0.42s cubic-bezier(0.16,1,0.3,1) forwards',
    }}>

      {/* Body */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px', padding: '14px 14px 16px' }}>

        {/* Icon */}
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
          background: c.iconBg, border: `1.5px solid ${c.iconBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {item.type === 'success' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 5" stroke={c.iconColor} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3.5 3.5L11.5 11.5M11.5 3.5L3.5 11.5" stroke={c.iconColor} strokeWidth="2.1" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: '1px' }}>
          <p style={{ margin: '0 0 3px', color: '#0F172A', fontSize: '14px', fontWeight: 700, lineHeight: 1.2 }}>
            {c.label}
          </p>
          <p style={{ margin: 0, color: '#64748B', fontSize: '13.5px', fontWeight: 400, lineHeight: 1.5 }}>
            {item.message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={() => _exit(item.id)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '26px', height: '26px', borderRadius: '8px',
            background: '#F8FAFC', border: '1px solid #E2E8F0',
            cursor: 'pointer', flexShrink: 0, color: '#94A3B8',
            marginTop: '2px', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#475569'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#94A3B8'; }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1 1L8 8M8 1L1 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom progress bar — wrapper fades out on exit so animation doesn't snap back to 100% */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
        opacity: item.exiting ? 0 : 1,
        transition: 'opacity 0.12s ease',
      }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, ${c.bar}, ${c.bar}99)`,
          transformOrigin: 'left',
          animation: 'tProgress 3.8s linear forwards',
        }} />
      </div>
    </div>
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const sync = () => setToasts([..._store.toasts]);
    _store.listeners.add(sync);
    return () => { _store.listeners.delete(sync); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes tIn {
          from { opacity:0; transform: translateX(calc(100% + 28px)) scale(0.92); }
          to   { opacity:1; transform: translateX(0) scale(1); }
        }
        @keyframes tOut {
          from { opacity:1; transform: translateX(0) scale(1); }
          to   { opacity:0; transform: translateX(calc(100% + 28px)) scale(0.95); }
        }
        @keyframes tProgress {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
      <div style={{
        position: 'fixed', top: '20px', right: '20px', zIndex: 99999,
        display: 'flex', flexDirection: 'column', gap: '10px',
        pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <ToastCard item={t} />
          </div>
        ))}
      </div>
    </>
  );
}
