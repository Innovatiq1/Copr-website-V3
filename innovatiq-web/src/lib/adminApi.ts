export const API = '/api';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function authHeaders(): HeadersInit {
  const token = getToken();
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

export function authFetch(url: string, options?: RequestInit) {
  return fetch(url, { ...options, headers: { ...authHeaders(), ...(options?.headers || {}) } });
}
