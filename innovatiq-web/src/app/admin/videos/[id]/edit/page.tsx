'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, authHeaders } from '@/lib/adminApi';
import { ArrowLeft } from 'lucide-react';

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

interface ProductTypes { tms: boolean; lms: boolean; lmp: boolean; pms: boolean; }
interface ServiceTypes { cloud: boolean; cyber: boolean; consulting: boolean; digital: boolean; managedIT: boolean; infrastructure: boolean; field: boolean; }

export default function VideoEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [videoName, setVideoName] = useState('');
  const [title, setTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [home, setHome] = useState(false);
  const [career, setCareer] = useState(false);
  const [products, setProducts] = useState(false);
  const [productTypes, setProductTypes] = useState<ProductTypes>({ tms: false, lms: false, lmp: false, pms: false });
  const [services, setServices] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypes>({
    cloud: false, cyber: false, consulting: false, digital: false, managedIT: false, infrastructure: false, field: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await authFetch(`${API}/videos/${id}`);
        const data = await res.json();
        const video = data?.video || data?.data || data;
        setVideoName(video.videoName || '');
        setTitle(video.title || '');
        setVideoLink(video.videoLink || '');
        setDate(video.date ? video.date.split('T')[0] : '');
        setTime(video.time || '');
        setHome(!!video.home);
        setCareer(!!video.career);
        setProducts(!!video.products);
        setServices(!!video.services);
        if (video.productTypes) setProductTypes({ ...{ tms: false, lms: false, lmp: false, pms: false }, ...video.productTypes });
        if (video.serviceTypes) setServiceTypes({ ...{ cloud: false, cyber: false, consulting: false, digital: false, managedIT: false, infrastructure: false, field: false }, ...video.serviceTypes });
      } catch {
        setError('Failed to load video');
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchVideo();
  }, [id]);

  const toggleProductType = (key: keyof ProductTypes) => setProductTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleServiceType = (key: keyof ServiceTypes) => setServiceTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { videoName, title, videoLink, date, time, home, career, products, productTypes, services, serviceTypes };
      const res = await fetch(`${API}/videos/${id}`, {
        method: 'PUT',
        headers: authHeaders() as Record<string, string>,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update video');
      router.push('/admin/videos');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#BE123C';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#E2E8F0';
    e.currentTarget.style.boxShadow = 'none';
  };

  const CheckboxGroup = ({ label, checked, onChange, children }: { label: string; checked: boolean; onChange: () => void; children?: React.ReactNode }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={onChange}>
        <div className="w-5 h-5 rounded flex items-center justify-center transition-all shrink-0"
          style={{ background: checked ? '#BE123C' : '#F1F5F9', border: checked ? '1px solid #BE123C' : '1px solid #CBD5E1' }}>
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
      </div>
      {checked && children && <div className="ml-8 space-y-2">{children}</div>}
    </div>
  );

  const SubCheckbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <div className="flex items-center gap-3 cursor-pointer group" onClick={onChange}>
      <div className="w-4 h-4 rounded flex items-center justify-center transition-all shrink-0"
        style={{ background: checked ? 'rgba(212,23,74,0.8)' : '#F1F5F9', border: checked ? '1px solid rgba(212,23,74,0.8)' : '1px solid #E2E8F0' }}>
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L2.8 4.8L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors">{label}</span>
    </div>
  );

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
        <Link href="/admin/videos" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Video</h1>
          <p className="text-slate-500 text-sm mt-0.5">Update video details</p>
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Video Name *</label>
              <input type="text" value={videoName} onChange={(e) => setVideoName(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Video Link *</label>
              <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Display Locations</label>
            <div className="p-5 rounded-xl space-y-4"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <CheckboxGroup label="Home Page" checked={home} onChange={() => setHome(!home)} />
              <CheckboxGroup label="Career Page" checked={career} onChange={() => setCareer(!career)} />
              <CheckboxGroup label="Products" checked={products} onChange={() => setProducts(!products)}>
                <SubCheckbox label="TMS" checked={productTypes.tms} onChange={() => toggleProductType('tms')} />
                <SubCheckbox label="LMS" checked={productTypes.lms} onChange={() => toggleProductType('lms')} />
                <SubCheckbox label="LMP" checked={productTypes.lmp} onChange={() => toggleProductType('lmp')} />
                <SubCheckbox label="PMS" checked={productTypes.pms} onChange={() => toggleProductType('pms')} />
              </CheckboxGroup>
              <CheckboxGroup label="Services" checked={services} onChange={() => setServices(!services)}>
                <SubCheckbox label="Cloud" checked={serviceTypes.cloud} onChange={() => toggleServiceType('cloud')} />
                <SubCheckbox label="Cyber Security" checked={serviceTypes.cyber} onChange={() => toggleServiceType('cyber')} />
                <SubCheckbox label="Consulting" checked={serviceTypes.consulting} onChange={() => toggleServiceType('consulting')} />
                <SubCheckbox label="Digital Transformation" checked={serviceTypes.digital} onChange={() => toggleServiceType('digital')} />
                <SubCheckbox label="Managed IT" checked={serviceTypes.managedIT} onChange={() => toggleServiceType('managedIT')} />
                <SubCheckbox label="Infrastructure" checked={serviceTypes.infrastructure} onChange={() => toggleServiceType('infrastructure')} />
                <SubCheckbox label="Field Services" checked={serviceTypes.field} onChange={() => toggleServiceType('field')} />
              </CheckboxGroup>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.30)' }}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/videos"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
