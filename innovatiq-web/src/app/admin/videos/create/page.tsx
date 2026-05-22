'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API, authHeaders } from '@/lib/adminApi';
import { ArrowLeft } from 'lucide-react';

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

interface ProductTypes { tms: boolean; lms: boolean; lmp: boolean; pms: boolean; }
interface ServiceTypes { cloud: boolean; cyber: boolean; consulting: boolean; digital: boolean; managedIT: boolean; infrastructure: boolean; field: boolean; }

export default function VideoCreatePage() {
  const router = useRouter();

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
  const [error, setError] = useState('');

  const toggleProductType = (key: keyof ProductTypes) =>
    setProductTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleServiceType = (key: keyof ServiceTypes) =>
    setServiceTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        videoName,
        title,
        videoLink,
        date,
        time,
        home,
        career,
        products,
        productTypes,
        services,
        serviceTypes,
      };

      const res = await fetch(`${API}/videos`, {
        method: 'POST',
        headers: authHeaders() as Record<string, string>,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to create video');
      router.push('/admin/videos');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const CheckboxGroup = ({
    label, checked, onChange, children,
  }: { label: string; checked: boolean; onChange: () => void; children?: React.ReactNode }) => (
    <div className="space-y-3">
      <label className="flex items-center gap-3 cursor-pointer group">
        <div
          className="w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0"
          style={{
            background: checked ? '#D4174A' : 'rgba(255,255,255,0.05)',
            border: checked ? '1px solid #D4174A' : '1px solid rgba(255,255,255,0.2)',
          }}
          onClick={onChange}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors" onClick={onChange}>{label}</span>
      </label>
      {checked && children && (
        <div className="ml-8 space-y-2">{children}</div>
      )}
    </div>
  );

  const SubCheckbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className="w-4 h-4 rounded flex items-center justify-center transition-all flex-shrink-0"
        style={{
          background: checked ? 'rgba(212,23,74,0.7)' : 'rgba(255,255,255,0.05)',
          border: checked ? '1px solid rgba(212,23,74,0.7)' : '1px solid rgba(255,255,255,0.2)',
        }}
        onClick={onChange}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L2.8 4.8L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors" onClick={onChange}>{label}</span>
    </label>
  );

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/videos" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Video</h1>
          <p className="text-gray-400 text-sm mt-0.5">Add a new video entry</p>
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Video Name *</label>
              <input type="text" value={videoName} onChange={(e) => setVideoName(e.target.value)} required
                placeholder="e.g. intro-video" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                placeholder="Video display title" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Video Link *</label>
              <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} required
                placeholder="https://youtube.com/watch?v=..." style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Display Locations</label>
            <div
              className="p-5 rounded-xl space-y-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
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
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 15px rgba(212,23,74,0.3)' }}>
            {loading ? 'Adding...' : 'Add Video'}
          </button>
          <Link href="/admin/videos"
            className="px-6 py-3 rounded-xl text-sm font-medium text-gray-300"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
