'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, authHeaders } from '@/lib/adminApi';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/lib/toast';

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

const PRODUCT_OPTIONS = [
  { key: 'salesCrm', label: 'Sales CRM' },
  { key: 'aiAts',    label: 'AI ATS / HRMS' },
  { key: 'tms',      label: 'SkillEra (TMS)' },
  { key: 'lms',      label: 'LearnPro (LMS)' },
  { key: 'pms',      label: 'SecurOn (PMS)' },
  { key: 'lmp',      label: 'LMP (Learning Motivational Platform)' },
];
const SERVICE_OPTIONS = [
  { key: 'ai',             label: 'AI Services' },
  { key: 'cloud',          label: 'Cloud Services' },
  { key: 'cyber',          label: 'Cyber Security' },
  { key: 'consulting',     label: 'IT Consulting' },
  { key: 'digital',        label: 'Digital Transformation' },
  { key: 'managedIT',      label: 'Managed IT Services' },
  { key: 'infrastructure', label: 'Advanced Infrastructure' },
  { key: 'field',          label: 'Field Services' },
];
const ABOUT_OPTIONS = [
  { key: 'whoWeAre', label: 'Who We Are' },
  { key: 'awards', label: 'Awards' },
];

const CheckItem = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
  <div className="flex items-center gap-2.5 cursor-pointer group" onClick={onChange}>
    <div className="w-4.5 h-4.5 rounded flex items-center justify-center transition-all shrink-0"
      style={{ background: checked ? '#BE123C' : '#F1F5F9', border: checked ? '1px solid #BE123C' : '1px solid #CBD5E1' }}>
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
  </div>
);

export default function VideoEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [videoName, setVideoName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [home, setHome] = useState(false);
  const [contact, setContact] = useState(false);
  const [aboutUsTypes, setAboutUsTypes] = useState<Record<string, boolean>>({});
  const [productTypes, setProductTypes] = useState<Record<string, boolean>>({});
  const [serviceTypes, setServiceTypes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const toggle = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) =>
    setter(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await authFetch(`${API}/videos/${id}`);
        const data = await res.json();
        const video = data?.video || data?.data || data;
        setVideoName(video.videoName || '');
        setVideoLink(video.videoLink || '');
        setHome(!!video.home);
        setContact(!!video.contact);
        if (video.aboutUsTypes) setAboutUsTypes(video.aboutUsTypes);
        if (video.productTypes) setProductTypes(video.productTypes);
        if (video.serviceTypes) setServiceTypes(video.serviceTypes);
      } catch {
        toast.error('Failed to load video');
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchVideo();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        videoName, title: videoName, videoLink,
        home, contact,
        aboutUs: Object.values(aboutUsTypes).some(Boolean), aboutUsTypes,
        products: Object.values(productTypes).some(Boolean), productTypes,
        services: Object.values(serviceTypes).some(Boolean), serviceTypes,
      };
      const res = await fetch(`${API}/videos/${id}`, {
        method: 'PUT',
        headers: authHeaders() as Record<string, string>,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update video');
      toast.success('Updated successfully');
      router.push('/admin/videos');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Video Name *</label>
              <input type="text" value={videoName} onChange={(e) => setVideoName(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Video Link *</label>
              <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Display Locations</label>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>

              {/* Simple pages */}
              <div className="p-4 flex flex-wrap gap-6" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <CheckItem label="Home Page" checked={home} onChange={() => setHome(!home)} />
                <CheckItem label="Contact" checked={contact} onChange={() => setContact(!contact)} />
              </div>

              {/* About Us */}
              <div className="p-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">About Us</p>
                <div className="flex flex-wrap gap-5">
                  {ABOUT_OPTIONS.map(o => (
                    <CheckItem key={o.key} label={o.label} checked={!!aboutUsTypes[o.key]} onChange={() => toggle(setAboutUsTypes, o.key)} />
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="p-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Products</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {PRODUCT_OPTIONS.map(o => (
                    <CheckItem key={o.key} label={o.label} checked={!!productTypes[o.key]} onChange={() => toggle(setProductTypes, o.key)} />
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="p-4">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Services</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {SERVICE_OPTIONS.map(o => (
                    <CheckItem key={o.key} label={o.label} checked={!!serviceTypes[o.key]} onChange={() => toggle(setServiceTypes, o.key)} />
                  ))}
                </div>
              </div>

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
