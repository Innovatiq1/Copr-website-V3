'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API, getToken } from '@/lib/adminApi';
import { ArrowLeft, Upload } from 'lucide-react';

const inputStyle: React.CSSProperties = {
  background: '#F8FAFC',
  border: '1px solid #E2E8F0',
  color: '#0F172A',
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
  const [awardImagePreview, setAwardImagePreview] = useState<string | null>(null);
  const [optionalImage, setOptionalImage] = useState<File | null>(null);
  const [optionalImagePreview, setOptionalImagePreview] = useState<string | null>(null);
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

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#BE123C';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(190,18,60,0.1)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#E2E8F0';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/awards" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create Award</h1>
          <p className="text-slate-500 text-sm mt-0.5">Add a new award or recognition</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl p-6 space-y-6"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                placeholder="Award title" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Year</label>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2024" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Short Description * <span className="text-slate-400">({shortDescription.length}/200)</span>
            </label>
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value.slice(0, 200))} required
              rows={3} placeholder="Brief description of the award..."
              style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (HTML)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              rows={8} placeholder="<p>Full award description...</p>"
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Award Image *</label>
              <div className="rounded-xl cursor-pointer transition-all overflow-hidden"
                style={{ border: '2px dashed #CBD5E1', background: '#F8FAFC' }}
                onClick={() => awardImageRef.current?.click()}>
                {awardImagePreview ? (
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative shrink-0 rounded-xl overflow-hidden bg-slate-100" style={{ width: '180px', height: '135px' }}>
                      <img src={awardImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Upload size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{awardImage?.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{awardImage ? (awardImage.size / 1024).toFixed(1) : 0} KB</p>
                      <p className="text-xs text-[#BE123C] mt-2 font-medium">Click anywhere to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <Upload size={24} className="text-slate-400" />
                    <span className="text-sm text-slate-500">Click to upload award image</span>
                  </div>
                )}
                <input ref={awardImageRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setAwardImage(file);
                    if (file) { const r = new FileReader(); r.onloadend = () => setAwardImagePreview(r.result as string); r.readAsDataURL(file); }
                    else setAwardImagePreview(null);
                  }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Optional Image</label>
              <div className="rounded-xl cursor-pointer transition-all overflow-hidden"
                style={{ border: '2px dashed #CBD5E1', background: '#F8FAFC' }}
                onClick={() => optionalImageRef.current?.click()}>
                {optionalImagePreview ? (
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative shrink-0 rounded-xl overflow-hidden bg-slate-100" style={{ width: '180px', height: '135px' }}>
                      <img src={optionalImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Upload size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{optionalImage?.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{optionalImage ? (optionalImage.size / 1024).toFixed(1) : 0} KB</p>
                      <p className="text-xs text-[#BE123C] mt-2 font-medium">Click anywhere to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <Upload size={24} className="text-slate-400" />
                    <span className="text-sm text-slate-500">Click to upload optional image</span>
                  </div>
                )}
                <input ref={optionalImageRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setOptionalImage(file);
                    if (file) { const r = new FileReader(); r.onloadend = () => setOptionalImagePreview(r.result as string); r.readAsDataURL(file); }
                    else setOptionalImagePreview(null);
                  }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.25)' }}>
            {loading ? 'Creating...' : 'Create Award'}
          </button>
          <Link href="/admin/awards"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
