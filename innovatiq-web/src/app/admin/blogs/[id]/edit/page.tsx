'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';

const AUTHORS = ['Krishna Das', 'Srinivasa Rao', 'Innovatiq'];

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

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState(AUTHORS[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await authFetch(`${API}/blogs/${id}`);
        const data = await res.json();
        const blog = data?.blog || data?.data || data;
        setTitle(blog.title || '');
        setShortDescription(blog.shortDescription || '');
        setDescription(blog.description || '');
        setAuthor(blog.author || AUTHORS[0]);
        setTags(Array.isArray(blog.tags) ? blog.tags : []);
      } catch {
        setError('Failed to load blog');
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('shortDescription', shortDescription);
      fd.append('description', description);
      fd.append('author', author);
      tags.forEach((tag) => fd.append('tags[]', tag));
      if (image) fd.append('image', image);

      const token = getToken();
      const res = await fetch(`${API}/blogs/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update blog');
      router.push('/admin/blogs');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blogs" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Blog</h1>
          <p className="text-slate-500 text-sm mt-0.5">Update blog post</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="rounded-2xl p-6 space-y-6"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              placeholder="Blog title" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#BE123C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Short Description * <span className="text-slate-400">({shortDescription.length}/200)</span>
            </label>
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value.slice(0, 200))} required
              rows={3} placeholder="Brief description..."
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#BE123C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (HTML) *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
              rows={10} placeholder="<p>Full blog content in HTML...</p>"
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#BE123C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Author *</label>
            <select value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#BE123C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }}>
              {AUTHORS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm text-slate-700"
                  style={{ background: 'rgba(212,23,74,0.08)', border: '1px solid rgba(212,23,74,0.2)' }}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Type a tag and press Enter"
                style={{ ...inputStyle, width: 'auto', flex: 1 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#BE123C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }} />
              <button type="button" onClick={addTag}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 flex items-center gap-1.5 transition-all hover:bg-slate-100 cursor-pointer"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Image (leave empty to keep current)</label>
            <div
              className="relative flex flex-col items-center justify-center gap-3 py-8 rounded-xl cursor-pointer transition-all hover:bg-slate-50"
              style={{ border: '2px dashed #CBD5E1', background: '#F8FAFC' }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={24} className="text-slate-400" />
              <span className="text-sm text-slate-500">
                {image ? image.name : 'Click to upload new image'}
              </span>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.30)' }}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/blogs"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
