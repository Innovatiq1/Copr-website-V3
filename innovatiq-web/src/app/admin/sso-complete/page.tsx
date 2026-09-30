'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SsoCompletePage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const hash = window.location.hash; // "#token=eyJ..."
    const match = hash.match(/token=([^&]+)/);
    if (!match) {
      setError('No token received from Microsoft sign-in.');
      return;
    }
    localStorage.setItem('admin_token', decodeURIComponent(match[1]));
    // Clean the token out of the URL immediately, then move on.
    window.history.replaceState(null, '', '/admin/sso-complete');
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F0F4F8' }}>
      <p style={{ color: error ? '#DC2626' : '#64748B' }}>
        {error || 'Signing you in...'}
      </p>
    </div>
  );
}