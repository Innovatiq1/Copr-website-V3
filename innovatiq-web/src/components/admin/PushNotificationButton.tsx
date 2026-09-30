'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { API, authFetch } from '@/lib/adminApi';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function PushNotificationButton() {
  const [subscribed, setSubscribed] = useState(false);
  const [supported, setSupported] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    setSupported(true);

    navigator.serviceWorker.register('/sw.js').then(async (reg) => {
      const existing = await reg.pushManager.getSubscription();
      setSubscribed(!!existing);
    }).catch(() => {});
  }, []);

  const enable = async () => {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setLoading(false);
        return;
      }

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) { setLoading(false); return; }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await authFetch(`${API}/push/subscribe`, {
        method: 'POST',
        body: JSON.stringify(sub.toJSON()),
      });
      setSubscribed(true);
    } catch (err) {
      console.error('Push subscribe failed:', err);
    }
    setLoading(false);
  };

  const disable = async () => {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await authFetch(`${API}/push/subscribe`, {
          method: 'DELETE',
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setSubscribed(false);
    } catch (err) {
      console.error('Push unsubscribe failed:', err);
    }
    setLoading(false);
  };

  if (!supported) return null;

  return (
    <button
      onClick={subscribed ? disable : enable}
      disabled={loading}
      title={subscribed ? 'Notifications enabled — click to disable' : 'Enable push notifications'}
      style={{
        width: '40px', height: '40px', borderRadius: '12px',
        background: subscribed ? 'rgba(16,185,129,0.08)' : '#F8FAFC',
        border: `1.5px solid ${subscribed ? 'rgba(16,185,129,0.2)' : '#EEF2F7'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: subscribed ? '#059669' : '#64748B',
        transition: 'all 0.15s',
      }}
    >
      {subscribed ? <Bell size={16} /> : <BellOff size={16} />}
    </button>
  );
}
