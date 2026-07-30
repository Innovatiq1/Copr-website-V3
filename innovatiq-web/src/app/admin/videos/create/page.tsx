'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API, authHeaders } from '@/lib/adminApi';
import { ArrowLeft, Loader2 } from 'lucide-react';
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

export default function VideoCreatePage() {
  const router = useRouter();

  const [videoName, setVideoName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [home, setHome] = useState(false);
  const [contact, setContact] = useState(false);
  const [aboutUsTypes, setAboutUsTypes] = useState<Record<string, boolean>>({});
  const [productTypes, setProductTypes] = useState<Record<string, boolean>>({});
  const [serviceTypes, setServiceTypes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const toggle = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) =>
    setter(prev => ({ ...prev, [key]: !prev[key] }));

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
      const res = await fetch(`${API}/videos`, {
        method: 'POST',
        headers: authHeaders() as Record<string, string>,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to create video');
      toast.success('Created successfully');
      router.push('/admin/videos');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#BE123C';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(190,18,60,0.1)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#E2E8F0';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/videos"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer shrink-0"
          style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
          title="Back to videos"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.borderColor = '#94A3B8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8FAFC';
            e.currentTarget.style.borderColor = '#CBD5E1';
          }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Video</h1>
          <p className="text-slate-500 text-sm mt-0.5">Add a new video entry</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl p-6 space-y-6"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Video Name *</label>
              <input type="text" value={videoName} onChange={(e) => setVideoName(e.target.value)} required
                placeholder="e.g. Innovatiq Introduction" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Video Link *</label>
              <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} required
                placeholder="https://youtube.com/watch?v=..." style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
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
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Products</p>
                  <button type="button" onClick={() => {
                    const allSelected = PRODUCT_OPTIONS.every(o => !!productTypes[o.key]);
                    const next: Record<string, boolean> = {};
                    PRODUCT_OPTIONS.forEach(o => { next[o.key] = !allSelected; });
                    setProductTypes(next);
                  }} className="text-xs font-medium px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                    style={{ color: '#BE123C', background: 'rgba(190,18,60,0.07)', border: '1px solid rgba(190,18,60,0.2)' }}>
                    {PRODUCT_OPTIONS.every(o => !!productTypes[o.key]) ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {PRODUCT_OPTIONS.map(o => (
                    <CheckItem key={o.key} label={o.label} checked={!!productTypes[o.key]} onChange={() => toggle(setProductTypes, o.key)} />
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Services</p>
                  <button type="button" onClick={() => {
                    const allSelected = SERVICE_OPTIONS.every(o => !!serviceTypes[o.key]);
                    const next: Record<string, boolean> = {};
                    SERVICE_OPTIONS.forEach(o => { next[o.key] = !allSelected; });
                    setServiceTypes(next);
                  }} className="text-xs font-medium px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                    style={{ color: '#BE123C', background: 'rgba(190,18,60,0.07)', border: '1px solid rgba(190,18,60,0.2)' }}>
                    {SERVICE_OPTIONS.every(o => !!serviceTypes[o.key]) ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
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
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 cursor-pointer whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.25)' }}>
            {loading ? <><Loader2 size={16} className="animate-spin shrink-0" /> Adding...</> : 'Add Video'}
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
