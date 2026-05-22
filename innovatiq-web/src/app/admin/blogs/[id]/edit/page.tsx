'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, getToken } from '@/lib/adminApi';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';

const AUTHORS = ['Krishna Das', 'Srinivasa Rao', 'Innovatiq'];

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#07101E' }}>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blogs" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Blog</h1>
          <p className="text-gray-400 text-sm mt-0.5">Update blog post</p>
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

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Blog title"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Short description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Short Description * <span className="text-gray-500">({shortDescription.length}/200)</span>
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value.slice(0, 200))}
              required
              rows={3}
              placeholder="Brief description..."
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description (HTML) *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={10}
              placeholder="<p>Full blog content in HTML...</p>"
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Author *</label>
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            >
              {AUTHORS.map((a) => (
                <option key={a} value={a} style={{ background: '#0A1225' }}>{a}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm text-gray-300"
                  style={{ background: 'rgba(212,23,74,0.15)', border: '1px solid rgba(212,23,74,0.3)' }}
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-400">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Type a tag and press Enter"
                style={{ ...inputStyle, width: 'auto', flex: 1 }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 flex items-center gap-1.5 transition-all"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Cover Image (leave empty to keep current)</label>
            <div
              className="relative flex flex-col items-center justify-center gap-3 py-8 rounded-xl cursor-pointer transition-all"
              style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={24} className="text-gray-500" />
              <span className="text-sm text-gray-400">
                {image ? image.name : 'Click to upload new image'}
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 15px rgba(212,23,74,0.3)' }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/blogs"
            className="px-6 py-3 rounded-xl text-sm font-medium text-gray-300"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
