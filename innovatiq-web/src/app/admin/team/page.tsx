'use client';

import { useEffect, useState } from 'react';
import { API, authFetch } from '@/lib/adminApi';
import { Plus, Trash2, UserPlus } from 'lucide-react';

type Member = {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function TeamMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const fetchMembers = async () => {
    try {
      const res = await authFetch(`${API}/admin/team`);
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const addMember = async () => {
    if (!email.trim()) return;
    setAdding(true);
    setError('');
    try {
      const res = await authFetch(`${API}/admin/team`, {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Failed to add team member'); return; }
      setMembers((prev) => [data, ...prev]);
      setEmail('');
      setName('');
      setPassword('');
    } catch {
      setError('Failed to add team member');
    }
    setAdding(false);
  };

  const removeMember = async (id: string) => {
    if (!confirm('Remove this team member\'s access?')) return;
    try {
      await authFetch(`${API}/admin/team/${id}`, { method: 'DELETE' });
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch { /* silent */ }
  };

  const cardStyle = { background: '#FFFFFF', border: '1px solid #EEF2F7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' };
  const accentGradient = 'linear-gradient(135deg, #9F1239 0%, #E11D48 100%)';

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Team Members</h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          Only emails added here can access the Admin Panel — with Microsoft sign-in, or email &amp; password if one is set below.
        </p>
      </div>

      <div className="rounded-2xl p-6 mb-6" style={cardStyle}>
        <h2 className="font-semibold mb-4" style={{ color: '#0F172A' }}>Add Team Member</h2>
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
            {error}
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Full name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
          />
          <input
            type="email"
            placeholder="Company email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
          />
          <input
            type="text"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
          Leave password blank if this person should only sign in with Microsoft.
        </p>
        <button
          onClick={addMember}
          disabled={adding || !email.trim()}
          className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: accentGradient }}
        >
          <Plus size={16} /> {adding ? 'Adding...' : 'Add Team Member'}
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Name', 'Email', 'Added', ''].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: '#64748B' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center" style={{ color: '#94A3B8' }}>Loading...</td></tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center" style={{ color: '#94A3B8' }}>
                  <UserPlus size={22} style={{ margin: '0 auto 8px', color: '#CBD5E1' }} />
                  No team members added yet
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td className="px-5 py-4 text-sm" style={{ color: '#334155' }}>{m.name || '—'}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#334155' }}>{m.email}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: '#64748B' }}>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-sm">
                    <button
                      onClick={() => removeMember(m._id)}
                      style={{ color: '#94A3B8' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#E11D48')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}