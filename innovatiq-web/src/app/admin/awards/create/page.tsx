'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API, getToken } from '@/lib/adminApi';
import { ArrowLeft, Upload } from 'lucide-react';

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  borderRadius: '10px',
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  fontSize: '14px',
};

export default function AwardCreatePage() {
  const router = useRouter();
  const awardImageRef = useRef<HTMLInputElement>(null);
  const optionalImageRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [awardImage, setAwardImage] = useState<File | null>(null);
  const [optionalImage, setOptionalImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!awardImage) { setError('Award image is required'); return; }
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('shortDescription', shortDescription);
      if (description) fd.append('description', description);
      if (year) fd.append('year', year);
      fd.append('awardImage', awardImage);
      if (optionalImage) fd.append('optionalImage', optionalImage);

      const token = getToken();
      const res = await fetch(`${API}/awards`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to create award');
      router.push('/admin/awards');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/awards" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Create Award</h1>
          <p className="text-gray-400 text-sm mt-0.5">Add a new award or recognition</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="rounded-2xl p-6 space-y-6"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#EF4444' }}>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                placeholder="Award title" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Year</label>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2024" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Short Description * <span className="text-gray-500">({shortDescription.length}/200)</span>
            </label>
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value.slice(0, 200))} required
              rows={3} placeholder="Brief description of the award..."
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description (HTML)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              rows={8} placeholder="<p>Full award description...</p>"
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Award Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Award Image *</label>
              <div
                className="flex flex-col items-center justify-center gap-3 py-8 rounded-xl cursor-pointer"
                style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                onClick={() => awardImageRef.current?.click()}
              >
                <Upload size={24} className="text-gray-500" />
                <span className="text-sm text-gray-400 text-center">
                  {awardImage ? awardImage.name : 'Click to upload award image'}
                </span>
                <input ref={awardImageRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => setAwardImage(e.target.files?.[0] || null)} />
              </div>
            </div>

            {/* Optional Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Optional Image</label>
              <div
                className="flex flex-col items-center justify-center gap-3 py-8 rounded-xl cursor-pointer"
                style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                onClick={() => optionalImageRef.current?.click()}
              >
                <Upload size={24} className="text-gray-500" />
                <span className="text-sm text-gray-400 text-center">
                  {optionalImage ? optionalImage.name : 'Click to upload optional image'}
                </span>
                <input ref={optionalImageRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => setOptionalImage(e.target.files?.[0] || null)} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 15px rgba(212,23,74,0.3)' }}>
            {loading ? 'Creating...' : 'Create Award'}
          </button>
          <Link href="/admin/awards"
            className="px-6 py-3 rounded-xl text-sm font-medium text-gray-300"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
